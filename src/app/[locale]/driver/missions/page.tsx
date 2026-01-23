"use client";
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/driver/dashboard/DashboardHeader';
import { useI18n } from '@/hooks/useI18n';
import { MOCK_UPCOMING_MISSIONS, MOCK_COMPLETED_MISSIONS, Mission } from '@/data/mockMissions';
import { UpcomingMissionCard } from '@/components/driver/missions/UpcomingMissionCard';
import { CompletedMissionCard } from '@/components/driver/missions/CompletedMissionCard';
import { CurrentMissionCard } from '@/components/driver/dashboard/CurrentMissionCard';
import Modal from '@/components/ui/Modal';
import { MissionDetailsModal } from '@/components/driver/missions/MissionDetailsModal';
import { StartMissionConfirmationModal } from '@/components/driver/missions/StartMissionConfirmationModal';

const UpcomingMissions = ({ onMissionClick }) => {
    const { t } = useI18n();
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('upcomingMissions', 'driverMissionsPage')}</h2>
                <a className="text-sm font-medium text-primary hover:text-blue-500 transition-colors" href="#">{t('seeAll', 'driverMissionsPage')}</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_UPCOMING_MISSIONS.map(mission => (
                    <UpcomingMissionCard key={mission.id} mission={mission} onDetailsClick={() => onMissionClick(mission)} />
                ))}
            </div>
        </div>
    );
}

const CompletedMissions = ({ onMissionClick }) => {
    const { t } = useI18n();
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('completedMissions', 'driverMissionsPage')}</h2>
            <div className="flex flex-col gap-4">
                {MOCK_COMPLETED_MISSIONS.map(mission => (
                    <CompletedMissionCard key={mission.id} mission={mission} onDetailsClick={() => onMissionClick(mission)} />
                ))}
            </div>
        </div>
    );
}


const DriverMissionsPage = () => {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isStartConfirmationModalOpen, setIsStartConfirmationModalOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

    const openDetailsModal = (mission: Mission) => {
        setSelectedMission(mission);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedMission(null);
    };

    const openStartConfirmationModal = () => {
        setIsStartConfirmationModalOpen(true);
    };

    const closeStartConfirmationModal = () => {
        setIsStartConfirmationModalOpen(false);
    };

    const handleConfirmStartMission = () => {
        // Logic to actually start the mission tracking
        console.log(`Mission ${selectedMission?.id} confirmed to start.`);
        closeStartConfirmationModal();
        closeDetailsModal(); // Close details modal after confirmation
    };

    // Dummy function for now
    const handleCallDispatch = () => {
        console.log("Call Dispatch clicked");
    };

    return (
        <>
            <div className="max-w-[1440px] w-full mx-auto px-6 py-8 flex flex-col gap-6">
                <DashboardHeader />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 flex flex-col gap-8">
                        <CurrentMissionCard onCallDispatchClick={handleCallDispatch} />
                        <UpcomingMissions onMissionClick={openDetailsModal} />
                    </div>
                    <div className="flex flex-col gap-6">
                        <CompletedMissions onMissionClick={openDetailsModal} />
                    </div>
                </div>
            </div>
            <Modal isOpen={isDetailsModalOpen} onClose={closeDetailsModal} title="">
                <MissionDetailsModal 
                    mission={selectedMission} 
                    onClose={closeDetailsModal} 
                    onStartTripClick={() => {
                        closeDetailsModal(); // Close details modal first
                        openStartConfirmationModal(); // Then open confirmation
                    }}
                />
            </Modal>
            <Modal isOpen={isStartConfirmationModalOpen} onClose={closeStartConfirmationModal} title="">
                <StartMissionConfirmationModal 
                    onConfirm={handleConfirmStartMission} 
                    onClose={closeStartConfirmationModal} 
                />
            </Modal>
        </>
    );
};

export default DriverMissionsPage;