/**
 * Customer Dashboard Preview — shows the professional repair tracking system
 * Static Server Component
 */
import { Container } from "@/components/ui/container";
import { LayoutDashboard, CheckCircle, Clock, AlertCircle, ChevronLeft } from "lucide-react";

const stages = [
  { id: 1, label: "تحویل خودرو",       status: "done",    time: "۱۴:۳۰" },
  { id: 2, label: "دیاگنوستیک کامل",   status: "done",    time: "۱۵:۱۵" },
  { id: 3, label: "تشریح ایرادها",     status: "done",    time: "۱۶:۰۰" },
  { id: 4, label: "تأمین قطعات اصل",  status: "active",  time: "در حال انجام" },
  { id: 5, label: "تعمیر و مونتاژ",   status: "pending", time: "—" },
  { id: 6, label: "تست و کنترل",      status: "pending", time: "—" },
  { id: 7, label: "تحویل به مشتری",   status: "pending", time: "—" },
];

const statusIcon = (s: string) => {
  if (s === "done")   return <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />;
  if (s === "active") return <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />;
  return <AlertCircle className="w-4 h-4 text-white/20 shrink-0" />;
};

export function DashboardPreviewSection() {
  return (
    <section id="dashboard" className="relative py-24 lg:py-32 overflow-hidden bg-[#040404]">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* left: copy */}
          <div className="flex flex-col gap-6">
            <p className="section-subtitle flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4 text-gold shrink-0" aria-hidden />
              پنل مشتری
            </p>
            <h2 className="section-title">
              وضعیت خودرو‌تان
              <br />
              را لحظه به لحظه ببینید.
            </h2>
            <p className="section-text">
              بعد از تحویل خودرو، یک لینک اختصاصی دریافت می‌کنید که تمام مراحل تعمیر را به صورت زنده نمایش می‌دهد — از دیاگ تا تحویل.
            </p>
            <div className="flex flex-col gap-3 mt-2">
              {["وضعیت زنده تعمیر", "فاکتور دیجیتال", "تاریخچه خدمات"].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" aria-hidden />
                  <span className="text-sm text-secondary">{f}</span>
                </div>
              ))}
            </div>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-gold hover:text-primary transition-colors"
            >
              رزرو و شروع
              <ChevronLeft className="w-4 h-4" aria-hidden />
            </a>
          </div>

          {/* right: mock dashboard UI */}
          <div className="dash-mock">
            {/* header bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-soft border border-gold/20 flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4 text-gold" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">BMW 320i — BMW2019</p>
                  <p className="text-xs text-muted">علی رضایی</p>
                </div>
              </div>
              <span className="text-[0.65rem] font-mono bg-amber-400/10 text-amber-400 px-2.5 py-1 rounded-full border border-amber-400/20 uppercase tracking-wider">
                در حال تعمیر
              </span>
            </div>

            {/* progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-muted mb-2">
                <span>پیشرفت کلی</span>
                <span className="font-mono text-gold">۵۷٪</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "57%",
                    background: "linear-gradient(90deg, rgba(250,204,21,0.9), rgba(250,204,21,0.4))",
                  }}
                />
              </div>
            </div>

            {/* stages */}
            <div className="flex flex-col gap-3">
              {stages.map(({ id, label, status, time }) => (
                <div
                  key={id}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    status === "active"
                      ? "bg-amber-400/5 border border-amber-400/15"
                      : status === "done"
                      ? "bg-white/[0.02]"
                      : "opacity-40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {statusIcon(status)}
                    <span className={`text-sm ${status === "pending" ? "text-muted" : "text-primary"}`}>
                      {label}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-muted/60">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
