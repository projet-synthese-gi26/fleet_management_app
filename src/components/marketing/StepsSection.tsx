'use client';

import React from 'react';
import { useI18n } from '@/hooks/useI18n';

interface StepCardProps {
    number: number;
    title: string;
    description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
    return (
        <div className="relative flex flex-col items-center gap-4">
            <div className="z-10 flex items-center justify-center size-16 rounded-full bg-primary text-white font-bold text-2xl border-4 border-background-secondary">
                {number}
            </div>
            <h3 className="font-bold text-text-primary">{title}</h3>
            <p className="text-sm text-text-secondary text-center">{description}</p>
        </div>
    );
}

export function StepsSection() {
    const { t } = useI18n();

    return (
        <section className="px-4 py-10 bg-background-secondary rounded-xl">
            <div className="text-center">
                <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] text-text-primary">
                    {t('steps_title', 'landing')}
                </h2>
                <p className="mt-2 text-text-secondary max-w-2xl mx-auto">
                    {t('steps_subtitle', 'landing')}
                </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-center">
                <div className="absolute top-1/2 left-0 w-full h-px bg-border-default hidden md:block" style={{ transform: 'translateY(-50%)', zIndex: 0 }}></div>

                <StepCard
                    number={1}
                    title={t('step_1_title', 'landing')}
                    description={t('step_1_text', 'landing')}
                />
                <StepCard
                    number={2}
                    title={t('step_2_title', 'landing')}
                    description={t('step_2_text', 'landing')}
                />
                <StepCard
                    number={3}
                    title={t('step_3_title', 'landing')}
                    description={t('step_3_text', 'landing')}
                />
            </div>
        </section>
    );
}