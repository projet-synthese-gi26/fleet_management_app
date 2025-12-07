'use client';

import React from 'react';
import { useTheme } from '../providers/ThemeProvider';

export function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-background-secondary transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <span className="material-symbols-outlined text-text-primary">
                {theme === 'light' ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
}