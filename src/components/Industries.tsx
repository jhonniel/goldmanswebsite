import {
  Building2,
  GraduationCap,
  HardHat,
  Landmark,
  Users,
  type LucideIcon,
} from "lucide-react";
import { industries, type Industry } from "../data/industries";
import Reveal from "./Reveal";

const icons: Record<Industry["icon"], LucideIcon> = {
  government: Landmark,
  education: GraduationCap,
  corporate: Building2,
  construction: HardHat,
  local: Users,
};

export default function Industries() {
  return (
    <section
      id="industries"
      className="section-defer relative scroll-mt-24 bg-white py-12 sm:scroll-mt-28 sm:py-20"
    >
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="section-kicker">Industries We Serve</p>
          <h2 className="section-title">
            Industries We Serve
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Goldman’s Supply Corporation supplies products and equipment to
            government agencies, private organizations, and institutional
            clients. Named clients and project details are published only when
            the company has permission or the work is already public.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => {
            const Icon = icons[industry.icon];
            return (
              <article
                key={industry.id}
                className="surface-card h-full p-6"
              >
                <div className="icon-glass mb-5 inline-flex size-11 items-center justify-center text-gold-bright">
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <h3 className="text-lg font-semibold text-ink">{industry.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {industry.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
