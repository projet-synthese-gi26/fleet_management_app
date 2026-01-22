import React from 'react';

export const WelcomeHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-black tracking-tight">Welcome back, Alex</h2>
                <div className="flex items-center gap-2">
                    <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-slate-500 dark:text-[#9dabb9] text-base">You are currently <span className="text-green-600 dark:text-green-400 font-medium">On Duty</span></p>
                </div>
            </div>
            {/* Action Buttons will be a separate component */}
        </div>
    );
};
