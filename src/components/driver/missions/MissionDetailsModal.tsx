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

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="">
            <div className="flex flex-col w-full max-w-[1024px] max-h-[90vh] bg-background-dark border border-border-dark rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-border-dark bg-surface-dark/50">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <h2 className="text-white tracking-light text-xl font-bold leading-tight">
                                                                 {t('mission', 'driverMissionsPage')} {mission.id} - {mission.origin.name} - {mission.destination.name}                            </h2>
                            {/* Status Chip */}
                            <div className="flex h-6 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/20 px-3 border border-primary/30">
                                <p className="text-primary text-xs font-semibold leading-normal">
                                    {t(mission.status, 'driverMissionsPage')}
                                </p>
                            </div>
                        </div>
                        <p className="text-text-secondary text-sm font-normal">
                            {t('assignedOn', 'driverMissionsPage')} {mission.date} • Logistique Express
                        </p>
                    </div>
                    <button onClick={onClose} className="group flex h-10 w-10 items-center justify-center rounded-full bg-transparent hover:bg-border-dark transition-colors">
                        <span className="material-symbols-outlined text-text-secondary group-hover:text-white" style={{ fontSize: '24px' }}>close</span>
                    </button>
                </div>
                {/* Modal Content Grid */}
                <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                    {/* Left Column: Details (Scrollable) */}
                    <div className="flex-1 lg:flex-[0_0_40%] flex flex-col overflow-y-auto border-b lg:border-b-0 lg:border-r border-border-dark bg-background-dark">
                        {/* Route Timeline */}
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
                        {/* Mission Details Grid */}
                        <div className="px-6 py-2">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-4 rounded-xl bg-surface-dark p-4 border border-border-dark">
                                <div className="flex flex-col gap-1">
                                    <p className="text-text-secondary text-xs font-normal">{t('cargoTypeLabel', 'driverMissionsPage')}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm">inventory_2</span>
                                        <p className="text-white text-sm font-medium">{t(mission.cargoType, 'driverMissionsPage')}</p>
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
                        {/* Contact Section */}
                        <div className="p-6 pt-2">
                            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-3 mt-4">{t('onSiteContact', 'driverMissionsPage')}</h3>
                            <div className="flex items-center justify-between p-3 rounded-lg border border-border-dark bg-surface-dark/50 hover:bg-surface-dark transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-white font-bold text-sm">{mission.contactInitials}</div>
                                    <div className="flex flex-col">
                                        <span className="text-white text-sm font-medium">{mission.contactName}</span>
                                        <span className="text-text-secondary text-xs">{t(mission.contactTitle, 'driverMissionsPage')}</span>
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
                    {/* Right Column: Interactive Map */}
                    <div className="flex-1 lg:flex-[0_0_60%] relative bg-[#151c24] min-h-[300px]">
                        {/* Map Image */}
                        <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWaKZJuaCFJProndoPt-CGgax92EGdsvJFVFW-mR4nHy7jTwvHcpzQnsv9U0FN4wH7q-Bwz8JAwtRgGrRABa_5SiuLFEpKJHz17ik0II70AWPO96q3aLTzNDn2INFs_FSZfuZJClfU2Zs4KiRsMNeyVqt02P6aqF9d8twhIvgtx6JVzFbo2lC0px7Dj3iSfTjuWKyJGrgtRZFVgTxh1XBtTEiozP1Rd_ZtAXzKdo9mxsrS1s9xA2U12FBs6m_xF2TE5-d2gAag_Bb")', filter: 'grayscale(100%) invert(100%) hue-rotate(180deg) brightness(0.6) contrast(1.2)', mixBlendMode: 'luminosity' }}></div>
                        {/* Simulated Map Overlay UI (Zoom controls etc) */}
                        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
                            <button className="h-10 w-10 bg-surface-dark text-white rounded-lg shadow-lg flex items-center justify-center hover:bg-border-dark border border-border-dark">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                            <button className="h-10 w-10 bg-surface-dark text-white rounded-lg shadow-lg flex items-center justify-center hover:bg-border-dark border border-border-dark">
                                <span className="material-symbols-outlined">remove</span>
                            </button>
                        </div>
                        {/* Map Route Visualization (Simulated overlay on top of image) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))' }}>
                            {/* Simulated Polyline */}
                            <path d="M 200 450 Q 300 350 350 300 T 550 150" fill="none" stroke="#137fec" strokeDasharray="8 4" strokeLinecap="round" strokeWidth="4"></path>
                            {/* Start Point */}
                            <circle cx="200" cy="450" fill="#137fec" r="6" stroke="white" strokeWidth="2"></circle>
                            {/* End Point */}
                            <circle cx="550" cy="150" fill="white" r="6" stroke="#137fec" strokeWidth="2"></circle>
                            {/* Tooltip for destination */}
                            <foreignObject height="40" width="160" x="565" y="135">
                                <div className="bg-surface-dark text-white text-xs px-2 py-1 rounded shadow-md border border-border-dark whitespace-nowrap" xmlns="http://www.w3.org/1999/xhtml">
                                    {mission.destination.name}
                                </div>
                            </foreignObject>
                        </svg>
                    </div>
                </div>
                {/* Footer / Action Bar */}
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
            </div>
        </Modal>
    );
};
