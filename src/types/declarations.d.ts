// src/types/declarations.d.ts

declare module '@changey/react-leaflet-markercluster' {
    import { FC, ReactNode } from 'react';
    import { MarkerClusterGroupOptions } from 'leaflet';

    interface MarkerClusterGroupProps extends MarkerClusterGroupOptions {
        children: ReactNode;
        className?: string;
        chunkedLoading?: boolean;
    }

    const MarkerClusterGroup: FC<MarkerClusterGroupProps>;
    export default MarkerClusterGroup;
}