export type NewsCategory = "achievement" | "social";

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  category: NewsCategory;
  description: string;
  image: string;
  imageAlt: string;
  source?: string;
  href?: string;
};

export const newsCategoryLabel: Record<NewsCategory, string> = {
  achievement: "Achievement",
  social: "Social media",
};

/**
 * Add company achievements and social-media acknowledgements here.
 * Put photographs in /public/images/news/.
 * Do not invent awards, clients, or acknowledgements.
 */
export const news: NewsItem[] = [
  {
    id: "iligan-basyang-relief",
    title: "Iligan City thanks Goldman’s Supply Corporation for Basyang relief support",
    date: "2026-09-22",
    category: "social",
    description:
      "The City of Iligan publicly thanked Republic Cement and Goldman’s Supply Corporation, Zoomlion Heavy Industry Philippines Inc., and Golden Tail Development Corporation, a group of companies from Davao, for relief goods sent to families affected by Tropical Storm Basyang. The Local Government Unit of Libona helped transport the goods.",
    image: "/images/news/iligan-basyang-relief.jpg",
    imageAlt:
      "Relief goods being unloaded during Tropical Storm Basyang operations, from a public thank-you post by Iligan City CDRRMO.",
    source: "Iligan City CDRRMO",
    href: "https://www.facebook.com/share/p/1CzEC2gP4G/",
  },
  {
    id: "lgu-matalam",
    title: "Goldman’s Supply Corporation",
    date: "2026-09-22",
    category: "social",
    description:
      "The Local Government Unit of Matalam publicly acknowledged Goldman’s Supply Corporation.",
    image: "/images/news/lgu-matalam.jpg",
    imageAlt:
      "Goldman’s Supply Corporation representatives with the company mark, photographed with dump trucks in a post by the Local Government Unit of Matalam.",
    source: "Local Government Unit of Matalam",
    href: "https://www.facebook.com/share/p/14sE67gqbkw/",
  },
  {
    id: "nia-cotabato-imo-steel-sheet-pile",
    title:
      "Post Qualification of National Irrigation Administration Cotabato IMO",
    date: "2026-09-22",
    category: "achievement",
    description:
      "Goldman’s Supply Corporation announced its post qualification with the National Irrigation Administration Cotabato IMO for the supply and delivery of steel sheet pile.",
    image: "/images/news/nia-cotabato-imo-steel-sheet-pile.jpg",
    imageAlt:
      "Goldman’s Supply Corporation office in Davao City, posted with the National Irrigation Administration Cotabato IMO steel sheet pile post-qualification announcement.",
    href: "https://www.facebook.com/share/p/19Jjr4RQ7q/",
  },
  {
    id: "iso-9001-2015-stage-1",
    title: "ISO 9001:2015 — Successful Stage 1 Certification Audit",
    date: "2026-09-22",
    category: "achievement",
    description:
      "Goldman’s Supply Corporation successfully completed its ISO 9001:2015 Stage 1 certification audit. The company proceeds to the Stage 2 audit.",
    image: "/images/news/iso-9001-2015-stage-1.jpg",
    imageAlt:
      "Goldman’s Supply Corporation team with a message of congratulations after the ISO 9001:2015 Stage 1 certification audit, acknowledged by TÜV NORD Philippines.",
    source: "TÜV NORD Philippines",
    href: "https://www.facebook.com/share/p/1c9ivX3ZU9/",
  },
];
