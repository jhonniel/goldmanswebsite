const MIN_SUBMIT_MS = 2500;
const RATE_LIMIT_MS = 60_000;
const recentByIp = new Map();

const COMPANY_TO = () =>
  process.env.CONTACT_TO_EMAIL?.trim() || "info@goldmanssupply.com";

const FROM = () =>
  process.env.CONTACT_FROM_EMAIL?.trim() ||
  "Goldman's Supply Corporation <info@goldmanssupply.com>";

export function asText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function parsePayload(body = {}) {
  return {
    fullName: asText(body.fullName),
    email: asText(body.email),
    phone: asText(body.phone),
    subject: asText(body.subject),
    message: asText(body.message),
    organization: asText(body.organization),
    source: asText(body.source),
    website: asText(body.website),
    consent: body.consent === true,
    startedAt: Number(body.startedAt),
  };
}

export function tooMany(ip) {
  const now = Date.now();
  const last = recentByIp.get(ip) || 0;
  if (now - last < RATE_LIMIT_MS) return true;
  recentByIp.set(ip, now);
  return false;
}

function inquiryText(payload) {
  return [
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Telephone: ${payload.phone || "—"}`,
    payload.organization ? `Organization: ${payload.organization}` : null,
    payload.source === "website-chat" ? "Source: Website chat" : "Source: Contact form",
    `Subject: ${payload.subject}`,
    "",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");
}

function inquiryHtml(payload) {
  const rows = [
    ["Name", payload.fullName],
    ["Email", payload.email],
    ["Telephone", payload.phone || "—"],
    payload.organization ? ["Organization", payload.organization] : null,
    ["Source", payload.source === "website-chat" ? "Website chat" : "Contact form"],
    ["Subject", payload.subject],
  ].filter(Boolean);

  const details = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5c574e;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1f1c18;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Georgia,serif;color:#1f1c18;line-height:1.5;">
      <p>A new inquiry was submitted on the Goldman’s Supply Corporation website.</p>
      <table style="border-collapse:collapse;margin:16px 0;">${details}</table>
      <p style="white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `;
}

function thankYouText(payload) {
  return [
    `Dear ${payload.fullName},`,
    "",
    "Thank you for contacting Goldman’s Supply Corporation. Our team has received your message and will review it.",
    "",
    "We will get in touch as soon as we can.",
    "",
    "Goldman’s Supply Corporation",
    "Doing business under the name and style of Goldman Enterprise",
    "info@goldmanssupply.com",
  ].join("\n");
}

function thankYouHtml(payload) {
  return `
    <div style="font-family:Georgia,serif;color:#1f1c18;line-height:1.6;">
      <p>Dear ${escapeHtml(payload.fullName)},</p>
      <p>Thank you for contacting Goldman’s Supply Corporation. Our team has received your message and will review it.</p>
      <p>We will get in touch as soon as we can.</p>
      <p style="margin-top:24px;">
        Goldman’s Supply Corporation<br />
        Doing business under the name and style of Goldman Enterprise<br />
        <a href="mailto:info@goldmanssupply.com">info@goldmanssupply.com</a>
      </p>
    </div>
  `;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function sendResend(message) {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    throw new Error("RESEND_API_KEY is not set.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Resend could not send the email.");
  }
}

export async function sendInquiryEmails(payload) {
  const from = FROM();
  const companyTo = COMPANY_TO();

  await sendResend({
    from,
    to: [companyTo],
    reply_to: payload.email,
    subject: `Website inquiry: ${payload.subject}`,
    text: inquiryText(payload),
    html: inquiryHtml(payload),
  });

  try {
    await sendResend({
      from,
      to: [payload.email],
      reply_to: companyTo,
      subject: "Thank you for contacting Goldman’s Supply Corporation",
      text: thankYouText(payload),
      html: thankYouHtml(payload),
    });
  } catch {
    // The company already received the inquiry.
  }
}

export function validateInquiry(payload) {
  if (payload.website) {
    return { ok: true, ignored: true };
  }

  if (!payload.consent) {
    return { ok: false, code: 400, error: "Consent is required." };
  }

  const minMessage = payload.source === "website-chat" ? 4 : 10;
  const phoneOk =
    payload.source === "website-chat" || payload.phone.length >= 7;

  if (
    payload.fullName.length < 2 ||
    !isEmail(payload.email) ||
    !phoneOk ||
    payload.subject.length < 2 ||
    payload.message.length < minMessage
  ) {
    return { ok: false, code: 400, error: "Please complete the required fields." };
  }

  if (Number.isFinite(payload.startedAt) && Date.now() - payload.startedAt < MIN_SUBMIT_MS) {
    return { ok: false, code: 400, error: "Please wait a moment and try again." };
  }

  return { ok: true, ignored: false };
}

export async function handleInquiry(payload, ip = "unknown") {
  const checked = validateInquiry(payload);
  if (checked.ignored) {
    return { code: 200, body: { status: "sent" } };
  }
  if (!checked.ok) {
    return { code: checked.code, body: { error: checked.error } };
  }

  if (tooMany(ip)) {
    return {
      code: 429,
      body: { error: "Please wait before sending another inquiry." },
    };
  }

  await sendInquiryEmails(payload);
  return { code: 200, body: { status: "sent" } };
}
