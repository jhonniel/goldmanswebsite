import { company } from "../config/company";
import Reveal from "./Reveal";

const steps = [
  {
    title: "Understand the need",
    text: "We begin by listening closely to the requirement in front of us.",
  },
  {
    title: "Deliver the right solution",
    text: "We focus on practical solutions that fit the work, not the other way around.",
  },
  {
    title: "Build lasting relationships",
    text: "We aim to support clients with consistency, clarity, and care.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-defer relative scroll-mt-24 py-14 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="text-[11px] tracking-[0.18em] text-gold-bright">
              THE COMPANY
            </p>
            <h2 className="mt-4 max-w-md text-[1.75rem] font-normal tracking-[-0.03em] text-pretty text-ink sm:text-4xl">
              About Gold Mans Supply Corporation
            </h2>
            <dl className="surface-card mt-8 grid gap-4 rounded-2xl p-6 text-sm">
              <div>
                <dt className="text-[11px] tracking-[0.16em] text-gold-bright">
                  Legal Name
                </dt>
                <dd className="mt-1 text-ink">{company.legalName}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.16em] text-gold-bright">
                  Organization
                </dt>
                <dd className="mt-1 text-ink">{company.entityType}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.16em] text-gold-bright">
                  Focus
                </dt>
                <dd className="mt-1 text-ink">{company.industry}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.16em] text-gold-bright">
                  Location
                </dt>
                <dd className="mt-1 text-ink">{company.address}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              {company.about}
            </p>
            <p className="mt-6 border-l border-gold/40 pl-5 text-ink">
              {company.aboutSecondary}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="surface-card h-full rounded-2xl p-6">
              <p className="font-serif text-sm tracking-[0.2em] text-gold-bright">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-lg text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
