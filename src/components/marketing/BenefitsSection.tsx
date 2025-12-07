'use client';

import React from 'react';
import { useI18n } from '@/hooks/useI18n';

interface BenefitCardProps {
    icon: string;
    title: string;
    description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
    return (
        <div className="flex flex-col items-center text-center gap-3">
            <div className="flex items-center justify-center size-14 rounded-full bg-success/20 text-success">
                <span className="material-symbols-outlined text-3xl">{icon}</span>
            </div>
            <h3 className="text-lg font-bold text-text-primary">{title}</h3>
            <p className="text-text-secondary text-sm">{description}</p>
        </div>
    );
}

export function BenefitsSection() {
    const { t } = useI18n();

    return (
        <section className="px-4 py-10" id="benefits">
            <div className="text-center">
                <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] text-text-primary">
                    {t('benefits_title', 'landing')}
                </h2>
                <p className="mt-2 text-text-secondary max-w-2xl mx-auto">
                    {t('benefits_subtitle', 'landing')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                <BenefitCard
                    icon="local_gas_station"
                    title={t('benefit_1_title', 'landing')}
                    description={t('benefit_1_text', 'landing')}
                />
                <BenefitCard
                    icon="shield"
                    title={t('benefit_2_title', 'landing')}
                    description={t('benefit_2_text', 'landing')}
                />
                <BenefitCard
                    icon="verified_user"
                    title={t('benefit_3_title', 'landing')}
                    description={t('benefit_3_text', 'landing')}
                />
            </div>
        </section>
    );
}