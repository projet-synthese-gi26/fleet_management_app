import { DateString, UUID } from "../types/base.types";

type UserStatus = 'active' | 'inactive';

export interface UserAdditionalInfo {
    avatarUrl?: string;
    status: UserStatus;
    lastActive: DateString;
}

export const MOCK_USERS_ADDITIONAL_INFO: Record<UUID, UserAdditionalInfo> = {
    "d0f8f4a0-a3a2-4c8a-9a4a-5b1b7a7e6e5a": { // John Doe
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&h=500&fit=crop",
        status: 'active',
        lastActive: '2024-05-18T14:30:00Z',
    },
    "b2f8f4a0-a3a2-4c8a-9a4a-5b1b7a7e6e5b": { // Jane Smith
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
        status: 'active',
        lastActive: '2024-05-18T16:05:00Z',
    },
    "c3f8f4a0-a3a2-4c8a-9a4a-5b1b7a7e6e5c": { // Peter Jones
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
        status: 'inactive',
        lastActive: '2024-05-15T10:00:00Z',
    }
};
