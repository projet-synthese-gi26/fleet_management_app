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
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error",
    info: "bg-info/10 text-info",
  };

  const trendColor =
    trend === "up"
      ? "text-success"
      : trend === "down"
      ? "text-error"
      : "text-text-secondary";
  const trendIcon =
    trend === "up"
      ? "trending_up"
      : trend === "down"
      ? "trending_down"
      : "remove";

  return (
    <div className="bg-surface rounded-xl border border-border-default p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-text-secondary mb-1">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
          {subValue && (
            <p className="text-xs text-text-tertiary mt-1">{subValue}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
      </div>

      {trend && trendValue && (
        <div className="mt-4 flex items-center gap-1 text-xs font-medium">
          <span className={`material-symbols-outlined text-base ${trendColor}`}>
            {trendIcon}
          </span>
          <span className={trendColor}>{trendValue}</span>
          <span className="text-text-tertiary">vs last month</span>
        </div>
      )}
    </div>
  );
}
