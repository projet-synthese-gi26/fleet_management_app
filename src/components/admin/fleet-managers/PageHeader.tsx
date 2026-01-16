"use client";

import React from 'react';

const PageHeader = () => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
      <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Fleet Managers</h1>
      <button className="flex items-center justify-center gap-2 min-w-[84px] cursor-pointer rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
        <span className="material-symbols-outlined">add</span>
        <span className="truncate">Add Manager</span>
      </button>
    </div>
  );
};

export default PageHeader;
