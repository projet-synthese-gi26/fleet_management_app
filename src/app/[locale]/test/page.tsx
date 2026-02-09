"use client";

import React, { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/hooks/useI18n";
import { ShieldCheck, User } from "lucide-react";

export default function UserRolePage() {
  const { user } = useAuth();
  const { t } = useI18n();

  /* ============================
     NORMALISATION DES RÔLES
  ============================ */
  const normalizedRoles = useMemo<string[]>(() => {
    if (!user || !user.roles) return [];

    // roles: ["ROLE_ADMIN"]
    if (typeof user.roles[0] === "string") {
      return user.roles.map((r: string) =>
        r.replace("ROLE_", "")
      );
    }

    // roles: [{ name: "ROLE_ADMIN" }]
    if (typeof user.roles[0] === "object") {
      return user.roles
        .map((r: any) => r.name)
        .filter(Boolean)
        .map((r: string) => r.replace("ROLE_", ""));
    }

    return [];
  }, [user]);

  /* ============================
     PROTECTION
  ============================ */
  if (!user) {
    return (
      <div className="p-6">
        <p className="text-red-500 font-medium">
          Utilisateur non connecté
        </p>
      </div>
    );
  }

  /* ============================
     RENDER
  ============================ */
  return (
    <div className="p-6 max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
        <User size={24} />
        Profil utilisateur
      </h1>

      {/* USER INFO */}
      <div className="bg-surface border border-border-default rounded-xl p-5 space-y-4">
        <div>
          <p className="text-sm text-text-secondary">Nom</p>
          <p className="font-medium text-text-primary">
            {user.username ?? "—"}
          </p>
        </div>

        <div>
          <p className="text-sm text-text-secondary">Email</p>
          <p className="font-medium text-text-primary">
            {user.email ?? "—"}
          </p>
        </div>
      </div>

      {/* ROLES NORMALISÉS */}
      <div className="bg-surface border border-border-default rounded-xl p-5">
        <h2 className="font-semibold text-text-primary flex items-center gap-2 mb-3">
          <ShieldCheck size={18} className="text-primary" />
          Rôles de l’utilisateur
        </h2>

        {normalizedRoles.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {normalizedRoles.map(role => (
              <span
                key={role}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                {role}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">
            Aucun rôle détecté
          </p>
        )}
      </div>

      {/* DEBUG (OPTIONNEL) */}
      <div className="bg-black/5 border border-border-default rounded-xl p-5">
        <p className="text-xs font-semibold mb-2 text-text-secondary">
          DEBUG – rôles bruts (backend)
        </p>
        <pre className="text-xs overflow-auto text-text-primary">
          {JSON.stringify(user.roles, null, 2)}
        </pre>
      </div>
    </div>
  );
}






















    