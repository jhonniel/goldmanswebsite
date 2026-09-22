const MIN_SUBMIT_MS = 2500;
const RATE_LIMIT_MS = 60_000;
const recentByIp = new Map();

function readIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function tooMany(ip) {
  const now = Date.now();
  const last = recentByIp.get(ip) || 0;
  if (now - last < RATE_LIMIT_MS) return true;
  recentByIp.set(ip, now);
  return false;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function asText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function emailBody(payload) {
  return [
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Telephone: ${payload.phone || "—"}`,
    payload.organization ? `Organization: ${payload.organization}` : null,
    payload.source === "website-chat" ? "Source: Website chat" : "Source: Contact form",
    "",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendWithResend(payload) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const to = process.env.CONTACT_TO_EMAIL || "info@goldmanssupply.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "Goldman’s Supply Corporation <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: payload.subject,
      text: emailBody(payload),
    }),
  });

  if (!response.ok) {
    throw new Error("Resend could not send the inquiry.");
  }

  return true;
}

async function sendWithWeb3Forms(payload) {
  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) return false;

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: key,
      name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      message: emailBody(payload),
    }),
  });

  if (!response.ok) {
    throw new Error("Web3Forms could not send the inquiry.");
  }

  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = readIp(req);
  if (tooMany(ip)) {
    return res.status(429).json({ error: "Please wait before sending another inquiry." });
  }

  const body = req.body || {};
  const payload = {
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

  if (payload.website) {
    return res.status(200).json({ status: "sent" });
  }

  if (!payload.consent) {
    return res.status(400).json({ error: "Consent is required." });
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
    return res.status(400).json({ error: "Please complete the required fields." });
  }

  if (Number.isFinite(payload.startedAt) && Date.now() - payload.startedAt < MIN_SUBMIT_MS) {
    return res.status(400).json({ error: "Please wait a moment and try again." });
  }

  try {
    const sent = (await sendWithResend(payload)) || (await sendWithWeb3Forms(payload));
    if (!sent) {
      return res.status(503).json({
        error: "Email delivery is not configured.",
      });
    }
    return res.status(200).json({ status: "sent" });
  } catch {
    return res.status(502).json({ error: "Unable to send inquiry." });
  }
}
