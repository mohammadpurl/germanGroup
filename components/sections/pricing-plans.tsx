"use client";

/**
 * PricingPlans — Client island
 *
 * Isolated because the billing toggle requires useState + AnimatePresence.
 * The parent pricing.tsx (server) renders the section shell and header.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

type Billing = "monthly" | "annual";

const plans = [
  {
    key:         "free",
    name:        "رایگان",
    price:       { monthly: 0,      annual: 0      },
    unit:        "تومان",
    description: "برای شروع آشنایی با ماینلند",
    features:    ["۱ حساب کاربری", "۳ درس در ماه", "هوش مصنوعی پایه", "پیگیری پیشرفت"],
    cta:         "شروع رایگان",
    featured:    false,
  },
  {
    key:         "growth",
    name:        "پیشرفته",
    price:       { monthly: 150000, annual: 110000 },
    unit:        "تومان / ماه",
    description: "تجربه کامل ماینلند برای خانواده",
    features:    ["تا ۳ کاربر", "دروس نامحدود", "هوش مصنوعی کامل", "گزارش پیشرفت", "پشتیبانی اولویت‌دار"],
    cta:         "شروع یک ماه رایگان",
    featured:    true,
  },
  {
    key:         "school",
    name:        "مدرسه",
    price:       { monthly: null,   annual: null   },
    unit:        "",
    description: "برای مدارس و سازمان‌ها",
    features:    ["دانش‌آموز نامحدود", "پنل معلم پیشرفته", "مدیریت کلاس", "تحلیل هوش مصنوعی", "پشتیبانی اختصاصی"],
    cta:         "تماس بگیرید",
    featured:    false,
  },
] as const;

export function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <>
      {/* Billing toggle */}
      <div className="flex justify-center mb-12">
        <div
          className="flex items-center rounded-xl p-1"
          style={{ background: "#F7F8FA", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          {(["monthly", "annual"] as Billing[]).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className="relative h-10 px-6 rounded-xl text-sm font-bold transition-colors"
              style={{ color: billing === b ? "#0B0F19" : "#9CA3AF" }}
            >
              {billing === b && (
                <motion.div
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
              <span className="relative">
                {b === "monthly" ? "ماهانه" : "سالانه"}
              </span>
              {b === "annual" && (
                <span
                  className="relative mr-2 text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: "rgba(0,255,178,0.12)", color: "#00996A" }}
                >
                  ۲۵٪ تخفیف
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={!plan.featured ? { scale: 1.02, y: -4 } : {}}
          >
            <div
              className="h-full p-8 rounded-2xl flex flex-col relative overflow-hidden"
              style={
                plan.featured
                  ? {
                      background:  "linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg,#6C5CE7,#3B82F6) border-box",
                      border:      "2px solid transparent",
                      boxShadow:   "0 8px 40px rgba(108,92,231,0.18)",
                    }
                  : {
                      background:  "#FFFFFF",
                      border:      "1px solid rgba(0,0,0,0.06)",
                      boxShadow:   "0 2px 12px rgba(0,0,0,0.04)",
                    }
              }
            >
              {plan.featured && (
                <div
                  className="absolute top-6 left-6 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #6C5CE7, #3B82F6)" }}
                >
                  محبوب‌ترین
                </div>
              )}

              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6C5CE7", letterSpacing: "0.12em" }}>
                {plan.name}
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${plan.key}-${billing}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4"
                >
                  {plan.price[billing] === null ? (
                    <span className="font-extrabold text-2xl" style={{ color: "#0B0F19" }}>سفارشی</span>
                  ) : (
                    <div className="flex items-end gap-2">
                      <span className="font-extrabold" style={{ fontSize: "1.75rem", color: "#0B0F19", lineHeight: "1" }}>
                        {plan.price[billing] === 0 ? "رایگان" : plan.price[billing]!.toLocaleString("fa-IR")}
                      </span>
                      {plan.price[billing] !== 0 && (
                        <span className="text-xs mb-1" style={{ color: "#9CA3AF" }}>{plan.unit}</span>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <p className="text-sm mb-8" style={{ color: "#6B7280", lineHeight: "1.75", maxWidth: "none" }}>
                {plan.description}
              </p>

              <ul className="flex flex-col gap-4 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-4">
                    <Check className="w-4 h-4 shrink-0" style={{ color: plan.featured ? "#6C5CE7" : "#00FFB2" }} />
                    <span className="text-sm" style={{ color: "#374151" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl font-bold text-sm mt-auto"
                style={
                  plan.featured
                    ? { background: "linear-gradient(135deg, #6C5CE7, #3B82F6)", color: "#fff", boxShadow: "0 8px 32px rgba(108,92,231,0.3)" }
                    : { border: "1px solid rgba(0,0,0,0.1)", color: "#0B0F19", background: "transparent" }
                }
              >
                {plan.cta}
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
