"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { DashboardHeader } from '@/components/driver/dashboard/DashboardHeader';
import { useI18n } from '@/hooks/useI18n';
import { MOCK_DOCUMENTS, Document } from '@/data/mockDocuments';
import { DocumentCard } from '@/components/driver/documents/DocumentCard';
import { AddDocumentButton } from '@/components/driver/documents/AddDocumentButton';
import { DocumentPreviewModal } from '@/components/driver/documents/DocumentPreviewModal';
import { DocumentUploadFormModal } from '@/components/driver/documents/DocumentUploadFormModal';
import { ExpirationAlertModal } from '@/components/driver/documents/ExpirationAlertModal';


const DriverDocumentsPage = () => {
    const { t } = useI18n();
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [isExpirationAlertModalOpen, setIsExpirationAlertModalOpen] = useState(false);
    const [selectedDocumentForPreview, setSelectedDocumentForPreview] = useState<Document | null>(null);
    const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS); // Use mutable state for documents

    const expiredDocuments = useMemo(() => {
        return documents.filter(doc => doc.status === 'expired');
    }, [documents]);

    // Open/Close handlers for modals
    const openUploadModal = () => setIsUploadModalOpen(true);
    const closeUploadModal = () => setIsUploadModalOpen(false);

    const openPreviewModal = (doc: Document) => {
        setSelectedDocumentForPreview(doc);
        setIsPreviewModalOpen(true);
    };
    const closePreviewModal = () => {
        setSelectedDocumentForPreview(null);
        setIsPreviewModalOpen(false);
    };

    // Placeholder for document upload logic
    const handleUploadDocument = (formData: FormData) => {
        console.log('Uploading document:', formData);
        // In a real application, you would send this to an API
        // For now, let's simulate adding it to our mock list
        const newDocument: Document = {
            id: `DOC-${documents.length + 1}`,
            name: formData.get('documentType') as string || 'New Document',
            type: formData.get('documentType') as string || 'Other',
            issueDate: formData.get('issueDate') as string || new Date().toISOString().split('T')[0],
            expiryDate: formData.get('expiryDate') as string || '2099-12-31',
            status: 'valid', // Assuming newly uploaded documents are valid initially
            fileUrl: '/path/to/uploaded_file.pdf' // Placeholder
        };
        setDocuments(prevDocs => [...prevDocs, newDocument]);
        closeUploadModal();
    };

    // Effect to check for expired documents on load and whenever documents change
    useEffect(() => {
        if (expiredDocuments.length > 0) {
            setIsExpirationAlertModalOpen(true);
        }
    }, [expiredDocuments]);

    const filteredDocuments = useMemo(() => {
        if (!searchQuery) {
            return documents;
        }
        return documents.filter(doc =>
            doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, documents]);

    return (
        <div className="max-w-[1440px] w-full mx-auto px-6 py-8 flex flex-col gap-6">
            <DashboardHeader title={t('documentsPageTitle', 'driverDocumentsPage')} />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                <AddDocumentButton onClick={openUploadModal} />
            </div>

            {filteredDocuments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDocuments.map(doc => (
                        <DocumentCard key={doc.id} document={doc} onPreviewClick={openPreviewModal} />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-64 text-text-secondary">
                    <p>{t('noDocumentsFound', 'driverDocumentsPage')}</p>
                </div>
            )}

            {/* Modals */}
            <DocumentUploadFormModal
                isOpen={isUploadModalOpen}
                onClose={closeUploadModal}
                onUpload={handleUploadDocument}
            />

            <DocumentPreviewModal
                isOpen={isPreviewModalOpen}
                onClose={closePreviewModal}
                fileUrl={selectedDocumentForPreview?.fileUrl || null}
                fileName={selectedDocumentForPreview?.name || null}
            />

            <ExpirationAlertModal
                isOpen={isExpirationAlertModalOpen}
                onClose={() => setIsExpirationAlertModalOpen(false)}
                expiredDocuments={expiredDocuments}
            />
        </div>
    );
};

export default DriverDocumentsPage;
