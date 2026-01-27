"use client";
import React from 'react';
import { useI18n } from '@/hooks/useI18n';

export const CurrentMissionCard = ({ onCallDispatchClick }) => {
    const { t } = useI18n();
    return (
        <div className="rounded-xl overflow-hidden bg-white dark:bg-[#1c2127] shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                    </div>
                    <h3 className="font-bold text-lg">{t('currentMissionTitle', 'driverDashboardPage', { missionId: '#9921' })}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
                    {t('inProgressStatus', 'driverDashboardPage')}
                </span>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-5/12 h-64 md:h-auto bg-slate-900 relative">
                    <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYopcrkzJ8bIVSSqOPssj6nndup7f8CS3RRrm6FBPSUqBvyzKibu90svN7CAuDjgYX2e1ZFa1wdPMWpF61eNl7V68qEnWWrS72ycMooW6WTqRrLn9WL_45tMiKK4L9Kfj5FqKLRS08wIbe3DvuKtHYYg2OyYR4Y7_TBBJ1NtApkaExffXUvfOc1n6S_Ezd6mC7gFKco3GPib4vN6vOoc1hs9Vy5FvkLcs9NNXgE1Mg4daotZqy0sc9XBURHO4MGZ5f5VFsoIp-fuCu")', filter: 'grayscale(100%) brightness(0.6) contrast(1.2)'}}>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c2127] to-transparent md:bg-gradient-to-r"></div>
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                        <div className="bg-[#1c2127]/90 backdrop-blur-sm p-3 rounded-lg border border-slate-700/50">
                            <div className="flex justify-between items-center text-xs text-[#9dabb9] mb-1">
                                <span>{t('distanceRemaining', 'driverDashboardPage')}</span>
                                <span>{t('etaLabel', 'driverDashboardPage')}</span>
                            </div>
                            <div className="flex justify-between items-end text-white">
                                <span className="font-bold text-lg">45.2 km</span>
                                <span className="font-bold text-lg text-primary">14:30</span>
                            </div>
                            <div className="mt-2 w-full bg-slate-700 rounded-full h-1.5">
                                <div className="bg-primary h-1.5 rounded-full" style={{width: "65%"}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="relative flex h-6 w-6">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-6 w-6 bg-primary border-2 border-white dark:border-[#1c2127]"></span>
                        </span>
                    </div>
                </div>
                <div className="w-full md:w-7/12 p-6 flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-4 relative">
                            <div className="absolute top-2 left-[11px] bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 h-[calc(100%-20px)]"></div>
                            <div className="flex flex-col gap-6 w-full z-10">
                                <div className="flex gap-4">
                                    <div className="mt-1 h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-[#1c2127] flex-shrink-0"></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 dark:text-[#9dabb9] uppercase font-bold tracking-wider">{t('originLabel', 'driverDashboardPage', { time: '08:00 AM' })}</span>
                                        <span className="text-slate-900 dark:text-white font-medium text-lg">{t('warehouseA', 'driverDashboardPage')}</span>
                                        <span className="text-slate-500 dark:text-slate-500 text-sm">{t('loadingDock', 'driverDashboardPage')}</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 h-6 w-6 rounded-full bg-primary border-4 border-white dark:border-[#1c2127] flex-shrink-0 shadow-[0_0_0_2px_rgba(19,127,236,0.3)]"></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-primary uppercase font-bold tracking-wider">{t('destinationLabel', 'driverDashboardPage', { eta: '14:30 PM' })}</span>
                                        <span className="text-slate-900 dark:text-white font-medium text-lg">{t('distributionCenterB', 'driverDashboardPage')}</span>
                                        <span className="text-slate-500 dark:text-slate-500 text-sm">{t('unloadingBay', 'driverDashboardPage')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <button className="flex-1 bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">{t('viewFullRouteButton', 'driverDashboardPage')}</button>
                        <button 
                            aria-label={t('callDispatchButton', 'driverDashboardPage')} 
                            onClick={onCallDispatchClick}
                            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white p-2 rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined">call</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};