import { company, hasVerifiedPhone } from "../config/company";
import { industries } from "../data/industries";
import { news, newsCategoryLabel } from "../data/news";
import { services } from "../data/services";

export const chatSuggestions = [
  "What does the company do?",
  "What products do you offer?",
  "How can I contact you?",
  "Send a message",
] as const;

type DayPart = "morning" | "afternoon" | "evening";

const reasonsOnSite = [
  {
    title: "Dependable products",
    text: "We focus on supplying products and equipment that clients can rely on.",
  },
  {
    title: "Responsive service",
    text: "Inquiries and requirements are handled with clear, professional follow-through.",
  },
  {
    title: "Timely delivery",
    text: "We are committed to delivering orders on time to the client.",
  },
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
      "about us",
      "what do you do",
      "what does the company",
      "what is gold mans",
      "what is goldman",
      "who is gold mans",
      "who is goldman",
      "company name",
      "legal name",
      "tell me about",
      "who is the company",
    ],
    answer: `${company.about} The legal company name is ${company.legalName}. The trade name is ${company.tradeName}.`,
  },
  {
    keys: ["trade name", "dba", "doing business", "goldman enterprise"],
    answer: `The trade name listed on this website is ${company.tradeName}. The legal company name is ${company.legalName}.`,
  },
  {
    keys: ["chairman", "jonathan", "who runs", "who heads"],
    answer: `The chairman listed on this website is ${company.chairman}.`,
  },
  {
    keys: ["mission"],
    answer: `The mission listed on this website is: ${company.mission}`,
  },
  {
    keys: ["vision"],
    answer: `The vision listed on this website is: ${company.vision}`,
  },
  {
    keys: ["commitment"],
    answer: `The commitment listed on this website is: ${company.commitment}`,
  },
  {
    keys: [
      "service",
      "services",
      "product",
      "products",
      "offer",
      "what can you",
      "what do you provide",
      "what do you sell",
      "what do you supply",
    ],
    answer: `The Products and Services section of this website lists: ${services
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
    answer: `The Contact section of this website lists ${company.legalName}, ${company.address}, and ${company.email}${hasVerifiedPhone() ? `, ${company.phone}` : ""}. You can also send a message here.`,
  },
  {
    keys: ["why us", "why gold", "choose you", "why choose"],
    answer: `The Why Choose Us section of this website lists: ${reasonsOnSite
      .map((item) => `${item.title}: ${item.text}`)
      .join(" ")} ${company.commitment}`,
  },
  {
    keys: ["project", "projects", "work", "portfolio", "featured"],
    answer: `This website does not list named projects or clients. The Industries We Serve section lists: ${industries
      .map((item) => item.title)
      .join(", ")}.`,
  },
  {
    keys: [
      "industry",
      "industries",
      "customers",
      "clients",
      "who do you serve",
      "who you serve",
      "government",
      "institutional",
    ],
    answer: `The Industries We Serve section of this website lists: ${industries
      .map((item) => item.title)
      .join(", ")}. ${company.description}`,
  },
  {
    keys: [
      "news",
      "achievement",
      "achievements",
      "award",
      "awards",
      "social media",
      "acknowledg",
      "update",
      "updates",
    ],
    answer:
      news.length === 0
        ? "The News section of this website is for company achievements and social media acknowledgements, with photographs when available. No news has been published yet."
        : `The News section of this website currently lists: ${news
            .map((item) => `${item.title} (${newsCategoryLabel[item.category]})`)
            .join(", ")}.`,
  },
  {
    keys: ["cookie", "cookies", "privacy"],
    answer: `The Privacy Policy on this website is effective ${company.privacyEffectiveDate}. Inquiries and privacy requests can be sent to ${company.email}. The listed telephone number is ${company.phone}. You can open the Privacy Policy from the footer of this website.`,
  },
  {
    keys: ["entity", "corporation", "organization type"],
    answer: `This website lists the legal status as a ${company.entityType}. The legal company name is ${company.legalName}, and the trade name is ${company.tradeName}.`,
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
  return `${manilaGreeting()}. You can ask about Goldman’s Supply Corporation, or send a message with any information you would like the company to receive.`;
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
    return `${service.title} is listed in the Products and Services section of this website: ${service.description}`;
  }

  const industry = industries.find((item) => value.includes(item.title.toLowerCase()));
  if (industry) {
    return `${industry.title} is listed in Industries We Serve on this website: ${industry.description}`;
  }

  const reason = reasonsOnSite.find((item) =>
    value.includes(item.title.toLowerCase()),
  );
  if (reason) {
    return `${reason.title} is listed in Why Choose Us on this website: ${reason.text}`;
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
  return "That detail is not listed on this website. I can only answer from the information published here. You can send a message with your question or any other information, and Goldman’s Supply Corporation can follow up.";
}

export function composePrompt(): string {
  return "Please share your name, email, and the information you would like Goldman’s Supply Corporation to receive.";
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
