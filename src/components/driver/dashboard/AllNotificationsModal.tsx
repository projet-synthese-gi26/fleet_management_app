"use client";
import React from 'react';
import { MOCK_NOTIFICATIONS } from '@/data/mockNotifications';
import { Notification } from '@/types/notification.types';

interface AllNotificationsModalProps {
    onClose: () => void;
}

export const AllNotificationsModal = ({ onClose }: AllNotificationsModalProps) => {
    // You might want to handle marking notifications as read here in a real app
    const handleNotificationClick = (notification: Notification) => {
        console.log("Clicked notification:", notification.title);
        // In a real app, this might open a detailed view or mark as read
        // For now, we'll just close the modal.
        onClose();
    };

    return (
        <div className="space-y-4">
            {MOCK_NOTIFICATIONS.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">No new notifications.</p>
            ) : (
                <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
                    {MOCK_NOTIFICATIONS.map(notification => (
                        <div 
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className="p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-[#232930] transition-colors"
                        >
                            <div className="flex gap-3">
                                <div className={`mt-1 ${notification.iconColor} ${notification.iconColor}/10 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0`}>
                                    <span className="material-symbols-outlined text-[18px]">{notification.icon}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium leading-snug">{notification.title}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{notification.description}</p>
                                    <p className="text-[11px] text-slate-400 mt-1">{notification.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex justify-end pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
