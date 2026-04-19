import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Assure-toi que ce chemin est correct vers ta config i18n
import { locales, defaultLocale } from "./lib/i18n/config";

/**
 * La fonction middleware doit être exportée soit en tant que 'middleware' 
 * soit en tant qu'export par défaut.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Vérifie si le chemin commence déjà par une locale (ex: /fr/dashboard)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Si la locale est présente, on laisse passer la requête
  if (pathnameHasLocale) return NextResponse.next();

  // 2. Si aucune locale n'est présente, on redirige vers la locale par défaut
  const locale = defaultLocale;
  
  // On construit la nouvelle URL
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  // Redirection 307 (Temporaire) vers l'URL avec locale
  return NextResponse.redirect(url);
}

/**
 * Le matcher définit sur quelles routes le middleware s'exécute.
 * On exclut les fichiers statiques, l'api, etc.
 */
export const config = {
  matcher: [
    // Exclure les fichiers internes de Next.js et les fichiers statiques (images, etc.)
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\..*).*)",
  ],
};