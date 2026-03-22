import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="aurora-bg-subtle" />
      <div className="relative z-10 w-full max-w-[400px]">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
}
