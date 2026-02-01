import type { Metadata } from "next";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "../../styles/globals.css";
import { Toaster } from 'sonner';
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Fleet Management and Geofencing System",
  description: "Real-time tracking, geofencing, and powerful analytics...",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className="light">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin=""
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        {/* The Material Symbols Rounded link is kept if it's used elsewhere, otherwise it can be removed */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="font-display bg-background-light dark:bg-background-dark text-[#0d131b] dark:text-white antialiased">
        <ThemeProvider>
          <I18nProvider>
            <AuthProvider>
              <main className="min-h-screen bg-background text-text-primary">
                {children}
              </main>
              <Toaster position="top-right" richColors closeButton />
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
