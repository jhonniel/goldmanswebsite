import { useState } from "react";
import { getStoredConsent, saveConsent } from "../lib/consent";

type CookieBannerProps = {
  forceOpen?: boolean;
  onClose?: () => void;
  onOpenPolicy?: () => void;
};

export default function CookieBanner({
  forceOpen = false,
  onClose,
  onOpenPolicy,
}: CookieBannerProps) {
  const [hasChoice, setHasChoice] = useState(() => getStoredConsent() !== null);
  const visible = forceOpen || !hasChoice;

  if (!visible) return null;

  const choose = (analytics: boolean) => {
    saveConsent({ essential: true, analytics });
    setHasChoice(true);
    onClose?.();
  };

  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-[60] p-3 pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] sm:p-6 sm:pr-28 sm:pb-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div className="surface-card mx-auto max-w-5xl rounded-2xl p-5 sm:p-6">
        <h2 id="cookie-title" className="text-lg font-medium text-ink">
          Cookies on this website
        </h2>
        <p id="cookie-desc" className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
          Goldman’s Supply Corporation uses essential cookies to keep this
          website working. Optional analytics cookies are used only if you
          accept them, to help us understand how the site is used. Read the{" "}
          <button
            type="button"
            className="text-gold-bright underline underline-offset-2"
            onClick={onOpenPolicy}
          >
            Cookie Policy
          </button>
          .
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" className="btn-primary w-full sm:w-auto" onClick={() => choose(true)}>
            Accept cookies
          </button>
          <button type="button" className="btn-secondary w-full sm:w-auto" onClick={() => choose(false)}>
            Essential only
          </button>
        </div>
      </div>
    </aside>
  );
}
