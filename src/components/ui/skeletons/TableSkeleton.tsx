import React from "react";
import { Skeleton } from "../Skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 5 }: TableSkeletonProps) {
  return (
    <div className="w-full bg-surface rounded-xl border border-border-default overflow-hidden shadow-sm animate-fade-in">
      {/* Header simulé */}
      <div className="flex items-center justify-between py-4 px-6 border-b border-border-default bg-background-secondary/50">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton
            key={`head-${i}`}
            className="h-4 w-24 rounded-md"
            style={{
              animationDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>

      {/* Lignes du corps */}
      <div className="divide-y divide-border-default">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex items-center justify-between px-6 py-5 transition-all duration-300"
            style={{
              animationDelay: `${rowIndex * 80}ms`,
              opacity: 0,
              animation: `fadeInRow 400ms ease-out ${rowIndex * 80}ms forwards`,
            }}
          >
            {/* Cellule 1 : Souvent un avatar + texte */}
            <div className="flex items-center gap-3 w-1/4">
              <Skeleton className="h-10 w-10 rounded-full flex-shrink-0 shadow-sm" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3.5 w-3/4 rounded-md" />
                <Skeleton className="h-2.5 w-1/2 rounded-md" />
              </div>
            </div>

            {/* Autres cellules */}
            {Array.from({ length: columns - 1 }).map((_, colIndex) => (
              <div key={`cell-${rowIndex}-${colIndex}`} className="flex-1 px-2">
                <Skeleton className="h-3.5 w-full rounded-md" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInRow {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
