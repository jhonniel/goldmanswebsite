import {
  Boxes,
  Briefcase,
  ClipboardCheck,
  ClipboardList,
  HeartHandshake,
  Headset,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { technologies, type Technology } from "../data/technologies";
import Reveal from "./Reveal";

const icons: Record<Technology["icon"], LucideIcon> = {
  supply: Boxes,
  support: Briefcase,
  quality: ShieldCheck,
  coordination: Users,
  solutions: ClipboardList,
  service: Headset,
  planning: ClipboardCheck,
  partnership: HeartHandshake,
};

export default function Technology() {
  return (
    <section id="technology" className="section-defer relative scroll-mt-24 py-14 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] tracking-[0.18em] text-gold-bright">
            HOW WE WORK
          </p>
          <h2 className="mt-4 text-[1.75rem] font-normal tracking-[-0.03em] text-pretty text-ink sm:text-4xl">
            What the Company Is Known For
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Goldman’s Supply Corporation focuses on dependable service, clear
            communication, and practical solutions that support everyday
            business needs.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {technologies.map((item) => {
            const Icon = icons[item.icon];
            return (
              <article
                key={item.id}
                className="surface-card flex h-full min-w-0 flex-col items-start gap-4 rounded-2xl p-4 sm:p-5"
              >
                <span className="icon-glass inline-flex size-10 items-center justify-center rounded-full text-gold-bright">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <h3 className="text-sm leading-snug break-words text-ink sm:text-base">
                  {item.name}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
