"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Watch, ShieldAlert, History, Activity, Navigation, CheckCircle } from "lucide-react"
import { dbService } from "@/lib/db"

interface RecentEvent {
  id: string
  event_type: string
  description: string
  created_at: string
}

export default function DashboardPage() {
  const [childrenCount, setChildrenCount] = useState(0)
  const [activeBraceletsCount, setActiveBraceletsCount] = useState(0)
  const [safeAreaName, setSafeAreaName] = useState("Nenhuma")
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        // 1. Total de Crianças
        const children = await dbService.getChildren()
        setChildrenCount(children.length)

        // 2. Pulseiras Ativas
        const bracelets = await dbService.getBracelets()
        const activeBracelets = bracelets.filter(b => b.is_connected)
        setActiveBraceletsCount(activeBracelets.length)

        // 3. Área Segura
        const safeAreas = await dbService.getSafeAreas()
        if (safeAreas.length > 0) {
          setSafeAreaName(safeAreas[0].name)
        } else {
          setSafeAreaName("Nenhuma")
        }

        // 4. Últimos Eventos
        const events = await dbService.getEventHistory()
        setRecentEvents(events.slice(0, 3))
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error)
      }
      setLoading(false)
    }

    fetchDashboardData()
  }, [])

  // Mapeamento de ícones para eventos
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'SOS': return <ShieldAlert className="h-5 w-5 text-red-600" />
      case 'SAFE_AREA_EXIT': return <Navigation className="h-5 w-5 text-purple-600" />
      case 'SAFE_AREA_ENTER': return <CheckCircle className="h-5 w-5 text-emerald-600" />
      case 'BATTERY_LOW': return <Activity className="h-5 w-5 text-orange-600" />
      default: return <History className="h-5 w-5 text-slate-600" />
    }
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Visão Geral</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-12 text-slate-500">Carregando painel...</div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Crianças Monitoradas</CardTitle>
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Users className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{childrenCount}</div>
                  <p className="text-xs text-slate-500 mt-1">Registradas na plataforma</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Pulseiras Ativas</CardTitle>
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Watch className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{activeBraceletsCount}</div>
                  <p className="text-xs text-slate-500 mt-1">Conectadas via GPS</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Área Segura Ativa</CardTitle>
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <ShieldAlert className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 truncate" title={safeAreaName}>{safeAreaName}</div>
                  <p className="text-xs text-slate-500 mt-1">Perímetro configurado</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Bateria Média</CardTitle>
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                    <Activity className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">87%</div>
                  <p className="text-xs text-slate-500 mt-1">Bom estado</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-sm bg-white col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-800">Status Recente</CardTitle>
                  <CardDescription>Últimas atualizações das pulseiras</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentEvents.length === 0 ? (
                       <p className="text-sm text-slate-500">Nenhum evento registrado.</p>
                    ) : (
                      recentEvents.map((event) => (
                        <div key={event.id} className="flex items-center">
                          <div className={`p-2 rounded-full mr-4 bg-slate-50`}>
                            {getEventIcon(event.event_type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium text-slate-900 leading-none">{event.description}</p>
                            <p className="text-xs text-slate-500">Hoje, {formatTime(event.created_at)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
