"use client";

import React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Network,
  Truck,
  Users,
  Navigation,
  AlertCircle,
  CheckCircle2,
  LucideIcon,
  Activity
} from "lucide-react";

// Mapping des noms d'icônes vers les composants Lucide
const iconMap: Record<string, LucideIcon> = {
  hub: Network,
  local_shipping: Truck,
  groups: Users,
  alt_route: Navigation,
  warning: AlertCircle,
  check_circle: CheckCircle2,
  activity: Activity
};

interface StatCardProps {
  title: string;
  value: string | number; // ✅ Accepte string OU number pour éviter le rouge
  subValue?: string;
  icon: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "primary" | "success" | "warning" | "error" | "info";
}

export function StatCard({
  title,
  value,
  subValue,
  icon,
  trend,
  trendValue,
  color = "primary",
}: StatCardProps) {
  
  // Configuration des styles selon la couleur passée
  const colorConfigs = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
    info: "bg-info/10 text-info border-info/20",
  };

  // Sélection de l'icône (fallback sur Activity si non trouvé)
  const IconComponent = iconMap[icon] || Activity;

  // Gestion de la tendance
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColorClass = trend === "up" ? "text-success" : trend === "down" ? "text-error" : "text-text-tertiary";

  return (
    <div className="group relative bg-surface rounded-2xl border border-border-default p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      
      {/* Effet visuel de fond au survol */}
      <div className={`absolute inset-0 bg-gradient-to-br from-current to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 ${colorConfigs[color]}`} />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
              {title}
            </p>
            <h3 className="text-2xl font-black text-text-primary tracking-tight">
              {value}
            </h3>
            {subValue && (
              <p className="text-[11px] text-text-secondary font-medium">
                {subValue}
              </p>
            )}
          </div>

          {/* Icône avec la couleur dynamique */}
          <div className={`p-3 rounded-xl border transition-transform duration-300 group-hover:scale-110 ${colorConfigs[color]}`}>
            <IconComponent size={20} strokeWidth={2.5} />
          </div>
        </div>

        {/* Barre de tendance en bas */}
        {trendValue && (
          <div className="flex items-center gap-2 pt-2 border-t border-border-default/50">
            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-lg bg-background-secondary ${trendColorClass}`}>
              {trend && <TrendIcon size={12} strokeWidth={3} />}
              {trendValue}
            </div>
            <span className="text-[9px] text-text-tertiary font-bold uppercase tracking-tighter">
              Statut actuel
            </span>
          </div>
        )}
      </div>

      {/* Petite barre colorée décorative sur le côté */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-300 group-hover:h-12 ${
        color === 'primary' ? 'bg-primary' : 
        color === 'success' ? 'bg-success' : 
        color === 'warning' ? 'bg-warning' : 
        color === 'error' ? 'bg-error' : 'bg-info'
      }`} />
    </div>
  );
}