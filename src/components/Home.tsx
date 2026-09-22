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
    <header id="home" className="scroll-mt-24 sm:scroll-mt-28">
      <div className="bg-gold-deep pt-[calc(5.25rem+env(safe-area-inset-top,0px))] pb-10 text-white sm:pt-[7.6rem] sm:pb-16 lg:pb-20">
        <div className="container-page grid min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)] lg:gap-10">
          <div className="min-w-0">
            <img
              src="/logo.png"
              alt=""
              width={72}
              height={72}
              className="mb-5 h-16 w-16 object-contain brightness-0 invert sm:h-20 sm:w-20 lg:hidden"
            />
            <p className="text-sm font-medium tracking-[0.04em] text-white/80">
              {company.name}
            </p>
            <h1 className="mt-3 max-w-3xl text-[1.65rem] leading-snug font-semibold tracking-[-0.02em] text-pretty text-white sm:text-5xl sm:leading-[1.15]">
              {company.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-pretty text-white/85 sm:text-lg">
              {company.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#services" className="btn-primary w-full bg-white text-gold-deep hover:bg-paper sm:w-auto">
                Products and Services
                <ArrowRight size={16} strokeWidth={1.8} />
              </a>
              <a
                href="#contact"
                className="btn-secondary w-full border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="mx-auto hidden w-full max-w-[16rem] lg:block">
            <img
              src="/logo.png"
              alt=""
              width={256}
              height={256}
              className="h-auto w-full object-contain brightness-0 invert"
            />
          </div>
        </div>
      </div>

      <div className="bg-paper py-12 sm:py-20">
        <div className="container-page">
          <p className="section-kicker">Industries We Serve</p>
          <h2 className="section-title max-w-2xl">
            Government, business, and institutional clients
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
            The company supplies products and equipment to government agencies,
            private organizations, and institutional clients.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industryIcons[industry.icon];
              return (
                <article key={industry.id} className="surface-card p-6">
                  <div className="inline-flex text-gold-bright">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{industry.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{industry.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-paper-soft bg-paper py-12 sm:py-20">
        <div className="container-page">
          <p className="section-kicker">Why Choose Us</p>
          <h2 className="section-title max-w-2xl">
            Dependable products, service, and delivery
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
            {company.commitment}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article key={reason.title} className="surface-card p-6">
                  <div className="inline-flex text-gold-bright">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{reason.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-paper-soft bg-paper py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="section-kicker">Contact Details</p>
            <h2 className="section-title">Get in touch</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed">
              For inquiries about supplies, equipment, or related requirements,
              contact Goldman’s Supply Corporation in Davao City.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-bright" />
                <span>
                  {companyAddressLines().map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-gold-bright" />
                <a href={`mailto:${company.email}`} className="break-all hover:underline">
                  {company.email}
                </a>
              </li>
              {hasVerifiedPhone() ? (
                <li className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 shrink-0 text-gold-bright" />
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:underline">
                    {company.phone}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
          <nav aria-label="Homepage sections">
            <p className="section-kicker">Explore</p>
            <h2 className="section-title">Company pages</h2>
            <ul className="mt-6 divide-y divide-paper-soft border-y border-paper-soft">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center justify-between py-3 text-sm font-medium text-ink hover:text-gold-bright"
                  >
                    {link.label}
                    <ArrowRight size={16} strokeWidth={1.7} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
