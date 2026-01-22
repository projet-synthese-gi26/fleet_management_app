"use client";
import React, { useState } from 'react';

interface ReportIssueModalProps {
    onClose: () => void;
}

export const ReportIssueModal = ({ onClose }: ReportIssueModalProps) => {
    const [issue, setIssue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Issue Reported:", issue);
        // Here you would typically send the issue to a backend
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Describe the Issue
                </label>
                <textarea
                    id="issue"
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="flex justify-end pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 mr-2"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                    Report Issue
                </button>
            </div>
        </form>
    );
};
