import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { superclip } from "@/lib/superclip";
import { DashboardTopbar } from "@/components/layouts/dashboard-topbar";
import { ProjectCard } from "@/components/projects/project-card";
import Link from "next/link";
import { Plus } from "lucide-react";

interface Props {
  params: Promise<{ orgSlug: string }>;
}

export default async function ProjectsPage({ params }: Props) {
  const { orgSlug } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const companies = await superclip.listCompanies(cookieHeader).catch(() => null);
  if (!companies) notFound();

  const company = companies.find((c) => c.slug === orgSlug || c.id === orgSlug);
  if (!company) notFound();

  const projects = await superclip.listProjects(cookieHeader, company.id).catch(() => []);

  const grouped = {
    active: projects.filter((p) => p.status === "active"),
    backlog: projects.filter((p) => p.status === "backlog"),
    paused: projects.filter((p) => p.status === "paused"),
    archived: projects.filter((p) => p.status === "archived"),
  };

  return (
    <>
      <DashboardTopbar title="Projects" orgName={company.name} />

      <main className="flex-1 p-6 space-y-8 overflow-auto">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
          <Link
            href={`/dashboard/${orgSlug}/projects/new`}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <Plus size={14} />
            New project
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground mb-2">No projects yet</p>
            <p className="text-xs text-muted-foreground mb-6">
              Create a project to start assigning work to your agents
            </p>
            <Link
              href={`/dashboard/${orgSlug}/projects/new`}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <Plus size={14} />
              Create first project
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.active.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Active
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {grouped.active.map((p) => (
                    <ProjectCard key={p.id} project={p} orgSlug={orgSlug} />
                  ))}
                </div>
              </section>
            )}
            {grouped.backlog.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Backlog
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {grouped.backlog.map((p) => (
                    <ProjectCard key={p.id} project={p} orgSlug={orgSlug} />
                  ))}
                </div>
              </section>
            )}
            {grouped.paused.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Paused
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {grouped.paused.map((p) => (
                    <ProjectCard key={p.id} project={p} orgSlug={orgSlug} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </>
  );
}
