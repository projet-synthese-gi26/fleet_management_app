"use client";

import React from 'react';
import { useI18n } from '@/hooks/useI18n';

const Pagination = () => {
  const { t } = useI18n();

  return (
    <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {t('paginationShowing', 'fleetManagersPage')}{' '}
        <span className="font-medium text-gray-900 dark:text-white">1</span>{' '}
        {t('paginationTo', 'fleetManagersPage')}{' '}
        <span className="font-medium text-gray-900 dark:text-white">5</span>{' '}
        {t('paginationOf', 'fleetManagersPage')}{' '}
        <span className="font-medium text-gray-900 dark:text-white">42</span>{' '}
        {t('paginationResults', 'fleetManagersPage')}
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center justify-center h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-background-dark">
          <span className="material-symbols-outlined text-xl">chevron_left</span>
        </button>
        <button className="flex items-center justify-center h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-background-dark">
          <span className="material-symbols-outlined text-xl">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
