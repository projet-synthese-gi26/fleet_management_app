'use client';

import React from 'react';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Menu, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const { user, isLoading, logout } = useAuth();
    const { locale } = useI18n();
    const formatRole = (roles: string[] | undefined) => {
        if (!roles || roles.length === 0) return 'Utilisateur';
        const role = roles[0].replace('ROLE_', '').replace('FLEET_', '');
        return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    };

    const getInitials = () => {
        if (!user) return '??';
        if (user.firstName && user.lastName) {
            return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
        }
        return user.username?.slice(0, 2).toUpperCase() || 'U';
    };

    return (
        <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 flex h-16 items-center justify-between bg-background/80 backdrop-blur-xl border-b border-border-default px-4 lg:px-8 shadow-sm"
        >
            
            {/* LEFT SECTION */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface transition-all duration-200"
                >
                    <Menu size={20} />
                </button>
                
                <div className="hidden sm:block">
                    <h1 className="text-lg font-bold text-text-primary tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-xs text-text-secondary">
                        Bienvenue, {user?.firstName || 'Utilisateur'}
                    </p>
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-2">
                
                {/* Search Bar (Desktop) */}
                {/* <div className="hidden lg:flex items-center gap-2 bg-surface border border-border-default rounded-full px-4 py-2 min-w-[280px] hover:border-primary/30 transition-colors">
                    <Search size={16} className="text-text-secondary" />
                    <input 
                        type="text" 
                        placeholder="Rechercher..." 
                        className="bg-transparent text-sm text-text-primary placeholder:text-text-secondary outline-none w-full"
                    />
                </div> */}

                {/* Notifications */}
                <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors">
                    <Bell size={20} className="text-text-secondary" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-background" />
                </button>

                {/* Language + Theme */}
                <div className="hidden sm:flex items-center gap-1.5 bg-surface rounded-full px-2 py-1 border border-border-default">
                    <LanguageSelector />
                    <ThemeSwitcher />
                </div>

                {/* Separator */}
                <div className="h-6 w-px bg-border-default mx-2 hidden sm:block" />

                {/* User Section */}
                <div className="flex items-center gap-3">
                    
                    {/* User Info */}
                    <div className="hidden md:flex flex-col items-end">
                        {isLoading ? (
                            <div className="h-4 w-24 bg-surface animate-pulse rounded-full mb-1" />
                        ) : (
                            <span className="text-sm font-semibold text-text-primary leading-tight">
                                {user?.firstName} {user?.lastName}
                            </span>
                        )}
                        <span className="text-[10px] uppercase tracking-widest font-bold text-text-secondary leading-tight">
                            {user ? formatRole(user.roles) : '—'}
                        </span>
                    </div>

                    {/* Avatar with Dropdown */}
                    <div className="relative group">
                        <button className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white text-sm font-bold overflow-hidden shadow-md ring-2 ring-background hover:ring-primary/30 transition-all">
                            {user?.photoUrl ? (
                                <img src={user.photoUrl} alt="Profil" className="h-full w-full object-cover" />
                            ) : (
                                <span>{getInitials()}</span>
                            )}
                        </button>
                        
                        {/* Dropdown Menu */}
                        <div className="absolute right-0 mt-2 w-56 bg-surface border border-border-default rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                            <div className="p-4 border-b border-border-default bg-gradient-to-br from-primary/5 to-transparent">
                                <p className="text-xs text-text-secondary mb-1">Connecté en tant que</p>
                                <p className="font-bold text-sm text-text-primary truncate">
                                    {user?.firstName} {user?.lastName}
                                </p>
                            </div>
                            
                            <div className="p-2">
                                {/* LIEN VERS MON PROFIL / PARAMÈTRES */}
                                <Link 
                                href={`/${locale}/admin/settings`} 
                                className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background rounded-lg transition-colors flex items-center gap-2"
                                >
                                <span className="material-symbols-outlined text-lg">person</span>
                                Mon profil
                                </Link>
                                
                                {/* <Link 
                                href={`/${locale}/admin/settings`} 
                                className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background rounded-lg transition-colors flex items-center gap-2"
                                >
                                <span className="material-symbols-outlined text-lg">settings</span>
                                Paramètres
                                </Link> */}
                            </div>
                            
                            <div className="p-2 border-t border-border-default">
                                <button 
                                    onClick={logout}
                                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error/10 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <LogOut size={16} /> 
                                    Déconnexion
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Logout (Mobile) */}
                    <button
                        onClick={logout}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:text-error hover:bg-error/10 transition-all"
                        title="Se déconnecter"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </motion.header>
    );
}