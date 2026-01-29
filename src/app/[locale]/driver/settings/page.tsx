"use client";

import React from 'react';
import { useI18n } from '@/hooks/useI18n'; // Use the consistent i18n hook

const DriverSettingsPage = () => {
    const { t } = useI18n(); // Use the consistent i18n hook

    return (
        <div className="max-w-[1440px] w-full mx-auto px-6 py-8 flex flex-col gap-6">
            <h1 className="text-2xl font-bold">{t('settingsTitle', 'DriverSettings')}</h1>
            <p>{t('settingsContentPlaceholder', 'DriverSettings')}</p>
            {/* Future content for driver settings */}
        </div>
    );
};

export default DriverSettingsPage;
