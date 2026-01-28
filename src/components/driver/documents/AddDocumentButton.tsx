"use client";
import React from 'react';
import { useI18n } from '@/hooks/useI18n';

interface AddDocumentButtonProps {
    onClick?: () => void;
}

export const AddDocumentButton = ({ onClick }: AddDocumentButtonProps) => {
    const { t } = useI18n();

    const handleClick = () => {
        // Placeholder for opening a modal or navigating to a form
        console.log("Add new document button clicked!");
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-medium text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 transition-all flex-shrink-0"
        >
            <span className="material-symbols-outlined text-lg">add</span>
            {t('addDocument', 'driverDocumentsPage')}
        </button>
    );
};
