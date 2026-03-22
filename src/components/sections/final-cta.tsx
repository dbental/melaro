import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-28 px-8 text-center relative overflow-hidden">
      <div className="aurora-bg-subtle" />

      <div className="relative z-10">
        <h2 className="font-heading text-[clamp(2rem,3.5vw,2.5rem)] font-normal mb-4">
          Ready to deploy your{" "}
          <em className="text-primary-bright not-italic font-heading italic">
            AI team
          </em>
          ?
        </h2>
        <p className="text-[1.05rem] text-fg-muted mb-10 max-w-[460px] mx-auto">
          Join the builders creating the next generation of autonomous AI
          companies.
        </p>
        <Link
          href="/signup"
          className="inline-flex rounded-[10px] px-10 py-[0.8rem] text-base font-semibold text-white bg-gradient-to-br from-primary-deep to-accent-deep btn-glow"
        >
          Start for Free
        </Link>
      </div>
    </section>
  );
}
