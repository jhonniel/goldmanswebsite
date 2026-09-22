import { company } from "../config/company";

type BrandMarkProps = {
  size?: "sm" | "md";
};

export default function BrandMark({ size = "md" }: BrandMarkProps) {
  const compact = size === "sm";

  return (
    <span className="flex min-w-0 items-center gap-2 sm:gap-3">
      <img
        src="/logo.svg"
        alt=""
        width={compact ? 34 : 40}
        height={compact ? 34 : 40}
        className={`shrink-0 rounded-[0.7rem] border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ${
          compact ? "size-[34px]" : "size-8 sm:size-10"
        }`}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-serif text-ink ${
            compact
              ? "text-[11px] tracking-[0.12em]"
              : "text-[10px] tracking-[0.12em] sm:text-[13px] sm:tracking-[0.16em]"
          }`}
        >
          {company.wordmarkPrimary}
        </span>
        <span
          className={`mt-1 text-gold-bright ${
            compact
              ? "text-[8px] tracking-[0.14em]"
              : "text-[7px] tracking-[0.12em] sm:text-[9px] sm:tracking-[0.18em]"
          }`}
        >
          {company.wordmarkSecondary}
        </span>
      </span>
    </span>
  );
}
