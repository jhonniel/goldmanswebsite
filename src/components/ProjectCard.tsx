import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="surface-card flex h-full min-w-0 flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-soft">
        <img
          src={project.image}
          srcSet={`${project.image} 960w, ${project.image2x} 1600w`}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 360px"
          alt={project.alt}
          width={960}
          height={640}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <p className="absolute top-4 left-4 rounded-full border border-white bg-white px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-ink shadow-[0_8px_20px_-12px_rgb(31_28_24_/_0.55)]">
          {project.category}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl text-ink">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-paper-soft bg-paper-soft px-2.5 py-1 text-[11px] tracking-wide text-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        <a
          href={project.href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-gold-bright transition-colors hover:text-ink"
        >
          View Project
          <ArrowUpRight size={16} strokeWidth={1.7} />
        </a>
      </div>
    </article>
  );
}
