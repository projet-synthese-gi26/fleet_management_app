'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { lightTheme, darkTheme, Theme, ThemeMode } from '../styles/theme';

interface ThemeContextType {
    theme: Theme;
    themeMode: ThemeMode;
    toggleTheme: () => void;
    setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') as ThemeMode;
        if (savedTheme) {
            setThemeModeState(savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setThemeModeState(prefersDark ? 'dark' : 'light');
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('theme', themeMode);
            document.documentElement.setAttribute('data-theme', themeMode);
        }
    }, [themeMode, mounted]);

    const toggleTheme = () => {
        setThemeModeState(prev => prev === 'light' ? 'dark' : 'light');
    };

    const setThemeMode = (mode: ThemeMode) => {
        setThemeModeState(mode);
    };

    const theme = themeMode === 'light' ? lightTheme : darkTheme;

    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ theme, themeMode, toggleTheme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}