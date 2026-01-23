"use client";
import React from 'react';
import { StatCard } from './StatCard';
import { useI18n } from '@/hooks/useI18n';

export const StatsGrid = () => {
    const { t } = useI18n();
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
                title={t('dailyDistance', 'driverDashboardPage')} 
                value="124" 
                unit="km" 
                trendIcon="trending_up" 
                trendText={t('dailyDistanceTrend', 'driverDashboardPage')}
                trendColor="text-[#0bda5b]" 
                icon="distance" 
            />
            <StatCard 
                title={t('drivingHours', 'driverDashboardPage')}
                value="4h 20m" 
                trendIcon="trending_up" 
                trendText={t('drivingHoursTrend', 'driverDashboardPage')}
                trendColor="text-[#0bda5b]" 
                icon="schedule" 
            />
            <StatCard 
                title={t('fuelEfficiency', 'driverDashboardPage')}
                value="8.5" 
                unit="L/100km" 
                trendIcon="trending_down" 
                trendText={t('fuelEfficiencyTrend', 'driverDashboardPage')}
                trendColor="text-[#fa6238]" 
                icon="local_gas_station" 
            />
        </div>
    );
};
