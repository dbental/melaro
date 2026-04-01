import Link from "next/link";

interface LogoProps {
  /** Extra classes — use to set text color (e.g. text-white, text-foreground) */
  readonly className?: string;
  /** Collapsed sidebar — renders just the "M" glyph in a square frame */
  readonly iconOnly?: boolean;
}

/**
 * Single consistent wordmark treatment across all surfaces.
 * Caller sets text color via className (text-white / text-foreground).
 * The rectangular frame is always the same size — only color adapts.
 */
export function Logo({ className, iconOnly }: LogoProps) {
  if (iconOnly) {
    return (
      <Link
        href="/"
        className={`inline-flex items-center justify-center w-10 h-10 border border-current ${className ?? ""}`}
      >
        <span
          className="font-wordmark leading-none select-none"
          style={{ fontSize: "16px", letterSpacing: "0.05em" }}
        >
          M
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`inline-flex items-center justify-center px-5 py-2.5 border border-current ${className ?? ""}`}
    >
      <span
        className="font-wordmark leading-none select-none"
        style={{ fontSize: "26px", letterSpacing: "0.06em" }}
      >
        MelAro
      </span>
    </Link>
  );
}
