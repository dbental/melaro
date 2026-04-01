import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { superclip } from "@/lib/superclip";
import { DashboardTopbar } from "@/components/layouts/dashboard-topbar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { ProjectCard } from "@/components/projects/project-card";
import Link from "next/link";
import { Plus } from "lucide-react";

interface Props {
  params: Promise<{ orgSlug: string }>;
}

export default async function OrgDashboardPage({ params }: Props) {
  const { orgSlug } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  // Resolve company from slug
  let companies;
  try {
    companies = await superclip.listCompanies(cookieHeader);
  } catch {
    notFound();
  }

  const company = companies.find(
    (c) => c.slug === orgSlug || c.id === orgSlug,
  );
  if (!company) notFound();

  // Fetch dashboard data in parallel
  const [dashboard, projects, activity] = await Promise.all([
    superclip.getDashboard(cookieHeader, company.id).catch(() => ({
      companyId: company.id,
      agents: { active: 0, running: 0, paused: 0, error: 0 },
      tasks: { open: 0, inProgress: 0, blocked: 0, done: 0 },
      costs: { monthSpendCents: 0, monthBudgetCents: 0, monthUtilizationPercent: 0 },
      pendingApprovals: 0,
    })),
    superclip.listProjects(cookieHeader, company.id).catch(() => []),
    superclip.getActivity(cookieHeader, company.id, 15).catch(() => []),
  ]);

  const activeProjects = projects.filter((p) => p.status === "active");

  return (
    <>
      <DashboardTopbar title="Dashboard" orgName={company.name} />

      <main className="flex-1 p-6 space-y-8 overflow-auto">
        {/* Stats */}
        <StatsCards data={dashboard} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Projects */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Active Projects
              </h2>
              <Link
                href={`/dashboard/${orgSlug}/projects/new`}
                className="flex items-center gap-1.5 text-sm text-primary hover:text-primary transition-colors"
              >
                <Plus size={14} />
                New project
              </Link>
            </div>

            {activeProjects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-8 text-center">
                <p className="text-muted-foreground text-sm">No active projects yet</p>
                <Link
                  href={`/dashboard/${orgSlug}/projects/new`}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-primary hover:text-primary transition-colors"
                >
                  <Plus size={14} />
                  Create your first project
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {activeProjects.slice(0, 4).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    orgSlug={orgSlug}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Activity */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Recent Activity
              </h2>
              <Link
                href={`/dashboard/${orgSlug}/activity`}
                className="text-xs text-muted-foreground hover:text-muted-foreground transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <ActivityTimeline items={activity} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
