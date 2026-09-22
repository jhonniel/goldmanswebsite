const fallbackSiteUrl = "https://www.example.com";

function resolveSiteUrl(): string {
  const value = import.meta.env.VITE_SITE_URL?.trim();
  return (value && value.length > 0 ? value : fallbackSiteUrl).replace(
    /\/+$/,
    "",
  );
}

export const company = {
  name: "Gold Mans Supply Corporation",
  legalName: "Gold Mans Supply Corporation",
  shortName: "Gold Mans",
  wordmarkPrimary: "GOLD MANS",
  wordmarkSecondary: "SUPPLY CORPORATION",
  entityType: "Corporation",
  industry: "Business and supply solutions",
  description:
    "Gold Mans Supply Corporation provides reliable business and supply solutions designed to support companies, organizations, and their everyday needs.",
  about:
    "Gold Mans Supply Corporation is a company focused on providing reliable solutions and services for businesses and organizations. We combine professionalism, quality, and careful work to help our clients meet their needs.",
  aboutSecondary:
    "Our approach is simple: understand the need, deliver the right solution, and build lasting relationships.",
  email: "info@goldmansupply.com",
  phone: "+63 XXX XXX XXXX",
  address: "Philippines",
  website: resolveSiteUrl(),
  logoPath: "/logo.svg",
  ogImagePath: "/og-image.jpg",
  /**
   * Contact details below are placeholders until verified.
   * Leave social URLs empty until official profiles are confirmed.
   */
  contactIsPlaceholder: true,
  social: {
    linkedin: "",
    facebook: "",
    x: "",
    instagram: "",
  },
  seo: {
    title: "Gold Mans Supply Corporation | Business & Supply Solutions",
    description:
      "Gold Mans Supply Corporation provides reliable business and supply solutions designed to support organizations and their everyday needs.",
  },
} as const;

export type SocialNetwork = keyof typeof company.social;

export const socialItems: { id: SocialNetwork; label: string }[] = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "facebook", label: "Facebook" },
  { id: "x", label: "X" },
  { id: "instagram", label: "Instagram" },
];

export function getActiveSocialLinks() {
  return socialItems
    .map((item) => ({
      ...item,
      href: company.social[item.id],
    }))
    .filter((item) => item.href.length > 0);
}
