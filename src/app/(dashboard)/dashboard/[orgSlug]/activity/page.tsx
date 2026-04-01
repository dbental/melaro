import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { superclip } from "@/lib/superclip";
import { DashboardTopbar } from "@/components/layouts/dashboard-topbar";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

interface Props {
  params: Promise<{ orgSlug: string }>;
}

export default async function ActivityPage({ params }: Props) {
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

  // Fetch first page only — user can load more via ActivityFeed
  const activity = await superclip.getActivity(cookieHeader, company.id, 25).catch(() => []);
  const initial = activity.slice(0, 25);

  return (
    <>
      <DashboardTopbar title="Activity" orgName={company.name} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl">
          <ActivityFeed initial={initial} companyId={company.id} />
        </div>
      </main>
    </>
  );
}
