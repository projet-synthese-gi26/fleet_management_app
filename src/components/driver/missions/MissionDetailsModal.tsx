"use client";
import React from 'react';
import { useI18n } from '@/hooks/useI18n';
import Modal from '@/components/ui/Modal'; // Import the generic Modal component
import type { Mission } from '@/data/mockMissions';

interface MissionDetailsModalProps {
    isOpen: boolean; // Add isOpen prop
    mission: Mission | null;
    onClose: () => void;
    onStartTripClick: (mission: Mission) => void;
    onReportIssueClick: (mission: Mission) => void;
}

export const MissionDetailsModal = ({ isOpen, mission, onClose, onStartTripClick, onReportIssueClick }: MissionDetailsModalProps) => {
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
        <Modal isOpen={isOpen} onClose={onClose} title={`${t('mission', 'driverMissionsPage')} ${mission.id}`}>
            {/* Modal Content Grid */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden max-h-[calc(90vh-120px)]"> {/* Adjusted max-h */}
                {/* Left Column */}
                <div className="flex-1 lg:flex-[0_0_40%] flex flex-col overflow-y-auto border-b lg:border-b-0 lg:border-r border-border-dark bg-background-dark">
                    <div className="p-6 pb-2">
                        <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-5">{t('route', 'driverMissionsPage')}</h3>
                        <div className="relative pl-2">
                            {/* Vertical Line */}
                            <div className="absolute left-[15px] top-3 bottom-8 w-[2px] bg-border-dark"></div>
                            {/* Origin */}
                            <div className="relative flex gap-4 mb-8">
                                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background-dark border-2 border-primary">
                                    <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                                </div>
                                <div className="flex flex-col pt-1">
                                    <span className="text-text-secondary text-xs uppercase font-medium">{t('originTime', 'driverMissionsPage', { time: '08:00 AM' })}</span>
                                    <span className="text-white text-base font-medium">{mission.origin.name}</span>
                                    <span className="text-text-secondary text-sm">{t('warehouseZone', 'driverMissionsPage')}</span>
                                </div>
                            </div>
                            {/* Destination */}
                            <div className="relative flex gap-4">
                                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background-dark border-2 border-white">
                                    <span className="material-symbols-outlined text-white" style={{ fontSize: '16px' }}>flag</span>
                                </div>
                                <div className="flex flex-col pt-1">
                                    <span className="text-text-secondary text-xs uppercase font-medium">{t('destinationTime', 'driverMissionsPage', { time: '11:45 AM' })}</span>
                                    <span className="text-white text-base font-medium">{mission.destination.name}</span>
                                    <span className="text-text-secondary text-sm">{t('terminalZone', 'driverMissionsPage')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div className="px-6 py-2">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4 rounded-xl bg-surface-dark p-4 border border-border-dark">
                            <div className="flex flex-col gap-1">
                                <p className="text-text-secondary text-xs font-normal">{t('cargoTypeLabel', 'driverMissionsPage')}</p>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">inventory_2</span>
                                    <p className="text-white text-sm font-medium">{t(mission.cargoType, 'driverMissionsPage', mission.cargoType)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-text-secondary text-xs font-normal">{t('distanceLabel', 'driverMissionsPage')}</p>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">straighten</span>
                                    <p className="text-white text-sm font-medium">{mission.distance}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 border-t border-border-dark pt-3">
                                <p className="text-text-secondary text-xs font-normal">{t('estimatedDurationLabel', 'driverMissionsPage')}</p>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                                    <p className="text-white text-sm font-medium">{mission.estimatedDuration}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 border-t border-border-dark pt-3">
                                <p className="text-text-secondary text-xs font-normal">{t('vehicleLabel', 'driverMissionsPage')}</p>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">local_shipping</span>
                                    <p className="text-white text-sm font-medium">{mission.vehicle}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 pt-2">
                        <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-3 mt-4">{t('onSiteContact', 'driverMissionsPage')}</h3>
                        <div className="flex items-center justify-between p-3 rounded-lg border border-border-dark bg-surface-dark/50 hover:bg-surface-dark transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-white font-bold text-sm">{mission.contactInitials}</div>
                                <div className="flex flex-col">
                                    <span className="text-white text-sm font-medium">{mission.contactName}</span>
                                    <span className="text-text-secondary text-xs">{t(mission.contactTitle, 'driverMissionsPage', mission.contactTitle)}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="h-8 w-8 rounded-full bg-border-dark flex items-center justify-center text-white hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined text-sm">call</span>
                                </button>
                                <button className="h-8 w-8 rounded-full bg-border-dark flex items-center justify-center text-white hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined text-sm">chat</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Column: Map */}
                <div className="flex-1 lg:flex-[0_0_60%] relative bg-[#151c24] min-h-[300px]">
                    <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: 'url("/map-placeholder.png")', filter: 'grayscale(100%) invert(100%) hue-rotate(180deg) brightness(0.6) contrast(1.2)', mixBlendMode: 'luminosity'}}></div>
                    <MapVisualization />
                </div>
            </div>

            {/* Custom Footer within Modal content */}
            <div className="p-6 border-t border-border-dark bg-background-dark flex items-center justify-between shrink-0">
                <button onClick={() => onReportIssueClick(mission)} className="text-text-secondary hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
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
        </Modal>
    );
};
