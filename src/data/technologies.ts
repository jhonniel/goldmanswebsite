export type Technology = {
  id: string;
  name: string;
  icon:
    | "supply"
    | "support"
    | "quality"
    | "coordination"
    | "solutions"
    | "service"
    | "planning"
    | "partnership";
};

export const technologies: Technology[] = [
  { id: "reliable-supply", name: "Reliable Supply", icon: "supply" },
  { id: "business-support", name: "Business Support", icon: "support" },
  { id: "quality-service", name: "Quality Service", icon: "quality" },
  { id: "client-coordination", name: "Client Coordination", icon: "coordination" },
  { id: "practical-solutions", name: "Practical Solutions", icon: "solutions" },
  { id: "ongoing-assistance", name: "Ongoing Assistance", icon: "service" },
  { id: "clear-planning", name: "Clear Planning", icon: "planning" },
  { id: "trusted-partnership", name: "Trusted Partnership", icon: "partnership" },
];
