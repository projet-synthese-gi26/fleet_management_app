// 'use client';

// import React from 'react';
// import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
// import { LanguageSelector } from '@/components/ui/LanguageSelector';
// import { useAuth } from '@/contexts/AuthContext'; // Import pour accéder à logout
// import { LogOut } from 'lucide-react'; // Utilisation de Lucide pour une icône élégante

// interface DashboardHeaderProps {
//     onMenuClick: () => void;
// }

// export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
//     const { user, isLoading, logout } = useAuth(); // On récupère l'utilisateur et la fonction logout

//     // Formate le rôle pour l'affichage
//     const formatRole = (roles: string[] | undefined) => {
//         if (!roles || roles.length === 0) return 'Utilisateur';
//         const role = roles[0].replace('ROLE_', '').replace('FLEET_', '');
//         return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
//     };

//     // Génère les initiales en secours de la photo
//     const getInitials = () => {
//         if (!user) return '??';
//         if (user.firstName && user.lastName) {
//             return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
//         }
//         return user.username.slice(0, 2).toUpperCase();
//     };

//     return (
//         <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border-default bg-surface px-4 lg:px-8">
//             <div className="flex items-center gap-4">
//                 <button
//                     onClick={onMenuClick}
//                     className="p-2 text-text-secondary hover:bg-background-secondary rounded-lg lg:hidden"
//                 >
//                     <span className="material-symbols-outlined">menu</span>
//                 </button>
//                 <h1 className="text-lg font-semibold text-text-primary hidden sm:block">
//                     Aperçu du Dashboard
//                 </h1>
//             </div>

//             <div className="flex items-center gap-2 sm:gap-4">
//                 <div className="hidden sm:flex items-center gap-2">
//                     <LanguageSelector />
//                     <ThemeSwitcher />
//                 </div>
                
//                 <div className="h-8 w-px bg-border-default mx-2 hidden sm:block" />

//                 <div className="flex items-center gap-3">
//                     {/* Infos Utilisateur */}
//                     <div className="flex flex-col items-end hidden md:flex">
//                         {isLoading ? (
//                             <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1" />
//                         ) : (
//                             <span className="text-sm font-medium text-text-primary">
//                                 {user?.firstName} {user?.lastName}
//                             </span>
//                         )}
//                         <span className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">
//                             {user ? formatRole(user.roles) : 'Chargement...'}
//                         </span>
//                     </div>

//                     {/* Avatar */}
//                     <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 overflow-hidden shadow-sm">
//                         {user?.photoUrl ? (
//                             <img src={user.photoUrl} alt="Profil" className="h-full w-full object-cover" />
//                         ) : (
//                             <span>{getInitials()}</span>
//                         )}
//                     </div>

//                     {/* BOUTON DECONNEXION */}
//                     <button
//                         onClick={logout}
//                         className="ml-2 p-2 text-text-secondary hover:text-error hover:bg-error/5 rounded-lg transition-all group"
//                         title="Se déconnecter"
//                     >
//                         <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// }










// 'use client';

// import React from 'react';
// import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
// import { LanguageSelector } from '@/components/ui/LanguageSelector';
// import { useAuth } from '@/contexts/AuthContext';
// import { LogOut, Menu } from 'lucide-react';

// interface DashboardHeaderProps {
//     onMenuClick: () => void;
// }

// export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
//     const { user, isLoading, logout } = useAuth();

//     const formatRole = (roles: string[] | undefined) => {
//         if (!roles || roles.length === 0) return 'Utilisateur';
//         const role = roles[0].replace('ROLE_', '').replace('FLEET_', '');
//         return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
//     };

//     const getInitials = () => {
//         if (!user) return '??';
//         if (user.firstName && user.lastName) {
//             return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
//         }
//         return user.username.slice(0, 2).toUpperCase();
//     };

//     return (
//         <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 lg:px-8" style={{ backdropFilter: 'blur(20px)' }}>
            
//             {/* Left: Hamburger + Title */}
//             <div className="flex items-center gap-3">
//                 <button
//                     onClick={onMenuClick}
//                     className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all duration-200"
//                 >
//                     <Menu size={20} />
//                 </button>
//                 <h1 className="text-base font-semibold text-slate-700 hidden sm:block tracking-tight">
//                     Tableau de bord
//                 </h1>
//             </div>

//             {/* Right: Controls + User */}
//             <div className="flex items-center gap-2">
//                 {/* Language + Theme — hidden on mobile */}
//                 <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 rounded-xl px-2 py-1">
//                     <LanguageSelector />
//                     <ThemeSwitcher />
//                 </div>

//                 {/* Separator */}
//                 <div className="h-7 w-px bg-slate-200 mx-2 hidden sm:block" />

//                 {/* User block */}
//                 <div className="flex items-center gap-3">
//                     {/* Name + Role */}
//                     <div className="flex flex-col items-end hidden md:flex">
//                         {isLoading ? (
//                             <div className="h-3.5 w-20 bg-slate-200 animate-pulse rounded-full mb-1" />
//                         ) : (
//                             <span className="text-sm font-semibold text-slate-700 leading-tight">
//                                 {user?.firstName} {user?.lastName}
//                             </span>
//                         )}
//                         <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 leading-tight mt-0.5">
//                             {user ? formatRole(user.roles) : '—'}
//                         </span>
//                     </div>

//                     {/* Avatar */}
//                     <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-xs font-bold overflow-hidden shadow-sm ring-2 ring-white">
//                         {user?.photoUrl ? (
//                             <img src={user.photoUrl} alt="Profil" className="h-full w-full object-cover" />
//                         ) : (
//                             <span>{getInitials()}</span>
//                         )}
//                     </div>

//                     {/* Logout */}
//                     <button
//                         onClick={logout}
//                         className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group"
//                         title="Se déconnecter"
//                     >
//                         <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// }






'use client';

import React from 'react';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Menu, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const { user, isLoading, logout } = useAuth();

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
                                <p className="text-xs text-text-secondary mt-1">
                                    {user?.email || user?.username}
                                </p>
                            </div>
                            
                            <div className="p-2">
                                <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background rounded-lg transition-colors flex items-center gap-2">
                                  <span className="material-symbols-outlined text-lg">person</span>
                                  Mon profil
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background rounded-lg transition-colors flex items-center gap-2">
                                  <span className="material-symbols-outlined text-lg">settings</span>
                                  Paramètres
                                </button>
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