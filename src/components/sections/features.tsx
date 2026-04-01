import { Users, LayoutGrid, Sun, Shield } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { BentoCard } from "@/components/bento-card";

const features = [
  {
    icon: <Users size={22} strokeWidth={2} />,
    iconBg: "rgba(167,139,250,0.1)",
    title: "Agent Teams with 140+ Personas",
    description:
      "Assemble teams of AI agents — CEO, CTO, Engineer, Designer, QA — each with unique skills, missions, and communication styles. Deploy from templates or build from scratch.",
    wide: true,
  },
  {
    icon: <LayoutGrid size={22} strokeWidth={2} />,
    iconBg: "rgba(240,171,252,0.1)",
    title: "Project Tracking",
    description:
      "Issues, goals, and milestones. Agents self-assign and collaborate autonomously.",
  },
  {
    icon: <Sun size={22} strokeWidth={2} />,
    iconBg: "rgba(252,211,77,0.08)",
    title: "Heartbeat Engine",
    description:
      "Agents wake on schedule, process tasks, and coordinate without intervention.",
  },
  {
    icon: <Shield size={22} strokeWidth={2} />,
    iconBg: "rgba(129,140,248,0.1)",
    title: "Governance, Budgets & Audit Trail",
    description:
      "Set monthly budgets per agent with automatic enforcement. Require approvals for critical decisions like strategy changes and new hires. Every action is recorded in an immutable audit log.",
    wide: true,
  },
];

const iconColors: Record<string, string> = {
  "Agent Teams with 140+ Personas": "var(--info)",
  "Project Tracking": "#F0ABFC",
  "Heartbeat Engine": "#FCD34D",
  "Governance, Budgets & Audit Trail": "#818CF8",
};

export function Features() {
  return (
    <section id="features" className="py-28 px-8 max-w-[1200px] mx-auto">
      <SectionHeader
        label="Features"
        title={
          <>
            The complete <em className="text-primary not-italic font-heading italic">orchestration</em> platform
          </>
        }
        description="Everything you need to deploy, manage, and scale autonomous AI teams."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.25rem]">
        {features.map((f) => (
          <BentoCard
            key={f.title}
            icon={
              <span style={{ color: iconColors[f.title] ?? "#A78BFA" }}>
                {f.icon}
              </span>
            }
            iconBg={f.iconBg}
            title={f.title}
            description={f.description}
            wide={f.wide}
          />
        ))}
      </div>
    </section>
  );
}
