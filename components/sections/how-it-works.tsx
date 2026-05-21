/**
 * How It Works — Server Component
 *
 * Section shell and header are server-rendered.
 * Tab switcher + animated steps delegated to HowItWorksTabs (client island).
 *
 * DS §3  bg: #F7F8FA
 * DS §5  py-24
 */

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HowItWorksTabs } from "@/components/sections/how-it-works-tabs";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24" style={{ background: "#F7F8FA" }}>
      <Container>
        {/* Static header — server-rendered */}
        <Reveal className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6C5CE7", letterSpacing: "0.14em" }}>
            نحوه کارکرد
          </p>
          <h2
            className="font-extrabold mx-auto"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: "1.3", color: "#0B0F19" }}
          >
            چطور کار می‌کند؟
          </h2>
        </Reveal>

        {/* Client island: tab state + animated step cards */}
        <HowItWorksTabs />
      </Container>
    </section>
  );
}
