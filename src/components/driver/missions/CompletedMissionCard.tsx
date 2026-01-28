"use client";
import React from 'react';
import { useI18n } from '@/hooks/useI18n';
import type { Mission } from '@/data/mockMissions';

interface CompletedMissionCardProps {
    mission: Mission;
    onDetailsClick: () => void;
}

export const CompletedMissionCard = ({ mission, onDetailsClick }: CompletedMissionCardProps) => {
    const { t } = useI18n();

    return (
        <div className="p-4 rounded-xl bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3 group hover:bg-slate-50 dark:hover:bg-[#232930] transition-colors">
            <div className="flex justify-between items-center">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    {t('completed', 'driverMissionsPage')}
                </span>
                <span className="text-xs text-slate-400">{mission.date}</span>
            </div>
            <div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">{t('id', 'driverMissionsPage')}: {mission.id}</span>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[100px]">{mission.origin.name}</span>
                    <span className="material-symbols-outlined text-slate-400 text-[16px]">arrow_right_alt</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[100px]">{mission.destination.name}</span>
                </div>
            </div>
            <button onClick={onDetailsClick} className="w-full mt-1 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-700 border border-transparent group-hover:border-slate-200 dark:group-hover:border-slate-600 transition-all">
                {t('viewDetails', 'driverMissionsPage')}
            </button>
        </div>
    );
};
