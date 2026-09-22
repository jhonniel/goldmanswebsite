export type InquiryPayload = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  startedAt: number;
  website?: string;
  organization?: string;
  source?: "contact-form" | "website-chat";
};

export type InquiryResult =
  | { status: "sent" }
  | { status: "mailto" };

const MIN_SUBMIT_MS = 2500;

function buildMailto(payload: InquiryPayload, destination: string): string {
  const body = [
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Telephone: ${payload.phone || "—"}`,
    ...(payload.organization ? [`Organization: ${payload.organization}`] : []),
    ...(payload.source === "website-chat" ? ["Source: Website chat"] : []),
    "",
    payload.message,
  ].join("\n");

  return `mailto:${destination}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
}

function isTooFast(startedAt: number): boolean {
  return Number.isFinite(startedAt) && Date.now() - startedAt < MIN_SUBMIT_MS;
}

async function postJson(url: string, body: unknown): Promise<boolean> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  return response.ok;
}

export async function submitInquiry(
  payload: InquiryPayload,
  destinationEmail: string,
): Promise<InquiryResult> {
  if (payload.website?.trim()) {
    return { status: "sent" };
  }

  if (!payload.consent) {
    throw new Error("Consent is required.");
  }

  if (isTooFast(payload.startedAt)) {
    throw new Error("Please wait a moment and try again.");
  }

  const endpoint =
    import.meta.env.VITE_CONTACT_API_URL?.trim() || "/api/contact";

  try {
    const sent = await postJson(endpoint, payload);
    if (sent) return { status: "sent" };
  } catch {
    // Local Vite has no /api route. Try the next delivery method.
  }

  try {
    const sent = await postJson(
      `https://formsubmit.co/ajax/${destinationEmail}`,
      {
        name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        subject: payload.subject,
        message: payload.message,
        _subject: payload.subject,
        _honey: "",
        _captcha: "false",
        _template: "table",
      },
    );
    if (sent) return { status: "sent" };
  } catch {
    // Continue to the email-client fallback.
  }

  window.location.href = buildMailto(payload, destinationEmail);
  return { status: "mailto" };
}
