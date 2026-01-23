"use client";
import React from 'react';
import { useI18n } from '@/hooks/useI18n'; // Import useI18n

export const ActionButtons = ({ onReportIssueClick, onStartBreakClick }) => {
    const { t } = useI18n(); // Use the hook

    return (
        <div className="flex gap-3">
            <button 
                onClick={onStartBreakClick}
                className="flex items-center gap-2 px-4 h-10 rounded-lg bg-slate-200 dark:bg-[#283039] text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-300 dark:hover:bg-[#38424f] transition-colors"
            >
                <span className="material-symbols-outlined text-[20px]">coffee</span>
                {t('startBreakButton', 'driverDashboardPage')}
            </button>
            <button 
                onClick={onReportIssueClick}
                className="flex items-center gap-2 px-4 h-10 rounded-lg bg-red-600/10 text-red-600 dark:text-red-400 border border-red-600/20 text-sm font-bold hover:bg-red-600/20 transition-colors"
            >
                <span className="material-symbols-outlined text-[20px]">report_problem</span>
                {t('reportIssueButton', 'driverDashboardPage')}
            </button>
        </div>
    );
};
