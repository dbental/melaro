import { QueryProvider } from "@/components/layouts/query-provider";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryProvider>{children}</QueryProvider>;
}
