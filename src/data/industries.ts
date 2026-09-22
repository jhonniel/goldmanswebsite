export type Industry = {
  id: string;
  title: string;
  description: string;
  icon: "government" | "education" | "corporate" | "construction" | "local";
};

export const industries: Industry[] = [
  {
    id: "government-agencies",
    title: "Government agencies",
    description:
      "Products and equipment for government offices and public requirements.",
    icon: "government",
  },
  {
    id: "educational-institutions",
    title: "Educational institutions",
    description:
      "Office, school, and related supplies for schools and other educational institutions.",
    icon: "education",
  },
  {
    id: "corporate-offices",
    title: "Corporate offices",
    description:
      "Office supplies, equipment, and related products for private and corporate workplaces.",
    icon: "corporate",
  },
  {
    id: "construction-maintenance",
    title: "Construction and maintenance operations",
    description:
      "Construction materials and maintenance supplies for operational and project needs.",
    icon: "construction",
  },
  {
    id: "local-organizations",
    title: "Local organizations",
    description:
      "Supplies and related products for local offices, groups, and institutional clients.",
    icon: "local",
  },
];
