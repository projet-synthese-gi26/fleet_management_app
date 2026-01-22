"use client";
import React, { useState } from 'react';

interface StartBreakModalProps {
    onClose: () => void;
}

export const StartBreakModal = ({ onClose }: StartBreakModalProps) => {
    const [breakStarted, setBreakStarted] = useState(false);

    const handleStartBreak = () => {
        setBreakStarted(true);
        // Logic to record break start time
        console.log("Break started!");
    };

    const handleEndBreak = () => {
        // Logic to record break end time and duration
        console.log("Break ended!");
        onClose();
    };

    return (
        <div className="space-y-4">
            {!breakStarted ? (
                <>
                    <p className="text-gray-700 dark:text-gray-300">
                        Are you sure you want to start a break? Your status will change to "On Break".
                    </p>
                    <div className="flex justify-end pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleStartBreak}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-blue-600"
                        >
                            Start Break
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p className="text-gray-700 dark:text-gray-300">
                        You are currently on break. Enjoy your time!
                    </p>
                    <div className="flex justify-end pt-4">
                        <button
                            type="button"
                            onClick={handleEndBreak}
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                            End Break
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
