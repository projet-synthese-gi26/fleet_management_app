import type { Metadata } from 'next';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.css';

export const metadata: Metadata = {
    title: 'FleetManager - Gestion de Flotte',
    description: 'Application de gestion de flotte de véhicules en temps réel',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body>
        <ThemeProvider>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}