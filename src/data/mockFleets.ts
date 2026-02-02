import { Fleet } from '../types/fleet.types';
import { UUID } from '../types/base.types';

const manager1: UUID = "d0f8f4a0-a3a2-4c8a-9a4a-5b1b7a7e6e5a";
const manager2: UUID = "b2f8f4a0-a3a2-4c8a-9a4a-5b1b7a7e6e5b";

export const MOCK_FLEETS: Fleet[] = [
  {
    id: "f1e1d1c1-a1b1-4c1d-a1b1-d1c1a1b1d1c1",
    name: "Alpha Fleet",
    creationDate: "2023-01-15",
    managerUserId: manager1, // <--- AJOUTÉ
    manager: {
      userId: manager1,
      name: "John Doe",
      email: "john.doe@example.com",
    },
    vehicleCount: 15,
  },
  {
    id: "f2e2d2c2-a2b2-4c2d-a2b2-d2c2a2b2d2c2",
    name: "Beta Logistics",
    creationDate: "2023-02-20",
    managerUserId: manager2, // <--- AJOUTÉ
    manager: {
      userId: manager2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    vehicleCount: 25,
  },
  {
    id: "f3e3d3c3-a3b3-4c3d-a3b3-d3c3a3b3d3c3",
    name: "Gamma North",
    creationDate: "2023-03-10",
    managerUserId: manager1, // <--- AJOUTÉ
    manager: {
        userId: manager1,
        name: "John Doe",
        email: "john.doe@example.com",
    },
    vehicleCount: 8,
  },
  {
    id: "f4e4d4c4-a4b4-4c4d-a4b4-d4c4a4b4d4c4",
    name: "Delta Express",
    creationDate: "2023-04-05",
    managerUserId: "c3f8f4a0-a3a2-4c8a-9a4a-5b1b7a7e6e5c", // <--- AJOUTÉ
    manager: {
      userId: "c3f8f4a0-a3a2-4c8a-9a4a-5b1b7a7e6e5c",
      name: "Peter Jones",
      email: "peter.jones@example.com",
    },
    vehicleCount: 32,
  },
];