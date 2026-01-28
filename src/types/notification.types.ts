export type Notification = {
    id: string;
    type: 'geofence' | 'maintenance' | 'document' | 'mission_complete';
    icon: string;
    iconColor: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    titleKey?: string;
    descriptionKey?: string;
    timeKey?: string;
};
