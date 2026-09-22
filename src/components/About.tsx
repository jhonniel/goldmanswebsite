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
    <section id="about" className="section-defer relative scroll-mt-24 bg-white py-12 sm:scroll-mt-28 sm:py-20">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="section-kicker">About Us</p>
            <h2 className="section-title max-w-md">
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
            <dl className="surface-card grid gap-5 p-5 text-sm sm:grid-cols-2 sm:p-6">
              {legalFacts.map((fact) => (
                <div key={fact.label} className="min-w-0">
                  <dt className="text-xs font-semibold tracking-[0.12em] text-gold-bright uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 break-words text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
          {profileCards.map((card) => (
            <article key={card.title} className="surface-card h-full p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-ink">{card.title}</h3>
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
