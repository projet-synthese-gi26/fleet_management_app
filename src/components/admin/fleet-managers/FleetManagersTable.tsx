"use client";

import React from 'react';

interface StatusBadgeProps {
  status: string;
  color: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, color }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800 dark:bg-${color}-900/50 dark:text-${color}-300`}>
    {status}
  </span>
);

// 2. Définir l'interface pour les données du manager dans ce tableau
interface ManagerTableData {
  avatarUrl: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  statusColor: string;
}

interface FleetManagersTableProps {
  fleetManagers: ManagerTableData[];
}

const FleetManagersTable: React.FC<FleetManagersTableProps> = ({ fleetManagers }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#182635]">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-background-dark">
            <tr>
              <th className="px-4 py-3 w-12 text-center">
                <input className="form-checkbox h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-primary focus:ring-primary focus:ring-offset-0" type="checkbox"/>
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">User</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Email</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Role</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Status</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Last Active</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {fleetManagers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-background-dark/50">
                <td className="px-4 py-2 w-12 text-center">
                  <input className="form-checkbox h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-primary focus:ring-primary focus:ring-offset-0" type="checkbox"/>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10" 
                      style={{backgroundImage: `url("${user.avatarUrl}")`}}
                    ></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{user.role}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={user.status} color={user.statusColor} />
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{user.lastActive}</td>
                <td className="px-4 py-2 text-right">
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary rounded-full hover:bg-gray-100 dark:hover:bg-primary/20">
                    <span className="material-symbols-outlined text-xl">edit</span>
                  </button>
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-red-500/20">
                    <span className="material-symbols-outlined text-xl">{user.status === 'Active' ? 'toggle_on' : 'toggle_off'}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FleetManagersTable;
