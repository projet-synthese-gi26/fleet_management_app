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
};

export const MOCK_UPCOMING_MISSIONS: Mission[] = [
    {
        id: "#9922",
        status: "SCHEDULED",
        date: "Nov 15, 09:00 AM",
        origin: { name: "Distribution Center B" },
        destination: { name: "Retail Store 05, Downtown" }
    },
    {
        id: "#9923",
        status: "SCHEDULED",
        date: "Nov 16, 07:30 AM",
        origin: { name: "Warehouse C, Logistics Park" },
        destination: { name: "Port Terminal 2" }
    }
];

export const MOCK_COMPLETED_MISSIONS: Mission[] = [
    {
        id: "#9920",
        status: "COMPLETED",
        date: "Oct 29, 14:20",
        origin: { name: "Supplier X" },
        destination: { name: "Warehouse A" }
    },
    {
        id: "#9919",
        status: "COMPLETED",
        date: "Oct 28, 11:30",
        origin: { name: "Port Terminal 1" },
        destination: { name: "Warehouse A" }
    },
    {
        id: "#9918",
        status: "COMPLETED",
        date: "Oct 27, 16:45",
        origin: { name: "Central Hub" },
        destination: { name: "Retail Store 12" }
    }
]
