import { cookies } from "next/headers";
import { DashboardSidebar } from "@/components/layouts/dashboard-sidebar";
import { RealtimeProvider } from "@/components/layouts/realtime-provider";
import { DemoBanner } from "@/components/dashboard/demo-banner";
import { superclip } from "@/lib/superclip";

interface Props {
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}

export default async function OrgLayout({ children, params }: Props) {
  const { orgSlug } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  // Best-effort: resolve companyId for realtime; don't fail layout if unavailable
  let companyId = "";
  let isDemo = false;
  try {
    const companies = await superclip.listCompanies(cookieHeader);
    const match = companies.find((c) => c.slug === orgSlug || c.id === orgSlug);
    companyId = match?.id ?? "";
    isDemo = match?.name === "Demo Corp" && process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  } catch {
    // Layout continues without realtime if Superclip is unreachable
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar orgSlug={orgSlug} />
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {companyId && <RealtimeProvider companyId={companyId} />}
        {isDemo && <DemoBanner />}
        {children}
      </div>
    </div>
  );
}
