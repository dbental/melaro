import Link from "next/link";
import { Circle } from "lucide-react";
import type { ScProject } from "@/lib/superclip";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  active: "text-emerald-400",
  paused: "text-amber",
  archived: "text-muted-foreground",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  paused: "Paused",
  archived: "Archived",
};

interface Props {
  project: ScProject;
  orgSlug: string;
}

export function ProjectCard({ project, orgSlug }: Props) {
  return (
    <Link
      href={`/dashboard/${orgSlug}/projects/${project.id}`}
      className="group block rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-all"
    >
      {/* Color indicator + name */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="mt-0.5 w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: project.color ?? "var(--info)" }}
        />
        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
          {project.name}
        </h3>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {project.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Circle
            size={6}
            className={cn(
              "fill-current",
              STATUS_COLORS[project.status] ?? "text-muted-foreground",
            )}
          />
          <span className={cn("text-xs", STATUS_COLORS[project.status] ?? "text-muted-foreground")}>
            {STATUS_LABELS[project.status] ?? project.status}
          </span>
        </div>
        {project.issuePrefix && (
          <span className="text-xs text-muted-foreground font-mono">
            {project.issuePrefix}-{project.issueCounter}
          </span>
        )}
      </div>
    </Link>
  );
}
