import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="section-defer relative py-14 sm:py-20">
      <div className="container-page">
        <div className="surface-card relative overflow-hidden rounded-[1.75rem] px-6 py-14 sm:px-12 sm:py-16">
          <Reveal className="relative max-w-2xl">
            <h2 className="text-[1.75rem] font-normal tracking-[-0.03em] text-pretty text-ink sm:text-5xl">
              Partner with Gold Mans Supply Corporation.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Whether you need a supply partner, business support, or a
              practical solution for your organization, Gold Mans Supply
              Corporation is ready to talk.
            </p>
            <a href="#contact" className="btn-primary mt-8 w-full sm:w-auto">
              Contact the Company
              <ArrowRight size={16} strokeWidth={1.8} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
