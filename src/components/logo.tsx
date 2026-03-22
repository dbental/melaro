import Link from "next/link";

interface LogoProps {
  readonly className?: string;
  readonly iconOnly?: boolean;
}

export function Logo({ className, iconOnly }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-1 ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Melaro"
        width={38}
        height={38}
        className="w-[38px] h-[38px]"
      />
      {!iconOnly && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/wordmark.png"
          alt="melaro"
          height={22}
          className="h-[22px] w-auto"
        />
      )}
    </Link>
  );
}
