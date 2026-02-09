"use client";

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/driver/dashboard/DashboardHeader';
import { WelcomeHeader } from '@/components/driver/dashboard/WelcomeHeader';
import { ActionButtons } from '@/components/driver/dashboard/ActionButtons';
import { CurrentMissionCard } from '@/components/driver/dashboard/CurrentMissionCard';
import { StatsGrid } from '@/components/driver/dashboard/StatsGrid';
import { NotificationsPanel } from '@/components/driver/dashboard/NotificationsPanel';

import Modal from '@/components/ui/Modal';
import { ReportIssueModal } from '@/components/driver/dashboard/ReportIssueModal';
import { StartBreakModal } from '@/components/driver/dashboard/StartBreakModal';
import { ContactModal } from '@/components/driver/dashboard/ContactModal';
import { NotificationDetailsModal } from '@/components/driver/dashboard/NotificationDetailsModal';
import { AllNotificationsModal } from '@/components/driver/dashboard/AllNotificationsModal';
import { Notification } from '@/types/notification.types';
import { ManualTelemetryUpdate } from '@/components/driver/dashboard/ManualTelemetryUpdate';
import { useAuth } from '@/contexts/AuthContext';

const DriverDashboardPage = () => {
    const [isReportIssueModalOpen, setIsReportIssueModalOpen] = useState(false);
    const [isStartBreakModalOpen, setIsStartBreakModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const { user } = useAuth(); // Récupération des infos du chauffeur
    const [isNotificationDetailsModalOpen, setIsNotificationDetailsModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null); // To store the notification data
    const [isAllNotificationsModalOpen, setIsAllNotificationsModalOpen] = useState(false); // New state

    const openReportIssueModal = () => setIsReportIssueModalOpen(true);
    const closeReportIssueModal = () => setIsReportIssueModalOpen(false);

    const openStartBreakModal = () => setIsStartBreakModalOpen(true);
    const closeStartBreakModal = () => setIsStartBreakModalOpen(false);

    const openContactModal = () => setIsContactModalOpen(true);
    const closeContactModal = () => setIsContactModalOpen(false);

    const openNotificationDetailsModal = (notification: Notification) => {
        setSelectedNotification(notification);
        setIsNotificationDetailsModalOpen(true);
    };
    const closeNotificationDetailsModal = () => {
        setIsNotificationDetailsModalOpen(false);
        setSelectedNotification(null);
    };

    const openAllNotificationsModal = () => setIsAllNotificationsModalOpen(true); // New function
    const closeAllNotificationsModal = () => setIsAllNotificationsModalOpen(false); // New function

    return (
        <div className="max-w-[1440px] w-full mx-auto px-6 py-8 flex flex-col gap-6">
            <DashboardHeader onNotificationsClick={openAllNotificationsModal} /> {/* Pass handler */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <WelcomeHeader />
                <ActionButtons 
                    onReportIssueClick={openReportIssueModal}
                    onStartBreakClick={openStartBreakModal} 
                />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 flex flex-col gap-6">
                    <CurrentMissionCard onCallDispatchClick={openContactModal} />
                    <StatsGrid />
                </div>
                <div className="flex flex-col gap-6">

                    {/* NOUVEAU COMPOSANT : Télémétrie Manuelle */}
                    {user?.vehicleId && (
                        <ManualTelemetryUpdate 
                            vehicleId={user.vehicleId} 
                            licensePlate={user.licenceNumber} // Ou un champ licensePlate si présent dans le profil
                        />
                    )}

                    {!user?.vehicleId && (
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-center">
                            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                                Aucun véhicule ne vous est assigné actuellement.
                            </p>
                        </div>
                    )}
                    
                    <NotificationsPanel onNotificationClick={openNotificationDetailsModal} />
                    
                </div>
            </div>

            <Modal 
                isOpen={isReportIssueModalOpen} 
                onClose={closeReportIssueModal} 
                title="Report an Issue"
            >
                <ReportIssueModal onClose={closeReportIssueModal} />
            </Modal>

            <Modal 
                isOpen={isStartBreakModalOpen} 
                onClose={closeStartBreakModal} 
                title="Start a Break"
            >
                <StartBreakModal onClose={closeStartBreakModal} />
            </Modal>

            <Modal
                isOpen={isContactModalOpen}
                onClose={closeContactModal}
                title="Contact Dispatch"
            >
                <ContactModal onClose={closeContactModal} />
            </Modal>

            {selectedNotification && (
                <Modal
                    isOpen={isNotificationDetailsModalOpen}
                    onClose={closeNotificationDetailsModal}
                    title="Notification Details"
                >
                    <NotificationDetailsModal 
                        onClose={closeNotificationDetailsModal} 
                        notification={selectedNotification} 
                    />
                </Modal>
            )}

            <Modal // New modal
                isOpen={isAllNotificationsModalOpen}
                onClose={closeAllNotificationsModal}
                title="All Notifications"
            >
                <AllNotificationsModal onClose={closeAllNotificationsModal} />
            </Modal>
        </div>
    );
};

export default DriverDashboardPage;
