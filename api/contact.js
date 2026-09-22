import { handleInquiry, parsePayload } from "./sendInquiry.js";

function readIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await handleInquiry(parsePayload(req.body || {}), readIp(req));
    return res.status(result.code).json(result.body);
  } catch {
    return res.status(502).json({ error: "Unable to send inquiry." });
  }
}
