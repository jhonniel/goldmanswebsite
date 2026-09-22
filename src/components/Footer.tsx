import type { ComponentType } from "react";
import {
  company,
  getActiveSocialLinks,
  type SocialNetwork,
} from "../config/company";

const socialIcons: Record<
  SocialNetwork,
  ComponentType<{ size?: number; strokeWidth?: number }>
> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
};

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Products and Services" },
  { href: "#industries", label: "Industries" },
  { href: "#contact", label: "Contact Us" },
  { href: "#privacy", label: "Privacy Policy" },
];

type FooterProps = {
  onManageCookies: () => void;
  onOpenCookiePolicy: () => void;
};

export default function Footer({ onManageCookies, onOpenCookiePolicy }: FooterProps) {
  const social = getActiveSocialLinks();

  return (
    <footer className="relative border-t border-white/70 bg-white/80 pt-12 pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] sm:pt-14 sm:pb-10">
      <div className="container-page grid min-w-0 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-sm font-medium tracking-[0.04em] text-ink">
            {company.legalName}
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
            {company.dbaPhrase}
          </p>
          <p className="mt-2 text-sm text-ink-muted">{company.location}</p>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.22em] text-gold-bright">
            COMPANY
          </p>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-ink-muted hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.22em] text-gold-bright">
            CONTACT
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>
              <a className="break-all hover:text-ink" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </li>
            <li>
              <a
                className="hover:text-ink"
                href={`tel:${company.phone.replace(/\s/g, "")}`}
              >
                {company.phone}
              </a>
            </li>
            <li>{company.location}</li>
          </ul>
          {social.length > 0 ? (
            <ul className="mt-5 flex gap-3">
              {social.map((item) => {
                const Icon = socialIcons[item.id];
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="icon-glass inline-flex size-10 items-center justify-center rounded-full text-ink-muted hover:text-ink"
                      aria-label={item.label}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <Icon size={16} strokeWidth={1.6} />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="container-page mt-12 flex flex-col gap-3 border-t border-white/40 pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Goldman’s Supply Corporation. All rights reserved.</p>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-2">
          <a className="hover:text-ink" href="#privacy">
            Privacy Policy
          </a>
          <button type="button" className="text-left hover:text-ink" onClick={onOpenCookiePolicy}>
            Cookie Policy
          </button>
          <button type="button" className="text-left hover:text-ink" onClick={onManageCookies}>
            Cookie settings
          </button>
          <a className="hover:text-ink" href="/sitemap.xml">
            Sitemap
          </a>
        </nav>
      </div>
    </footer>
  );
}

type IconProps = { size?: number; strokeWidth?: number };

function LinkedInIcon({ size = 16, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7.5v.01M12 17v-5.2c0-1.8 2.4-1.9 2.4 0V17M12 11.8V10" />
    </svg>
  );
}

function FacebookIcon({ size = 16, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v8h4v-8h3.2L17 12h-4V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function InstagramIcon({ size = 16, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function XIcon({ size = 16, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}
