export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];
/** @deprecated Use Locale */
export type Lang = Locale;
export const defaultLang: Locale = "fa";

const rtlLocales: ReadonlyArray<Locale> = ["fa"];

export function isRTL(locale: Locale): boolean {
  return (rtlLocales as ReadonlyArray<string>).includes(locale);
}
