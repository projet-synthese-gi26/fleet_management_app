"use client";

import React from 'react';
import { useI18n } from '@/hooks/useI18n';

interface PageHeaderProps {
  onAddManagerClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onAddManagerClick }) => {
  const { t } = useI18n();
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
      <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
        {t('title', 'fleetManagersPage')}
      </h1>
      <button 
        onClick={onAddManagerClick}
        className="flex items-center justify-center gap-2 min-w-[84px] cursor-pointer rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]"
      >
        <span className="material-symbols-outlined">add</span>
        <span className="truncate">{t('addManager', 'fleetManagersPage')}</span>
      </button>
    </div>
  );
};

export default PageHeader;
