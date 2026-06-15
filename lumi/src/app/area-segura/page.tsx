"use client"

import dynamic from "next/dynamic"
import { useState, useEffect, useCallback } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ShieldAlert, Save, MapPin, Trash2, Home, Plus } from "lucide-react"
import { dbService, SafeArea } from "@/lib/db"
import { useGeolocation } from "@/hooks/useGeolocation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

export default function AreaSeguraPage() {
  const { latitude, longitude, loading: geoLoading, error: geoError } = useGeolocation()
  
  const [safeAreas, setSafeAreas] = useState<SafeArea[]>([])
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null)
  
  // Form states
  const [name, setName] = useState<string>("")
  const [centerLat, setCenterLat] = useState<number>(-12.25301)
  const [centerLng, setCenterLng] = useState<number>(-38.95669)
  const [radius, setRadius] = useState<number>(300)
  
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchSafeAreas = useCallback(async () => {
    await Promise.resolve()
    setLoading(true)
    try {
      const data = await dbService.getSafeAreas()
      setSafeAreas(data)
      if (data.length > 0 && !selectedAreaId) {
        setSelectedAreaId(data[0].id)
        setName(data[0].name)
        setCenterLat(data[0].lat)
        setCenterLng(data[0].lng)
        setRadius(data[0].radius)
      }
    } catch (error) {
      console.error("Erro ao buscar áreas seguras:", error)
    }
    setLoading(false)
  }, [selectedAreaId])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSafeAreas()
    }, 0)
    return () => clearTimeout(timer)
  }, [fetchSafeAreas])

  const handleSelectArea = (area: SafeArea) => {
    setSelectedAreaId(area.id)
    setName(area.name)
    setCenterLat(area.lat)
    setCenterLng(area.lng)
    setRadius(area.radius)
  }

  const handleAddNewArea = () => {
    setSelectedAreaId(null)
    setName("Nova Área")
    setRadius(300)
    if (latitude && longitude) {
      setCenterLat(latitude)
      setCenterLng(longitude)
    } else {
      setCenterLat(-12.25301)
      setCenterLng(-38.95669)
    }
  }

  const handleUseMyLocation = () => {
    if (latitude && longitude) {
      setCenterLat(latitude)
      setCenterLng(longitude)
    } else {
      alert("Localização ainda não disponível ou bloqueada.")
    }
  }

  const handleSaveCurrentAsCasa = async () => {
    if (!latitude || !longitude) {
      alert("Aguardando sinal de GPS do navegador...")
      return
    }
    setIsSaving(true)
    try {
      // Procura se já existe uma área com o nome "Casa"
      const existingCasa = safeAreas.find(a => a.name.toLowerCase() === 'casa')
      const saved = await dbService.saveSafeArea({
        id: existingCasa?.id,
        name: "Casa",
        lat: latitude,
        lng: longitude,
        radius: 150
      })
      alert("Localização atual cadastrada como 'Casa' com sucesso!")
      
      // Recarrega
      const data = await dbService.getSafeAreas()
      setSafeAreas(data)
      const newSelected = data.find(a => a.id === saved.id) || saved
      handleSelectArea(newSelected)
    } catch (error) {
      const err = error as Error
      alert("Erro ao cadastrar Casa: " + err.message)
    }
    setIsSaving(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const saved = await dbService.saveSafeArea({
        id: selectedAreaId || undefined,
        name,
        lat: centerLat,
        lng: centerLng,
        radius
      })
      alert("Área de segurança salva com sucesso!")
      
      // Recarregar
      const data = await dbService.getSafeAreas()
      setSafeAreas(data)
      setSelectedAreaId(saved.id)
    } catch (error) {
      const err = error as Error
      alert("Erro ao salvar: " + err.message)
    }
    setIsSaving(false)
  }

  const handleDeleteArea = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm("Tem certeza que deseja excluir esta área de segurança?")) {
      try {
        await dbService.deleteSafeArea(id)
        if (selectedAreaId === id) {
          setSelectedAreaId(null)
        }
        fetchSafeAreas()
      } catch (error) {
        const err = error as Error
        alert("Erro ao excluir: " + err.message)
      }
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">Carregando áreas seguras...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center">
            <ShieldAlert className="mr-2 h-8 w-8 text-indigo-500" />
            Configurar Áreas Seguras
          </h2>
          <div className="flex gap-2">
            <Button onClick={handleSaveCurrentAsCasa} variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <Home className="h-4 w-4 mr-2" /> Salvar Local Atual como Casa
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700">
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Salvando..." : "Salvar Configurações"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 min-h-0">
          
          {/* Painel Lateral */}
          <div className="md:col-span-1 bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-800">Suas Áreas</h3>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleAddNewArea} title="Nova Área">
                  <Plus className="h-4 w-4 text-indigo-600" />
                </Button>
              </div>
              <div className="space-y-2 mb-6">
                {safeAreas.map(area => (
                  <div 
                    key={area.id} 
                    onClick={() => handleSelectArea(area)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${selectedAreaId === area.id ? 'bg-indigo-50 border-indigo-200 font-semibold' : 'bg-slate-50 hover:bg-slate-100 border-transparent'}`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {area.name.toLowerCase() === 'casa' ? <Home className="h-4 w-4 text-indigo-600 shrink-0" /> : <ShieldAlert className="h-4 w-4 text-indigo-500 shrink-0" />}
                      <span className="truncate text-sm text-slate-800">{area.name}</span>
                    </div>
                    <button onClick={(e) => handleDeleteArea(area.id, e)} className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              <h3 className="font-bold text-sm text-slate-700 mb-2 border-t pt-4">Parâmetros da Área</h3>
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
                <p className="text-sm font-medium text-slate-700">Dica: Selecione uma área na barra lateral para visualizá-la ou editá-la.</p>
             </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}
