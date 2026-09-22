export type Service = {
  id: string;
  title: string;
  description: string;
  icon: "briefcase" | "boxes" | "handshake" | "sliders" | "headset" | "compass";
};

export const services: Service[] = [
  {
    id: "business-solutions",
    title: "Business Solutions",
    description:
      "Solutions designed to support everyday business operations and requirements.",
    icon: "briefcase",
  },
  {
    id: "supply-procurement",
    title: "Supply & Procurement",
    description:
      "Reliable sourcing and supply solutions tailored to organizational needs.",
    icon: "boxes",
  },
  {
    id: "operations-support",
    title: "Operations Support",
    description:
      "Support that helps organizations keep their day-to-day work running smoothly.",
    icon: "handshake",
  },
  {
    id: "custom-solutions",
    title: "Custom Solutions",
    description:
      "Flexible solutions designed around specific client requirements.",
    icon: "sliders",
  },
  {
    id: "support-maintenance",
    title: "Support & Maintenance",
    description:
      "Ongoing assistance to help clients maintain reliable operations.",
    icon: "headset",
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    description:
      "Practical guidance focused on identifying requirements and appropriate solutions.",
    icon: "compass",
  },
];
