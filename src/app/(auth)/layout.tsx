import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#0F172A] relative overflow-hidden">
      {/* Subtle brand glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
      </div>
      <div className="relative z-10 w-full max-w-[400px]">
        <div className="flex justify-center mb-10">
          <Logo className="text-white" />
        </div>
        {children}
      </div>
    </div>
  );
}
