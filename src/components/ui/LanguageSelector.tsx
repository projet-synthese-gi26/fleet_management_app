'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../providers/I18nProvider';
import { localeNames, locales } from '../../lib/i18n/config';

export function LanguageSelector() {
    const { locale, setLocale } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (newLocale: string) => {
        setLocale(newLocale as any);
        setIsOpen(false);

        window.location.reload();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-background-secondary transition-colors"
            >
                <span className="material-symbols-outlined text-base">language</span>
                <span>{locale.toUpperCase()}</span>
                <span className="material-symbols-outlined text-base">expand_more</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-surface border border-border-default rounded-lg shadow-lg overflow-hidden z-50">
                    {locales.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => handleLanguageChange(loc)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-background-secondary transition-colors ${
                                locale === loc ? 'bg-primary-light text-primary font-semibold' : 'text-text-primary'
                            }`}
                        >
                            {localeNames[loc]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}