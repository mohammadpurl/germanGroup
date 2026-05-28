import { FooterSection } from "@/components/sections/footer-section";
import { GermanNavbar } from "@/components/nav/german-navbar";
import { MobileDock } from "@/components/nav/mobile-dock";
import { locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const locale = lang as Locale;

  return (
    <>
      <GermanNavbar locale={locale} />
      {children}
      <FooterSection locale={locale} />
      <MobileDock locale={locale} />
    </>
  );
}
