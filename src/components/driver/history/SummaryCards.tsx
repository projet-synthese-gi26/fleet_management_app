"use client";

import React from 'react';
import { useI18n } from '@/hooks/useI18n';

// A single reusable card component
const StatCard = ({ title, value, unit, icon, iconBgClass, trend, trendDirection, trendDescription }) => {
    const { t } = useI18n();

    const trendColor = trendDirection === 'up' ? 'text-[#0bda5b]' : 'text-slate-500';
    const trendBg = trendDirection === 'up' ? 'bg-[#0bda5b]/10' : 'bg-slate-100 dark:bg-slate-800';
    const trendIcon = trendDirection === 'up' ? 'trending_up' : (trendDirection === 'down' ? 'trending_down' : 'remove');

    return (
        <div className="flex flex-col gap-4 rounded-xl p-6 bg-white dark:bg-[#1c2127] shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
                    <h3 className="text-3xl font-bold tracking-tight">
                        {value} {unit && <span className="text-lg text-slate-400 font-normal">{unit}</span>}
                    </h3>
                </div>
                <div className={`h-10 w-10 rounded-lg ${iconBgClass} flex items-center justify-center`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
            </div>
            {trend && (
                <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-0.5 ${trendColor} ${trendBg} px-2 py-0.5 rounded text-xs font-bold`}>
                        <span className="material-symbols-outlined text-xs">{trendIcon}</span>
                        <span>{trend}</span>
                    </div>
                    <span className="text-xs text-slate-400">{trendDescription}</span>
                </div>
            )}
        </div>
    );
};


// The main component that orchestrates the cards
interface SummaryCardsProps {
    distance: { value: number; trend: string };
    trips: { value: number; trend: string };
    score: { value: number; trend: string };
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ distance, trips, score }) => {
    const { t } = useI18n();

    const cards = [
        {
            title: t('monthlyDistance', 'driverHistoryPage'),
            value: distance.value.toLocaleString(),
            unit: 'km',
            icon: 'distance',
            iconBgClass: 'bg-blue-50 dark:bg-blue-900/20 text-primary',
            trend: `${distance.trend}%`,
            trendDirection: 'up', // Assuming 'up' for demo
            trendDescription: t('vsLastMonth', 'driverHistoryPage'),
        },
        {
            title: t('tripsCompleted', 'driverHistoryPage'),
            value: trips.value,
            unit: null,
            icon: 'local_shipping',
            iconBgClass: 'bg-amber-50 dark:bg-amber-900/20 text-amber-500',
            trend: trips.trend,
            trendDirection: 'up', // Assuming 'up' for demo
            trendDescription: t('moreThanLastMonth', 'driverHistoryPage'),
        },
        {
            title: t('efficiencyScore', 'driverHistoryPage'),
            value: score.value,
            unit: '/100',
            icon: 'speed',
            iconBgClass: 'bg-green-50 dark:bg-green-900/20 text-green-500',
            trend: `${score.trend}%`,
            trendDirection: 'neutral', // Assuming 'neutral' for demo
            trendDescription: t('stableVsLastMonth', 'driverHistoryPage'),
        },
    ];

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
                <StatCard key={index} {...card} />
            ))}
        </section>
    );
};
