export type InquiryPayload = {
  fullName: string;
  email: string;
  organization: string;
  phone: string;
  subject: string;
  message: string;
  source?: "contact-form" | "website-chat";
};

export type InquiryResult =
  | { status: "sent" }
  | { status: "mailto" };

function buildMailto(payload: InquiryPayload, destination: string): string {
  const body = [
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Company / Organization: ${payload.organization || "—"}`,
    `Contact Number: ${payload.phone || "—"}`,
    ...(payload.source === "website-chat" ? ["Source: Website chat"] : []),
    "",
    payload.message,
  ].join("\n");

  return `mailto:${destination}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitInquiry(
  payload: InquiryPayload,
  destinationEmail: string,
): Promise<InquiryResult> {
  const endpoint = import.meta.env.VITE_CONTACT_API_URL?.trim();

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Unable to send inquiry.");
    }

    return { status: "sent" };
  }

  window.location.href = buildMailto(payload, destinationEmail);
  return { status: "mailto" };
}
