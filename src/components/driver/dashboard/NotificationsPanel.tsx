"use client";
import React from 'react';
import { MOCK_NOTIFICATIONS } from '@/data/mockNotifications';
import { Notification } from '@/types/notification.types';
import { useI18n } from '@/hooks/useI18n';

interface NotificationsPanelProps {
    onNotificationClick: (notification: Notification) => void;
}

export const NotificationsPanel = ({ onNotificationClick }: NotificationsPanelProps) => {
    const { t } = useI18n();
    return (
        <div className="flex flex-col flex-1 bg-white dark:bg-[#1c2127] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg">{t('notificationsTitle', 'driverNotifications')}</h3>
                <button className="text-primary text-sm font-medium hover:underline">{t('markAllRead', 'driverNotifications')}</button>
            </div>
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800 overflow-y-auto max-h-[500px]">
                {MOCK_NOTIFICATIONS.map((notification: Notification) => (
                    <div 
                        key={notification.id}
                        onClick={() => onNotificationClick(notification)}
                        className="p-4 hover:bg-slate-50 dark:hover:bg-[#232930] transition-colors cursor-pointer relative group"
                    >
                        {notification.read ? null : <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                        <div className="flex gap-3">
                            <div className={`mt-1 ${notification.iconColor} ${notification.iconColor}/10 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0`}>
                                <span className="material-symbols-outlined text-[18px]">{notification.icon}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium leading-snug">{notification.titleKey}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{notification.descriptionKey}</p>
                                <p className="text-[11px] text-slate-400 mt-1">{notification.timeKey}, {notification.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};