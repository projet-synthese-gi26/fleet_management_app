"use client";
import React from 'react';
import { useI18n } from '@/hooks/useI18n';
import type { Mission } from '@/data/mockMissions';

interface MissionDetailsModalProps {
    mission: Mission | null;
    onClose: () => void;
    onStartTripClick: (mission: Mission) => void;
}

export const MissionDetailsModal = ({ mission, onClose, onStartTripClick }: MissionDetailsModalProps) => {
    const { t } = useI18n();

    if (!mission) return null;

    // This is a simplified version of the complex map SVG from the HTML.
    // A real implementation would use a mapping library like Leaflet.
    const MapVisualization = () => (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5));'}}>
            <path d="M 100 250 Q 150 200 200 180 T 300 150" fill="none" stroke="#137fec" strokeDasharray="8 4" strokeLinecap="round" strokeWidth="4"></path>
            <circle cx="100" cy="250" r="6" fill="#137fec" stroke="white" strokeWidth="2"></circle>
            <circle cx="300" cy="150" r="6" fill="white" stroke="#137fec" strokeWidth="2"></circle>
        </svg>
    );

    return (
        <div className="layout-content-container flex flex-col w-full max-w-[1024px] max-h-[90vh] bg-background-dark border border-border-dark rounded-xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border-dark bg-surface-dark/50">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <h2 className="text-white tracking-light text-xl font-bold leading-tight">{t('mission', 'driverMissionsPage')} {mission.id}</h2>
                        <div className="flex h-6 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/20 px-3 border border-primary/30">
                            <p className="text-primary text-xs font-semibold leading-normal">{t(mission.status.toLowerCase(), 'driverMissionsPage')}</p>
                        </div>
                    </div>
                    <p className="text-text-secondary text-sm font-normal">{t('assignedOn', 'driverMissionsPage')} {mission.date}</p>
                </div>
                <button onClick={onClose} className="group flex h-10 w-10 items-center justify-center rounded-full bg-transparent hover:bg-border-dark transition-colors">
                    <span className="material-symbols-outlined text-text-secondary group-hover:text-white" style={{ fontSize: '24px' }}>close</span>
                </button>
            </div>

            {/* Modal Content Grid */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* Left Column */}
                <div className="flex-1 lg:flex-[0_0_40%] flex flex-col overflow-y-auto border-b lg:border-b-0 lg:border-r border-border-dark bg-background-dark">
                    <div className="p-6 pb-2">
                        <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-5">{t('route', 'driverMissionsPage')}</h3>
                        {/* Route Timeline Here */}
                    </div>
                     <div className="px-6 py-2">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4 rounded-xl bg-surface-dark p-4 border border-border-dark">
                            {/* Details Grid Here */}
                        </div>
                    </div>
                    <div className="p-6 pt-2">
                        <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-3 mt-4">{t('onSiteContact', 'driverMissionsPage')}</h3>
                        {/* Contact Card Here */}
                    </div>
                </div>
                {/* Right Column: Map */}
                <div className="flex-1 lg:flex-[0_0_60%] relative bg-[#151c24] min-h-[300px]">
                    <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: 'url("/map-placeholder.png")', filter: 'grayscale(100%) invert(100%) hue-rotate(180deg) brightness(0.6) contrast(1.2)', mixBlendMode: 'luminosity'}}></div>
                    <MapVisualization />
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border-dark bg-background-dark flex items-center justify-between shrink-0">
                <button className="text-text-secondary hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">help</span>
                    {t('reportProblem', 'driverMissionsPage')}
                </button>
                <div className="flex gap-3">
                    <button onClick={onClose} className="px-5 py-2.5 rounded-lg border border-border-dark text-white font-medium text-sm hover:bg-surface-dark transition-all">
                        {t('back', 'driverMissionsPage')}
                    </button>
                    <button onClick={() => onStartTripClick(mission)} className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">near_me</span>
                        {t('startTrip', 'driverMissionsPage')}
                    </button>
                </div>
            </div>
        </div>
    );
};
