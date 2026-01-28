"use client";
import React from 'react';
import { useI18n } from '@/hooks/useI18n';
import type { Mission } from '@/data/mockMissions';

interface UpcomingMissionCardProps {
    mission: Mission;
    onDetailsClick: () => void;
}

export const UpcomingMissionCard = ({ mission, onDetailsClick }: UpcomingMissionCardProps) => {
    const { t } = useI18n();

    return (
        <div className="rounded-xl bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-2">
                        {t('scheduled', 'driverMissionsPage')}
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">{t('mission', 'driverMissionsPage')} {mission.id}</h4>
                </div>
                <div className="flex flex-col items-end">
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                        {mission.date}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-4 relative pl-1">
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700 border-dashed border-l border-slate-300"></div>
                <div className="flex gap-3 relative z-10">
                    <div className="h-4 w-4 rounded-full border-2 border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-600 mt-0.5"></div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">{t('origin', 'driverMissionsPage')}</p>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">{mission.origin.name}</p>
                    </div>
                </div>
                <div className="flex gap-3 relative z-10">
                    <div className="h-4 w-4 rounded-full border-2 border-primary bg-white dark:bg-slate-800 mt-0.5"></div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">{t('destination', 'driverMissionsPage')}</p>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">{mission.destination.name}</p>
                    </div>
                </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button onClick={onDetailsClick} className="flex items-center gap-1 text-sm font-bold text-primary hover:text-blue-600 transition-colors">
                    {t('viewDetails', 'driverMissionsPage')} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};
