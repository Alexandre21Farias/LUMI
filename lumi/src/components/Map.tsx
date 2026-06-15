"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Custom main marker icon
const customIcon = L.icon({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Custom icon for route history points
const historyIcon = L.divIcon({
  className: "custom-history-icon",
  html: `<div style="background-color: #3b82f6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
})

interface MapProps {
  position: [number, number];
  safeAreas?: Array<{ name: string; lat: number; lng: number; radius: number }>;
  route?: Array<{ lat: number; lng: number; time: string; label: string }>;
  childName?: string;
}

export default function Map({ position, safeAreas = [], route = [], childName = "Criança" }: MapProps) {
  const [map, setMap] = useState<L.Map | null>(null)

  useEffect(() => {
    if (map && position) {
      map.flyTo(position, map.getZoom())
    }
  }, [position, map])

  const polylinePositions = route.map(r => [r.lat, r.lng] as [number, number])

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
      
      {/* Render all Safe Areas */}
      {safeAreas.map((area, idx) => (
        <Circle 
          key={idx}
          center={[area.lat, area.lng]} 
          radius={area.radius} 
          pathOptions={{ 
            color: area.name.toLowerCase() === 'casa' ? '#a78bfa' : '#3b82f6', 
            fillColor: area.name.toLowerCase() === 'casa' ? '#c084fc' : '#60a5fa', 
            fillOpacity: 0.2 
          }} 
        />
      ))}

      {/* Render route path line */}
      {polylinePositions.length > 1 && (
        <Polyline positions={polylinePositions} pathOptions={{ color: '#3b82f6', weight: 4, dashArray: '5, 10' }} />
      )}

      {/* Render history route markers */}
      {route.map((point, idx) => {
        const isLast = idx === route.length - 1
        if (isLast) return null
        return (
          <Marker key={idx} position={[point.lat, point.lng]} icon={historyIcon}>
            <Popup>
              <strong>Ponto de Rota</strong><br />
              Horário: {point.time}<br />
              {point.label}
            </Popup>
          </Marker>
        )
      })}

      {/* Current Position Main Marker */}
      <Marker position={position} icon={customIcon}>
        <Popup>
          <strong>{childName}</strong><br />
          Status: Atualizado agora<br />
          Lat: {position[0].toFixed(5)}, Lng: {position[1].toFixed(5)}
        </Popup>
      </Marker>
    </MapContainer>
  )
}
