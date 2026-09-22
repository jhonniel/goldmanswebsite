import { useEffect } from "react";
import { getStoredConsent, subscribeToConsent } from "../lib/consent";

const SCRIPT_ID = "goldsman-ga";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadAnalytics(measurementId: string) {
  if (document.getElementById(SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
}

export default function Analytics() {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
    if (!measurementId) return;

    const apply = () => {
      const consent = getStoredConsent();
      if (consent?.analytics) {
        loadAnalytics(measurementId);
      }
    };

    apply();
    return subscribeToConsent(apply);
  }, []);

  return null;
}
