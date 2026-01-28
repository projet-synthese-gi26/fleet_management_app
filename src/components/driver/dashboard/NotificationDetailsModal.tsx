"use client";
import React from 'react';
import { Notification } from '@/types/notification.types';

interface NotificationDetailsModalProps {
    onClose: () => void;
    notification: Notification;
}

export const NotificationDetailsModal = ({ onClose, notification }: NotificationDetailsModalProps) => {
    if (!notification) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{notification.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className={`material-symbols-outlined text-[18px] ${notification.iconColor}`}>{notification.icon}</span>
                <span>{notification.time}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{notification.description}</p>

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
