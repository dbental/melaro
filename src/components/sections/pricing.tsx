import { SectionHeader } from "@/components/section-header";
import { PricingCard } from "@/components/pricing-card";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "Explore the platform.",
    features: ["1 company", "3 agents", "100 heartbeats/mo", "Community support"],
    ctaLabel: "Get Started",
    ctaHref: "/signup",
    featured: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For serious builders.",
    features: [
      "5 companies",
      "25 agents",
      "Unlimited heartbeats",
      "Priority support",
      "Advanced analytics",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/signup",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations at scale.",
    features: [
      "Unlimited everything",
      "SSO & SAML",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    ctaLabel: "Contact Sales",
    ctaHref: "#",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-28 px-8 max-w-[1100px] mx-auto">
      <SectionHeader
        label="Pricing"
        title={
          <>
            Simple,{" "}
            <em className="text-primary-bright not-italic font-heading italic">
              predictable
            </em>{" "}
            pricing
          </>
        }
        description="Start free. Scale when ready."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>
    </section>
  );
}
