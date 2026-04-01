const companies = ["Acme Corp", "TechFlow", "DataWave", "BuildKit", "NexGen"];

export function SocialProof() {
  return (
    <section className="py-16 px-8 text-center border-t border-b border-border">
      <p className="text-[0.78rem] text-muted-foreground font-medium uppercase tracking-[0.14em] mb-8">
        Trusted by forward-thinking teams
      </p>
      <div className="flex justify-center gap-12 items-center flex-wrap max-w-[800px] mx-auto opacity-25">
        {companies.map((name) => (
          <span key={name} className="text-[1.1rem] font-bold text-foreground">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
