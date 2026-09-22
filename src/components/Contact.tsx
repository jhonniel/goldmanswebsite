import { Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import {
  company,
  companyAddressLines,
  hasVerifiedPhone,
} from "../config/company";
import { submitInquiry, type InquiryPayload } from "../lib/contact";
import Reveal from "./Reveal";

type FieldName = keyof Omit<InquiryPayload, "website" | "organization" | "source" | "startedAt" | "consent">;
type FormState = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
  consent: boolean;
  startedAt: number;
};
type FormErrors = Partial<Record<FieldName | "consent", string>>;
type Status = "idle" | "submitting" | "success" | "mailto" | "error";

const initialState = (): FormState => ({
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
  consent: false,
  startedAt: Date.now(),
});

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter your telephone number.";
  } else if (!/^[+0-9][0-9\s().-]{6,}$/.test(values.phone.trim())) {
    errors.phone = "Please enter a valid telephone number.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Please enter a subject.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Please enter a message of at least 10 characters.";
  }

  if (!values.consent) {
    errors.consent = "Please confirm that we may process your inquiry.";
  }

  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const onChange = (name: keyof FormState, value: string | boolean) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    if (values.website.trim()) {
      setStatus("success");
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    try {
      const result = await submitInquiry(
        {
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          consent: values.consent,
          startedAt: values.startedAt,
          source: "contact-form",
        },
        company.email,
      );
      setStatus(result.status === "sent" ? "success" : "mailto");
      setValues(initialState());
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-defer relative scroll-mt-24 py-14 sm:py-24 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16">
        <Reveal>
          <p className="text-[11px] tracking-[0.18em] text-gold-bright">
            CONTACT US
          </p>
          <h2 className="mt-4 text-[1.75rem] font-normal tracking-[-0.03em] text-pretty text-ink sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            For supplies, equipment, or related requirements, send an inquiry
            to Goldman’s Supply Corporation.
          </p>

          <address className="mt-8 not-italic">
            <p className="text-sm font-medium tracking-[0.04em] text-ink">
              {company.legalName}
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex min-w-0 items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-bright" />
                <span>
                  {companyAddressLines().map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              {hasVerifiedPhone() ? (
                <li className="flex min-w-0 items-start gap-3">
                  <Phone size={16} className="mt-0.5 shrink-0 text-gold-bright" />
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className="text-ink-muted hover:text-ink"
                  >
                    {company.phone}
                  </a>
                </li>
              ) : null}
              <li className="flex min-w-0 items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-gold-bright" />
                <a
                  href={`mailto:${company.email}`}
                  className="min-w-0 break-all text-ink-muted hover:text-ink"
                >
                  {company.email}
                </a>
              </li>
            </ul>
          </address>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            className="surface-card min-w-0 rounded-3xl p-4 sm:p-8"
            onSubmit={onSubmit}
            noValidate
          >
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="company_website">Website</label>
              <input
                id="company_website"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(event) => onChange("website", event.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="fullName"
                label="Name"
                autoComplete="name"
                value={values.fullName}
                error={errors.fullName}
                onChange={(value) => onChange("fullName", value)}
                required
              />
              <Field
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={values.email}
                error={errors.email}
                onChange={(value) => onChange("email", value)}
                required
              />
              <Field
                id="phone"
                label="Telephone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                error={errors.phone}
                onChange={(value) => onChange("phone", value)}
                required
              />
              <Field
                id="subject"
                label="Subject"
                value={values.subject}
                error={errors.subject}
                onChange={(value) => onChange("subject", value)}
                required
              />
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm text-ink">
                  Message
                  <span className="text-gold-bright"> *</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="field min-h-32 resize-y"
                  value={values.message}
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  onChange={(event) => onChange("message", event.target.value)}
                />
                {errors.message ? (
                  <p id="message-error" className="mt-2 text-sm text-[#e2a0a0]">
                    {errors.message}
                  </p>
                ) : null}
              </div>
            </div>

            <label className="mt-5 flex items-start gap-3 text-sm text-ink-muted">
              <input
                type="checkbox"
                className="mt-1 size-4 shrink-0 accent-[var(--color-gold-bright)]"
                checked={values.consent}
                onChange={(event) => onChange("consent", event.target.checked)}
                required
              />
              <span>
                I agree that Goldman’s Supply Corporation may process this
                inquiry as described in the{" "}
                <a href="#privacy" className="text-gold-bright underline underline-offset-2">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.consent ? (
              <p className="mt-2 text-sm text-[#e2a0a0]">{errors.consent}</p>
            ) : null}

            <button
              type="submit"
              className="btn-primary mt-6 w-full sm:w-auto"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending..." : "Send Inquiry"}
            </button>

            <div className="mt-4 min-h-6 text-sm" aria-live="polite">
              {status === "success" ? (
                <p className="text-gold-bright">
                  Thank you. Your inquiry has been sent to Goldman’s Supply
                  Corporation.
                </p>
              ) : null}
              {status === "mailto" ? (
                <p className="text-gold-bright">
                  If your email application did not open, please send your
                  message to {company.email}.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-[#e2a0a0]">
                  We could not send your inquiry. Please email{" "}
                  <a className="underline" href={`mailto:${company.email}`}>
                    {company.email}
                  </a>
                  .
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  required,
}: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-ink">
        {label}
        {required ? <span className="text-gold-bright"> *</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="field"
        value={value}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-[#e2a0a0]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
