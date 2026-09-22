export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  image2x: string;
  alt: string;
  href: string;
};

export const projects: Project[] = [
  {
    id: "business-management-platform",
    title: "Business Operations Support",
    description:
      "A structured way to organize business information and day-to-day operations.",
    category: "Business",
    tags: ["Operations", "Management", "Service"],
    image: "/images/projects/business-platform.webp",
    image2x: "/images/projects/business-platform-1600.webp",
    alt: "Gold Mans Supply Corporation business operations support",
    href: "#contact",
  },
  {
    id: "supply-management-system",
    title: "Supply Coordination",
    description:
      "A centralized approach to managing products, inventory, and supply needs.",
    category: "Supply",
    tags: ["Supply", "Inventory", "Coordination"],
    image: "/images/projects/supply-system.webp",
    image2x: "/images/projects/supply-system-1600.webp",
    alt: "Gold Mans Supply Corporation supply coordination",
    href: "#contact",
  },
  {
    id: "customer-portal",
    title: "Client Service Access",
    description:
      "A convenient way for clients to access services and company information.",
    category: "Client Service",
    tags: ["Service", "Access", "Support"],
    image: "/images/projects/customer-portal.webp",
    image2x: "/images/projects/customer-portal-1600.webp",
    alt: "Gold Mans Supply Corporation client service access",
    href: "#contact",
  },
  {
    id: "digital-operations-platform",
    title: "Operations Improvement",
    description:
      "A practical approach designed to help organizations work more efficiently.",
    category: "Operations",
    tags: ["Process", "Efficiency", "Support"],
    image: "/images/projects/operations-platform.webp",
    image2x: "/images/projects/operations-platform-1600.webp",
    alt: "Gold Mans Supply Corporation operations improvement",
    href: "#contact",
  },
  {
    id: "advisory-workspace",
    title: "Business Advisory Support",
    description:
      "Guidance for mapping business needs and choosing the right solution.",
    category: "Consulting",
    tags: ["Planning", "Advisory", "Business"],
    image: "/images/projects/consulting.webp",
    image2x: "/images/projects/consulting-1600.webp",
    alt: "Gold Mans Supply Corporation business advisory support",
    href: "#contact",
  },
  {
    id: "enterprise-integration",
    title: "Coordinated Business Support",
    description:
      "Help connecting people, information, and everyday business workflows.",
    category: "Business Support",
    tags: ["Coordination", "Process", "Service"],
    image: "/images/projects/enterprise.webp",
    image2x: "/images/projects/enterprise-1600.webp",
    alt: "Gold Mans Supply Corporation coordinated business support",
    href: "#contact",
  },
];
