"use client";

import React from "react";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { useAuth } from "@/contexts/AuthContext"; // Import du contexte d'authentification

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { user, isLoading } = useAuth();

  // Fonction pour formater le rôle (ex: FLEET_MANAGER -> Fleet Manager)
  const formatRole = (roles: string[]) => {
    if (!roles || roles.length === 0) return "Utilisateur";
    const role = roles[0].replace("ROLE_", "").replace("FLEET_", "");
    return (
      role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() + " Manager"
    );
  };

  // Fonction pour obtenir les initiales
  const getInitials = () => {
    if (!user) return "??";
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    return user.username.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border-default bg-surface px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 text-text-secondary hover:bg-background-secondary rounded-lg lg:hidden"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-lg font-semibold text-text-primary hidden sm:block">
          Aperçu du Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <LanguageSelector />
          <ThemeSwitcher />
        </div>

        <div className="h-8 w-px bg-border-default mx-2 hidden sm:block" />

        <div className="flex items-center gap-3 pl-2">
          {/* Informations textuelles */}
          <div className="flex flex-col items-end hidden md:flex">
            {isLoading ? (
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1" />
            ) : (
              <span className="text-sm font-medium text-text-primary">
                {user?.firstName} {user?.lastName}
              </span>
            )}
            <span className="text-xs text-text-secondary">
              {user ? formatRole(user.roles) : "Chargement..."}
            </span>
          </div>

          {/* Avatar : Image ou Initiales */}
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 overflow-hidden shadow-sm">
            {user?.photoUrl ? (
              <img
                src={user.photoUrl}
                alt="Profil"
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{getInitials()}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
