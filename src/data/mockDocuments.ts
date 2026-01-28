// src/data/mockDocuments.ts

export type DocumentStatus = 'valid' | 'expiring_soon' | 'expired';

export interface Document {
    id: string;
    name: string;
    type: string;
    issueDate: string; // YYYY-MM-DD
    expiryDate: string; // YYYY-MM-DD
    status: DocumentStatus;
    fileUrl: string; // URL to the document file (e.g., PDF, image)
}

// Helper function to determine document status based on expiry date
const getDocumentStatus = (expiryDate: string): DocumentStatus => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff <= 0) {
        return 'expired';
    } else if (daysDiff <= 30) { // Expiring within 30 days
        return 'expiring_soon';
    } else {
        return 'valid';
    }
};

export const MOCK_DOCUMENTS: Document[] = [
    {
        id: 'DOC-001',
        name: 'Permis de Conduire',
        type: 'Permis de conduire',
        issueDate: '2020-01-15',
        expiryDate: '2025-10-30', // Valid (relative to 2026-01-28)
        status: getDocumentStatus('2025-10-30'),
        fileUrl: '/public/driver_license.pdf',
    },
    {
        id: 'DOC-002',
        name: 'Assurance Véhicule',
        type: 'Assurance véhicule',
        issueDate: '2025-01-01', // Changed year to be more realistic for "expiring soon" relative to 2026
        expiryDate: '2026-02-20', // Expiring Soon (relative to 2026-01-28)
        status: getDocumentStatus('2026-02-20'),
        fileUrl: '/public/vehicle_insurance.pdf',
    },
    {
        id: 'DOC-003',
        name: 'Carte Grise',
        type: 'Carte grise',
        issueDate: '2019-07-20',
        expiryDate: '2025-12-31', // Expired (relative to 2026-01-28)
        status: getDocumentStatus('2025-12-31'),
        fileUrl: '/public/registration_card.pdf',
    },
    {
        id: 'DOC-004',
        name: 'Certificat médical',
        type: 'Certificat médical',
        issueDate: '2025-01-10',
        expiryDate: '2027-01-10', // Valid
        status: getDocumentStatus('2027-01-10'),
        fileUrl: '/public/medical_certificate.pdf',
    },
    {
        id: 'DOC-005',
        name: 'Autorisation de Transport',
        type: 'Autorisation de transport',
        issueDate: '2025-11-01',
        expiryDate: '2026-01-15', // Expired (relative to 2026-01-28, was 2028 before, changed to show expired example)
        status: getDocumentStatus('2026-01-15'),
        fileUrl: '/public/transport_authorization.pdf',
    },
    {
        id: 'DOC-006',
        name: 'Passeport',
        type: 'Autre',
        issueDate: '2020-03-01',
        expiryDate: '2030-03-01', // Valid
        status: getDocumentStatus('2030-03-01'),
        fileUrl: '/public/passport.pdf',
    },
];
