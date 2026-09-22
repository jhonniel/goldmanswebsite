import { Handshake, ListChecks, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const reasons = [
  {
    title: "Reliability",
    text: "Focused on dependable solutions and professional service.",
    icon: ShieldCheck,
  },
  {
    title: "Quality",
    text: "We prioritize quality in every solution we deliver.",
    icon: Sparkles,
  },
  {
    title: "Practical Approach",
    text: "We look for solutions that fit the work and remain useful over time.",
    icon: ListChecks,
  },
  {
    title: "Partnership",
    text: "We aim to build lasting relationships with the businesses and organizations we serve.",
    icon: Handshake,
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="section-defer relative scroll-mt-24 py-14 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] tracking-[0.18em] text-gold-bright">
            OUR APPROACH
          </p>
          <h2 className="mt-4 text-[1.75rem] font-normal tracking-[-0.03em] text-pretty text-ink sm:text-4xl">
            Why Goldman’s Supply Corporation
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Goldman’s Supply Corporation is built around a calm, professional
            way of working: clear communication, considered solutions, and
            long-term support.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <article
                key={reason.title}
                className="surface-card relative h-full overflow-hidden rounded-2xl p-6"
              >
                <p className="font-serif text-4xl tracking-[0.08em] text-gold/35">
                  0{index + 1}
                </p>
                <div className="mt-6 inline-flex text-gold-bright">
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="mt-4 text-xl text-ink">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {reason.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
