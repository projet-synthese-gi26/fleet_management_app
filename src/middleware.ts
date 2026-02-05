import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Vérifie si le chemin commence déjà par une locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // 2. Si aucune locale n'est présente, on redirige
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // On utilise une redirection interne (rewrite) ou externe (redirect)
  // redirect est préférable pour le SEO au début
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // On exclut plus explicitement les fichiers avec des extensions (images, sources, etc.)
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\..*).*)",
  ],
};
