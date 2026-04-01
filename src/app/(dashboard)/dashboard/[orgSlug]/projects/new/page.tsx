import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { superclip } from "@/lib/superclip";
import { DashboardTopbar } from "@/components/layouts/dashboard-topbar";
import { CreateProjectForm } from "@/components/projects/create-project-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Props {
  params: Promise<{ orgSlug: string }>;
}

export default async function NewProjectPage({ params }: Props) {
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

  return (
    <>
      <DashboardTopbar title="New Project" orgName={company.name} />
      <main className="flex-1 p-6 overflow-auto">
        <Link
          href={`/dashboard/${orgSlug}/projects`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft size={14} />
          Back to projects
        </Link>

        <div className="max-w-lg">
          <h2 className="text-xl font-semibold mb-1">Create a project</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Projects help organize your team&apos;s work into focused areas.
          </p>
          <CreateProjectForm orgSlug={orgSlug} companyId={company.id} />
        </div>
      </main>
    </>
  );
}
