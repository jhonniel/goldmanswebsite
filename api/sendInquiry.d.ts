export type InquiryPayload = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  organization: string;
  source: string;
  website: string;
  consent: boolean;
  startedAt: number;
};

export function asText(value: unknown): string;
export function isEmail(value: string): boolean;
export function parsePayload(body?: unknown): InquiryPayload;
export function tooMany(ip: string): boolean;
export function sendInquiryEmails(payload: InquiryPayload): Promise<void>;
export function validateInquiry(payload: InquiryPayload): {
  ok: boolean;
  ignored?: boolean;
  code?: number;
  error?: string;
};
export function handleInquiry(
  payload: InquiryPayload,
  ip?: string,
): Promise<{ code: number; body: Record<string, string> }>;
