import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
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
  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20 shadow-primary/10",
    success: "bg-success/10 text-success border-success/20 shadow-success/10",
    warning: "bg-warning/10 text-warning border-warning/20 shadow-warning/10",
    error: "bg-error/10 text-error border-error/20 shadow-error/10",
    info: "bg-info/10 text-info border-info/20 shadow-info/10",
  };

  const gradientClasses = {
    primary: "from-primary/5 to-transparent",
    success: "from-success/5 to-transparent",
    warning: "from-warning/5 to-transparent",
    error: "from-error/5 to-transparent",
    info: "from-info/5 to-transparent",
  };

  const trendColor =
    trend === "up"
      ? "text-success bg-success/10 border-success/20"
      : trend === "down"
        ? "text-error bg-error/10 border-error/20"
        : "text-text-secondary bg-background-secondary border-border-default";

  const trendIcon =
    trend === "up"
      ? "trending_up"
      : trend === "down"
        ? "trending_down"
        : "remove";

  return (
    <div className="group relative bg-surface rounded-xl border border-border-default p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Gradient de fond subtil */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[color]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>

      {/* Contenu */}
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wide">
              {title}
            </p>
            <h3 className="text-3xl font-bold text-text-primary mb-1 tracking-tight transition-all duration-300 group-hover:scale-105 origin-left">
              {value}
            </h3>
            {subValue && (
              <p className="text-xs text-text-tertiary mt-1 font-medium">
                {subValue}
              </p>
            )}
          </div>

          {/* Icône avec effet de glow */}
          <div
            className={`
            relative p-3 rounded-xl border transition-all duration-300
            ${colorClasses[color]}
            group-hover:scale-110 group-hover:shadow-lg
          `}
          >
            <span className="material-symbols-outlined text-2xl">{icon}</span>

            {/* Glow effect au hover */}
            <div
              className={`
              absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300
              ${colorClasses[color]}
            `}
            ></div>
          </div>
        </div>

        {/* Trend indicator */}
        {trend && trendValue && (
          <div className="mt-4 pt-4 border-t border-border-default">
            <div
              className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
              border transition-all duration-200
              ${trendColor}
            `}
            >
              <span className="material-symbols-outlined text-base">
                {trendIcon}
              </span>
              <span>{trendValue}</span>
              <span className="text-text-tertiary font-normal ml-1">
                vs last month
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000"></div>
      </div>
    </div>
  );
}
