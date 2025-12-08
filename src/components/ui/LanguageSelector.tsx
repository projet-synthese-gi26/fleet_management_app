'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '@/hooks/useI18n';
import { localeNames, locales, type Locale } from '@/lib/i18n/config';

export function LanguageSelector() {
    const { locale, setLocale } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (newLocale: Locale) => {
        setLocale(newLocale);
        setIsOpen(false);

        // Mettre à jour l'URL
        const segments = pathname.split('/');
        if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
            segments[1] = newLocale;
            const newPathname = segments.join('/');
            router.push(newPathname);
        } else {
            router.push(`/${newLocale}${pathname}`);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-background-secondary transition-colors"
                aria-label="Select language"
            >
                <span className="material-symbols-outlined text-base">language</span>
                <span>{locale.toUpperCase()}</span>
                <span className="material-symbols-outlined text-base">
                    {isOpen ? 'expand_less' : 'expand_more'}
                </span>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 min-w-[160px] bg-surface border border-border-default rounded-lg shadow-lg z-[100]"
                    style={{
                        maxHeight: '200px',
                        overflowY: 'auto'
                    }}
                >
                    {locales.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => handleLanguageChange(loc)}
                            className={`w-full text-left px-4 py-3 text-sm hover:bg-background-secondary transition-colors block ${
                                locale === loc
                                    ? 'bg-primary-light text-primary font-semibold'
                                    : 'text-text-primary'
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