import { company } from "../config/company";
import { services } from "../data/services";
import Reveal from "./Reveal";
import { serviceIcons } from "./serviceIcons";

export default function Services() {
  return (
    <section id="services" className="section-defer relative scroll-mt-24 py-14 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] tracking-[0.18em] text-gold-bright">
            PRODUCTS AND SERVICES
          </p>
          <h2 className="mt-4 text-[1.75rem] font-normal tracking-[-0.03em] text-pretty text-ink sm:text-4xl">
            Products and Services
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            {company.name} provides supplies, equipment, and digital solutions
            for government agencies, businesses, and communities.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article
                id={service.id}
                key={service.id}
                className="surface-card h-full scroll-mt-28 rounded-2xl p-6"
              >
                <div className="icon-glass mb-5 inline-flex size-11 items-center justify-center rounded-xl text-gold-bright">
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <h3 className="text-lg text-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
