'use client';

import React from 'react';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';
import { LanguageSelector } from '../ui/LanguageSelector';
import { useI18n } from '@/hooks/useI18n';

export function Header() {
    const { t } = useI18n();

    return (
        <header className="sticky top-0 z-50 flex items-center justify-center whitespace-nowrap border-b border-solid border-border-default bg-surface/80 backdrop-blur-sm">
            <div className="flex items-center justify-between w-full max-w-6xl px-4 py-3">
                <div className="flex items-center gap-3 text-text-primary">
                    <div className="size-6 text-primary">
                        <span className="material-symbols-outlined text-3xl">hub</span>
                    </div>
                    <h2 className="text-lg font-bold tracking-[-0.015em]">FleetControl</h2>
                </div>

                <div className="hidden md:flex flex-1 justify-end items-center gap-4">
                    <div className="flex items-center gap-8">
                        <a className="text-sm font-medium leading-normal text-text-primary hover:text-primary transition-colors" href="#features">
                            {t('features')}
                        </a>
                        <a className="text-sm font-medium leading-normal text-text-primary hover:text-primary transition-colors" href="#benefits">
                            {t('benefits')}
                        </a>
                        <a className="text-sm font-medium leading-normal text-text-primary hover:text-primary transition-colors" href="#contact">
                            {t('contact')}
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-6 w-px bg-border-default"></div>
                        <div className="flex items-center gap-2">
                            <LanguageSelector />
                            <div className="flex items-center">
                                <ThemeSwitcher />
                            </div>
                        </div>

                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary-hover text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
                            <span className="truncate">{t('request_demo')}</span>
                        </button>
                    </div>
                </div>

                <div className="md:hidden">
                    <button className="p-2">
                        <span className="material-symbols-outlined text-text-primary">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
}