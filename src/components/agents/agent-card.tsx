import { cn } from "@/lib/utils";
import type { ScAgent } from "@/lib/superclip";

const STATUS_CONFIG = {
  running: {
    dot: "bg-emerald-400 animate-pulse",
    label: "Running",
    text: "text-emerald-400",
  },
  idle: {
    dot: "bg-fg-dim",
    label: "Idle",
    text: "text-muted-foreground",
  },
  error: {
    dot: "bg-warm",
    label: "Error",
    text: "text-warm",
  },
  offline: {
    dot: "bg-fg-dim opacity-40",
    label: "Offline",
    text: "text-muted-foreground opacity-60",
  },
} as const;

interface Props {
  agent: ScAgent;
}

export function AgentCard({ agent }: Props) {
  const config = STATUS_CONFIG[agent.status] ?? STATUS_CONFIG.idle;

  return (
    <div className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all">
      {/* Avatar + status */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
          {agent.emoji ?? "🤖"}
        </div>
        <div className="flex items-center gap-1.5">
          <div className={cn("w-2 h-2 rounded-full", config.dot)} />
          <span className={cn("text-xs", config.text)}>{config.label}</span>
        </div>
      </div>

      {/* Name + role */}
      <h3 className="text-sm font-semibold text-foreground mb-0.5">{agent.name}</h3>
      <p className="text-xs text-muted-foreground capitalize mb-3">{agent.role}</p>

      {/* Current task */}
      <div className="rounded-lg bg-surface px-3 py-2 min-h-[2.5rem] flex items-center">
        {agent.currentTask ? (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {agent.currentTask}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground italic">No active task</p>
        )}
      </div>
    </div>
  );
}
