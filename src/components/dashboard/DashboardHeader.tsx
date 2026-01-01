'use client';

import React from 'react';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border-default bg-surface px-4 lg:px-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 text-text-secondary hover:bg-background-secondary rounded-lg lg:hidden"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <h1 className="text-lg font-semibold text-text-primary hidden sm:block">
                    Dashboard Overview
                </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden sm:flex items-center gap-2">
                    <LanguageSelector />
                    <ThemeSwitcher />
                </div>
                
                <div className="h-8 w-px bg-border-default mx-2 hidden sm:block" />

                <div className="flex items-center gap-3 pl-2">
                    <div className="flex flex-col items-end hidden md:flex">
                        <span className="text-sm font-medium text-text-primary">Gabriel Nomo</span>
                        <span className="text-xs text-text-secondary">Fleet Manager</span>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                        GN
                    </div>
                </div>
            </div>
        </header>
    );
}