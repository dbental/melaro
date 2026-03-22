import type { ReactNode } from "react";

interface SectionHeaderProps {
  readonly label: string;
  readonly title: ReactNode;
  readonly description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <p className="text-[0.78rem] font-semibold text-primary uppercase tracking-[0.14em] mb-3">
        {label}
      </p>
      <h2 className="font-heading text-[clamp(2rem,3.5vw,2.75rem)] font-normal mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-[1.05rem] text-fg-muted max-w-[520px] mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
