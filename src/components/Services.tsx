import {
  Boxes,
  Briefcase,
  Compass,
  Handshake,
  Headset,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { services, type Service } from "../data/services";
import Reveal from "./Reveal";

const icons: Record<Service["icon"], LucideIcon> = {
  briefcase: Briefcase,
  boxes: Boxes,
  handshake: Handshake,
  sliders: SlidersHorizontal,
  headset: Headset,
  compass: Compass,
};

export default function Services() {
  return (
    <section id="services" className="section-defer relative scroll-mt-24 py-14 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] tracking-[0.18em] text-gold-bright">
            COMPANY SERVICES
          </p>
          <h2 className="mt-4 text-[1.75rem] font-normal tracking-[-0.03em] text-pretty text-ink sm:text-4xl">
            What the Company Provides
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Gold Mans Supply Corporation offers a flexible range of business
            and supply solutions that can be adapted as your requirements
            become clearer.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <article key={service.id} className="surface-card h-full rounded-2xl p-6">
                <div className="icon-glass mb-5 inline-flex size-11 items-center justify-center rounded-xl text-gold-bright">
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <h3 className="text-xl text-ink">{service.title}</h3>
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
