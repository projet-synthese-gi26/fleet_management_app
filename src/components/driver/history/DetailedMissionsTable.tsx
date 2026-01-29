"use client";

import React from 'react';
import { useI18n } from '@/hooks/useI18n';
import { DriverMission } from '@/data/mockDriverHistory';

interface DetailedMissionsTableProps {
    missions: DriverMission[];
    onViewDetails: (mission: DriverMission) => void;
    // Props for pagination display (not actual pagination logic)
    indexOfFirstMission: number;
    indexOfLastMission: number;
    filteredMissionsLength: number;
}

export const DetailedMissionsTable: React.FC<DetailedMissionsTableProps> = ({
    missions,
    onViewDetails,
    indexOfFirstMission,
    indexOfLastMission,
    filteredMissionsLength
}) => {
    const { t } = useI18n();

    // Helper to format date for display
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: '2-digit', year: 'numeric'
        });
    };

    // Helper for status badge styling
    const getStatusBadge = (mission: DriverMission) => {
        if (mission.status === 'incident' && mission.alerts.length > 0) {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                    {t('alert', 'driverHistoryPage')} ({t(mission.alerts[0], 'driverHistoryPage')})
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    {t('completed', 'DriverHistory', 'Statut Terminé')}
                </span>
            );
    };

    return (
        <div className="bg-white dark:bg-[#1c2127] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg">{t('pastTrips', 'driverHistoryPage')}</h3>
                {/* Future filter/more_vert buttons could go here */}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-[#232930] text-slate-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">{t('date', 'driverHistoryPage')}</th>
                            <th className="px-6 py-4">{t('tripId', 'driverHistoryPage')}</th>
                            <th className="px-6 py-4">{t('route', 'driverHistoryPage')}</th>
                            <th className="px-6 py-4">{t('distance', 'driverHistoryPage')}</th>
                            <th className="px-6 py-4">{t('duration', 'driverHistoryPage')}</th>
                            <th className="px-6 py-4">{t('status', 'driverHistoryPage')}</th>
                            <th className="px-6 py-4 text-right">{t('actions', 'driverHistoryPage')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {missions.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-500 dark:text-slate-400">
                                    {t('noMissionsFound', 'driverHistoryPage')}
                                </td>
                            </tr>
                        ) : (
                            missions.map((mission) => (
                                <tr key={mission.id} className="hover:bg-slate-50 dark:hover:bg-[#232930] transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">{formatDate(mission.date)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900 dark:text-white">{mission.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-slate-900 dark:text-white font-medium">{mission.origin}</span>
                                            <span className="text-xs text-slate-500">{t('to', 'driverHistoryPage')} {mission.destination}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">{mission.distance} km</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">{mission.duration}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(mission)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button onClick={() => onViewDetails(mission)} className="text-primary hover:text-blue-600 font-medium text-sm transition-colors">
                                            {t('viewDetails', 'driverHistoryPage')}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                    {t('showingEntries', 'driverHistoryPage', {
                        first: indexOfFirstMission + 1,
                        last: Math.min(indexOfLastMission, filteredMissionsLength),
                        total: filteredMissionsLength
                    })}
                </span>
                {/* Pagination buttons will be rendered by the parent component */}
            </div>
        </div>
    );
};
