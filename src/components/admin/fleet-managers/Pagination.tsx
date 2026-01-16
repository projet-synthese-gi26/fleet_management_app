"use client";

import React from 'react';

const Pagination = () => {
  return (
    <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing <span className="font-medium text-gray-900 dark:text-white">1</span> to <span className="font-medium text-gray-900 dark:text-white">5</span> of <span className="font-medium text-gray-900 dark:text-white">42</span> results
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
