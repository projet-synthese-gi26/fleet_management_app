"use client";

import React from 'react';
import { useI18n } from '@/hooks/useI18n';
import Modal from '@/components/ui/Modal';
import { DriverMission } from '@/data/mockDriverHistory';

interface TripSummaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    mission: DriverMission | null;
}

export const TripSummaryModal: React.FC<TripSummaryModalProps> = ({ isOpen, onClose, mission }) => {
    const { t } = useI18n();

    if (!mission) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={t('tripSummaryTitle', 'driverHistoryPage', { missionId: mission.id })}
        >
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('missionDetails', 'driverHistoryPage')}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>{t('date', 'driverHistoryPage')}:</strong> {mission.date}</p>
                    <p><strong>{t('duration', 'driverHistoryPage')}:</strong> {mission.duration}</p>
                    <p><strong>{t('origin', 'driverHistoryPage')}:</strong> {mission.origin}</p>
                    <p><strong>{t('destination', 'driverHistoryPage')}:</strong> {mission.destination}</p>
                    <p><strong>{t('distance', 'driverHistoryPage')}:</strong> {mission.distance} km</p>
                    <p><strong>{t('fuelConsumption', 'driverHistoryPage')}:</strong> {mission.fuelConsumed} L</p>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">{t('routeMap', 'driverHistoryPage')}</h3>
                {/* Placeholder for Map */}
                <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full flex items-center justify-center rounded-md text-gray-500 dark:text-gray-400">
                    {t('mapPlaceholder', 'driverHistoryPage')}
                </div>

                {mission.alerts && mission.alerts.length > 0 && (
                    <>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">{t('geofencingAlerts', 'driverHistoryPage')}</h3>
                        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                            {mission.alerts.map((alert, index) => (
                                <li key={index}>{alert}</li>
                            ))}
                        </ul>
                    </>
                )}

                <button
                    onClick={onClose}
                    className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                    {t('close', 'common')}
                </button>
            </div>
        </Modal>
    );
};
