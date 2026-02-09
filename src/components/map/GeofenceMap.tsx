"use client";

import React from "react";
// Importations des composants de base de la carte
import { MapContainer, TileLayer, FeatureGroup, Polygon, Circle, Popup } from "react-leaflet";
// Importation des outils de dessin
import { EditControl } from "react-leaflet-draw";
// ✅ IMPORTATION CORRIGÉE : On récupère le type depuis notre fichier de définition
import { GeofenceZone } from "@/types/geofence.types";

// Styles obligatoires pour Leaflet et les outils de dessin
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

/**
 * Propriétés attendues par le composant de carte
 */
interface Props {
  zones: GeofenceZone[]; // Liste des zones existantes à afficher
  onZoneCreated: (data: any) => void; // Fonction appelée après un dessin
}

/**
 * Composant de carte interactive pour la gestion du Geofencing
 */
export default function GeofenceMap({ zones, onZoneCreated }: Props) {
  
  /**
   * Handler déclenché par Leaflet Draw lorsqu'une forme est terminée
   */
  const _onCreated = (e: any) => {
    const { layerType, layer } = e;

    // Cas 1 : Le manager a dessiné un polygone
    if (layerType === "polygon") {
      const latlngs = layer.getLatLngs()[0];
      
      // 🔄 CONVERSION : Leaflet utilise [Lat, Lng], le backend attend [Lng, Lat] (GeoJSON)
      const coords = latlngs.map((ll: any) => [ll.lng, ll.lat]);
      
      // 🔒 SÉCURITÉ : On ferme le polygone (le dernier point doit être identique au premier)
      coords.push(coords[0]); 

      onZoneCreated({
        type: "POLYGON",
        polygon: { type: "Polygon", coordinates: [coords] }
      });
    } 
    // Cas 2 : Le manager a dessiné un cercle
    else if (layerType === "circle") {
      const center = layer.getLatLng();
      
      onZoneCreated({
        type: "CIRCLE",
        radius: layer.getRadius(),
        // 🔄 CONVERSION : [Lng, Lat] pour le point central
        center: { coordinates: [center.lng, center.lat] } 
      });
    }
    
    // On retire immédiatement le dessin "temporaire" de Leaflet. 
    // La zone sera officiellement affichée une fois enregistrée en base de données.
    layer.remove();
  };

  return (
    <MapContainer 
      center={[4.0511, 9.7679]} // Centré sur le Cameroun (Douala) par défaut
      zoom={12} 
      className="h-full w-full z-0"
    >
      {/* Fond de carte (CartoDB Voyager - Look moderne et épuré) */}
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      
      {/* Groupe contenant les outils de dessin */}
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={_onCreated}
          draw={{
            rectangle: false, // Désactivé (on utilise polygone)
            polyline: false,  // Désactivé
            circlemarker: false,
            marker: false,
            polygon: { 
              shapeOptions: { color: "#136dec", fillOpacity: 0.2 } 
            },
            circle: { 
              shapeOptions: { color: "#10b981", fillOpacity: 0.2 } 
            }
          }}
        />
      </FeatureGroup>

      {/* --- RENDU DES ZONES EXISTANTES --- */}
      {zones.map((zone) => {
        // Affichage des polygones
        if (zone.type === "POLYGON" && zone.polygon) {
          // 🔄 INVERSION : On repasse de [Lng, Lat] (API) à [Lat, Lng] (Leaflet)
          const positions = zone.polygon.coordinates[0].map(c => [c[1], c[0]] as [number, number]);
          return (
            <Polygon 
              key={zone.id} 
              positions={positions} 
              pathOptions={{ color: "#136dec", fillOpacity: 0.15 }}
            >
              <Popup><span className="font-bold">{zone.title}</span></Popup>
            </Polygon>
          );
        }
        
        // Affichage des cercles
        if (zone.type === "CIRCLE" && zone.center) {
          // 🔄 INVERSION : [Lat, Lng] pour le centre
          const center: [number, number] = [zone.center.coordinates[1], zone.center.coordinates[0]];
          return (
            <Circle 
              key={zone.id} 
              center={center} 
              radius={zone.radius} 
              pathOptions={{ color: "#10b981", fillOpacity: 0.15 }}
            >
              <Popup><span className="font-bold">{zone.title}</span></Popup>
            </Circle>
          );
        }
        return null;
      })}
    </MapContainer>
  );
}