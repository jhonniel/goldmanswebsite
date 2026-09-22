import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" className="section-defer relative scroll-mt-24 py-14 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] tracking-[0.18em] text-gold-bright">
            Explore selected solutions and projects from Goldman’s Supply
            Corporation.
          </p>
          <h2 className="mt-4 text-[1.75rem] font-normal tracking-[-0.03em] text-ink sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Selected work that reflects how Goldman’s Supply Corporation
            supports businesses through supply, service, and practical
            solutions.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
