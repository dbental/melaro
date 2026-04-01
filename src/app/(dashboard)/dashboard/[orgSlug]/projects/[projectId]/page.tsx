import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { superclip } from "@/lib/superclip";
import { DashboardTopbar } from "@/components/layouts/dashboard-topbar";
import { IssueList } from "@/components/projects/issue-list";
import { AgentCard } from "@/components/agents/agent-card";
import Link from "next/link";
import { ChevronLeft, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ orgSlug: string; projectId: string }>;
}

const STATUS_COLOR: Record<string, string> = {
  active: "text-emerald-400",
  paused: "text-amber",
  archived: "text-muted-foreground",
};

export default async function ProjectDetailPage({ params }: Props) {
  const { orgSlug, projectId } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const [companies, project] = await Promise.all([
    superclip.listCompanies(cookieHeader).catch(() => null),
    superclip.getProject(cookieHeader, projectId).catch(() => null),
  ]);

  if (!companies || !project) notFound();

  const company = companies.find((c) => c.slug === orgSlug || c.id === orgSlug);
  if (!company) notFound();

  const [issues, agents] = await Promise.all([
    superclip.listIssues(cookieHeader, projectId).catch(() => []),
    superclip.listAgents(cookieHeader, company.id).catch(() => []),
  ]);

  // Agents assigned to this project (those working on its issues)
  const assignedAgentIds = new Set(
    issues.map((i) => i.assignedAgentId).filter(Boolean),
  );
  const projectAgents = agents.filter((a) => assignedAgentIds.has(a.id));

  const open = issues.filter((i) => i.status === "open").length;
  const inProgress = issues.filter((i) => i.status === "in_progress").length;
  const done = issues.filter((i) => i.status === "done").length;
  const total = issues.length;
  const progressPct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <>
      <DashboardTopbar title={project.name} orgName={company.name} />

      <main className="flex-1 p-6 space-y-8 overflow-auto">
        {/* Breadcrumb */}
        <Link
          href={`/dashboard/${orgSlug}/projects`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={14} />
          Projects
        </Link>

        {/* Project header */}
        <div className="flex items-start gap-4">
          <div
            className="mt-1 w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: project.color ?? "#7C3AED" }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-semibold text-foreground truncate">
                {project.name}
              </h1>
              <div className="flex items-center gap-1.5 shrink-0">
                <Circle
                  size={6}
                  className={cn("fill-current", STATUS_COLOR[project.status] ?? "text-muted-foreground")}
                />
                <span className={cn("text-sm capitalize", STATUS_COLOR[project.status] ?? "text-muted-foreground")}>
                  {project.status}
                </span>
              </div>
            </div>
            {project.description && (
              <p className="text-sm text-muted-foreground">{project.description}</p>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total", value: total, color: "text-foreground" },
            { label: "Open", value: open, color: "text-muted-foreground" },
            { label: "In progress", value: inProgress, color: "text-primary" },
            { label: "Done", value: done, color: "text-emerald-400" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card px-4 py-3"
            >
              <p className="text-xs text-muted-foreground mb-1">{label}</p>
              <p className={cn("text-2xl font-semibold", color)}>{value}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        {total > 0 && (
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-1.5 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-[#BE185D] rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Issues */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Issues
            </h2>
            <IssueList issues={issues} issuePrefix={project.issuePrefix} />
          </div>

          {/* Assigned agents */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Agents on this project
            </h2>
            {projectAgents.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-6 text-center">
                <p className="text-xs text-muted-foreground">No agents assigned yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projectAgents.map((a) => (
                  <AgentCard key={a.id} agent={a} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
