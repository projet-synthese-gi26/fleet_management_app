"use client";

import React from 'react';

const StatusBadge = ({ status, color }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800 dark:bg-${color}-900/50 dark:text-${color}-300`}>
    {status}
  </span>
);

export default StatusBadge;
