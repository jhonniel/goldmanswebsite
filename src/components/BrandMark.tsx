import { company } from "../config/company";

type BrandMarkProps = {
  size?: "sm" | "md";
};

export default function BrandMark({ size = "md" }: BrandMarkProps) {
  const compact = size === "sm";

  return (
    <span className="flex min-w-0 items-center gap-2 sm:gap-3">
      <img
        src="/logo.png"
        alt=""
        width={compact ? 40 : 48}
        height={compact ? 40 : 48}
        className={`shrink-0 object-contain ${
          compact ? "size-10" : "size-10 sm:size-12"
        }`}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`truncate font-semibold text-ink ${
            compact
              ? "text-[11px] tracking-[0.12em]"
              : "text-xs tracking-[0.1em] sm:text-[13px] sm:tracking-[0.16em]"
          }`}
        >
          {company.wordmarkPrimary}
        </span>
        <span
          className={`mt-1 truncate text-gold-bright ${
            compact
              ? "text-[8px] tracking-[0.14em]"
              : "text-[8px] tracking-[0.1em] sm:text-[9px] sm:tracking-[0.18em]"
          }`}
        >
          {company.wordmarkSecondary}
        </span>
      </span>
    </span>
  );
}
