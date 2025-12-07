'use client';

import { Header } from "@/src/components/layouts/Header";
import { Footer } from "@/src/components/layouts/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Header />
                <main className="flex flex-1 justify-center py-5 bg-background">
                    <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1 gap-12">
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}