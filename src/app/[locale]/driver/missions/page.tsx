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
import { AcceptNewMissionModal } from '@/components/driver/missions/AcceptNewMissionModal';
import { ReportIssueModal } from '@/components/driver/dashboard/ReportIssueModal'; // Reusing existing modal

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
    const { t } = useI18n();
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isStartConfirmationModalOpen, setIsStartConfirmationModalOpen] = useState(false);
    const [isAcceptNewMissionModalOpen, setIsAcceptNewMissionModalOpen] = useState(false);
    const [isReportIssueModalOpen, setIsReportIssueModalOpen] = useState(false); // New state for Report Issue
    const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

    // Placeholder for a new mission
    const [newMissionToAccept] = useState<Mission>({
        id: "#9924",
        status: "SCHEDULED",
        date: "Nov 17, 10:00 AM",
        origin: { name: "Warehouse D, Industrial Zone" },
        destination: { name: "Client Office, Downtown" }
    });

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
        console.log(`Mission ${selectedMission?.id} confirmed to start.`);
        closeStartConfirmationModal();
        closeDetailsModal();
    };

    const openAcceptNewMissionModal = () => {
        setIsAcceptNewMissionModalOpen(true);
    };

    const closeAcceptNewMissionModal = () => {
        setIsAcceptNewMissionModalOpen(false);
    };

    const handleAcceptMission = (missionId: string) => {
        console.log(`Mission ${missionId} accepted!`);
        closeAcceptNewMissionModal();
    };

    const handleRejectMission = (missionId: string, reason: string) => {
        console.log(`Mission ${missionId} rejected with reason: ${reason}`);
        closeAcceptNewMissionModal();
    };

    const openReportIssueModal = (mission: Mission) => {
        setSelectedMission(mission); // Associate report with the mission
        setIsReportIssueModalOpen(true);
    };

    const closeReportIssueModal = () => {
        setIsReportIssueModalOpen(false);
        setSelectedMission(null); // Clear selected mission when closing
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
                {/* Temporary button to trigger new mission modal for testing */}
                <button 
                    onClick={openAcceptNewMissionModal}
                    className="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
                >
                    {t('openNewMissionModal', 'driverMissionsPage')}
                </button>
            </div>
            <Modal isOpen={isDetailsModalOpen} onClose={closeDetailsModal} title="">
                <MissionDetailsModal 
                    mission={selectedMission} 
                    onClose={closeDetailsModal} 
                    onStartTripClick={() => {
                        closeDetailsModal();
                        openStartConfirmationModal();
                    }}
                    onReportIssueClick={(mission) => {
                        closeDetailsModal();
                        openReportIssueModal(mission);
                    }}
                />
            </Modal>
            <Modal isOpen={isStartConfirmationModalOpen} onClose={closeStartConfirmationModal} title="">
                <StartMissionConfirmationModal 
                    onConfirm={handleConfirmStartMission} 
                    onClose={closeStartConfirmationModal} 
                />
            </Modal>
            <Modal isOpen={isAcceptNewMissionModalOpen} onClose={closeAcceptNewMissionModal} title="">
                <AcceptNewMissionModal 
                    mission={newMissionToAccept} 
                    onAccept={handleAcceptMission} 
                    onReject={handleRejectMission} 
                    onClose={closeAcceptNewMissionModal} 
                />
            </Modal>
            <Modal isOpen={isReportIssueModalOpen} onClose={closeReportIssueModal} title={t('reportAnIssue', 'driverMissionsPage')}>
                <ReportIssueModal onClose={closeReportIssueModal} />
            </Modal>
        </>
    );
};

export default DriverMissionsPage;