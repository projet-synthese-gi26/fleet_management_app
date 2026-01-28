// Using a simple structure for now. This can be expanded based on the Trip/Mission types in the project.
export type Mission = {
    id: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'IN_PROGRESS';
    date: string;
    origin: {
        name: string;
        time?: string;
    };
    destination: {
        name: string;
        time?: string;
    };
    cargoType: string;
    distance: string;
    estimatedDuration: string;
    vehicle: string;
    contactName?: string;
    contactTitle?: string;
    contactInitials?: string;
};

export const MOCK_UPCOMING_MISSIONS: Mission[] = [
    {
        id: "#9922",
        status: "SCHEDULED",
        date: "Nov 15, 09:00 AM",
        origin: { name: "Distribution Center B" },
        destination: { name: "Retail Store 05, Downtown" },
        cargoType: "Electronics",
        distance: "240 km",
        estimatedDuration: "3h 45m",
        vehicle: "Truck #442",
        contactName: "Jean Dupont",
        contactTitle: "Logistics Supervisor",
        contactInitials: "JD"
    },
    {
        id: "#9923",
        status: "SCHEDULED",
        date: "Nov 16, 07:30 AM",
        origin: { name: "Warehouse C, Logistics Park" },
        destination: { name: "Port Terminal 2" },
        cargoType: "Construction Materials",
        distance: "180 km",
        estimatedDuration: "2h 30m",
        vehicle: "Truck #443",
        contactName: "Marie Curie",
        contactTitle: "Port Operations Manager",
        contactInitials: "MC"
    }
];

export const MOCK_COMPLETED_MISSIONS: Mission[] = [
    {
        id: "#9920",
        status: "COMPLETED",
        date: "Oct 29, 14:20",
        origin: { name: "Supplier X" },
        destination: { name: "Warehouse A" },
        cargoType: "Perishables",
        distance: "120 km",
        estimatedDuration: "1h 45m",
        vehicle: "Truck #441",
        contactName: "Pierre Dubois",
        contactTitle: "Warehouse Manager",
        contactInitials: "PD"
    },
    {
        id: "#9919",
        status: "COMPLETED",
        date: "Oct 28, 11:30",
        origin: { name: "Port Terminal 1" },
        destination: { name: "Warehouse A" },
        cargoType: "General Goods",
        distance: "150 km",
        estimatedDuration: "2h 00m",
        vehicle: "Truck #442",
        contactName: "Sophie Martin",
        contactTitle: "Logistics Coordinator",
        contactInitials: "SM"
    },
    {
        id: "#9918",
        status: "COMPLETED",
        date: "Oct 27, 16:45",
        origin: { name: "Central Hub" },
        destination: { name: "Retail Store 12" },
        cargoType: "Retail Inventory",
        distance: "90 km",
        estimatedDuration: "1h 15m",
        vehicle: "Truck #440",
        contactName: "Lucie Bernard",
        contactTitle: "Store Manager",
        contactInitials: "LB"
    }
]

