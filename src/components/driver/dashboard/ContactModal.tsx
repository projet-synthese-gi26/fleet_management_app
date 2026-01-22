"use client";
import React from 'react';

interface ContactModalProps {
    onClose: () => void;
}

export const ContactModal = ({ onClose }: ContactModalProps) => {
    const handleCall = (contactType: string) => {
        console.log(`Calling: ${contactType}`);
        // Implement actual call logic here (e.g., tel: links, API calls)
        onClose();
    };

    return (
        <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                Who would you like to contact?
            </p>
            <div className="flex flex-col gap-3">
                <button
                    onClick={() => handleCall("Dispatch")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-blue-600 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">call</span>
                    Call Dispatch
                </button>
                <button
                    onClick={() => handleCall("Technical Support")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">support_agent</span>
                    Call Technical Support
                </button>
                <button
                    onClick={() => handleCall("Destination")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                    Call Destination
                </button>
            </div>
            <div className="flex justify-end pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};
