'use client';

import React from 'react';
import { useI18n } from '@/hooks/useI18n';

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    highlighted?: boolean;
}

function FeatureCard({ icon, title, description, highlighted = false }: FeatureCardProps) {
    return (
        <div className={`flex flex-1 gap-4 rounded-lg p-4 flex-col transition-all ${
            highlighted
                ? 'border-2 border-primary bg-surface shadow-lg hover:shadow-xl'
                : 'border border-border-default bg-surface hover:shadow-md'
        }`}>
            <span className={`material-symbols-outlined text-3xl ${highlighted ? 'text-primary' : 'text-primary'}`}>
                {icon}
            </span>
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold leading-tight text-text-primary">{title}</h3>
                <p className="text-text-secondary text-sm font-normal leading-normal">{description}</p>
            </div>
        </div>
    );
}

export function FeaturesSection() {
    const { t } = useI18n();

    return (
        <section className="flex flex-col gap-10 px-4 py-10 bg-background-secondary rounded-xl" id="features">
            <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] max-w-2xl text-text-primary">
                    {t('solution_section_title', 'landing')}
                </h2>
                <p className="text-text-secondary text-base font-normal leading-normal max-w-2xl">
                    {t('solution_section_subtitle', 'landing')}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <FeatureCard
                    icon="gps_fixed"
                    title={t('feature_1_title', 'landing')}
                    description={t('feature_1_text', 'landing')}
                />
                <FeatureCard
                    icon="notifications_active"
                    title={t('feature_2_title', 'landing')}
                    description={t('feature_2_text', 'landing')}
                    highlighted={true}
                />
                <FeatureCard
                    icon="route"
                    title={t('feature_3_title', 'landing')}
                    description={t('feature_3_text', 'landing')}
                />
                <FeatureCard
                    icon="analytics"
                    title={t('feature_4_title', 'landing')}
                    description={t('feature_4_text', 'landing')}
                />
            </div>
        </section>
    );
}