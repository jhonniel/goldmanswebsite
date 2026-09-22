import {
  ArrowRight,
  Building2,
  GraduationCap,
  HardHat,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { company, companyAddressLines, hasVerifiedPhone } from "../config/company";
import { industries, type Industry } from "../data/industries";
import HeroVisual from "./HeroVisual";

const industryIcons: Record<Industry["icon"], LucideIcon> = {
  government: Landmark,
  education: GraduationCap,
  corporate: Building2,
  construction: HardHat,
  local: Users,
};

const reasons = [
  {
    title: "Dependable products",
    text: "We focus on supplying products and equipment that clients can rely on.",
    icon: ShieldCheck,
  },
  {
    title: "Responsive service",
    text: "Inquiries and requirements are handled with clear, professional follow-through.",
    icon: Users,
  },
  {
    title: "Timely delivery",
    text: "We are committed to delivering orders on time to the client.",
    icon: Truck,
  },
];

const pageLinks = [
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Products and Services" },
  { href: "#industries", label: "Industries We Serve" },
  { href: "#contact", label: "Contact Us" },
];

export default function Home() {
  return (
    <header
      id="home"
      className="relative overflow-hidden scroll-mt-24 pt-[calc(5.25rem+env(safe-area-inset-top,0px))] pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      <div className="container-page relative grid min-w-0 items-center gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
        <div className="min-w-0">
          <p className="glass-chip mb-5 inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-[10px] tracking-[0.12em] text-gold-bright sm:mb-6 sm:text-[11px] sm:tracking-[0.18em]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-bright" />
            Official Company Website
          </p>
          <p className="text-sm tracking-[0.04em] text-ink-muted">{company.name}</p>
          <h1 className="mt-2 max-w-xl text-[1.75rem] leading-[1.15] font-normal tracking-[-0.03em] break-words text-ink sm:text-5xl lg:text-[3.2rem]">
            {company.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {company.description}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <a href="#services" className="btn-primary w-full sm:w-auto">
              Products and Services
              <ArrowRight size={16} strokeWidth={1.8} />
            </a>
            <a href="#contact" className="btn-secondary w-full sm:w-auto">
              Contact Us
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-[20rem] sm:max-w-[28rem] lg:max-w-none">
          <HeroVisual />
        </div>
      </div>

      <div className="container-page mt-14 sm:mt-20">
        <p className="text-[11px] tracking-[0.18em] text-gold-bright">
          INDUSTRIES WE SERVE
        </p>
        <h2 className="mt-3 max-w-2xl text-[1.5rem] font-normal tracking-[-0.03em] text-ink sm:text-3xl">
          Industries We Serve
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
          The company supplies products and equipment to government agencies,
          private organizations, and institutional clients.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industryIcons[industry.icon];
            return (
              <article key={industry.id} className="surface-card rounded-2xl p-6">
                <div className="inline-flex text-gold-bright">
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="mt-4 text-lg text-ink">{industry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {industry.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="container-page mt-14 sm:mt-20">
        <p className="text-[11px] tracking-[0.18em] text-gold-bright">
          WHY CHOOSE US
        </p>
        <h2 className="mt-3 max-w-2xl text-[1.5rem] font-normal tracking-[-0.03em] text-ink sm:text-3xl">
          Dependable products, service, and delivery
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
          {company.commitment}
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <article key={reason.title} className="surface-card rounded-2xl p-6">
                <div className="inline-flex text-gold-bright">
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="mt-4 text-lg text-ink">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {reason.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="container-page mt-14 sm:mt-20">
        <div className="surface-card grid gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-gold-bright">
              CONTACT DETAILS
            </p>
            <h2 className="mt-3 text-[1.5rem] font-normal tracking-[-0.03em] text-ink sm:text-3xl">
              Get in touch
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
              For inquiries about supplies, equipment, or related requirements,
              contact Goldman’s Supply Corporation in Davao City.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex min-w-0 items-start gap-3">
                <MapPin size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-gold-bright" />
                <span className="text-sm text-ink">
                  {companyAddressLines().map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex min-w-0 items-start gap-3">
                <Mail size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-gold-bright" />
                <a
                  href={`mailto:${company.email}`}
                  className="break-all text-sm text-ink hover:underline"
                >
                  {company.email}
                </a>
              </li>
              {hasVerifiedPhone() ? (
                <li className="flex min-w-0 items-start gap-3">
                  <Phone size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-gold-bright" />
                  <span className="text-sm text-ink">{company.phone}</span>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.18em] text-gold-bright">
              EXPLORE
            </p>
            <h2 className="mt-3 text-[1.5rem] font-normal tracking-[-0.03em] text-ink sm:text-3xl">
              More about the company
            </h2>
            <nav aria-label="Homepage sections" className="mt-6 grid gap-3">
              {pageLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-2xl border border-paper-soft bg-white/70 px-4 py-3 text-sm text-ink transition-colors hover:border-gold/40 hover:text-gold-bright"
                >
                  {link.label}
                  <ArrowRight size={16} strokeWidth={1.7} />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
