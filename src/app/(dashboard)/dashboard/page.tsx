/**
 * /dashboard — resolves the user's first company and redirects there.
 * If no company exists yet, redirects to onboarding.
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { superclip } from "@/lib/superclip";

export default async function DashboardIndexPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  try {
    const companies = await superclip.listCompanies(cookieHeader);
    if (companies.length === 0) {
      redirect("/onboarding");
    }
    redirect(`/dashboard/${companies[0].slug ?? companies[0].id}`);
  } catch (err) {
    if (isRedirectError(err)) throw err;
    redirect("/onboarding");
  }
}
