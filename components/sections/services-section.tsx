import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ServicesCarousel } from "@/components/sections/services-carousel";

export function ServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28">
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
        aria-hidden
      />

      <Container>
        {/* عنوان مرکزی */}
        <div className="mb-10 flex flex-col items-center gap-3 text-center lg:mb-12">
          <div className="flex items-center gap-3">
            <span
              className="h-px w-8 bg-gold/70"
              aria-hidden
            />
            <p className="section-subtitle !text-gold">خدمات تخصصی ما</p>
            <span
              className="h-px w-8 bg-gold/70"
              aria-hidden
            />
          </div>
        </div>

        <ServicesCarousel />

        <div className="mt-10 flex justify-center">
          <Link href="#services" className="service-view-all-btn">
            مشاهده همه خدمات
          </Link>
        </div>
      </Container>

      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
        aria-hidden
      />
    </section>
  );
}
