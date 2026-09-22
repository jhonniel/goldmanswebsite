export type Service = {
  id: string;
  title: string;
  description: string;
  icon:
    | "office"
    | "computer"
    | "construction"
    | "systems"
    | "mobile"
    | "digital";
};

export const services: Service[] = [
  {
    id: "office-school-general-supplies",
    title: "Office, school and general supplies",
    description:
      "Everyday office, school, and general supplies for government, business, and institutional use.",
    icon: "office",
  },
  {
    id: "computer-equipment",
    title: "Computer equipment and accessories",
    description:
      "Computers and related accessories for offices, schools, and other workplaces.",
    icon: "computer",
  },
  {
    id: "construction-maintenance-supplies",
    title: "Construction and maintenance supplies",
    description:
      "Construction materials and maintenance supplies for operational and project needs.",
    icon: "construction",
  },
  {
    id: "information-systems-web-development",
    title: "Information systems and web development",
    description:
      "Practical web systems and information systems tailored to client requirements.",
    icon: "systems",
  },
  {
    id: "mobile-application-development",
    title: "Mobile application development",
    description:
      "Mobile applications designed to support government, business, and community work.",
    icon: "mobile",
  },
  {
    id: "digital-government-business-solutions",
    title: "Digital government and business solutions",
    description:
      "Digital solutions that help government agencies and businesses operate more efficiently.",
    icon: "digital",
  },
];
