"use client";
import React, { useState, useEffect } from 'react';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { useI18n } from '@/hooks/useI18n';

export const DashboardHeader = ({ onNotificationsClick }) => {
    const { t } = useI18n();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return (
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 pb-2">
            <div className="relative w-full md:max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
                </div>
                <input 
                    className="block w-full h-10 pl-10 pr-4 text-sm text-slate-900 border border-slate-200 rounded-lg bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-[#1c2127] dark:border-slate-800 dark:placeholder-slate-500 dark:text-white transition-all shadow-sm" 
                    placeholder={t('searchPlaceholder', 'driverDashboardPage')} 
                    type="text"
                />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
                <div className="flex items-center gap-2 px-3 h-10 rounded-lg bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 shadow-sm text-sm font-medium">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span>{formattedTime}</span>
                </div>
                <LanguageSelector />
                <ThemeSwitcher />
                <button 
                    aria-label={t('notificationsButton', 'driverDashboardPage')} 
                    onClick={onNotificationsClick}
                    className="relative flex items-center justify-center h-10 w-10 rounded-lg bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#283039] transition-colors text-slate-600 dark:text-slate-300 shadow-sm"
                >
                    <span className="material-symbols-outlined text-[20px]">notifications</span>
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#1c2127]"></span>
                </button>
            </div>
        </header>
    );
};
