"use client";
import React from 'react';
import Modal from '@/components/ui/Modal';
import { useI18n } from '@/hooks/useI18n';
import { Document } from '@/data/mockDocuments';

interface ExpirationAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    expiredDocuments: Document[];
}

export const ExpirationAlertModal = ({ isOpen, onClose, expiredDocuments }: ExpirationAlertModalProps) => {
    const { t } = useI18n();

    if (!isOpen || expiredDocuments.length === 0) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('documentExpirationAlertTitle', 'driverDocumentsPage')}>
            <div className="flex flex-col items-center justify-center p-4 text-center">
                <span className="material-symbols-outlined text-6xl text-red-500 mb-4">warning</span>
                <h3 className="text-xl font-bold text-text-primary mb-2">{t('urgentAttentionRequired', 'driverDocumentsPage')}</h3>
                <p className="text-text-secondary mb-4">{t('followingDocumentsExpired', 'driverDocumentsPage')}</p>

                <ul className="list-disc list-inside text-left text-text-primary mb-6">
                    {expiredDocuments.map(doc => (
                        <li key={doc.id} className="mb-1">
                            <span className="font-medium text-text-primary">{doc.name}</span> (<span className="text-text-secondary">{doc.type}</span>) - {t('expiredOn', 'driverDocumentsPage', { date: doc.expiryDate })}
                        </li>
                    ))}
                </ul>

                <p className="text-text-secondary text-sm mb-6">{t('pleaseUpdateDocuments', 'driverDocumentsPage')}</p>

                <div className="flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 transition-all"
                    >
                        {t('understand', 'driverDocumentsPage')}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
