/**
 * Teacher World — Server Component
 *
 * Static layout + feature list are server-rendered.
 * Only QuizBuilderCard (interactive AI animation) is a client island.
 *
 * DS §3  bg: #FFFFFF (Light)
 * DS §5  py-24 | gap-8 | p-8
 */

import { Wand2, BookOpen, Presentation, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { QuizBuilderCard } from "@/components/sections/quiz-builder-card";
import Link from "next/link";

const features = [
  {
    Icon:  Wand2,
    color: "#6C5CE7",
    title: "ساخت محتوای هوشمند",
    body:  "مثل Canva، اما برای معلمان — با هوش مصنوعی که پیشنهاد تصویر، متن و طرح‌بندی می‌دهد.",
  },
  {
    Icon:  BookOpen,
    color: "#3B82F6",
    title: "آزمون‌ساز هوشمند",
    body:  "موضوع درس را وارد کن؛ ۲۰ سوال متنوع و دقیق در چند ثانیه آماده می‌شود.",
  },
  {
    Icon:  Presentation,
    color: "#00FFB2",
    title: "اسلاید خودکار",
    body:  "جلسه درسی کامل با اسلاید، تمرین و آزمون — فقط با یک توضیح کوتاه.",
  },
] as const;

export function TeacherWorld() {
  return (
    <section id="teacher-world" className="py-24" style={{ background: "#FFFFFF" }}>
      <Container>
        <Reveal className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6C5CE7", letterSpacing: "0.14em" }}>
            برای معلمان
          </p>
          <h2
            className="font-extrabold mx-auto"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: "1.3", color: "#0B0F19", maxWidth: "600px" }}
          >
            تدریس مدرن.
            <br />
            <span style={{ backgroundImage: "linear-gradient(135deg, #6C5CE7, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              قدرتمند. هوشمند.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Feature list + CTA */}
          <Stagger className="flex flex-col gap-6 lg:sticky lg:top-32">
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <div
                  className="p-6 rounded-2xl flex items-start gap-6"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #6C5CE7, #3B82F6)" }}
                  >
                    <f.Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2" style={{ fontSize: "1rem", color: "#0B0F19" }}>{f.title}</h3>
                    <p className="text-sm" style={{ color: "#6B7280", lineHeight: "1.75", maxWidth: "none" }}>{f.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}

            <Reveal delay={0.3}>
              <Link
                href="/fa/dashboard/teacher"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-bold text-sm text-white bg-hero-gradient shadow-glow"
              >
                <span>ورود به پنل معلم</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Reveal>
          </Stagger>

          {/* Client island: only the animated quiz builder */}
          <QuizBuilderCard />
        </div>
      </Container>
    </section>
  );
}
