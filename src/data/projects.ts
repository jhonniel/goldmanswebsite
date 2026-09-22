/**
 * Named projects, clients, values, and photographs are published only
 * when the company has permission or the work is already public.
 * Until then, the site uses Industries We Serve.
 */
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

export const projects: Project[] = [];
