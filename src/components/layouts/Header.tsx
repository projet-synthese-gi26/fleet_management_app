'use client';

import React, { useState, useEffect } from 'react';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';
import { LanguageSelector } from '../ui/LanguageSelector';
import { useI18n } from '@/hooks/useI18n';

export function Header() {
    const { t } = useI18n();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="sticky top-0 z-50 flex items-center justify-center whitespace-nowrap border-b border-solid border-border-default bg-surface">
                <div className="flex items-center justify-between w-full max-w-6xl px-4 py-3">
                    <div className="flex items-center gap-3 text-text-primary">
                        <div className="size-6 text-primary">
                            <span className="material-symbols-outlined text-3xl">hub</span>
                        </div>
                        <h2 className="text-lg font-bold tracking-[-0.015em]">FleetControl</h2>
                    </div>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex flex-1 justify-end items-center gap-4">
                        <div className="flex items-center gap-8">
                            <a
                                className="text-sm font-medium leading-normal text-text-primary hover:text-primary transition-colors"
                                href="#features"
                            >
                                {t('features', 'common')}
                            </a>
                            <a
                                className="text-sm font-medium leading-normal text-text-primary hover:text-primary transition-colors"
                                href="#benefits"
                            >
                                {t('benefits', 'common')}
                            </a>
                            <a
                                className="text-sm font-medium leading-normal text-text-primary hover:text-primary transition-colors"
                                href="#contact"
                            >
                                {t('contact', 'common')}
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
                                <span className="truncate">{t('request_demo', 'common')}</span>
                            </button>
                        </div>
                    </div>

                    {/* Bouton Menu Mobile */}
                    <div className="flex md:hidden items-center gap-2">
                        <ThemeSwitcher />
                        <button
                            className="p-2 hover:bg-background-secondary rounded-md transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className="material-symbols-outlined text-text-primary">
                                {isMobileMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu Mobile - Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Menu Mobile - Panneau */}
            <div
                className={`fixed top-[57px] right-0 h-[calc(100vh-57px)] w-full max-w-sm bg-surface border-l border-border-default z-40 md:hidden transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Navigation Links */}
                    <nav className="flex flex-col p-4 space-y-1">
                        <a
                            href="#features"
                            onClick={handleNavClick}
                            className="flex items-center gap-3 px-4 py-3 text-base font-medium text-text-primary hover:bg-background-secondary rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined text-primary">widgets</span>
                            {t('features', 'common')}
                        </a>
                        <a
                            href="#benefits"
                            onClick={handleNavClick}
                            className="flex items-center gap-3 px-4 py-3 text-base font-medium text-text-primary hover:bg-background-secondary rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined text-primary">star</span>
                            {t('benefits', 'common')}
                        </a>
                        <a
                            href="#contact"
                            onClick={handleNavClick}
                            className="flex items-center gap-3 px-4 py-3 text-base font-medium text-text-primary hover:bg-background-secondary rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined text-primary">mail</span>
                            {t('contact', 'common')}
                        </a>
                    </nav>

                    <div className="px-4 py-2">
                        <div className="h-px bg-border-default"></div>
                    </div>

                    <div className="px-4 py-2">
                        <div className="flex items-center justify-between px-4 py-2">
                            <span className="text-sm font-medium text-text-secondary">
                                {t('features', 'common') === 'Features' ? 'Language' : 'Langue'}
                            </span>
                            <LanguageSelector />
                        </div>
                    </div>

                    <div className="flex-1"></div>

                    <div className="p-4 border-t border-border-default">
                        <button
                            onClick={handleNavClick}
                            className="w-full flex items-center justify-center gap-2 rounded-lg h-12 px-5 bg-primary hover:bg-primary-hover text-white text-base font-bold transition-colors"
                        >
                            <span className="material-symbols-outlined">rocket_launch</span>
                            <span>{t('request_demo', 'common')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}