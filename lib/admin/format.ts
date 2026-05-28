import type { BookingStatus } from "@/lib/server/domain";

const PRICE_FORMATTER = new Intl.NumberFormat("fa-IR");

const DATE_FORMATTER = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("fa-IR", {
  hour: "2-digit",
  minute: "2-digit",
});

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  requested: "درخواست شده",
  pendingApproval: "در انتظار تایید",
  confirmed: "تایید شده",
  inProgress: "در حال انجام",
  waitingParts: "انتظار قطعه",
  qualityCheck: "کنترل کیفیت",
  completed: "تکمیل شده",
  delivered: "تحویل داده شده",
  cancelled: "لغو شده",
};

export const BOOKING_STATUS_COLORS: Record<BookingStatus, string> = {
  requested: "text-secondary bg-white/5",
  pendingApproval: "text-gold-light bg-gold/10",
  confirmed: "text-blue-accent bg-blue-accent/10",
  inProgress: "text-gold-light bg-gold/15 border border-gold/30",
  waitingParts: "text-amber-300 bg-amber-500/10",
  qualityCheck: "text-blue-accent bg-blue-accent/10",
  completed: "text-emerald-300 bg-emerald-500/10",
  delivered: "text-emerald-400 bg-emerald-500/15",
  cancelled: "text-red-300 bg-red-500/10",
};

export function formatPrice(amount: number) {
  return `${PRICE_FORMATTER.format(amount)} تومان`;
}

export function formatPersianDate(isoDate: string) {
  return DATE_FORMATTER.format(new Date(isoDate));
}

export function formatPersianTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours || 0, minutes || 0, 0, 0);
  return TIME_FORMATTER.format(date);
}

export function formatDateTime(iso: string) {
  return `${DATE_FORMATTER.format(new Date(iso))} · ${TIME_FORMATTER.format(new Date(iso))}`;
}

export function isToday(isoDate: string) {
  const today = new Date().toISOString().slice(0, 10);
  return isoDate.slice(0, 10) === today;
}
