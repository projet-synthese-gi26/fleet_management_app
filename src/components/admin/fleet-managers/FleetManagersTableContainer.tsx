"use client";

import React, { useState, useRef, useEffect } from 'react';
import Pagination from './Pagination';
import Modal from '@/components/ui/Modal';
import StatusBadge from './StatusBadge';
import { FleetStatistics } from '@/types/fleet.types';
import { useI18n } from '@/hooks/useI18n';
import PageHeader from '@/components/admin/fleet-managers/PageHeader';
import FilterBar from '@/components/admin/fleet-managers/FilterBar';

// --- Local Components ---

const Avatar = ({ name, src }) => {
  if (src) {
    return <img src={src} alt={name} className="w-10 h-10 rounded-full object-cover" />;
  }
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
  return (
    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
      {initials}
    </div>
  );
};

const ActionsMenu = ({ manager, onClose }) => {
  const menuRef = useRef(null);
  const { t } = useI18n();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const statusActionKey = manager.manager.status === 'active' ? 'actionDeactivate' : 'actionActivate';

  return (
    <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#182635] rounded-lg shadow-xl z-20 border border-gray-200 dark:border-gray-700">
      <div className="p-1">
        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary/10 rounded-md">
          {t(statusActionKey, 'fleetManagersPage')}
        </button>
        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary/10 rounded-md">
          {t('actionModify', 'fleetManagersPage')}
        </button>
        <button className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-500/10 rounded-md">
          {t('actionDelete', 'fleetManagersPage')}
        </button>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
    <div className="bg-gray-100 dark:bg-background-dark p-3 rounded-lg">
        <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
);

const FleetStatisticsCard = ({ stats }: { stats: FleetStatistics }) => {
    const { t } = useI18n();
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <StatCard title={t('statTotalVehicles', 'fleetManagersPage')} value={stats.totalVehicles} />
            <StatCard title={t('statActiveVehicles', 'fleetManagersPage')} value={stats.activeVehicles} />
            <StatCard title={t('statTotalDrivers', 'fleetManagersPage')} value={stats.totalDrivers} />
            <StatCard title={t('statOngoingTrips', 'fleetManagersPage')} value={stats.ongoingTrips} />
            <StatCard title={t('statMileageToday', 'fleetManagersPage')} value={`${stats.totalMileageToday} km`} />
            <StatCard title={t('statMaintAlerts', 'fleetManagersPage')} value={stats.maintenanceAlerts} />
            <StatCard title={t('statGeofenceViol', 'fleetManagersPage')} value={stats.geofenceViolations} />
        </div>
    );
};


// --- Main Component ---

const FleetManagersTableContainer = ({ managers }) => {
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddManagerModalOpen, setAddManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // This state would be managed by a proper state management solution
  const [managerData, setManagerData] = useState(managers);

  const handleRowClick = (manager) => {
    setSelectedManager(manager);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedManager(null);
  };
  
  const closeAddManagerModal = () => {
    setAddManagerModalOpen(false);
  }

  const toggleMenu = (managerId) => {
    setOpenMenuId(openMenuId === managerId ? null : managerId);
  };
  
  const handleAddManager = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., API call
    console.log("Adding new manager...");
    closeAddManagerModal();
  };

  return (
    <>
      <PageHeader onAddManagerClick={() => setAddManagerModalOpen(true)} />
      <FilterBar />
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#182635]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-background-dark">
              <tr>
                <th className="px-4 py-3 w-12 text-center">
                  <input className="form-checkbox h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-primary focus:ring-primary focus:ring-offset-0" type="checkbox"/>
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">{t('headerManager', 'fleetManagersPage')}</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">{t('headerEmail', 'fleetManagersPage')}</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">{t('headerStatus', 'fleetManagersPage')}</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">{t('headerFleetsManaged', 'fleetManagersPage')}</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 text-right">{t('headerActions', 'fleetManagersPage')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {managerData.map((data) => (
                <tr key={data.manager.userId} onClick={() => handleRowClick(data)} className="hover:bg-gray-50 dark:hover:bg-background-dark/50 cursor-pointer">
                  <td className="px-4 py-2 w-12 text-center">
                    <input className="form-checkbox h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-primary focus:ring-primary focus:ring-offset-0" type="checkbox"/>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <Avatar name={data.manager.name} src={data.manager.avatarUrl} />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{data.manager.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{data.manager.email}</td>
                  <td className="px-4 py-2">
                    <StatusBadge status={data.manager.status} color={data.manager.status === 'active' ? 'green' : 'gray'} />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{data.fleetCount}</td>
                  <td className="px-4 py-2 text-right">
                    <div className="relative">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleMenu(data.manager.userId); }}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary rounded-full hover:bg-gray-100 dark:hover:bg-primary/20"
                      >
                        <span className="material-symbols-outlined text-xl">more_vert</span>
                      </button>
                      {openMenuId === data.manager.userId && (
                        <ActionsMenu manager={data} onClose={() => setOpenMenuId(null)} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>

      {selectedManager && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={t('modalTitle', 'fleetManagersPage').replace('{name}', selectedManager.manager.name)}
        >
          <div className="space-y-6">
            <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('modalLastActive', 'fleetManagersPage')} {new Date(selectedManager.manager.lastActive).toLocaleString()}
            </div>
            {selectedManager.fleets.map(fleet => (
              <div key={fleet.id} className="p-4 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{fleet.name}</h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {fleet.vehicleCount} {t('modalVehicles', 'fleetManagersPage')}
                    </p>
                </div>
                {fleet.statistics ? <FleetStatisticsCard stats={fleet.statistics} /> : <p className="text-sm text-gray-500">{t('modalNoStats', 'fleetManagersPage')}</p>}
              </div>
            ))}
          </div>
        </Modal>
      )}
      
      <Modal
        isOpen={isAddManagerModalOpen}
        onClose={closeAddManagerModal}
        title={t('modalAddManagerTitle', 'fleetManagersPage')}
      >
        <form onSubmit={handleAddManager} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('formName', 'fleetManagersPage')}</label>
                <input type="text" name="name" id="name" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('formEmail', 'fleetManagersPage')}</label>
                <input type="email" name="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
            </div>
            <div className="flex justify-end pt-4">
                <button type="button" onClick={closeAddManagerModal} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 mr-2">{t('cancel', 'common')}</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark">{t('add', 'common')}</button>
            </div>
        </form>
      </Modal>
    </>
  );
};

export default FleetManagersTableContainer;
