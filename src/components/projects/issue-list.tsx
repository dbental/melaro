import { cn } from "@/lib/utils";
import type { ScIssue } from "@/lib/superclip";

const PRIORITY_CONFIG = {
  critical: { label: "Critical", color: "text-warm bg-warm/10 border-warm/20" },
  high: { label: "High", color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
  medium: { label: "Medium", color: "text-amber bg-amber/10 border-amber/20" },
  low: { label: "Low", color: "text-muted-foreground bg-white/5 border-border" },
} as const;

const STATUS_CONFIG = {
  open: { label: "Open", dot: "bg-fg-dim" },
  in_progress: { label: "In progress", dot: "bg-primary animate-pulse" },
  done: { label: "Done", dot: "bg-emerald-400" },
  cancelled: { label: "Cancelled", dot: "bg-fg-dim opacity-40" },
} as const;

interface Props {
  issues: ScIssue[];
  issuePrefix?: string | null;
}

export function IssueList({ issues, issuePrefix }: Props) {
  if (issues.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center">
        <p className="text-muted-foreground text-sm">No issues yet</p>
        <p className="text-xs text-muted-foreground mt-1">Issues will appear here once your agents start working</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-card">
            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider w-20">
              ID
            </th>
            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Title
            </th>
            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider w-28 hidden sm:table-cell">
              Priority
            </th>
            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider w-28">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {issues.map((issue, idx) => {
            const priority = PRIORITY_CONFIG[issue.priority] ?? PRIORITY_CONFIG.low;
            const status = STATUS_CONFIG[issue.status] ?? STATUS_CONFIG.open;
            return (
              <tr
                key={issue.id}
                className={cn(
                  "hover:bg-white/[0.02] transition-colors",
                  issue.status === "done" || issue.status === "cancelled" ? "opacity-50" : "",
                )}
              >
                <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
                  {issuePrefix ? `${issuePrefix}-${idx + 1}` : `#${idx + 1}`}
                </td>
                <td className="px-4 py-3 text-foreground">
                  <span className={cn(issue.status === "done" ? "line-through text-muted-foreground" : "")}>
                    {issue.title}
                  </span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-xs border",
                      priority.color,
                    )}
                  >
                    {priority.label}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", status.dot)} />
                    <span className="text-xs text-muted-foreground">{status.label}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
