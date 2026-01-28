"use client";
import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { useI18n } from '@/hooks/useI18n';

interface DocumentUploadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (formData: FormData) => void; // Placeholder for upload logic
}

export const DocumentUploadFormModal = ({ isOpen, onClose, onUpload }: DocumentUploadFormModalProps) => {
    const { t } = useI18n();
    const [file, setFile] = useState<File | null>(null);
    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [notes, setNotes] = useState('');

    const documentTypes = [
        t('type_driver_license', 'driverDocumentsPage'),
        t('type_vehicle_insurance', 'driverDocumentsPage'),
        t('type_registration_card', 'driverDocumentsPage'),
        t('type_medical_certificate', 'driverDocumentsPage'),
        t('type_transport_authorization', 'driverDocumentsPage'),
        t('type_other', 'driverDocumentsPage'),
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        if (file) {
            formData.append('documentFile', file);
        }
        formData.append('documentType', documentType);
        formData.append('documentNumber', documentNumber);
        formData.append('expiryDate', expiryDate);
        formData.append('issueDate', issueDate);
        formData.append('notes', notes);

        onUpload(formData);
        // Optionally reset form
        setFile(null);
        setDocumentType('');
        setDocumentNumber('');
        setExpiryDate('');
        setIssueDate('');
        setNotes('');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('uploadNewDocumentTitle', 'driverDocumentsPage')}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
                {/* Drag & Drop Zone */}
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border-dark rounded-lg cursor-pointer bg-surface-dark hover:bg-surface-dark/50 transition-colors"
                >
                    <span className="material-symbols-outlined text-6xl text-text-secondary mb-3">cloud_upload</span>
                    <p className="text-white text-lg font-medium mb-1">{t('dragDropFile', 'driverDocumentsPage')}</p>
                    <p className="text-text-secondary text-sm mb-3">{t('orClickToUpload', 'driverDocumentsPage')}</p>
                    <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" accept=".pdf,.jpg,.jpeg,.png" />
                    <label htmlFor="file-upload" className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 cursor-pointer transition-colors">
                        {t('browseFiles', 'driverDocumentsPage')}
                    </label>
                    {file && <p className="mt-2 text-sm text-text-secondary">Selected: {file.name}</p>}
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-3">
                    <div>
                        <label htmlFor="documentType" className="block text-sm font-medium text-text-secondary mb-1">{t('documentTypeLabel', 'driverDocumentsPage')}</label>
                        <select
                            id="documentType"
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border-dark bg-surface-dark text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        >
                            <option value="" disabled>{t('selectDocumentTypePlaceholder', 'driverDocumentsPage')}</option>
                            {documentTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="documentNumber" className="block text-sm font-medium text-text-secondary mb-1">{t('documentNumberLabel', 'driverDocumentsPage')}</label>
                        <input
                            type="text"
                            id="documentNumber"
                            value={documentNumber}
                            onChange={(e) => setDocumentNumber(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border-dark bg-surface-dark text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder={t('documentNumberPlaceholder', 'driverDocumentsPage')}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-text-secondary mb-1">{t('expiryDateLabel', 'driverDocumentsPage')}</label>
                        <input
                            type="date"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border-dark bg-surface-dark text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="issueDate" className="block text-sm font-medium text-text-secondary mb-1">{t('issueDateLabel', 'driverDocumentsPage')}</label>
                        <input
                            type="date"
                            id="issueDate"
                            value={issueDate}
                            onChange={(e) => setIssueDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border-dark bg-surface-dark text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-text-secondary mb-1">{t('notesCommentsLabel', 'driverDocumentsPage')}</label>
                        <textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg border border-border-dark bg-surface-dark text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder={t('notesCommentsPlaceholder', 'driverDocumentsPage')}
                        ></textarea>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg border border-border-dark text-white font-medium text-sm hover:bg-surface-dark transition-all"
                    >
                        {t('cancel', 'common')}
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 transition-all"
                    >
                        {t('saveUpload', 'driverDocumentsPage')}
                    </button>
                </div>
            </form>
        </Modal>
    );
};
