/**
 * Diagnostic Experience — technical scanning visuals, ECU data, ISTA / XENTRY
 * Static Server Component
 */
import { Container } from "@/components/ui/container";
import { ScanLine, Cpu, Activity, CircuitBoard, Gauge } from "lucide-react";

const systems = [
  { code: "ECU",   label: "واحد کنترل موتور",      status: "NOMINAL",  bar: 94 },
  { code: "TCU",   label: "کنترل گیربکس",           status: "NOMINAL",  bar: 88 },
  { code: "ABS",   label: "سیستم ترمز ضد قفل",      status: "NOMINAL",  bar: 100 },
  { code: "EPS",   label: "فرمان برقی",             status: "CHECK",    bar: 71 },
  { code: "DME",   label: "مدیریت موتور دیجیتال",   status: "NOMINAL",  bar: 97 },
  { code: "ZGW",   label: "دروازه مرکزی",           status: "NOMINAL",  bar: 85 },
];

const tools = [
  { name: "ISTA",    brand: "BMW / MINI",          icon: Cpu },
  { name: "XENTRY",  brand: "Mercedes-Benz",       icon: CircuitBoard },
  { name: "ODIS",    brand: "Audi / VW / Porsche", icon: Gauge },
  { name: "VCDS",    brand: "VAG Group",           icon: Activity },
];

export function DiagnosticSection() {
  return (
    <section id="diagnostic" className="relative scroll-mt-24 py-24 lg:py-36 overflow-hidden bg-[#040404]">
      {/* background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      {/* center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* left: copy */}
          <div className="flex flex-col gap-6">
            <p className="section-subtitle flex items-center gap-3">
              <ScanLine className="w-4 h-4 text-gold shrink-0" aria-hidden />
              دیاگنوستیک سیستم
            </p>
            <h2 className="section-title">
              عیب‌یابی تا
              <br />
              عمق ECU.
            </h2>
            <p className="section-text">
              با اسکنرهای اختصاصی هر برند، خطاهای پنهان را قبل از تبدیل شدن به خرابی جدی شناسایی می‌کنیم.
            </p>

            {/* diagnostic tools */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {tools.map(({ name, brand, icon: Icon }) => (
                <div key={name} className="diag-tool-card">
                  <Icon className="w-4 h-4 text-gold shrink-0" strokeWidth={1.5} aria-hidden />
                  <div>
                    <p className="text-sm font-bold text-primary">{name}</p>
                    <p className="text-xs text-muted">{brand}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* right: HUD terminal */}
          <div className="diag-terminal">
            {/* terminal header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/8 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-muted uppercase tracking-widest">
                  SYSTEM SCAN — LIVE
                </span>
              </div>
              <span className="text-xs font-mono text-muted/50">v4.2.1</span>
            </div>

            {/* systems */}
            <div className="flex flex-col gap-4">
              {systems.map(({ code, label, status, bar }) => (
                <div key={code} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-gold w-10">{code}</span>
                      <span className="text-sm text-secondary">{label}</span>
                    </div>
                    <span
                      className={`text-[0.65rem] font-mono font-semibold tracking-widest px-2 py-0.5 rounded-full ${
                        status === "NOMINAL"
                          ? "text-green-400 bg-green-400/10"
                          : "text-amber-400 bg-amber-400/10"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${bar}%`,
                        background:
                          status === "NOMINAL"
                            ? "linear-gradient(90deg, rgba(34,197,94,0.8), rgba(34,197,94,0.4))"
                            : "linear-gradient(90deg, rgba(251,191,36,0.8), rgba(251,191,36,0.4))",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* footer */}
            <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-between">
              <span className="text-xs font-mono text-muted/50">۵ سیستم سالم · ۱ نیاز به بررسی</span>
              <span className="text-xs font-mono text-green-400">SCAN COMPLETE</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
