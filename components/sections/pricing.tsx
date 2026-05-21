/**
 * Pricing — Server Component
 *
 * Section shell and header are server-rendered.
 * Billing toggle + plan cards delegated to PricingPlans (client island).
 *
 * DS §3  bg: #FFFFFF
 * DS §5  py-24
 */

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PricingPlans } from "@/components/sections/pricing-plans";

export function Pricing() {
  return (
    <section id="pricing" className="py-24" style={{ background: "#FFFFFF" }}>
      <Container>
        {/* Static header — server-rendered */}
        <Reveal className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6C5CE7", letterSpacing: "0.14em" }}>
            قیمت‌گذاری
          </p>
          <h2
            className="font-extrabold mx-auto mb-6"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: "1.3", color: "#0B0F19" }}
          >
            قیمت ساده.
            <br />
            <span style={{ backgroundImage: "linear-gradient(135deg, #6C5CE7, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              بدون شگفتی.
            </span>
          </h2>
          <p className="text-base mx-auto" style={{ color: "#6B7280", lineHeight: "1.75", maxWidth: "440px" }}>
            اولین ماه پلن پیشرفته همیشه رایگان است. هر زمان لغو کنید.
          </p>
        </Reveal>

        {/* Client island: billing toggle + animated plan cards */}
        <PricingPlans />
      </Container>
    </section>
  );
}
