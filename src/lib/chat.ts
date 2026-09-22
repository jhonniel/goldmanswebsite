import { company } from "../config/company";
import { projects } from "../data/projects";
import { services } from "../data/services";
import { technologies } from "../data/technologies";

export const chatSuggestions = [
  "What does the company do?",
  "What services do you offer?",
  "How can I contact you?",
  "Send a message",
] as const;

type DayPart = "morning" | "afternoon" | "evening";

const valuesOnSite = [
  {
    title: "Integrity",
    text: "We believe in honest and professional relationships.",
  },
  {
    title: "Quality",
    text: "We focus on delivering solutions that meet the needs of our clients.",
  },
  {
    title: "Improvement",
    text: "We look for better ways to meet client needs.",
  },
  {
    title: "Commitment",
    text: "We remain committed to the people and organizations we work with.",
  },
] as const;

const reasonsOnSite = [
  {
    title: "Reliability",
    text: "Focused on dependable solutions and professional service.",
  },
  {
    title: "Quality",
    text: "We prioritize quality in every solution we deliver.",
  },
  {
    title: "Practical Approach",
    text: "We look for solutions that fit the work and remain useful over time.",
  },
  {
    title: "Partnership",
    text: "We aim to build lasting relationships with the businesses and organizations we serve.",
  },
] as const;

const approachOnSite =
  "Gold Mans Supply Corporation is built around a calm, professional way of working: clear communication, considered solutions, and long-term support.";

const stepsOnSite = [
  "Understand the need: we begin by listening closely to the requirement in front of us.",
  "Deliver the right solution: we focus on practical solutions that fit the work, not the other way around.",
  "Build lasting relationships: we aim to support clients with consistency, clarity, and care.",
] as const;

type Topic = {
  keys: string[];
  answer: string;
};

const topics: Topic[] = [
  {
    keys: [
      "who are you",
      "about the company",
      "about company",
      "what do you do",
      "what does the company",
      "what is gold mans",
      "who is gold mans",
      "company name",
      "legal name",
      "tell me about",
      "who is the company",
    ],
    answer: `${company.about} ${company.aboutSecondary}`,
  },
  {
    keys: ["service", "services", "offer", "what can you", "what do you provide"],
    answer: `The Services section of this website lists: ${services
      .map((item) => item.title)
      .join(", ")}.`,
  },
  {
    keys: [
      "contact",
      "email",
      "phone",
      "call",
      "reach",
      "get in touch",
      "address",
      "location",
      "where",
    ],
    answer: `The Contact section of this website lists ${company.email}, ${company.phone}, and ${company.address}. You can also send a message here.`,
  },
  {
    keys: ["value", "values"],
    answer: `The company values listed on this website are ${valuesOnSite
      .map((item) => `${item.title}: ${item.text}`)
      .join(" ")}`,
  },
  {
    keys: ["why us", "why gold", "choose you", "our approach", "approach"],
    answer: `${approachOnSite} The website also lists ${reasonsOnSite
      .map((item) => `${item.title}: ${item.text}`)
      .join(" ")}`,
  },
  {
    keys: ["project", "projects", "work", "portfolio", "featured"],
    answer: `The Featured Projects section of this website currently shows: ${projects
      .map((item) => `${item.title} (${item.category})`)
      .join(", ")}.`,
  },
  {
    keys: ["industry", "focus", "what we do", "supply solutions", "business and supply"],
    answer: `${company.name} is listed on this website as focusing on ${company.industry}. ${company.description}`,
  },
  {
    keys: ["how you work", "known for", "strength"],
    answer: `This website lists what the company is known for: ${technologies
      .map((item) => item.name)
      .join(", ")}.`,
  },
  {
    keys: ["how you start", "process", "steps", "how do you work"],
    answer: `The About section of this website describes this approach: ${stepsOnSite.join(" ")}`,
  },
  {
    keys: ["cookie", "cookies", "privacy"],
    answer:
      "This website uses essential cookies to keep the site working. Optional analytics cookies are used only if they are accepted. You can read the Cookie Policy from the footer of this website.",
  },
  {
    keys: ["entity", "corporation", "organization type"],
    answer: `This website lists the organization as a ${company.entityType} under the legal name ${company.legalName}.`,
  },
];

export function manilaDayPart(): DayPart {
  const hourPart = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    hourCycle: "h23",
  })
    .formatToParts(new Date())
    .find((part) => part.type === "hour");

  const hour = Number(hourPart?.value ?? "0");

  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "evening";
}

export function manilaGreeting(): string {
  const part = manilaDayPart();
  if (part === "morning") return "Good morning";
  if (part === "afternoon") return "Good afternoon";
  return "Good evening";
}

export function buildWelcomeMessage(): string {
  return `${manilaGreeting()}. You can ask about Gold Mans Supply Corporation, or send a message with any information you would like the company to receive.`;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const greetingPattern =
  /^(hi|hello|hey|howdy|good morning|good afternoon|good evening|good day|morning|afternoon|evening)( there)?$/;

export function isSendRequest(text: string): boolean {
  const value = normalize(text);
  return (
    value === "send a message" ||
    value === "send message" ||
    value === "send info" ||
    value === "send information" ||
    value === "leave a message" ||
    /\b(send|share|submit|forward)\b.{0,40}\b(message|info|information|inquiry|details)\b/.test(
      value,
    )
  );
}

export function isGreeting(text: string): boolean {
  return greetingPattern.test(normalize(text));
}

function stripLeadingGreeting(value: string): string {
  return value
    .replace(
      /^(hi|hello|hey|howdy|good morning|good afternoon|good evening|good day|morning|afternoon|evening)( there)?[,!. ]+/i,
      "",
    )
    .trim();
}

function matchNamedContent(value: string): string | null {
  const service = services.find((item) => {
    const name = item.title.toLowerCase();
    return value.includes(name) || value.includes(name.replace("&", "and"));
  });
  if (service) {
    return `${service.title} is listed in the Services section of this website: ${service.description}`;
  }

  const project = projects.find((item) => {
    const title = item.title.toLowerCase();
    const category = item.category.toLowerCase();
    return value.includes(title) || (value.includes(category) && value.includes("project"));
  });
  if (project) {
    return `${project.title} is shown in Featured Projects on this website. ${project.description}`;
  }

  const valueItem = valuesOnSite.find((item) =>
    value.includes(item.title.toLowerCase()),
  );
  if (valueItem) {
    return `${valueItem.title} is listed under company values on this website: ${valueItem.text}`;
  }

  const reason = reasonsOnSite.find((item) =>
    value.includes(item.title.toLowerCase()),
  );
  if (reason) {
    return `${reason.title} is listed on this website: ${reason.text}`;
  }

  const strength = technologies.find((item) =>
    value.includes(item.name.toLowerCase()),
  );
  if (strength) {
    return `${strength.name} is listed on this website under what the company is known for.`;
  }

  return null;
}

function matchTopics(value: string): string | null {
  const scored = topics
    .map((topic) => ({
      topic,
      score: topic.keys.reduce(
        (total, key) => (value.includes(key) ? total + key.length : total),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score);

  if (scored[0] && scored[0].score > 0) {
    return scored[0].topic.answer;
  }

  return null;
}

export function answerCompanyQuestion(text: string): string | null {
  const value = normalize(text);
  if (!value) return null;

  if (isGreeting(value)) {
    return buildWelcomeMessage();
  }

  const rest = stripLeadingGreeting(value);
  const query = rest || value;
  const greeted = rest.length > 0 && rest !== value;

  const named = matchNamedContent(query);
  const topical = named ?? matchTopics(query);
  if (!topical) return null;

  if (greeted) {
    return `${manilaGreeting()}. ${topical}`;
  }

  return topical;
}

export function unknownAnswer(): string {
  return "That detail is not listed on this website. I can only answer from the information published here. You can send a message with your question or any other information, and Gold Mans Supply Corporation can follow up.";
}

export function composePrompt(): string {
  return "Please share your name, email, and the information you would like Gold Mans Supply Corporation to receive.";
}

export function replyPauseMs(text: string, reduce: boolean | null): number {
  if (reduce) return 0;
  return Math.min(700, 220 + Math.min(text.length, 80) * 4);
}

export function replyTypeMs(text: string): number {
  if (text.length > 180) return 16;
  if (text.length > 80) return 20;
  return 26;
}
