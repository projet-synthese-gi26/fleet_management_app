// src/data/mockDriverHistory.ts

export interface DriverMission {
    id: string;
    date: string; // e.g., "2024-01-15"
    startTime: string; // e.g., "08:00 AM"
    endTime: string; // e.g., "10:30 AM"
    duration: string; // e.g., "2h 30m"
    origin: string;
    destination: string;
    route: string; // e.g., "New York, NY to Boston, MA"
    distance: number; // in km
    fuelConsumed: number; // in liters
    alerts: string[]; // e.g., ["Speeding Alert", "Geofence Exit: Warehouse"]
    status: 'completed' | 'incident'; // Re-added status field
}

export interface DriverHistorySummary {
    totalDistance: number; // in km
    completedTrips: number;
    fuelEfficiency: number; // L/100km
}

export const mockDriverMissions: DriverMission[] = [
    {
        id: "#9920",
        date: "2023-10-24",
        startTime: "08:00 AM",
        endTime: "12:20 PM",
        duration: "4h 20m",
        origin: "Warehouse A",
        destination: "Distribution Center B",
        route: "Warehouse A to Distribution Center B",
        distance: 124,
        fuelConsumed: 11.2,
        alerts: [],
        status: 'completed',
    },
    {
        id: "#9918",
        date: "2023-10-23",
        startTime: "10:00 AM",
        endTime: "11:10 AM",
        duration: "1h 10m",
        origin: "Port Zone 1",
        destination: "Warehouse A",
        route: "Port Zone 1 to Warehouse A",
        distance: 45,
        fuelConsumed: 4.8,
        alerts: ["alert_speeding"],
        status: 'incident',
    },
    {
        id: "#9915",
        date: "2023-10-22",
        startTime: "09:00 AM",
        endTime: "12:45 PM",
        duration: "3h 45m",
        origin: "Central Hub",
        destination: "North Retail Park",
        route: "Central Hub to North Retail Park",
        distance: 210,
        fuelConsumed: 18.5,
        alerts: [],
        status: 'completed',
    },
    {
        id: "#9902",
        date: "2023-10-20",
        startTime: "01:00 PM",
        endTime: "03:05 PM",
        duration: "2h 05m",
        origin: "Warehouse A",
        destination: "South Dock",
        route: "Warehouse A to South Dock",
        distance: 88,
        fuelConsumed: 7.9,
        alerts: [],
        status: 'completed',
    },
    {
        id: "#9899",
        date: "2023-10-18",
        startTime: "07:30 AM",
        endTime: "01:00 PM",
        duration: "5h 30m",
        origin: "Supplier X",
        destination: "Central Hub",
        route: "Supplier X to Central Hub",
        distance: 312,
        fuelConsumed: 28.1,
        alerts: [],
        status: 'completed',
    },
    // Add more mock missions to test pagination
    {
        id: "#9895",
        date: "2023-10-17",
        startTime: "11:00 AM",
        endTime: "12:30 PM",
        duration: "1h 30m",
        origin: "North Retail Park",
        destination: "Warehouse B",
        route: "North Retail Park to Warehouse B",
        distance: 65,
        fuelConsumed: 5.5,
        alerts: [],
        status: 'completed',
    }
];

export const mockDriverHistorySummary: DriverHistorySummary = {
    totalDistance: mockDriverMissions.reduce((sum, mission) => sum + mission.distance, 0),
    completedTrips: mockDriverMissions.length,
    fuelEfficiency: parseFloat(
        (mockDriverMissions.reduce((sum, mission) => sum + mission.fuelConsumed, 0) /
        mockDriverMissions.reduce((sum, mission) => sum + mission.distance, 0) * 100)
        .toFixed(1)
    ),
};
