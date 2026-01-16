import React from 'react';
import PageHeader from '@/components/admin/fleet-managers/PageHeader';
import FilterBar from '@/components/admin/fleet-managers/FilterBar';
import FleetManagersTableContainer from '@/components/admin/fleet-managers/FleetManagersTableContainer';
import { MOCK_FLEETS } from '@/data/mockFleets';
import { MOCK_USERS_ADDITIONAL_INFO, UserAdditionalInfo } from '@/data/mockUsers';
import { MOCK_FLEET_STATISTICS } from '@/data/mockFleetStatistics';
import { FleetManager, FleetStatistics } from '@/types/fleet.types';
import { UUID } from '@/types/base.types';

type ManagerWithDetails = {
    manager: FleetManager & Partial<UserAdditionalInfo>;
    fleetCount: number;
    fleets: ({
        id: string;
        name: string;
        vehicleCount: number;
        statistics?: FleetStatistics;
    })[];
};

// This would typically be done on the server or in a dedicated selector/hook
const getManagerData = (): ManagerWithDetails[] => {
  const managerMap = new Map<UUID, ManagerWithDetails>();

  MOCK_FLEETS.forEach(fleet => {
    const managerId = fleet.manager.userId;
    if (!managerMap.has(managerId)) {
      const additionalInfo = MOCK_USERS_ADDITIONAL_INFO[managerId] || {};
      managerMap.set(managerId, {
        manager: {
            ...fleet.manager,
            ...additionalInfo
        },
        fleetCount: 0,
        fleets: []
      });
    }
    const current = managerMap.get(managerId)!;
    current.fleetCount += 1;
    current.fleets.push({ 
        id: fleet.id, 
        name: fleet.name, 
        vehicleCount: fleet.vehicleCount,
        statistics: MOCK_FLEET_STATISTICS[fleet.id]
    });
  });

  return Array.from(managerMap.values());
};


export default function FleetManagersPage() {
  const managers = getManagerData();

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader />
      <FilterBar />
      <FleetManagersTableContainer managers={managers} />
    </div>
  );
}
