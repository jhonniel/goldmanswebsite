import { Briefcase, Building2, Mail, MapPin, type LucideIcon } from "lucide-react";
import { company } from "../config/company";
import Reveal from "./Reveal";

type CompanyFact = {
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
};

const facts: CompanyFact[] = [
  {
    label: "Company",
    value: company.legalName,
    icon: Building2,
  },
  {
    label: "What We Do",
    value: company.industry,
    icon: Briefcase,
  },
  {
    label: "Location",
    value: company.address,
    icon: MapPin,
  },
  {
    label: "Business Inquiries",
    value: company.email,
    href: `mailto:${company.email}`,
    icon: Mail,
  },
];

export default function CompanySnapshot() {
  return (
    <section aria-label="Company overview" className="relative pb-6 sm:pb-10">
      <div className="container-page">
        <Reveal>
          <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <article key={fact.label} className="surface-card min-w-0 rounded-2xl p-5">
                  <p className="flex items-center gap-2 text-[11px] tracking-[0.16em] text-gold-bright">
                    <Icon size={14} strokeWidth={1.7} />
                    {fact.label}
                  </p>
                  {fact.href ? (
                    <a
                      href={fact.href}
                      className="mt-3 block break-words text-sm leading-relaxed text-ink hover:underline"
                    >
                      {fact.value}
                    </a>
                  ) : (
                    <p className="mt-3 break-words text-sm leading-relaxed text-ink">
                      {fact.value}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
