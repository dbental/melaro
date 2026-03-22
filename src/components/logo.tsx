import Link from "next/link";

interface LogoProps {
  readonly className?: string;
  readonly iconOnly?: boolean;
}

export function Logo({ className, iconOnly }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-1.5 ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Melaro"
        width={34}
        height={34}
        className="w-[34px] h-[34px] -mr-0.5"
      />
      {!iconOnly && (
        <span className="text-[1.35rem] font-semibold text-foreground tracking-[0.02em] leading-none">
          melaro
        </span>
      )}
    </Link>
  );
}
