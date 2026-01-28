"use client";
import React from 'react';
import { useI18n } from '@/hooks/useI18n';

interface StartMissionConfirmationModalProps {
    onConfirm: () => void;
    onClose: () => void;
}

export const StartMissionConfirmationModal = ({ onConfirm, onClose }: StartMissionConfirmationModalProps) => {
    const { t } = useI18n();
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg">{t('startMissionConfirmationTitle', 'driverMissionsPage')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t('startMissionConfirmationPrompt', 'driverMissionsPage')}
                </p>
            </div>
            <div className="flex justify-end gap-3">
                <button 
                    onClick={onClose} 
                    className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                    {t('cancel', 'common')}
                </button>
                <button 
                    onClick={onConfirm}
                    className="px-4 py-2 rounded-lg bg-primary text-white font-medium text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
                >
                    {t('confirmStart', 'driverMissionsPage')}
                </button>
            </div>
        </div>
    );
};
