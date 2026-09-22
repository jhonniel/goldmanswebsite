const CONSENT_COOKIE = "goldsman_cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;
const CONSENT_EVENT = "goldsman-consent-change";

export type CookieConsent = {
  essential: true;
  analytics: boolean;
};

export const defaultConsent: CookieConsent = {
  essential: true,
  analytics: false,
};

function parseConsent(value: string | null): CookieConsent | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<CookieConsent>;
    if (typeof parsed.analytics !== "boolean") return null;
    return { essential: true, analytics: parsed.analytics };
  } catch {
    return null;
  }
}

export function getStoredConsent(): CookieConsent | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));

  if (match) {
    const value = decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1));
    const fromCookie = parseConsent(value);
    if (fromCookie) return fromCookie;
  }

  return parseConsent(window.localStorage.getItem(CONSENT_COOKIE));
}

export function saveConsent(consent: CookieConsent) {
  const value = JSON.stringify(consent);
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax`;
  window.localStorage.setItem(CONSENT_COOKIE, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
}

export function subscribeToConsent(listener: (consent: CookieConsent) => void) {
  const onChange = (event: Event) => {
    const custom = event as CustomEvent<CookieConsent>;
    if (custom.detail) listener(custom.detail);
  };

  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}
