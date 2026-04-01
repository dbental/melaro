import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { superclip } from "@/lib/superclip";
import { DashboardTopbar } from "@/components/layouts/dashboard-topbar";
import { AgentCard } from "@/components/agents/agent-card";

interface Props {
  params: Promise<{ orgSlug: string }>;
}

export default async function AgentsPage({ params }: Props) {
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

  const agents = await superclip.listAgents(cookieHeader, company.id).catch(() => []);

  const running = agents.filter((a) => a.status === "running");
  const idle = agents.filter((a) => a.status === "idle");
  const offline = agents.filter((a) => a.status !== "running" && a.status !== "idle");

  return (
    <>
      <DashboardTopbar title="Agents" orgName={company.name} />

      <main className="flex-1 p-6 space-y-8 overflow-auto">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            <span className="text-foreground font-medium">{agents.length}</span>{" "}
            total agents
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="text-emerald-400">{running.length} running</span>
          <span className="text-muted-foreground">·</span>
          <span>{idle.length} idle</span>
        </div>

        {agents.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-2xl mb-3">🤖</p>
            <p className="text-muted-foreground text-sm">No agents yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Agents will appear here once your team is set up
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {running.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Active now
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {running.map((a) => (
                    <AgentCard key={a.id} agent={a} />
                  ))}
                </div>
              </section>
            )}

            {idle.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Idle
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {idle.map((a) => (
                    <AgentCard key={a.id} agent={a} />
                  ))}
                </div>
              </section>
            )}

            {offline.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Offline / Error
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {offline.map((a) => (
                    <AgentCard key={a.id} agent={a} />
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
