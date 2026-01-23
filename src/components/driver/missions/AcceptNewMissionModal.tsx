"use client";
import React, { useState } from 'react';
import { useI18n } from '@/hooks/useI18n';
import type { Mission } from '@/data/mockMissions'; // Assuming Mission type is reusable

interface AcceptNewMissionModalProps {
    mission: Mission; // The new mission to be accepted/rejected
    onAccept: (missionId: string) => void;
    onReject: (missionId: string, reason: string) => void;
    onClose: () => void;
}

export const AcceptNewMissionModal = ({ mission, onAccept, onReject, onClose }: AcceptNewMissionModalProps) => {
    const { t } = useI18n();
    const [rejectReason, setRejectReason] = useState('');

    const handleAccept = () => {
        onAccept(mission.id);
        onClose();
    };

    const handleReject = () => {
        onReject(mission.id, rejectReason);
        onClose();
    };

    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg">{t('acceptNewMissionTitle', 'driverMissionsPage')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t('newMissionAssigned', 'driverMissionsPage')} {mission.id}.
                    <br/>
                    {t('newMissionDetails', 'driverMissionsPage')}
                </p>
                <div className="mt-2 text-sm text-slate-900 dark:text-white">
                    <p><strong>{t('origin', 'driverMissionsPage')}:</strong> {mission.origin.name}</p>
                    <p><strong>{t('destination', 'driverMissionsPage')}:</strong> {mission.destination.name}</p>
                    <p><strong>{t('date', 'driverMissionsPage')}:</strong> {mission.date}</p>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="rejectReason" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {t('rejectReason', 'driverMissionsPage')}
                </label>
                <textarea
                    id="rejectReason"
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder={t('rejectReasonPlaceholder', 'driverMissionsPage')}
                ></textarea>
            </div>

            <div className="flex justify-end gap-3">
                <button 
                    onClick={handleReject}
                    className="px-4 py-2 rounded-lg border border-red-500 text-red-500 font-medium text-sm hover:bg-red-500/10 transition-all"
                >
                    {t('rejectMission', 'driverMissionsPage')}
                </button>
                <button 
                    onClick={handleAccept}
                    className="px-4 py-2 rounded-lg bg-primary text-white font-medium text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
                >
                    {t('acceptMission', 'driverMissionsPage')}
                </button>
            </div>
        </div>
    );
};
