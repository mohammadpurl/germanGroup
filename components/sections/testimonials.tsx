"use client";

/**
 * Testimonials — Interactive shuffle stack
 *
 * Uses TestimonialCard from /components/ui/testimonial-cards.tsx.
 * Persian names/quotes, dark bg (#0B0F19).
 *
 * DS §3  bg: #0B0F19 (Dark)
 * DS §5  py-24
 * DS §10 Framer Motion drag-to-shuffle
 */

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import {
  TestimonialCard,
  type CardPosition,
  type TestimonialData,
} from "@/components/ui/testimonial-cards";

/* ── Persian testimonial data ───────────────────────────── */
const testimonials: TestimonialData[] = [
  {
    id:          10,
    testimonial: "دخترم از ریاضی متنفر بود. بعد از سه ماه با ماینلند دیگر از آن نمی‌ترسد و هر روز می‌خواهد درس بخواند.",
    author:      "زهرا محمدی — مادر دانش‌آموز پایه پنجم",
  },
  {
    id:          22,
    testimonial: "آزمون‌ساز هوش مصنوعی ماینلند وقت آماده‌سازی من را نصف کرده. برای اولین بار می‌دانم هر دانش‌آموز دقیقاً کجاست.",
    author:      "آقای رضایی — معلم ریاضی",
  },
  {
    id:          33,
    testimonial: "انگار یک معلم خصوصی همیشه پیشم است که هیچ‌وقت حوصله‌اش سر نمی‌رود. کدنویسی را واقعاً دوست پیدا کردم.",
    author:      "علی — دانش‌آموز ۱۴ ساله",
  },
  {
    id:          11,
    testimonial: "دخترم از ریاضی متنفر بود. بعد از سه ماه با ماینلند دیگر از آن نمی‌ترسد و هر روز می‌خواهد درس بخواند.",
    author:      "زهرا محمدی — مادر دانش‌آموز پایه پنجم",
  },
  {
    id:          12,
    testimonial: "آزمون‌ساز هوش مصنوعی ماینلند وقت آماده‌سازی من را نصف کرده. برای اولین بار می‌دانم هر دانش‌آموز دقیقاً کجاست.",
    author:      "آقای رضایی — معلم ریاضی",
  },
  {
    id:          43,
    testimonial: "انگار یک معلم خصوصی همیشه پیشم است که هیچ‌وقت حوصله‌اش سر نمی‌رود. کدنویسی را واقعاً دوست پیدا کردم.",
    author:      "علی — دانش‌آموز ۱۴ ساله",
  },
];

/* ── Section ────────────────────────────────────────────── */
export function Testimonials() {
  const [positions, setPositions] = useState<CardPosition[]>([
    "front",
    "middle",
    "back",
  ]);

  const handleShuffle = () => {
    setPositions((prev) => {
      const next = [...prev] as CardPosition[];
      const last = next.pop()!;
      next.unshift(last);
      return next;
    });
  };

  return (
    <section className="py-24" style={{ background: "#0B0F19" }}>
      <Container>
        {/* Header */}
        <Reveal className="text-center mb-16">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#6C5CE7", letterSpacing: "0.14em" }}
          >
            نظرات کاربران
          </p>
          <h2
            className="font-extrabold text-white mx-auto mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: "1.3" }}
          >
            از زبان{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #6C5CE7, #3B82F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              جامعه ماینلند.
            </span>
          </h2>
          <p className="text-sm mx-auto" style={{ color: "#6B7280", maxWidth: "380px" }}>
            کارت را بکشید تا نظر بعدی را ببینید
          </p>
        </Reveal>

        {/* Card stack — centred, generous overflow room */}
        <Reveal delay={0.2}>
          <div className="flex justify-center">
            <div className="relative" style={{ width: 350, height: 450, marginLeft: 100 }}>
              {testimonials.map((t, index) => (
                <TestimonialCard
                  key={t.id}
                  {...t}
                  handleShuffle={handleShuffle}
                  position={positions[index]}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Hint dots */}
        <Reveal delay={0.4} className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i !== 0) handleShuffle();
              }}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                background:
                  positions[i] === "front"
                    ? "#6C5CE7"
                    : "rgba(255,255,255,0.15)",
              }}
              aria-label={`رفتن به نظر ${i + 1}`}
            />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
