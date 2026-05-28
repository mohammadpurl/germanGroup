export type JalaliDay = {
  isoDate: string;
  weekdayLabel: string;
  fullLabel: string;
  monthLabel: string;
  dayNumber: string;
};

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  weekday: "long",
});

const FULL_DATE_FORMATTER = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const MONTH_FORMATTER = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  month: "long",
});

const DAY_NUMBER_FORMATTER = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  day: "numeric",
});

export function getUpcomingJalaliDays(count = 7, from = new Date()): JalaliDay[] {
  return Array.from({ length: count }, (_, index) => {
    const current = new Date(from);
    current.setDate(from.getDate() + index);

    return {
      isoDate: current.toISOString().slice(0, 10),
      weekdayLabel: WEEKDAY_FORMATTER.format(current),
      fullLabel: FULL_DATE_FORMATTER.format(current),
      monthLabel: MONTH_FORMATTER.format(current),
      dayNumber: DAY_NUMBER_FORMATTER.format(current),
    };
  });
}

export function formatCurrencyFa(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

export function formatDateTimeFa(dateLike: string | Date) {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(typeof dateLike === "string" ? new Date(dateLike) : dateLike);
}
