"use client";
import React, { useState, useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';

// A mapping from OpenWeather main conditions to Material Symbols icons
const weatherIconMapping = {
    Thunderstorm: 'thunderstorm',
    Drizzle: 'weather_mix',
    Rain: 'rainy',
    Snow: 'weather_snowy',
    Mist: 'foggy',
    Smoke: 'foggy',
    Haze: 'foggy',
    Dust: 'air',
    Fog: 'foggy',
    Sand: 'air',
    Ash: 'air',
    Squall: 'windy',
    Tornado: 'tornado',
    Clear: 'clear_day',
    Clouds: 'cloudy',
};

export const WeatherAlert = () => {
    const { t } = useI18n();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch('/api/weather');
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setWeather(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <p className="text-blue-100">{t('loading', 'driverWeatherAlert')}</p>;
        }
        if (error) {
            return <p className="text-red-300">{t('error', 'driverWeatherAlert')}: {error}</p>;
        }
        if (weather) {
            const icon = weatherIconMapping[weather.condition] || 'cloudy'; // Default icon
            return (
                <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <span className="text-blue-100 text-sm font-medium">{t('title', 'driverWeatherAlert')}</span>
                            <span className="font-bold text-xl">{t(weather.condition, 'driverWeatherAlert', weather.condition)}</span>
                        </div>
                        <span className="material-symbols-outlined text-4xl text-blue-200">{icon}</span>
                    </div>
                    <p className="text-sm text-blue-50 leading-relaxed">
                        {t('advice', 'driverWeatherAlert').replace('{temp}', Math.round(weather.temp))}
                    </p>
                </div>
            );
        }
        return null;
    };
    
    return (
        <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden min-h-[160px]">
            {renderContent()}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>
    );
};
