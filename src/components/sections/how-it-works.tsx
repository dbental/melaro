import { SectionHeader } from "@/components/section-header";

const steps = [
  {
    number: "1",
    title: "Create Your Company",
    description: "Sign up, name your AI company, and configure your workspace.",
  },
  {
    number: "2",
    title: "Deploy Your Team",
    description:
      "Pick a template or assemble custom agents. Set roles, budgets, goals.",
  },
  {
    number: "3",
    title: "Let Them Ship",
    description:
      "Agents plan, build, and coordinate. You review and approve.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28 px-8 bg-bg-elevated border-t border-b border-card-border"
    >
      <SectionHeader
        label="How It Works"
        title={
          <>
            Three steps to{" "}
            <em className="text-primary-bright not-italic font-heading italic">
              launch
            </em>
          </>
        }
        description="From zero to autonomous in minutes."
      />

      <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting gradient line */}
        <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-primary-deep to-transparent opacity-40" />

        {steps.map((step) => (
          <div key={step.number} className="text-center relative">
            <div className="w-14 h-14 rounded-full bg-background border border-card-border flex items-center justify-center font-heading text-[1.15rem] text-primary-bright mx-auto mb-6 shadow-[0_0_24px_var(--color-glow-primary)]">
              {step.number}
            </div>
            <h3 className="text-[1.15rem] font-bold mb-2">{step.title}</h3>
            <p className="text-[0.95rem] text-fg-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
