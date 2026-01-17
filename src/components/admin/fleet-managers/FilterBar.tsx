"use client";

import React from 'react';
import { useI18n } from '@/hooks/useI18n';

const FilterBar = () => {
  const { t } = useI18n();

  return (
    <div className="bg-white dark:bg-[#182635] p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* SearchBar */}
        <div className="lg:col-span-2">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-gray-400 dark:text-gray-500 flex bg-gray-100 dark:bg-background-dark items-center justify-center pl-4 rounded-l-lg border border-gray-300 dark:border-gray-700 border-r-0">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-background-dark h-full placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal" 
                placeholder={t('searchPlaceholder', 'fleetManagersPage')} 
                defaultValue=""
              />
            </div>
          </label>
        </div>
        {/* Filters */}
        <div className="flex items-center gap-3">
          <button className="flex h-12 w-full shrink-0 items-center justify-between gap-x-2 rounded-lg bg-gray-100 dark:bg-background-dark border border-gray-300 dark:border-gray-700 px-4 text-gray-900 dark:text-white hover:border-primary">
            <p className="text-sm font-medium leading-normal">{t('statusFilter', 'fleetManagersPage')}</p>
            <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">expand_more</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-12 w-full shrink-0 items-center justify-between gap-x-2 rounded-lg bg-gray-100 dark:bg-background-dark border border-gray-300 dark:border-gray-700 px-4 text-gray-900 dark:text-white hover:border-primary">
            <p className="text-sm font-medium leading-normal">{t('roleFilter', 'fleetManagersPage')}</p>
            <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">expand_more</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
