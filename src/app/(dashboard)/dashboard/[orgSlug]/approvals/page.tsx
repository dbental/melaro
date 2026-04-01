import { cookies } from "next/headers";
import { superclip } from "@/lib/superclip";
import { ApprovalsClient } from "./approvals-client";

interface Props {
  params: Promise<{ orgSlug: string }>;
}

export default async function ApprovalsPage({ params }: Props) {
  const { orgSlug } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  // Resolve companyId from slug
  let companyId = "";
  try {
    const companies = await superclip.listCompanies(cookieHeader);
    const match = companies.find((c) => c.slug === orgSlug || c.id === orgSlug);
    companyId = match?.id ?? "";
  } catch {
    // Continue with empty state
  }

  // Fetch pending approvals server-side
  const pending = companyId
    ? await superclip.listApprovals(cookieHeader, companyId, "pending").catch(() => [])
    : [];

  const resolved = companyId
    ? await superclip.listApprovals(cookieHeader, companyId, "approved").catch(() => [])
    : [];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Approvals</h1>
        <p className="text-sm text-white/50 mt-1">
          Review and decide on agent proposals, hire requests, and escalations.
        </p>
      </div>

      <ApprovalsClient
        companyId={companyId}
        initialPending={pending}
        initialResolved={resolved}
      />
    </div>
  );
}
