import { NextResponse } from "next/server";
import { defaultLang, locales } from "@/lib/i18n";

export function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin")
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some((locale) => {
    return pathname === `/${locale}` || pathname.startsWith(`/${locale}/`);
  });

  if (!hasLocale) {
    url.pathname = `/${defaultLang}${pathname}`;
    return NextResponse.redirect(url, 308);
  }

  const locale =
    locales.find(
      (currentLocale) =>
        pathname === `/${currentLocale}` || pathname.startsWith(`/${currentLocale}/`)
    ) || defaultLang;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-current-locale", locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};