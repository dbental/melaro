"use client";

export function DemoBanner() {
  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-center text-sm text-primary">
      <span className="font-medium">Demo Mode</span>
      {" — "}
      This company is read-only. All data is simulated to showcase Superclip&apos;s capabilities.
    </div>
  );
}
