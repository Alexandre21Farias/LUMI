"use client"

import dynamic from "next/dynamic"
import { useEffect, useState, useMemo } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, ShieldAlert, CheckCircle2 } from "lucide-react"

// Importar dinamicamente para evitar erro de 'window is not defined' do Leaflet no SSR
const Map = dynamic(() => import("@/components/Map"), { ssr: false })

export default function RastreamentoPage() {
  const [positionIndex, setPositionIndex] = useState(0)
  
  // Rota simulada: Bio Hit -> Mercantil -> UNIFAN
  const route = useMemo(() => [
    { lat: -12.2510, lng: -38.9540, label: 'Bio Hit Vila Mariana', time: '08:00' },
    { lat: -12.2515, lng: -38.9547, label: 'A caminho...', time: '08:10' },
    { lat: -12.2520, lng: -38.9555, label: 'Mercantil próximo à UNIFAN', time: '08:20' },
    { lat: -12.2525, lng: -38.9560, label: 'A caminho...', time: '08:30' },
    { lat: -12.25301, lng: -38.95669, label: 'Centro Universitário Nobre (UNIFAN)', time: '08:40' }
  ], [])

  const currentPosition = route[positionIndex]
  
  // UNIFAN location and radius (Safe area)
  const safeZoneCenter = [-12.25301, -38.95669]
  const safeZoneRadius = 300 // in meters
  
  // Calculate distance in meters between two lat/lng points (Haversine formula approximation)
  const getDistanceFromLatLonInM = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Radius of the earth in m
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; // Distance in m
  }

  const distanceToCenter = getDistanceFromLatLonInM(
    currentPosition.lat, 
    currentPosition.lng, 
    safeZoneCenter[0], 
    safeZoneCenter[1]
  )
  
  const isInsideSafeZone = distanceToCenter <= safeZoneRadius

  // Simulação de movimento a cada 5 segundos para a próxima coordenada
  useEffect(() => {
    const interval = setInterval(() => {
      setPositionIndex((prev) => (prev + 1) % route.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [route.length])

  return (
    <DashboardLayout>
      <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center">
            <MapPin className="mr-2 h-8 w-8 text-blue-500" />
            Rastreamento em Tempo Real
          </h2>
          
          <div className={`px-4 py-2 rounded-full font-bold flex items-center gap-2 ${isInsideSafeZone ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {isInsideSafeZone ? <CheckCircle2 className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
            {isInsideSafeZone ? "Dentro da Área Segura" : "Fora da Área Segura"}
          </div>
        </div>

        <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border overflow-hidden relative">
          <Map 
            position={[currentPosition.lat, currentPosition.lng]} 
            isSafeZone={true} 
            safeZoneCenter={safeZoneCenter} 
            safeZoneRadius={safeZoneRadius} 
          />
          
          <Card className="absolute top-4 right-4 z-[400] w-64 shadow-lg border-0 bg-white/95 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Navigation className="h-4 w-4 mr-2 text-blue-500" />
                Dados do GPS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Latitude:</span>
                  <span className="font-mono">{currentPosition.lat.toFixed(5)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Longitude:</span>
                  <span className="font-mono">{currentPosition.lng.toFixed(5)}</span>
                </div>
                <div className="flex justify-between border-t mt-2 pt-2">
                  <span className="text-slate-500">Horário simulado:</span>
                  <span className="font-bold text-slate-800">{currentPosition.time}</span>
                </div>
                <div className="flex justify-between pt-1 border-t mt-1">
                  <span className="text-slate-500">Atualizado:</span>
                  <span className="font-medium text-emerald-600">Agora</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="absolute bottom-4 left-4 z-[400] max-w-sm shadow-lg border-0 bg-white/95 backdrop-blur">
             <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                   <img src="https://ui-avatars.com/api/?name=Joao+Silva&background=2563eb&color=fff" alt="João Silva" className="w-full h-full object-cover" />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900">João Silva</h3>
                   <p className="text-sm text-slate-500">Última localização: <span className="text-slate-800 font-medium">{currentPosition.label}</span></p>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
