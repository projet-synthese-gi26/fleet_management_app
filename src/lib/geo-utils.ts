// Convertit [Lat, Lng] (Leaflet) en [Lng, Lat] (API)
export const toGeoJSONCoords = (latlng: any) => [latlng.lng, latlng.lat];

// Ferme un polygone pour la spec Kamga (Dernier point = Premier point)
export const closePolygon = (coords: number[][]) => {
    if (coords.length > 0) {
        const first = coords[0];
        const last = coords[coords.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) {
            return [...coords, first];
        }
    }
    return coords;
};

// Pour l'API -> Vers la Carte (Lng,Lat -> Lat,Lng)
export const mapApiToLeaflet = (coords: [number, number]): [number, number] => {
    return [coords[1], coords[0]]; 
};

// Pour la Carte -> Vers l'API (Lat,Lng -> Lng,Lat)
export const mapLeafletToApi = (latlng: { lat: number, lng: number }): [number, number] => {
    return [latlng.lng, latlng.lat];
};