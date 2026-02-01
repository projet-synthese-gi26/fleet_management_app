import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: "primary" | "white" | "gray";
}

export const Spinner = ({
  size = "md",
  className = "",
  color = "primary",
}: SpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-3",
    xl: "w-16 h-16 border-4",
  };

  const colorClasses = {
    primary: "border-gray-200 border-t-primary",
    white: "border-white/30 border-t-white",
    gray: "border-gray-200 border-t-gray-500",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClasses[color]}
          rounded-full
          animate-spin
        `}
      />
    </div>
  );
};

// Composant pour charger une section entière
export const PageLoader = () => (
  <div className="flex h-full w-full min-h-[300px] flex-col items-center justify-center gap-3">
    <Spinner size="lg" />
    <p className="text-sm text-text-tertiary animate-pulse font-medium">
      Chargement des données...
    </p>
  </div>
);

// Composant Overlay pour les actions bloquantes (ex: soumission formulaire)
export const OverlayLoader = () => (
  <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg">
    <Spinner size="lg" />
  </div>
);
