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
      className="fixed inset-x-0 bottom-0 z-[60] p-3 pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] sm:p-6 sm:pr-28 sm:pb-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div className="surface-card mx-auto max-w-5xl p-4 sm:p-6">
        <h2 id="cookie-title" className="text-base font-medium text-ink sm:text-lg">
          Cookies on this website
        </h2>
        <p id="cookie-desc" className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
          Essential cookies keep this website working. Optional analytics
          cookies are used only if you accept them.{" "}
          <button
            type="button"
            className="text-gold-bright underline underline-offset-2"
            onClick={onOpenPolicy}
          >
            Cookie Policy
          </button>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:flex sm:flex-wrap sm:gap-3">
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
