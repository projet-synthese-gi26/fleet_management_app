'use client';

import React from 'react';
import { useI18n } from '@/hooks/useI18n';

export function Footer() {
    const { t } = useI18n();

    return (
        <footer className="flex justify-center border-t border-solid border-border-default bg-surface">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl px-4 py-6 gap-4">
                <div className="text-sm text-text-secondary">
                    © 2024 FleetControl. {t('all_rights_reserved')}
                </div>
                <div className="flex items-center gap-4">
                    <a className="text-sm text-text-secondary hover:text-primary" href="#">
                        {t('privacy_policy')}
                    </a>
                    <a className="text-sm text-text-secondary hover:text-primary" href="#">
                        {t('terms_of_service')}
                    </a>
                </div>
            </div>
        </footer>
    );
}