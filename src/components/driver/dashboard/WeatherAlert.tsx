import React from 'react';

export const WeatherAlert = () => {
    return (
        <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <span className="text-blue-100 text-sm font-medium">Weather Alert</span>
                        <span className="font-bold text-xl">Heavy Rain</span>
                    </div>
                    <span className="material-symbols-outlined text-4xl text-blue-200">rainy</span>
                </div>
                <p className="text-sm text-blue-50 leading-relaxed">Drive carefully. Wet road conditions reported on Route 66 near Distribution Center B.</p>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>
    );
};
