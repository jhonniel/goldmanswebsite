import { company } from "../config/company";
import Reveal from "./Reveal";

const profileCards = [
  {
    title: "Mission",
    text: company.mission,
  },
  {
    title: "Vision",
    text: company.vision,
  },
  {
    title: "Commitment to quality and reliable service",
    text: company.commitment,
  },
] as const;

const legalFacts = [
  { label: "Legal Company Name", value: company.legalName },
  { label: "Trade Name", value: company.tradeName },
  { label: "Legal Status", value: company.entityType },
  { label: "Chairman", value: company.chairman },
  { label: "Location", value: company.location },
] as const;

export default function About() {
  return (
    <section id="about" className="section-defer relative scroll-mt-24 py-14 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="text-[11px] tracking-[0.18em] text-gold-bright">
              ABOUT US
            </p>
            <h2 className="mt-4 max-w-md text-[1.75rem] font-normal tracking-[-0.03em] text-pretty text-ink sm:text-4xl">
              About {company.name}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
              {company.about}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {company.dbaPhrase}.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <dl className="surface-card grid gap-5 rounded-2xl p-6 text-sm sm:grid-cols-2">
              {legalFacts.map((fact) => (
                <div key={fact.label} className="min-w-0">
                  <dt className="text-[11px] tracking-[0.16em] text-gold-bright">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 break-words text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {profileCards.map((card) => (
            <article key={card.title} className="surface-card h-full rounded-2xl p-6">
              <h3 className="text-lg text-ink">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
