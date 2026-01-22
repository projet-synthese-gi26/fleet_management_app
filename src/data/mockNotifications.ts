import { Notification } from "@/types/notification.types";

export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: "notif-1",
        type: "geofence",
        icon: "location_on",
        iconColor: "text-primary",
        title: "Geofence Entered: Zone 4",
        description: "You arrived at Warehouse A perimeter.",
        time: "10 mins ago",
        read: false,
    },
    {
        id: "notif-2",
        type: "maintenance",
        icon: "build",
        iconColor: "text-amber-500",
        title: "Maintenance Reminder",
        description: "Scheduled oil check due in 500km.",
        time: "2 hours ago",
        read: false,
    },
    {
        id: "notif-3",
        type: "document",
        icon: "description",
        iconColor: "text-blue-400",
        title: "New Document Uploaded",
        description: "Dispatch uploaded \"Cargo Manifest #9921\".",
        time: "4 hours ago",
        read: false,
    },
    {
        id: "notif-4",
        type: "mission_complete",
        icon: "check_circle",
        iconColor: "text-green-500",
        title: "Mission Complete",
        description: "Mission #9920 successfully closed.",
        time: "Yesterday",
        read: true,
    },
];
