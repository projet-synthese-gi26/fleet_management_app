"use client";
import React from 'react';
import { useI18n } from '@/hooks/useI18n';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
    const { t } = useI18n();

    return (
        <div className="relative flex-grow max-w-md">
            <input
                type="text"
                placeholder={t('searchDocumentsPlaceholder', 'driverDocumentsPage')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-dark bg-surface-dark text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
        </div>
    );
};
