import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4">
                {children}
            </main>
            <Footer />
        </>
    );
}
