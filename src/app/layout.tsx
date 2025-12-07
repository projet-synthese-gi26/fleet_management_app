import type { Metadata } from "next";
import "../styles//globals.css";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { I18nProvider } from "../components/providers/I18nProvider";

export const metadata: Metadata = {
    title: "Fleet Management and Geofencing System",
    description: "Real-time tracking, geofencing, and powerful analytics...",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <head>
            {/* Ajouter Material Icons */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
        </head>
        <body>
        <ThemeProvider>
            <I18nProvider>
                {children}
            </I18nProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}