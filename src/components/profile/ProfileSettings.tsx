"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { accountService } from "@/services/account.service";
import { toast } from "sonner";
import {
  User,
  Camera,
  Save,
  Lock,
  Trash2,
  AlertTriangle,
  Loader2,
  Phone,
  Mail,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProfileSettings() {
  const { user, refreshUser, logout } = useAuth();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Formulaire Profil
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Formulaire Mot de passe
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Synchronisation avec les données utilisateur réelles au chargement
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

  // 🔒 3.2 Mettre à jour l'identité (PUT /account)
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      await accountService.updateProfile(profileForm);
      await refreshUser(); // Rafraîchit les données dans l'AuthContext
      toast.success("Profil mis à jour !");
    } catch (error: any) {
      toast.error(error.title || "Erreur", { description: error.detail });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // 🔒 3.3 Changer le mot de passe (PUT /account/password)
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Validation échouée", {
        description: "Les nouveaux mots de passe ne correspondent pas.",
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await accountService.updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success("Mot de passe modifié avec succès.");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error("Erreur", {
        description: error.detail || "L'ancien mot de passe est incorrect.",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // 🔒 3.4 Changer la photo de profil (POST /account/picture)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size localement avant upload (2Mo)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Fichier trop lourd", {
        description: "L'image ne doit pas dépasser 2Mo.",
      });
      return;
    }

    const toastId = toast.loading("Mise à jour de la photo...");
    try {
      await accountService.updatePicture(file);
      await refreshUser();
      toast.dismiss(toastId);
      toast.success("Photo mise à jour !");
    } catch (error: any) {
      toast.dismiss(toastId);
      if (error.status === 413) {
        toast.error("L'image est trop lourde pour le serveur.");
      } else {
        toast.error("Erreur d'upload", { description: error.detail });
      }
    }
  };

  // 🔒 3.5 Supprimer mon compte (DELETE /account)
  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "ATTENTION : Cette action est irréversible. Votre compte sera désactivé. Continuer ?",
      )
    )
      return;

    setIsDeleting(true);
    try {
      await accountService.deleteAccount();
      toast.success("Compte supprimé. Vous allez être déconnecté.");
      setTimeout(() => logout(), 2000);
    } catch (error: any) {
      toast.error("Erreur", { description: error.detail });
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ===== COLONNE GAUCHE : Sommaire & Info Métier (Lecture Seule) ===== */}
      <div className="space-y-6">
        <div className="bg-surface rounded-xl border border-border-default shadow-sm p-6 flex flex-col items-center text-center">
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg bg-slate-100 flex items-center justify-center">
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt="Profil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={48} className="text-slate-400" />
              )}
            </div>
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

          <h2 className="mt-4 text-xl font-bold text-text-primary">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-text-secondary text-sm">@{user.username}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {user.roles.map((role) => (
              <span
                key={role}
                className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full border border-primary/20"
              >
                {role.replace("ROLE_", "").replace("_", " ")}
              </span>
            ))}
          </div>
        </div>

        {/* Infos Système / Métier (Non modifiables selon spec) */}
        <div className="bg-surface rounded-xl border border-border-default shadow-sm p-6">
          <h3 className="font-bold text-text-primary text-sm mb-4 flex items-center gap-2 uppercase tracking-wider">
            <Shield size={16} className="text-primary" /> Informations métier
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-text-tertiary uppercase font-bold">
                Entreprise / Service
              </p>
              <p className="text-sm font-medium text-text-primary">
                {user.companyName || user.service || "Non renseigné"}
              </p>
            </div>
            {user.licenceNumber && (
              <div>
                <p className="text-[10px] text-text-tertiary uppercase font-bold">
                  Numéro de Permis
                </p>
                <p className="text-sm font-medium text-text-primary">
                  {user.licenceNumber}
                </p>
              </div>
            )}
            <div>
              <p className="text-[10px] text-text-tertiary uppercase font-bold">
                ID Système
              </p>
              <p className="text-[10px] font-mono text-text-tertiary truncate">
                {user.id}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== COLONNE DROITE : Actions ===== */}
      <div className="lg:col-span-2 space-y-8">
        {/* Formulaire Profil */}
        <section className="bg-surface rounded-xl border border-border-default shadow-sm p-6 md:p-8">
          <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
            <User size={20} className="text-primary" /> Informations
            personnelles
          </h3>
          <form
            onSubmit={handleProfileUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">
                Prénom
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={profileForm.firstName}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">
                Nom
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={profileForm.lastName}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, lastName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, phone: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button
                type="submit"
                isLoading={isUpdatingProfile}
                className="h-10 px-8"
              >
                <Save size={18} className="mr-2" /> Enregistrer
              </Button>
            </div>
          </form>
        </section>

        {/* Formulaire Sécurité */}
        <section className="bg-surface rounded-xl border border-border-default shadow-sm p-6 md:p-8">
          <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
            <Lock size={20} className="text-primary" /> Sécurité du compte
          </h3>
          <form onSubmit={handlePasswordUpdate} className="space-y-6">
            <div className="space-y-2 max-w-md">
              <label className="text-sm font-medium text-text-secondary">
                Mot de passe actuel
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="outline"
                isLoading={isUpdatingPassword}
                className="h-10 px-8"
              >
                Changer le mot de passe
              </Button>
            </div>
          </form>
        </section>

        {/* Zone de Danger */}
        <section className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/30 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertTriangle size={20} /> Zone de danger
              </h3>
              <p className="text-sm text-red-600/80 dark:text-red-400/80">
                La suppression de votre compte est définitive. Toutes vos
                données seront désactivées.
              </p>
            </div>
            <Button
              variant="danger"
              onClick={handleDeleteAccount}
              isLoading={isDeleting}
              className="h-10 whitespace-nowrap"
            >
              <Trash2 size={18} className="mr-2" /> Supprimer le compte
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
