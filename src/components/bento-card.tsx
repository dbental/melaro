import type { ReactNode } from "react";

interface BentoCardProps {
  readonly icon: ReactNode;
  readonly iconBg: string;
  readonly title: string;
  readonly description: string;
  readonly wide?: boolean;
}

export function BentoCard({ icon, iconBg, title, description, wide }: BentoCardProps) {
  return (
    <div
      className={`bg-card border border-card-border rounded-2xl p-8 card-glow ${
        wide ? "col-span-1 md:col-span-2" : ""
      }`}
    >
      <div
        className="w-[44px] h-[44px] rounded-[10px] flex items-center justify-center mb-5"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <h3 className="text-[1.15rem] font-bold mb-2">{title}</h3>
      <p className="text-[0.95rem] text-fg-muted leading-relaxed">{description}</p>
    </div>
  );
}
