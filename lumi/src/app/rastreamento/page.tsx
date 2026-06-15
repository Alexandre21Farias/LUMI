"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, ShieldAlert, CheckCircle2 } from "lucide-react"
import { dbService } from "@/lib/db"
import { useGeolocation } from "@/hooks/useGeolocation"

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

interface RoutePoint {
  lat: number
  lng: number
  time: string
  label: string
}

interface SafeAreaInfo {
  lat: number
  lng: number
  radius: number
  name: string
}

interface BraceletInfo {
  id: string
  code: string
  is_connected: boolean
  children?: {
    name: string
    photo_url: string
  }
}

export default function RastreamentoPage() {
  const { latitude, longitude } = useGeolocation()
  const [route, setRoute] = useState<RoutePoint[]>([])
  const [safeArea, setSafeArea] = useState<SafeAreaInfo | null>(null)
  const [braceletInfo, setBraceletInfo] = useState<BraceletInfo | null>(null)
  const [loading, setLoading] = useState(true)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  const fetchTrackingData = async (showLoading = true) => {
    await Promise.resolve()
    if (showLoading) setLoading(true)
    
    try {
      // 1. Área Segura
      const safeAreas = await dbService.getSafeAreas()
      if (safeAreas.length > 0) {
        setSafeArea({
          lat: safeAreas[0].lat,
          lng: safeAreas[0].lng,
          radius: safeAreas[0].radius,
          name: safeAreas[0].name
        })
      }

      // 2. Pulseira e Criança (pegar a primeira conectada)
      const bracelets = await dbService.getBracelets()
      const activeBracelet = bracelets.find(b => b.is_connected)

      if (activeBracelet) {
        let childInfo = undefined
        if (activeBracelet.child_id) {
          const child = await dbService.getChildById(activeBracelet.child_id)
          if (child) {
            childInfo = { name: child.name, photo_url: child.photo_url || '' }
          }
        }

        setBraceletInfo({
          id: activeBracelet.id,
          code: activeBracelet.code,
          is_connected: activeBracelet.is_connected,
          children: childInfo
        })
        
        // 3. Localizações para essa pulseira
        const locations = await dbService.getLocations(activeBracelet.id)
        if (locations && locations.length > 0) {
          setRoute(locations.map(loc => ({
            lat: loc.lat,
            lng: loc.lng,
            time: new Date(loc.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            label: "Localização registrada"
          })))
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados de rastreamento:", error)
    }

    if (showLoading) setLoading(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTrackingData(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Capturar e gravar localização do apresentador em tempo real
  useEffect(() => {
    if (!latitude || !longitude || !braceletInfo?.id) return

    const saveCurrentLocation = async () => {
      const sessionKey = `saved_loc_${latitude.toFixed(5)}_${longitude.toFixed(5)}`
      if (sessionStorage.getItem(sessionKey)) return

      try {
        await dbService.addLocation(braceletInfo.id, latitude, longitude)
        sessionStorage.setItem(sessionKey, 'true')
        // Recarrega os dados da rota incluindo o novo ponto
        fetchTrackingData(false)
      } catch (error) {
        console.error("Erro ao salvar localização:", error)
      }
    }

    saveCurrentLocation()
  }, [latitude, longitude, braceletInfo?.id])

  // Helpers
  const getDistanceFromLatLonInM = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; 
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">Carregando mapa...</div>
      </DashboardLayout>
    )
  }

  if (!route.length || !safeArea) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full flex-col">
          <ShieldAlert className="w-16 h-16 text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-700">Dados insuficientes</h2>
          <p className="text-slate-500">Aguardando sinal de GPS ou configuração de área segura.</p>
        </div>
      </DashboardLayout>
    )
  }

  // Sem loop: a posição atual mostrada é sempre o último ponto registrado
  const currentPosition = route[route.length - 1]
  const distanceToCenter = getDistanceFromLatLonInM(
    currentPosition.lat, 
    currentPosition.lng, 
    safeArea.lat, 
    safeArea.lng
  )
  const isInsideSafeZone = distanceToCenter <= safeArea.radius

  return (
    <DashboardLayout>
      <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center font-display">
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
            safeZoneCenter={[safeArea.lat, safeArea.lng]} 
            safeZoneRadius={safeArea.radius} 
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
                  <span className="text-slate-500">Horário do registro:</span>
                  <span className="font-bold text-slate-800">{currentPosition.time}</span>
                </div>
                <div className="flex justify-between pt-1 border-t mt-1">
                  <span className="text-slate-500">Pulseira:</span>
                  <span className="font-medium text-slate-700">{braceletInfo?.code}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="absolute bottom-4 left-4 z-[400] max-w-sm shadow-lg border-0 bg-white/95 backdrop-blur">
             <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-md">
                   {braceletInfo?.children?.name ? getInitials(braceletInfo.children.name) : 'LU'}
                </div>
                <div>
                   <h3 className="font-bold text-slate-900">{braceletInfo?.children?.name || 'Criança não vinculada'}</h3>
                   <p className="text-sm text-slate-500">Última localização: <span className="text-slate-800 font-medium">{currentPosition.label}</span></p>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
