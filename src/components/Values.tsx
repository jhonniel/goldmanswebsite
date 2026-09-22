import Reveal from "./Reveal";

const values = [
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
];

export default function Values() {
  return (
    <section className="section-defer relative py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <p className="text-[11px] tracking-[0.18em] text-gold-bright">
            COMPANY VALUES
          </p>
          <h2 className="mt-4 text-[1.75rem] font-normal tracking-[-0.03em] text-ink sm:text-4xl">
            What We Value
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <article key={value.title} className="surface-card h-full rounded-2xl px-6 py-8">
              <h3 className="text-lg text-ink">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {value.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
