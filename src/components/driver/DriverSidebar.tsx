"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/hooks/useI18n'; // Import useI18n

const ProfileCard = () => (
    <div className="flex items-center gap-3">
        <div 
            className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 border-2 border-primary" 
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTS7zd9rfNIFf0b-_6YDR1-bNk7pg_8oxup0mJnDpI2VUHu7QJNxwheB7_QQxJa5_wsFz4B9HKmnT6GQs0yCF7fgv5R-FAz8SmFvAx-FWiJ_rK2ag_ZKP5dKbAdIChDY8BBLZGoNUTZ2o_B6p7qQ1T7dWwae35wTrY8Fl3s-Own22ML1-Dr9aLrMj53FB_NgadOPOIn_Zu2bavbroQzJFDzxEYFyBbR9kmz_eWLfRClDWV7ST_ei_AeKbcBRyQIVxTwU03n3idh4fn")'}}
        >
        </div>
        <div className="flex flex-col">
            <h1 className="text-base font-semibold leading-tight">Alex Driver</h1>
            <p className="text-slate-500 dark:text-[#9dabb9] text-xs">ID: #88392</p>
        </div>
    </div>
);

const NavLink = ({ href, icon, label }) => {
    const pathname = usePathname();
    const { locale } = useI18n(); // Get current locale
    const isActive = pathname.includes(href);
    
    const actualHref = `/${locale}` + href; // Dynamically construct href with current locale

    return (
        <Link href={actualHref} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            isActive 
                ? "bg-primary text-white" 
                : "text-slate-600 dark:text-[#9dabb9] hover:bg-slate-100 dark:hover:bg-[#283039] hover:text-slate-900 dark:hover:text-white"
        }`}>
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
};

const LogoutButton = () => {
    const { t } = useI18n();
    return (
        <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg h-10 bg-slate-100 dark:bg-[#283039] text-slate-900 dark:text-white text-sm font-medium hover:bg-slate-200 dark:hover:bg-[#3e4856] transition-colors">
                <span className="material-symbols-outlined text-[18px]">logout</span>
                <span>{t('logout', 'driverSidebar')}</span>
            </button>
        </div>
    );
};

export const DriverSidebar = () => {
    const { t } = useI18n();
    const navLinks = [
        { href: "/driver/dashboard", icon: "dashboard", label: t('dashboard', 'driverSidebar') },
        { href: "/driver/missions", icon: "map", label: t('missions', 'driverSidebar') },
        { href: "/driver/history", icon: "history", label: t('history', 'driverSidebar') },
        { href: "/driver/documents", icon: "description", label: t('documents', 'driverSidebar') },
        { href: "/driver/settings", icon: "settings", label: t('settings', 'driverSidebar') },
    ];
    return (
        <aside className="w-64 flex-shrink-0 flex flex-col bg-white dark:bg-[#111418] border-r border-slate-200 dark:border-slate-800">
            <div className="p-6">
                <div className="mb-8">
                  <ProfileCard />
                </div>
                <nav className="flex flex-col gap-1">
                    {navLinks.map(link => <NavLink key={link.href} {...link} />)}
                </nav>
            </div>
            <LogoutButton />
        </aside>
    );
};
