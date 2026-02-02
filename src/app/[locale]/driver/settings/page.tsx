'use client';

import { useState } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

// --- Icon Components (using inline SVG to avoid new dependencies) ---

const UserIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const PaletteIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l5.402-5.402m-5.402-5.402l5.402-5.402a3.75 3.75 0 00-5.304-5.304l-5.402 5.402a3.75 3.75 0 000 5.304zm-2.25 2.25l-5.402-5.402a3.75 3.75 0 000 5.304l5.402 5.402a3.75 3.75 0 005.304 0l5.402-5.402m-5.402 5.402l-5.402-5.402" />
    </svg>
);

const BellIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 01-5.714 0" />
  </svg>
);

const LockIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);


// --- Reusable Components ---

const Switch = ({ id, checked, onChange }: { id: string, checked: boolean, onChange: (checked: boolean) => void }) => (
  <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" id={id} className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  </label>
);

const SettingsCard = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
            {icon}
            <h2 className="text-lg font-semibold ml-3 text-gray-900 dark:text-white">{title}</h2>
        </div>
        <div className="p-4 md:p-6">
            {children}
        </div>
    </div>
);

// --- Main Page Component ---

export default function SettingsPage() {
    const { t } = useI18n();
    const [notifications, setNotifications] = useState({
        newMission: true,
        missionUpdates: true,
        documentExpiration: true,
        weeklySummary: false,
    });

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
            <header>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{t('title', 'driverSettingsPage')}</h1>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{t('description', 'driverSettingsPage')}</p>
            </header>

            <SettingsCard title={t('profile_title', 'driverSettingsPage')} icon={<UserIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />}>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <img
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-white dark:ring-gray-800"
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt={t('profile_alt', 'driverSettingsPage')}
                    />
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">John Doe</h3>
                        <p className="text-gray-600 dark:text-gray-400">john.doe@example-fleet.com</p>
                        <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-center sm:justify-start">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900">
                        {t('profile_edit_button', 'driverSettingsPage')}
                    </button>
                </div>
            </SettingsCard>
            
            <SettingsCard title={t('appearance_title', 'driverSettingsPage')} icon={<PaletteIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />}>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">{t('appearance_theme_label', 'driverSettingsPage')}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('appearance_theme_description', 'driverSettingsPage')}</p>
                        </div>
                        <ThemeSwitcher />
                    </div>
                     <div className="flex items-center justify-between">
                         <div>
                            <p className="font-medium text-gray-900 dark:text-white">{t('appearance_language_label', 'driverSettingsPage')}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('appearance_language_description', 'driverSettingsPage')}</p>
                        </div>
                        <LanguageSelector />
                    </div>
                </div>
            </SettingsCard>

            <SettingsCard title={t('notifications_title', 'driverSettingsPage')} icon={<BellIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />}>
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 dark:text-white">{t('notifications_new_mission_label', 'driverSettingsPage')}</p>
                        <Switch id="newMission" checked={notifications.newMission} onChange={() => handleNotificationChange('newMission')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 dark:text-white">{t('notifications_mission_updates_label', 'driverSettingsPage')}</p>
                        <Switch id="missionUpdates" checked={notifications.missionUpdates} onChange={() => handleNotificationChange('missionUpdates')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 dark:text-white">{t('notifications_doc_expiry_label', 'driverSettingsPage')}</p>
                        <Switch id="documentExpiration" checked={notifications.documentExpiration} onChange={() => handleNotificationChange('documentExpiration')} />
                    </div>
                     <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 dark:text-white">{t('notifications_weekly_summary_label', 'driverSettingsPage')}</p>
                        <Switch id="weeklySummary" checked={notifications.weeklySummary} onChange={() => handleNotificationChange('weeklySummary')} />
                    </div>
                </div>
            </SettingsCard>

            <SettingsCard title={t('security_title', 'driverSettingsPage')} icon={<LockIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t('security_password_label', 'driverSettingsPage')}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('security_password_description', 'driverSettingsPage')}</p>
                    </div>
                     <button className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 whitespace-nowrap">
                        {t('security_password_label', 'driverSettingsPage')}
                    </button>
                </div>
            </SettingsCard>
        </div>
    );
}