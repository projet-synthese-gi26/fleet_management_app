"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { accountService } from "@/services/account.service";
import { toast } from "sonner";
import { User, Camera, Save, Lock, Shield, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfileSettings() {
  const { user, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // États pour les formulaires
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Initialiser le formulaire avec les données user
  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // --- Handlers ---

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await accountService.updateProfile(profileForm);
      await refreshUser(); // Met à jour le contexte global
      toast.success("Profil mis à jour avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    setIsLoading(true);
    try {
      await accountService.updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success("Mot de passe modifié !");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error("Erreur : Mot de passe actuel incorrect ou erreur serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Téléchargement de la photo...");
    try {
      await accountService.updatePicture(file);
      await refreshUser();
      toast.dismiss(toastId);
      toast.success("Photo de profil mise à jour !");
    } catch (error: any) {
      toast.dismiss(toastId);
      
      // Gestion spécifique 413
      if (error.status === 413) {
        toast.error("Image trop volumineuse", { 
            description: "L'image ne doit pas dépasser 2Mo." 
        });
      } else {
        toast.error("Erreur", { description: error.detail || "Impossible de mettre à jour la photo." });
      }
    }
  };

  const handleDeleteAccount = async () => {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
      if (confirmDelete) {
          try {
              await accountService.deleteAccount();
              toast.success("Compte supprimé. Au revoir.");
              window.location.href = "/login"; // Force redirect
          } catch (error) {
              toast.error("Impossible de supprimer le compte.");
          }
      }
  }

  if (!user) return <div className="p-8 text-center">Chargement du profil...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ===== COLONNE GAUCHE : Avatar & Infos Lecture Seule ===== */}
      <div className="space-y-6">
        {/* Carte Avatar */}
        <div className="bg-surface rounded-xl border border-border-default shadow-sm p-6 flex flex-col items-center text-center">
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-hover shadow-md">
              {user.photoUrl ? (
                <img src={user.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {/* Overlay au survol */}
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white w-8 h-8" />
            </div>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
            />
          </div>
          
          <h2 className="mt-4 text-xl font-bold text-text-primary">{user.firstName} {user.lastName}</h2>
          <p className="text-text-secondary">@{user.username}</p>
          
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {user.roles?.map(role => (
                <span key={role} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium border border-primary/20">
                    {role.replace('ROLE_', '').replace('_', ' ')}
                </span>
            ))}
          </div>
        </div>

        {/* Carte Infos Métier (Lecture Seule) */}
        <div className="bg-surface rounded-xl border border-border-default shadow-sm p-6">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" /> Informations Système
            </h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border-default">
                    <span className="text-text-secondary">ID Utilisateur</span>
                    <span className="font-mono text-text-primary text-xs">{user.id.substring(0, 12)}...</span>
                </div>
                {user.companyName && (
                    <div className="flex justify-between py-2 border-b border-border-default">
                        <span className="text-text-secondary">Entreprise</span>
                        <span className="text-text-primary font-medium">{user.companyName}</span>
                    </div>
                )}
                {user.licenceNumber && (
                    <div className="flex justify-between py-2 border-b border-border-default">
                        <span className="text-text-secondary">Permis de conduire</span>
                        <span className="text-text-primary font-medium">{user.licenceNumber}</span>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* ===== COLONNE DROITE : Formulaires Édition ===== */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Formulaire Informations Personnelles */}
        <div className="bg-surface rounded-xl border border-border-default shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-text-primary">
            <User className="w-5 h-5 text-primary" />
            Informations Personnelles
          </h2>
          
          <form onSubmit={handleProfileUpdate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Prénom</label>
                    <input 
                        type="text" 
                        value={profileForm.firstName}
                        onChange={e => setProfileForm({...profileForm, firstName: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Nom</label>
                    <input 
                        type="text" 
                        value={profileForm.lastName}
                        onChange={e => setProfileForm({...profileForm, lastName: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                    <input 
                        type="email" 
                        value={profileForm.email}
                        onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Téléphone</label>
                    <input 
                        type="tel" 
                        value={profileForm.phone}
                        onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-2">
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-70 transition-colors font-medium"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Enregistrer les modifications
                </button>
            </div>
          </form>
        </div>

        {/* Formulaire Sécurité */}
        <div className="bg-surface rounded-xl border border-border-default shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-text-primary">
            <Lock className="w-5 h-5 text-primary" />
            Sécurité
          </h2>

          <form onSubmit={handlePasswordUpdate} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Mot de passe actuel</label>
                <input 
                    type="password" 
                    required
                    value={passwordForm.currentPassword}
                    onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Nouveau mot de passe</label>
                    <input 
                        type="password" 
                        required
                        minLength={6}
                        value={passwordForm.newPassword}
                        onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Confirmer le nouveau mot de passe</label>
                    <input 
                        type="password" 
                        required
                        minLength={6}
                        value={passwordForm.confirmPassword}
                        onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-2">
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2.5 border border-border-default text-text-primary rounded-lg hover:bg-background-secondary disabled:opacity-70 transition-colors font-medium"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                    Modifier le mot de passe
                </button>
            </div>
          </form>
        </div>

        {/* Zone de Danger */}
        <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/30 p-8">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-3 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" />
                Zone de Danger
            </h2>
            <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-6">
                La suppression de votre compte est définitive. Toutes vos données seront perdues.
            </p>
            <div className="flex justify-end">
                <button 
                    onClick={handleDeleteAccount}
                    className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                >
                    <Trash2 className="w-4 h-4" />
                    Supprimer mon compte
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}