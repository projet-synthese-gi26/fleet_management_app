import React from 'react';
import { StatCard } from './StatCard';

export const StatsGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
                title="Daily Distance" 
                value="124" 
                unit="km" 
                trendIcon="trending_up" 
                trendText="+12% vs avg" 
                trendColor="text-[#0bda5b]" 
                icon="distance" 
            />
            <StatCard 
                title="Driving Hours" 
                value="4h 20m" 
                trendIcon="trending_up" 
                trendText="On track" 
                trendColor="text-[#0bda5b]" 
                icon="schedule" 
            />
            <StatCard 
                title="Fuel Efficiency" 
                value="8.5" 
                unit="L/100km" 
                trendIcon="trending_down" 
                trendText="-2% vs avg" 
                trendColor="text-[#fa6238]" 
                icon="local_gas_station" 
            />
        </div>
    );
};
