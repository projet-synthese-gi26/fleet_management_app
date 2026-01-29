"use client";

import React, { useState, useMemo } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { mockDriverMissions, mockDriverHistorySummary } from '@/data/mockDriverHistory';
import { TripSummaryModal } from '@/components/driver/history/TripSummaryModal';
import { SummaryCards } from '@/components/driver/history/SummaryCards';
import { DetailedMissionsTable } from '@/components/driver/history/DetailedMissionsTable';
import { DashboardHeader } from '@/components/driver/dashboard/DashboardHeader';

// Re-defining for clarity, in a real app this would be imported
interface DriverMission {
    id: string;
    date: string;
    startTime: string;
    duration: string;
    origin: string;
    destination: string;
    distance: number;
    status: 'completed' | 'incident';
    alerts: string[];
}

const DriverHistoryPage = () => {
    const { t } = useI18n();

    // State
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilterType, setDateFilterType] = useState<'thisMonth' | 'lastMonth' | 'custom'>('thisMonth');
    const [customStartDate, setCustomStartDate] = useState<string>('');
    const [customEndDate, setCustomEndDate] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const missionsPerPage = 5;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState<DriverMission | null>(null);
    
    // Data
    const missionsData: DriverMission[] = mockDriverMissions as DriverMission[];

    // Filtering and Searching
    const filteredMissions = useMemo(() => {
        let filtered = missionsData;

        // Apply date filter
        const today = new Date();
        if (dateFilterType === 'thisMonth') {
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            filtered = filtered.filter(mission => {
                const missionDate = new Date(mission.date);
                return missionDate >= startOfMonth && missionDate <= today;
            });
        } else if (dateFilterType === 'lastMonth') {
            const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            filtered = filtered.filter(mission => {
                const missionDate = new Date(mission.date);
                return missionDate >= startOfLastMonth && missionDate <= endOfLastMonth;
            });
        } else if (dateFilterType === 'custom' && customStartDate && customEndDate) {
            const start = new Date(customStartDate);
            const end = new Date(customEndDate);
            filtered = filtered.filter(mission => {
                const missionDate = new Date(mission.date);
                return missionDate >= start && missionDate <= end;
            });
        }

        // Apply search filter
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(mission =>
                mission.id.toLowerCase().includes(lowerCaseSearchTerm) ||
                mission.origin.toLowerCase().includes(lowerCaseSearchTerm) ||
                mission.destination.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        return filtered;
    }, [searchTerm, dateFilterType, customStartDate, customEndDate, missionsData]);

    // Pagination
    const indexOfLastMission = currentPage * missionsPerPage;
    const indexOfFirstMission = indexOfLastMission - missionsPerPage;
    const currentMissions = filteredMissions.slice(indexOfFirstMission, indexOfLastMission);
    const totalPages = Math.ceil(filteredMissions.length / missionsPerPage);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Handlers
    const handleViewDetails = (mission: DriverMission) => {
        setSelectedMission(mission);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMission(null);
    };

    // Export Handler
    const handleExport = () => {
        const headers = [
            t('date', 'driverHistoryPage'),
            t('tripId', 'driverHistoryPage'),
            t('route', 'driverHistoryPage'),
            t('distance', 'driverHistoryPage'),
            t('duration', 'driverHistoryPage'),
            t('status', 'driverHistoryPage')
        ].join(',');

        const csvContent = filteredMissions.map(mission => {
            const statusText = mission.status === 'completed' ? t('completed', 'driverHistoryPage') : `${t('alert', 'driverHistoryPage')} (${t(mission.alerts[0], 'driverHistoryPage')})`;
            return [
                mission.date,
                mission.id,
                `${mission.origin} ${t('to', 'driverHistoryPage')} ${mission.destination}`,
                `${mission.distance} km`,
                mission.duration,
                statusText
            ].map(e => `"${String(e).replace(/"/g, '""')}"`).join(','); // Escape quotes and join
        }).join('\n');

        const fullCsv = headers + '\n' + csvContent;

        const blob = new Blob([fullCsv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'driver_missions_history.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert(t('exportNotSupported', 'driverHistoryPage')); // Fallback for browsers not supporting download attribute
        }
    };
    
    return (
        <>
            <div className="max-w-[1440px] w-full mx-auto px-6 py-8 flex flex-col gap-6">
                <DashboardHeader 
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onNotificationsClick={() => { /* Placeholder for notification modal */ }}
                />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-black tracking-tight">{t('historyTitle', 'driverHistoryPage')}</h2>
                        <p className="text-slate-500 dark:text-[#9dabb9] text-base">{t('historySubtitle', 'driverHistoryPage')}</p>
                    </div>
                    <div className="flex gap-3">
                        <select 
                            className="flex items-center gap-2 px-4 h-10 rounded-lg bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-[#283039] transition-colors shadow-sm"
                            value={dateFilterType}
                            onChange={(e) => {
                                setDateFilterType(e.target.value as typeof dateFilterType);
                                if (e.target.value !== 'custom') {
                                    setCustomStartDate('');
                                    setCustomEndDate('');
                                }
                            }}
                        >
                            <option value="thisMonth">{t('thisMonth', 'driverHistoryPage')}</option>
                            <option value="lastMonth">{t('lastMonth', 'driverHistoryPage')}</option>
                            <option value="custom">{t('customRange', 'driverHistoryPage')}</option>
                        </select>
                        {dateFilterType === 'custom' && (
                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                                    value={customStartDate}
                                    onChange={(e) => setCustomStartDate(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                                    value={customEndDate}
                                    onChange={(e) => setCustomEndDate(e.target.value)}
                                />
                            </div>
                        )}
                        <button onClick={handleExport} className="flex items-center gap-2 px-4 h-10 rounded-lg bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                            {t('exportReport', 'driverHistoryPage')}
                        </button>
                    </div>
                </div>

                <SummaryCards 
                    distance={{ value: mockDriverHistorySummary.totalDistance, trend: "8.2" }}
                    trips={{ value: mockDriverHistorySummary.completedTrips, trend: "4" }}
                    score={{ value: Math.round(mockDriverHistorySummary.fuelEfficiency), trend: "0" }}
                />

                <DetailedMissionsTable
                    missions={currentMissions}
                    onViewDetails={handleViewDetails}
                    indexOfFirstMission={indexOfFirstMission}
                    indexOfLastMission={indexOfLastMission}
                    filteredMissionsLength={filteredMissions.length}
                />
                
                <div className="flex justify-end">
                    <div className="flex gap-2">
                        <button onClick={() => paginate(currentPage - 1)} className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#283039] disabled:opacity-50" disabled={currentPage === 1}>{t('previous', 'driverHistoryPage')}</button>
                        <button onClick={() => paginate(currentPage + 1)} className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#283039]" disabled={currentPage === totalPages}>{t('next', 'driverHistoryPage')}</button>
                    </div>
                </div>
            </div>
            
            <TripSummaryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                mission={selectedMission}
            />
        </>
    );
};

export default DriverHistoryPage;