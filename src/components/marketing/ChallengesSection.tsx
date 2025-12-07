'use client';

import React from 'react';
import { useI18n } from '@/hooks/useI18n';

interface ProblemItemProps {
    title: string;
    description: string;
}

interface SolutionItemProps {
    title: string;
    description: string;
}

function ProblemItem({ title, description }: ProblemItemProps) {
    return (
        <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-error mt-1">cancel</span>
            <div>
                <h4 className="font-semibold text-text-primary">{title}</h4>
                <p className="text-sm text-text-secondary">{description}</p>
            </div>
        </li>
    );
}

function SolutionItem({ title, description }: SolutionItemProps) {
    return (
        <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-success mt-1">check_circle</span>
            <div>
                <h4 className="font-semibold text-text-primary">{title}</h4>
                <p className="text-sm text-text-secondary">{description}</p>
            </div>
        </li>
    );
}

export function ChallengesSection() {
    const { t } = useI18n();

    return (
        <section className="flex flex-col gap-8 px-4 py-10" id="challenges">
            <div className="text-center">
                <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] text-text-primary">
                    {t('challenges_title', 'landing')}
                </h2>
                <p className="mt-2 text-text-secondary max-w-2xl mx-auto">
                    {t('challenges_subtitle', 'landing')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div className="bg-surface rounded-xl border border-border-default p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-error mb-4">
                        {t('section_problems', 'landing')}
                    </h3>
                    <ul className="space-y-4">
                        <ProblemItem
                            title={t('problem_1_title', 'landing')}
                            description={t('problem_1_text', 'landing')}
                        />
                        <ProblemItem
                            title={t('problem_2_title', 'landing')}
                            description={t('problem_2_text', 'landing')}
                        />
                        <ProblemItem
                            title={t('problem_3_title', 'landing')}
                            description={t('problem_3_text', 'landing')}
                        />
                    </ul>
                </div>

                <div className="bg-surface rounded-xl border border-border-default p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-success mb-4">
                        {t('section_solution', 'landing')}
                    </h3>
                    <ul className="space-y-4">
                        <SolutionItem
                            title={t('solution_1_title', 'landing')}
                            description={t('solution_1_text', 'landing')}
                        />
                        <SolutionItem
                            title={t('solution_2_title', 'landing')}
                            description={t('solution_2_text', 'landing')}
                        />
                        <SolutionItem
                            title={t('solution_3_title', 'landing')}
                            description={t('solution_3_text', 'landing')}
                        />
                    </ul>
                </div>
            </div>
        </section>
    );
}
