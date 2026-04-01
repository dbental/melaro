import { Bot, ListTodo, DollarSign, TrendingUp, ShieldCheck } from "lucide-react";
import type { ScDashboard } from "@/lib/superclip";

interface Props {
  data: ScDashboard;
}

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function StatsCards({ data }: Props) {
  const stats = [
    {
      label: "Active Agents",
      value: data.agents.active.toString(),
      icon: Bot,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Open Tasks",
      value: data.tasks.open.toString(),
      icon: ListTodo,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Spent This Month",
      value: formatCents(data.costs.monthSpendCents),
      icon: DollarSign,
      color: "text-amber",
      bg: "bg-amber/10",
    },
    {
      label: "Budget Used",
      value: `${Math.round(data.costs.monthUtilizationPercent)}%`,
      icon: TrendingUp,
      color: data.costs.monthUtilizationPercent > 80 ? "text-warm" : "text-emerald-400",
      bg: data.costs.monthUtilizationPercent > 80 ? "bg-warm/10" : "bg-emerald-400/10",
    },
    ...(data.pendingApprovals > 0
      ? [
          {
            label: "Pending Approvals",
            value: data.pendingApprovals.toString(),
            icon: ShieldCheck,
            color: "text-amber",
            bg: "bg-amber/10",
          },
        ]
      : []),
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <div
          key={label}
          className="rounded-xl border border-card-border bg-bg-elevated p-5 flex items-start gap-4"
        >
          <div className={`${bg} p-2.5 rounded-lg shrink-0`}>
            <Icon size={18} className={color} />
          </div>
          <div>
            <p className="text-fg-dim text-xs mb-1">{label}</p>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
