"use client";
/**
 * Reservation Section — minimal Persian booking form
 */
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { DarkSelect } from "@/components/ui/dark-select";
import { Calendar, Phone, Car, Wrench, ChevronLeft } from "lucide-react";

const services = [
  "تعمیر موتور",
  "تعمیر گیربکس",
  "دیاگنوستیک",
  "دیتیلینگ / PDR",
  "سرویس دوره‌ای",
  "سایر",
];

const times = ["۹:۰۰", "۱۰:۳۰", "۱۲:۰۰", "۱۴:۰۰", "۱۵:۳۰", "۱۷:۰۰"];

export function ReservationSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    car: "",
    service: "",
    time: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="booking" className="relative scroll-mt-24 py-24 lg:py-36 overflow-hidden">
      {/* bg accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(250,204,21,0.05), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
        aria-hidden
      />

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* left: copy */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <p className="section-subtitle flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gold shrink-0" aria-hidden />
              رزرو نوبت
            </p>
            <h2 className="section-title">
              نوبت سرویس
              <br />
              خود را رزرو کنید.
            </h2>
            <p className="section-text">
              پس از ثبت، تیم ما ظرف ۳۰ دقیقه با شما تماس می‌گیرد و نوبت تأیید می‌شود.
            </p>

            {/* contact info */}
            <div className="flex flex-col gap-3 mt-4">
              <a
                href="tel:+989122262329"
                className="flex items-center gap-3 text-sm text-secondary hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden />
                <span>
                  <span className="font-mono" dir="ltr">
                    ۰۹۱۲۲۲۶۲۳۲۹
                  </span>
                  <span className="text-muted"> — مهدی بابایی</span>
                </span>
              </a>
            </div>
          </div>

          {/* right: form */}
          <div className="res-form-wrap">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 min-h-[360px] text-center">
                <div className="w-14 h-14 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-green-400" aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-primary">نوبت ثبت شد</h3>
                <p className="text-sm text-secondary max-w-xs">
                  به زودی با شما تماس می‌گیریم تا جزئیات را تأیید کنیم.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
                {/* name */}
                <div className="res-field">
                  <label className="res-label" htmlFor="res-name">
                    نام شما
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    className="res-input"
                    placeholder="علی رضایی"
                    value={form.name}
                    onChange={set("name")}
                    required
                  />
                </div>

                {/* phone */}
                <div className="res-field">
                  <label className="res-label" htmlFor="res-phone">
                    شماره تماس
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    className="res-input"
                    placeholder="۰۹۱۲ ×× ×× ×××"
                    value={form.phone}
                    onChange={set("phone")}
                    required
                  />
                </div>

                {/* car */}
                <div className="res-field">
                  <label className="res-label" htmlFor="res-car">
                    مدل خودرو
                  </label>
                  <div className="relative">
                    <Car
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40 pointer-events-none"
                      aria-hidden
                    />
                    <input
                      id="res-car"
                      type="text"
                      className="res-input pr-11"
                      placeholder="BMW 320i 2019"
                      value={form.car}
                      onChange={set("car")}
                    />
                  </div>
                </div>

                <DarkSelect
                  id="res-service"
                  label="نوع خدمت"
                  value={form.service}
                  onChange={(service) => setForm((p) => ({ ...p, service }))}
                  options={services}
                  placeholder="انتخاب کنید"
                  required
                />

                {/* time slots */}
                <div className="res-field">
                  <label className="res-label">زمان ترجیحی</label>
                  <div className="grid grid-cols-3 gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, time: t }))}
                        className={`time-slot ${form.time === t ? "time-slot-active" : ""}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* submit */}
                <button type="submit" className="res-submit group">
                  ثبت نوبت
                  <ChevronLeft
                    className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                    aria-hidden
                  />
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
