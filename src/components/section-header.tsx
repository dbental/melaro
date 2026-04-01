import type { ReactNode } from "react";

interface SectionHeaderProps {
  readonly label: string;
  readonly title: ReactNode;
  readonly description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <p className="text-[0.85rem] font-semibold text-primary uppercase tracking-[0.12em] mb-3">
        {label}
      </p>
      <h2 className="font-heading text-[clamp(2rem,3.5vw,2.75rem)] font-normal mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-[1.15rem] text-muted-foreground max-w-[540px] mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
