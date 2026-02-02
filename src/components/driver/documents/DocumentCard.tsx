"use client";
import React from 'react';
import { Document, DocumentStatus } from '@/data/mockDocuments';
import { useI18n } from '@/hooks/useI18n';

interface DocumentCardProps {
    document: Document;
    onPreviewClick?: (doc: Document) => void;
}

export const DocumentCard = ({ document, onPreviewClick }: DocumentCardProps) => {
    const { t } = useI18n();

    const getStatusClasses = (status: DocumentStatus) => {
        switch (status) {
            case 'valid':
                return 'bg-green-500/20 text-green-500 border-green-500/30';
            case 'expiring_soon':
                return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
            case 'expired':
                return 'bg-red-500/20 text-red-500 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
        }
    };

    const getIconForDocumentType = (type: string) => {
        switch (type.toLowerCase()) {
            case 'permis':
                return 'badge';
            case 'assurance':
                return 'verified_user';
            case 'immatriculation':
                return 'credit_card'; // Represents a document like a car registration card
            case 'contrôle technique':
                return 'car_repair';
            case 'identité':
                return 'person';
            default:
                return 'description';
        }
    };

    const statusClasses = getStatusClasses(document.status);
    const documentIcon = getIconForDocumentType(document.type);

    return (
        <div className="card flex flex-col p-5 gap-4">
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-surface-dark/50 text-white">
                    <span className="material-symbols-outlined">{documentIcon}</span>
                </div>
                <div className="flex flex-col flex-grow">
                    <h3 className="text-white text-base font-medium truncate">{document.name}</h3>
                    <p className="text-text-secondary text-xs">{document.type}</p>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-text-secondary text-xs">{t('issueDate', 'driverDocumentsPage')}: <span className="text-white font-medium">{document.issueDate}</span></p>
                <p className="text-text-secondary text-xs">{t('expiryDate', 'driverDocumentsPage')}: <span className="text-white font-medium">{document.expiryDate}</span></p>
            </div>

            <div className={`flex items-center justify-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusClasses} self-start`}>
                <span className="material-symbols-outlined text-[16px]">
                    {document.status === 'valid' ? 'check_circle' : document.status === 'expiring_soon' ? 'warning' : 'cancel'}
                </span>
                <span>{t(document.status, 'driverDocumentsPage')}</span>
            </div>

            <a
                href={document.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-primary hover:text-blue-600 transition-colors text-sm font-medium flex items-center gap-1"
            >
                {t('viewDocument', 'driverDocumentsPage')}
                <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
        </div>
    );
};
