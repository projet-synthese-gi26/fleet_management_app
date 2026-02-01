import React from "react";
import { Skeleton } from "../Skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 5 }: TableSkeletonProps) {
  return (
    <div className="w-full animate-fade-in">
      {/* Header simulé */}
      <div className="flex items-center justify-between py-4 px-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-800/50">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`head-${i}`} className="h-4 w-24" />
        ))}
      </div>

      {/* Lignes du corps */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-[#182635]">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex items-center justify-between p-4"
          >
            {/* Cellule 1 : Souvent un avatar + texte */}
            <div className="flex items-center gap-3 w-1/4">
              <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-2 w-1/2" />
              </div>
            </div>

            {/* Autres cellules */}
            {Array.from({ length: columns - 1 }).map((_, colIndex) => (
              <div key={`cell-${rowIndex}-${colIndex}`} className="flex-1 px-2">
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
