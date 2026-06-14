"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ShieldAlert, Save, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { useGeolocation } from "@/hooks/useGeolocation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

export default function AreaSeguraPage() {
  const { latitude, longitude, loading: geoLoading, error: geoError } = useGeolocation()
  
  const [safeAreaId, setSafeAreaId] = useState<string | null>(null)
  const [centerLat, setCenterLat] = useState<number>(-12.25301)
  const [centerLng, setCenterLng] = useState<number>(-38.95669)
  const [radius, setRadius] = useState<number>(300)
  const [name, setName] = useState<string>("Minha Área Segura")
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  // O Admin ID mockado usado no banco
  const adminId = '11111111-1111-1111-1111-111111111111'

  // Fetch initial safe area from DB
  useEffect(() => {
    const fetchSafeArea = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('safe_areas')
        .select('*')
        .eq('user_id', adminId)
        .limit(1)
        .single()
      
      if (data) {
        setSafeAreaId(data.id)
        setName(data.name)
        // Extract lat/lng from POINT(lng lat) string or fallback
        // Since we know the seed format or we can just parse it
        // Note: PostGIS POINT is usually POINT(lng lat)
        // But for simplicity if we can't parse, we use the default
        try {
          if (typeof data.center_point === 'string') {
            const match = data.center_point.match(/POINT\(([-.\d]+)\s+([-.\d]+)\)/)
            if (match) {
              setCenterLng(parseFloat(match[1]))
              setCenterLat(parseFloat(match[2]))
            }
          }
        } catch(e) {}
        
        setRadius(data.radius_meters)
      }
      setLoading(false)
    }

    fetchSafeArea()
  }, [])

  const handleUseMyLocation = () => {
    if (latitude && longitude) {
      setCenterLat(latitude)
      setCenterLng(longitude)
    } else {
      alert("Localização ainda não disponível ou bloqueada.")
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // In PostGIS, we save as POINT(longitude latitude)
    const pointStr = `POINT(${centerLng} ${centerLat})`

    if (safeAreaId) {
      // Update
      const { error } = await supabase
        .from('safe_areas')
        .update({
          name,
          radius_meters: radius,
          center_point: pointStr
        })
        .eq('id', safeAreaId)

      if (error) alert("Erro ao salvar: " + error.message)
      else alert("Área Segura atualizada com sucesso!")
    } else {
      // Insert
      const { error } = await supabase
        .from('safe_areas')
        .insert([{
          user_id: adminId,
          name,
          radius_meters: radius,
          center_point: pointStr
        }])

      if (error) alert("Erro ao criar: " + error.message)
      else {
        alert("Área Segura criada com sucesso!")
        // Ideally we should refetch to get the ID, but for demo it's fine.
      }
    }
    
    setIsSaving(false)
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">Carregando dados da Área Segura...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center">
            <ShieldAlert className="mr-2 h-8 w-8 text-indigo-500" />
            Configurar Área Segura
          </h2>
          <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 min-h-0">
          
          {/* Painel Lateral */}
          <div className="md:col-span-1 bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-6 overflow-y-auto">
            <div>
              <h3 className="font-bold text-lg mb-4 text-slate-800">Parâmetros</h3>
              <p className="text-sm text-slate-500 mb-6">Defina o ponto central e o tamanho da zona segura.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome da Área</Label>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </div>
              
              <div className="space-y-2">
                <Label>Raio de Segurança (m)</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    type="range" 
                    min="50" 
                    max="2000" 
                    step="50"
                    value={radius} 
                    onChange={e => setRadius(parseInt(e.target.value))} 
                    className="flex-1"
                  />
                  <span className="font-bold w-12 text-right">{radius}m</span>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Label className="mb-2 block">Ponto Central</Label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <Label className="text-xs text-slate-500">Latitude</Label>
                    <Input value={centerLat.toFixed(5)} readOnly className="bg-slate-50 text-xs font-mono" />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Longitude</Label>
                    <Input value={centerLng.toFixed(5)} readOnly className="bg-slate-50 text-xs font-mono" />
                  </div>
                </div>
                
                <Button 
                  onClick={handleUseMyLocation} 
                  variant="outline" 
                  className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                  disabled={geoLoading || !!geoError}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Usar Minha Localização
                </Button>
                {geoError && <p className="text-xs text-red-500 mt-2">{geoError}</p>}
                {!geoLoading && !geoError && latitude && (
                  <p className="text-xs text-emerald-500 mt-2">Sinal de GPS encontrado.</p>
                )}
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="md:col-span-3 rounded-2xl shadow-md border-4 border-indigo-100 overflow-hidden relative">
             <Map 
               position={[centerLat, centerLng]} 
               isSafeZone={true} 
               safeZoneCenter={[centerLat, centerLng]} 
               safeZoneRadius={radius} 
             />
             <div className="absolute bottom-6 left-6 z-[500] px-4 py-2 rounded-xl bg-white/90 shadow-lg backdrop-blur-sm">
                <p className="text-sm font-medium text-slate-700">Dica: O mapa está centrado na sua Área Segura.</p>
             </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}
