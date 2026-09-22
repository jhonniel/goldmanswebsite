import { ArrowRight } from "lucide-react";
import { company } from "../config/company";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <header
      id="home"
      className="relative overflow-hidden scroll-mt-24 pt-[calc(5.25rem+env(safe-area-inset-top,0px))] pb-10 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20"
    >
      <div className="container-page relative grid min-w-0 items-center gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
        <div className="min-w-0">
          <p className="glass-chip mb-5 inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-[10px] tracking-[0.12em] text-gold-bright sm:mb-6 sm:text-[11px] sm:tracking-[0.18em]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-bright" />
            Official Company Website
          </p>
          <h1 className="max-w-xl text-[1.75rem] leading-[1.15] font-normal tracking-[-0.03em] break-words text-ink sm:text-5xl lg:text-[3.2rem]">
            {company.name}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {company.description}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <a href="#about" className="btn-primary w-full sm:w-auto">
              About the Company
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
    </header>
  );
}
