import Link from "next/link";

interface PricingCardProps {
  readonly name: string;
  readonly price: string;
  readonly period?: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly featured?: boolean;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  ctaLabel,
  ctaHref,
  featured,
}: PricingCardProps) {
  return (
    <div
      className={`bg-card border rounded-2xl px-8 py-10 flex flex-col transition-all duration-250 hover:-translate-y-[3px] relative ${
        featured
          ? "border-primary-deep bg-gradient-to-b from-[rgba(124,58,237,0.06)] to-card shadow-[0_0_50px_var(--color-glow-primary),0_0_80px_var(--color-glow-accent)]"
          : "border-card-border"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-br from-primary-deep to-accent-deep text-white font-bold px-5 py-1 rounded-full text-[0.72rem]">
          Most Popular
        </span>
      )}

      <p className="font-heading text-[1.15rem] mb-2">{name}</p>
      <p className="text-[2.75rem] font-extrabold tracking-tight tabular-nums mb-1">
        {price}
        {period && <span className="text-base font-normal text-fg-dim">{period}</span>}
      </p>
      <p className="text-[0.85rem] text-fg-dim mb-8">{description}</p>

      <ul className="mb-8 flex-1 space-y-1">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-[0.6rem] py-[0.45rem] text-[0.88rem] text-fg-muted"
          >
            <span className="w-4 h-4 rounded-full bg-[rgba(167,139,250,0.08)] border-[1.5px] border-primary shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className={`w-full text-center rounded-[10px] px-6 py-[0.65rem] text-[0.88rem] font-semibold transition-all ${
          featured
            ? "bg-gradient-to-br from-primary-deep to-accent-deep text-white btn-glow"
            : "bg-bg-surface text-fg-muted border border-card-border hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
        }`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
