"use client";
import React from 'react';
import Modal from '@/components/ui/Modal';
import { useI18n } from '@/hooks/useI18n';

interface DocumentPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileUrl: string | null;
    fileName: string | null;
}

export const DocumentPreviewModal = ({ isOpen, onClose, fileUrl, fileName }: DocumentPreviewModalProps) => {
    const { t } = useI18n();

    if (!isOpen || !fileUrl) return null;

    const isImage = fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i);
    const isPdf = fileUrl.match(/\.(pdf)$/i);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('previewDocument', 'driverDocumentsPage', { fileName: fileName || '' })}>
            <div className="flex flex-col p-4">
                {isImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={fileUrl} alt={fileName || 'Document preview'} className="max-w-full h-auto object-contain mx-auto my-4 rounded-lg shadow-lg" />
                )}
                {isPdf && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <span className="material-symbols-outlined text-6xl text-primary mb-4">picture_as_pdf</span>
                        <p className="text-lg text-white mb-2">{fileName || t('pdfDocument', 'driverDocumentsPage')}</p>
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-blue-600 transition-colors text-sm font-medium flex items-center gap-1"
                        >
                            {t('viewPdfOnline', 'driverDocumentsPage')}
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>
                        <p className="text-text-secondary text-xs mt-2">({t('mayRequireDownload', 'driverDocumentsPage')})</p>
                    </div>
                )}
                {!isImage && !isPdf && (
                    <div className="flex flex-col items-center justify-center py-8 text-text-secondary">
                        <span className="material-symbols-outlined text-6xl mb-4">description</span>
                        <p className="text-lg text-white mb-2">{t('unsupportedFile', 'driverDocumentsPage')}</p>
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-blue-600 transition-colors text-sm font-medium flex items-center gap-1"
                        >
                            {t('downloadFile', 'driverDocumentsPage')}
                            <span className="material-symbols-outlined text-sm">download</span>
                        </a>
                    </div>
                )}
            </div>
        </Modal>
    );
};
