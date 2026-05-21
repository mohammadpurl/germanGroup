/**
 * Student World — Server Component
 *
 * All layout, markup, and static content is server-rendered.
 * Two client islands used:
 *   Reveal / Stagger / StaggerItem  → scroll-reveal wrappers
 *   XPBar                           → animated progress bar (tiny)
 *
 * DS §3  bg: #0B0F19
 * DS §5  py-24 | gap-8 | p-8
 */

import { Code2, Brain, Trophy, ArrowLeft, Zap, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { XPBar } from "@/components/ui/xp-bar";
import Link from "next/link";

/* ── Feature data ───────────────────────────────────────── */
const features = [
  {
    Icon:  Brain,
    color: "#6C5CE7",
    title: "هوش مصنوعی شخصی",
    body:  "درس‌هایی که به‌طور خودکار با سطح، سرعت و سبک یادگیری تو تنظیم می‌شوند.",
  },
  {
    Icon:  Code2,
    color: "#3B82F6",
    title: "کدنویسی پروژه‌محور",
    body:  "با Python، HTML و JavaScript پروژه‌های واقعی بساز — نه فقط تئوری.",
  },
  {
    Icon:  Trophy,
    color: "#00FFB2",
    title: "سیستم سطح و مهارت",
    body:  "امتیاز بگیر، سطح بالا برو و در رقابت‌های هفتگی با دانش‌آموزان دیگر شرکت کن.",
  },
] as const;

const skills = [
  { name: "Python",    stars: 4, color: "#6C5CE7" },
  { name: "HTML/CSS",  stars: 3, color: "#3B82F6"  },
  { name: "ریاضی",    stars: 5, color: "#00FFB2"  },
  { name: "الگوریتم", stars: 2, color: "#6C5CE7"  },
] as const;

/* ── Skill Dashboard — server markup + XPBar client island  */
function SkillDashboard() {
  return (
    /* Reveal = client scroll-reveal wrapper; card content = server-rendered */
    <Reveal>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#111827",
          border:     "1px solid rgba(108,92,231,0.2)",
          boxShadow:  "0 8px 48px rgba(108,92,231,0.18)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #6C5CE7, #3B82F6)" }}
            >
              ع
            </div>
            <div>
              <p className="text-white text-sm font-bold">علی رضایی</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>دانش‌آموز · پایه هشتم</p>
            </div>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ background: "linear-gradient(135deg, rgba(108,92,231,0.15), rgba(59,130,246,0.15))", border: "1px solid rgba(108,92,231,0.3)" }}
          >
            <Zap className="w-4 h-4" style={{ color: "#00FFB2" }} />
            <span className="text-sm font-bold" style={{ color: "#a78bfa" }}>سطح ۷</span>
          </div>
        </div>

        {/* XP — labels server-rendered, bar animation client island */}
        <div className="px-6 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ color: "#9CA3AF" }}>امتیاز تجربه</span>
            <span className="text-xs font-bold" style={{ color: "#00FFB2" }}>۸۲۰ / ۱۰۰۰ XP</span>
          </div>
          {/* XPBar is the only client piece in this entire section */}
          <XPBar percent={82} />
          <p className="text-xs mt-2" style={{ color: "#4B5563" }}>۱۸۰ XP دیگر تا سطح ۸</p>
        </div>

        {/* Current mission */}
        <div className="px-6 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6C5CE7", letterSpacing: "0.1em" }}>
            ماموریت فعلی
          </p>
          <div
            className="flex items-center justify-between p-4 rounded-xl"
            style={{ background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.2)" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6C5CE7, #3B82F6)" }}
              >
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">ساخت ماشین‌حساب با Python</p>
                <p className="text-xs mt-1" style={{ color: "#6B7280" }}>پیشرفت: ۳ از ۵ مرحله</p>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4" style={{ color: "#6C5CE7" }} />
          </div>
        </div>

        {/* Skill badges */}
        <div className="px-6 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6B7280", letterSpacing: "0.1em" }}>
            مهارت‌های کسب‌شده
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3"
                      style={{
                        fill:  i < skill.stars ? skill.color : "transparent",
                        color: i < skill.stars ? skill.color : "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-white">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Streak */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🔥</span>
            <span className="text-sm font-bold text-white">۱۴ روز متوالی</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" style={{ color: "#00FFB2" }} />
            <span className="text-sm font-bold" style={{ color: "#00FFB2" }}>۱۲ دستاورد</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Student World Section — Server Component ───────────── */
export function StudentWorld() {
  return (
    <section id="student-world" className="py-24" style={{ background: "#0B0F19" }}>
      <Container>
        <Reveal className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6C5CE7", letterSpacing: "0.14em" }}>
            برای دانش‌آموزان و نوجوانان
          </p>
          <h2
            className="font-extrabold text-white mx-auto"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: "1.3", maxWidth: "600px" }}
          >
            یادگیری اینجا
            <br />
            <span style={{ backgroundImage: "linear-gradient(135deg, #6C5CE7, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              یک ماجراجویی است.
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
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #6C5CE7, #3B82F6)" }}
                  >
                    <f.Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2" style={{ fontSize: "1rem" }}>{f.title}</h3>
                    <p className="text-sm" style={{ color: "#9CA3AF", lineHeight: "1.75", maxWidth: "none" }}>{f.body}</p>
                    <div className="mt-2 inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: f.color }} />
                      <span className="w-1.5 h-1.5 rounded-full opacity-60" style={{ background: f.color }} />
                      <span className="w-1.5 h-1.5 rounded-full opacity-30" style={{ background: f.color }} />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}

            <Reveal delay={0.3}>
              <Link
                href="/fa/dashboard/student"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-bold text-sm text-white bg-hero-gradient shadow-glow"
              >
                <span>همین حالا شروع کن</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Reveal>
          </Stagger>

          <SkillDashboard />
        </div>
      </Container>
    </section>
  );
}
