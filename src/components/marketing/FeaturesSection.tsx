'use client';

import React, { useState } from 'react';
import { useI18n } from '@/hooks/useI18n';

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    highlighted?: boolean;
    onClick?: () => void;
}

function FeatureCard({ icon, title, description, highlighted = false, onClick }: FeatureCardProps) {
    return (
        <div
            onClick={onClick}
            className={`flex flex-1 gap-4 rounded-lg p-4 flex-col transition-all cursor-pointer ${
                highlighted
                    ? 'border-2 border-primary bg-surface shadow-lg'
                    : 'border border-border-default bg-surface hover:shadow-md hover:border-primary/30'
            }`}
        >
            <span className={`material-symbols-outlined text-3xl transition-colors ${
                highlighted ? 'text-primary' : 'text-text-secondary'
            }`}>
                {icon}
            </span>
            <div className="flex flex-col gap-1">
                <h3 className={`text-base font-bold leading-tight transition-colors ${
                    highlighted ? 'text-primary' : 'text-text-primary'
                }`}>
                    {title}
                </h3>
                <p className="text-text-secondary text-sm font-normal leading-normal">{description}</p>
            </div>
        </div>
    );
}

export function FeaturesSection() {
    const { t } = useI18n();
    const [selectedFeature, setSelectedFeature] = useState(1); // 1 = Géorepérage par défaut

    const features = [
        {
            id: 0,
            icon: 'gps_fixed',
            titleKey: 'feature_1_title',
            descKey: 'feature_1_text'
        },
        {
            id: 1,
            icon: 'notifications_active',
            titleKey: 'feature_2_title',
            descKey: 'feature_2_text'
        },
        {
            id: 2,
            icon: 'route',
            titleKey: 'feature_3_title',
            descKey: 'feature_3_text'
        },
        {
            id: 3,
            icon: 'analytics',
            titleKey: 'feature_4_title',
            descKey: 'feature_4_text'
        }
    ];

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
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.id}
                        icon={feature.icon}
                        title={t(feature.titleKey, 'landing')}
                        description={t(feature.descKey, 'landing')}
                        highlighted={selectedFeature === feature.id}
                        onClick={() => setSelectedFeature(feature.id)}
                    />
                ))}
            </div>
        </section>
    );
}