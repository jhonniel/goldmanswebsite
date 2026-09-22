import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { company } from "../config/company";

type CookiePolicyProps = {
  open: boolean;
  onClose: () => void;
  onManageCookies: () => void;
};

export default function CookiePolicy({
  open,
  onClose,
  onManageCookies,
}: CookiePolicyProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/30"
        aria-label="Close cookie policy"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="surface-card relative z-10 max-h-[min(85dvh,calc(100dvh-2rem))] w-full max-w-2xl overflow-y-auto rounded-3xl p-5 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl font-normal text-ink">
            Cookie Policy
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="icon-glass inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink"
            aria-label="Close cookie policy"
            onClick={onClose}
          >
            <X size={18} strokeWidth={1.7} />
          </button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          This Cookie Policy explains how Goldman’s Supply Corporation uses
          cookies on this website.
        </p>

        <h3 className="mt-6 text-lg text-ink">What cookies are</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Cookies are small files stored on your device. They help a website
          remember choices and keep basic features working.
        </p>

        <h3 className="mt-6 text-lg text-ink">Cookies we use</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
          <li>
            <strong className="text-ink">Essential cookies.</strong> These
            store your cookie preference so the website can remember whether
            you accepted or limited cookies. The website needs these to
            function.
          </li>
          <li>
            <strong className="text-ink">Analytics cookies.</strong> These are
            optional. If you accept them, they may be used to understand how
            visitors use the Goldman’s Supply Corporation website. They are
            not set unless you choose Accept cookies.
          </li>
        </ul>

        <h3 className="mt-6 text-lg text-ink">Your choices</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          You can accept all cookies or continue with essential cookies only.
          You can change this at any time.
        </p>
        <button
          type="button"
          className="btn-secondary mt-4"
          onClick={() => {
            onClose();
            onManageCookies();
          }}
        >
          Manage cookie settings
        </button>

        <h3 className="mt-6 text-lg text-ink">Contact</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          For questions about cookies or privacy on this website, email{" "}
          <a
            className="text-gold-bright underline underline-offset-2"
            href={`mailto:${company.email}`}
          >
            {company.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
