import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    unit?: string;
    trendIcon?: string; // e.g., 'trending_up', 'trending_down'
    trendText?: string; // e.g., '+12% vs avg', 'On track'
    trendColor?: string; // e.g., 'text-[#0bda5b]', 'text-[#fa6238]'
    icon: string; // Material Symbols icon name
}

export const StatCard = ({ title, value, unit, trendIcon, trendText, trendColor, icon }: StatCardProps) => {
    return (
        <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-[#283039] shadow-sm border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
                <span className="material-symbols-outlined text-primary/80">{icon}</span>
            </div>
            <div>
                <p className="text-3xl font-bold tracking-tight">
                    {value} {unit && <span className="text-lg text-slate-500 font-normal">{unit}</span>}
                </p>
            </div>
            {trendText && (
                <div className={`flex items-center gap-1 ${trendColor} text-sm font-medium`}>
                    {trendIcon && <span className="material-symbols-outlined text-sm">{trendIcon}</span>}
                    <span>{trendText}</span>
                </div>
            )}
        </div>
    );
};
