"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Vous pourriez logger l'erreur sur Sentry ici
    console.error("Erreur capturée par Boundary:", error);
  }, [error]);

  return (
    <div className="flex h-full min-h-[60vh] w-full flex-col items-center justify-center gap-6 p-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-500" />
      </div>

      <div className="max-w-md space-y-2">
        <h2 className="text-2xl font-bold text-text-primary">
          Oups ! Une erreur est survenue.
        </h2>
        <p className="text-text-secondary">
          Nous n'avons pas pu charger cette section. Cela peut être dû à un
          problème de connexion ou une erreur serveur temporaire.
        </p>
      </div>

      <button
        onClick={() => reset()}
        className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-white transition-transform active:scale-95 hover:bg-primary-dark"
      >
        <RefreshCw className="h-5 w-5" />
        Réessayer
      </button>
    </div>
  );
}
