import Link from "next/link";

interface LogoProps {
  readonly className?: string;
  readonly iconOnly?: boolean;
}

export function Logo({ className, iconOnly }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Melaro"
        width={28}
        height={28}
        className="w-7 h-7"
      />
      {!iconOnly && (
        <span className="text-[1.25rem] font-semibold text-foreground tracking-[0.01em] leading-none">
          melaro
        </span>
      )}
    </Link>
  );
}
