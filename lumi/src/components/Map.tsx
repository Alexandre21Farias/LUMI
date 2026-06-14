"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Criação do ícone customizado em vez de modificar o protótipo global
const customIcon = L.icon({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface MapProps {
  position: [number, number];
  isSafeZone?: boolean;
  safeZoneCenter?: [number, number];
  safeZoneRadius?: number;
}

export default function Map({ position, isSafeZone = false, safeZoneCenter, safeZoneRadius }: MapProps) {
  const [map, setMap] = useState<L.Map | null>(null)

  useEffect(() => {
    if (map && position) {
      map.flyTo(position, map.getZoom())
    }
  }, [position, map])

  return (
    <MapContainer 
      center={position} 
      zoom={16} 
      className="w-full h-full rounded-xl"
      ref={setMap}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {isSafeZone && safeZoneCenter && (
        <Circle center={safeZoneCenter} radius={safeZoneRadius} pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }} />
      )}

      <Marker position={position} icon={customIcon}>
        <Popup>
          <strong>João Silva</strong><br />
          Pulseira: LUMI-001<br />
          Atualizado agora
        </Popup>
      </Marker>
    </MapContainer>
  )
}
