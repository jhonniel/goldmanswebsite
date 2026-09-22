const fallbackSiteUrl = "https://www.example.com";

function resolveSiteUrl(): string {
  const value = import.meta.env.VITE_SITE_URL?.trim();
  return (value && value.length > 0 ? value : fallbackSiteUrl).replace(
    /\/+$/,
    "",
  );
}

export const company = {
  name: "Goldman’s Supply Corporation",
  legalName: "GOLDMAN'S SUPPLY CORPORATION",
  tradeName: "GOLDMAN ENTERPRISE",
  shortName: "Goldman’s",
  wordmarkPrimary: "GOLDMAN’S",
  wordmarkSecondary: "SUPPLY CORPORATION",
  entityType: "Corporation",
  chairman: "Jonathan V. Tay",
  industry: "Office supplies, equipment, and construction materials",
  headline: "Reliable Supplies and Business Solutions",
  description:
    "Goldman’s Supply Corporation is a Davao City-based supplier providing office supplies, equipment, construction materials, and related products to government agencies, private organizations, and institutional clients.",
  about:
    "Goldman’s Supply Corporation is a Philippine corporation based in Davao City. The company supplies products and equipment to government agencies, private organizations, and institutional clients. We are committed to providing dependable products, responsive service, and timely delivery.",
  aboutSecondary:
    "We are committed to providing dependable products, responsive service, and timely delivery.",
  mission:
    "Our mission is to provide reliable supplies, quality equipment, and innovative technology solutions that help government agencies, businesses, and communities operate more efficiently. We are committed to delivering responsive service, dependable products, and practical digital solutions—including web systems and mobile applications—tailored to the evolving needs of our clients.",
  vision:
    "Our vision is to become a trusted Philippine provider of integrated supply and technology solutions, recognized for quality, reliability, innovation, and meaningful contributions to digital transformation in government, business, and local communities.",
  commitment:
    "We are committed to providing dependable products, responsive service, and timely delivery.",
  dbaPhrase: "Doing business under the name and style of Goldman Enterprise",
  email: "info@goldmanssupply.com",
  privacyEmail: "info@goldmanssupply.com",
  privacyEffectiveDate: "September 22, 2026",
  phone: "+63 927 957 1779",
  location: "Davao City, Philippines",
  streetAddress: "140 Brgy. 13-B Poblacion, De Guzman Street, Barrio Obrero",
  cityLine: "Davao City 8000, Philippines",
  address:
    "140 Brgy. 13-B Poblacion, De Guzman Street, Barrio Obrero, Davao City 8000, Philippines",
  website: resolveSiteUrl(),
  logoPath: "/logo.png",
  ogImagePath: "/og-image.jpg",
  /**
   * Leave social URLs empty until official profiles are confirmed.
   * Do not publish a D-U-N-S number unless management asks for it.
   */
  contactIsPlaceholder: false,
  phoneIsPlaceholder: false,
  social: {
    linkedin: "",
    facebook: "",
    x: "",
    instagram: "",
  },
  seo: {
    title: "Goldman’s Supply Corporation | Office Supplies & Construction Materials",
    description:
      "Goldman’s Supply Corporation is a Davao City-based supplier providing office supplies, equipment, construction materials, and related products to government agencies, private organizations, and institutional clients.",
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

export function hasVerifiedPhone(): boolean {
  return company.phone.trim().length > 0 && !company.phoneIsPlaceholder;
}

export function companyAddressLines(): string[] {
  return [company.streetAddress, company.cityLine];
}
