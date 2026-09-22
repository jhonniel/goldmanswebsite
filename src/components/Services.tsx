import { company } from "../config/company";
import { services } from "../data/services";
import Reveal from "./Reveal";
import { serviceIcons } from "./serviceIcons";

export default function Services() {
  return (
    <section id="services" className="section-defer relative scroll-mt-24 bg-paper py-12 sm:scroll-mt-28 sm:py-20">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="section-kicker">Products and Services</p>
          <h2 className="section-title">
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
                className="surface-card h-full scroll-mt-28 p-6"
              >
                <div className="icon-glass mb-5 inline-flex size-11 items-center justify-center text-gold-bright">
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
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
