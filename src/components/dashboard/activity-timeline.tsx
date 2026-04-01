import type { ScActivity } from "@/lib/superclip";

interface Props {
  items: ScActivity[];
}

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const ACTION_LABELS: Record<string, string> = {
  "agent.paused": "Agent paused",
  "agent.resumed": "Agent resumed",
  "agent.started": "Agent started",
  "agent.stopped": "Agent stopped",
  "issue.checked_out": "Picked up a task",
  "issue.completed": "Completed a task",
  "issue.created": "Task created",
  "issue.updated": "Task updated",
  "project.created": "Project created",
  "project.updated": "Project updated",
  "run.started": "Run started",
  "run.completed": "Run completed",
  "run.failed": "Run failed",
};

const ACTOR_ICONS: Record<string, string> = {
  agent: "⚡",
  user: "👤",
  system: "🔧",
};

function describeAction(item: ScActivity): string {
  return ACTION_LABELS[item.action] ?? item.action.replace(/\./g, " ");
}

export function ActivityTimeline({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <p className="text-sm">No activity yet</p>
        <p className="text-xs mt-1">Activity will appear here once your agents start working</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {items.map((item, i) => (
        <div key={item.id} className="flex gap-3 py-3">
          {/* Timeline connector */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center text-sm">
              {ACTOR_ICONS[item.actorType] ?? "⚡"}
            </div>
            {i < items.length - 1 && (
              <div className="w-px flex-1 bg-border mt-1" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-3">
            <p className="text-sm text-foreground leading-relaxed">
              {describeAction(item)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{timeAgo(item.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
