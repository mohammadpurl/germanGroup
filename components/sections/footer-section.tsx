/**
 * Footer — minimal, German Group branding
 * Static Server Component
 */
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Phone, MapPin, Instagram, ChevronLeft } from "lucide-react";
import { MAIN_NAV_LINKS } from "@/lib/site-nav";

const INSTAGRAM_URL = "https://www.instagram.com/german.group/";
const PHONE_TEL = "tel:+989122262329";
const PHONE_DISPLAY = "۰۹۱۲۲۲۶۲۳۲۹";
const CONTACT_NAME = "مهدی بابایی";
const ADDRESS =
  "آدرس مجموعه: تهران، خیابان دارآباد، نرسیده به بیمارستان مسیح دانشوری";

const nav = MAIN_NAV_LINKS.map(({ label, href }) => ({ label, href }));

export function FooterSection() {
  return (
    <footer className="relative pt-16 pb-8 border-t border-white/6 overflow-hidden">
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
        aria-hidden
      />

      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* brand */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link href="/fa" className="flex w-fit shrink-0 items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-[#0a0f14]"
                style={{
                  background:
                    "linear-gradient(135deg, #e0c48a 0%, #c6a96b 50%, #8f6f3e 100%)",
                  boxShadow: "0 0 20px rgba(198,169,107,0.25)",
                }}
                aria-hidden
              >
                G
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
                  German Group
                </span>
                <span className="text-[0.65rem] text-muted leading-tight">
                  مهندسی دقیق، استاندارد آلمانی
                </span>
              </div>
            </Link>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-3 text-sm text-secondary hover:text-gold transition-colors"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 text-muted hover:border-gold/30 hover:text-gold">
                <Instagram className="h-4 w-4" aria-hidden />
              </span>
              <span dir="ltr" className="font-mono text-xs tracking-wide">
                @german.group
              </span>
            </a>
          </div>

          {/* navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted/60 font-medium mb-1">
              لینک‌ها
            </p>
            {nav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors group w-fit"
              >
                <ChevronLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                {label}
              </Link>
            ))}
          </div>

          {/* contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted/60 font-medium mb-1">
              تماس
            </p>
            <a
              href={PHONE_TEL}
              className="flex items-start gap-3 text-sm text-secondary hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
              <span className="leading-relaxed">
                <span className="block font-mono" dir="ltr">
                  {PHONE_DISPLAY}
                </span>
                <span className="block text-xs text-muted mt-0.5">{CONTACT_NAME}</span>
              </span>
            </a>
            <div className="flex items-start gap-3 text-sm text-secondary">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-muted" aria-hidden />
              <span className="leading-relaxed">{ADDRESS}</span>
            </div>
          </div>
        </div>

        {/* bottom strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
          <p className="text-xs text-muted/50">
            © {new Date().getFullYear()} German Group — تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs text-muted/30 font-mono">PRECISION · PERFORMANCE · TRUST</p>
        </div>
      </Container>
    </footer>
  );
}
