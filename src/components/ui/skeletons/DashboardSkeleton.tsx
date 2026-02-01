import React from 'react';
import { Skeleton } from '../Skeleton';

export const StatCardSkeleton = () => (
  <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1c2127] p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-24" /> {/* Titre */}
      <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icone */}
    </div>
    <div className="space-y-2">
      <Skeleton className="h-8 w-16" /> {/* Valeur */}
      <Skeleton className="h-3 w-32" /> {/* Sous-texte */}
    </div>
  </div>
);

export const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      
      {/* Grille de stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Grille contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
        <div>
           <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};