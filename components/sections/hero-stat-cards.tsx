import { Cog, Gauge, CalendarCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: Cog,
    title: "موتور و گیربکس",
    desc: "تعمیر تخصصی با قطعات استاندارد",
  },
  {
    icon: Gauge,
    title: "دیاگ پیشرفته",
    desc: "عیب‌یابی دقیق خودروهای آلمانی",
  },
  {
    icon: CalendarCheck,
    title: "رزرو آنلاین",
    desc: "نوبت‌دهی با تأیید پیامکی",
  },
] as const;

export function HeroStatCards() {
  return (
    <div className="absolute inset-x-0 bottom-2 sm:bottom-4 lg:bottom-6 z-30 pointer-events-none">
      <Container className="pointer-events-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-5xl ms-auto me-0">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className={cn(
                  "stat-card flex items-center gap-4 card-hover",
                  i === 0 && "hero-stat-float",
                  i === 1 && "hero-stat-float-delay",
                  i === 2 && "hero-stat-float-delay-2"
                )}
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-accent-soft border border-gold/25 shrink-0 glow-gold">
                  <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-base lg:text-lg font-semibold text-primary leading-tight">
                    {stat.title}
                  </p>
                  <p className="stat-label !mt-1.5 text-xs lg:text-sm">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
