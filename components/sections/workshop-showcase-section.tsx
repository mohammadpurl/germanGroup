import { Container } from "@/components/ui/container";
import { WorkshopCompareSlider } from "@/components/sections/workshop-compare-slider";
import { WorkshopVideoPanel } from "@/components/sections/workshop-video-panel";

export function WorkshopShowcaseSection() {
  return (
    <section id="workshop" className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28">
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
        aria-hidden
      />

      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6 xl:gap-8">
          {/* RTL: راست — ویدیو تعمیرگاه */}
          <WorkshopVideoPanel
            posterSrc="/Images/Heronew.png"
            videoSrc="/Videos/germanGroup.mp4"
          />

          {/* چپ — قبل و بعد */}
          <WorkshopCompareSlider
            beforeSrc="/Images/before.jpg"
            afterSrc="/Images/after.jpg.webp"
            alt="Porsche — German Group"
          />
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
