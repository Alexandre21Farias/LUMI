"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { History, ShieldAlert, Navigation, BatteryWarning, MapPin, CheckCircle, Activity } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface EventHistory {
  id: string
  event_type: string
  description: string
  created_at: string
}

export default function HistoricoPage() {
  const [events, setEvents] = useState<EventHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('event_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50) // Limite razoável para a demonstração
      
      if (!error && data) {
        setEvents(data)
      }
      setLoading(false)
    }

    fetchEvents()
  }, [])

  // Mapeamento de estilos para os tipos de eventos
  const getEventStyle = (type: string) => {
    switch (type) {
      case 'SOS': 
        return { icon: ShieldAlert, color: "bg-red-500", bgColor: "bg-red-50 text-red-700", label: "SOS Acionado" }
      case 'BATTERY_LOW': 
        return { icon: BatteryWarning, color: "bg-orange-500", bgColor: "bg-orange-50 text-orange-700", label: "Bateria Baixa" }
      case 'SAFE_AREA_EXIT': 
        return { icon: Navigation, color: "bg-purple-500", bgColor: "bg-purple-50 text-purple-700", label: "Saída de Área Segura" }
      case 'SAFE_AREA_ENTER': 
        return { icon: CheckCircle, color: "bg-emerald-500", bgColor: "bg-emerald-50 text-emerald-700", label: "Entrada em Área Segura" }
      case 'LOCATION_UPDATE': 
        return { icon: MapPin, color: "bg-blue-500", bgColor: "bg-blue-50 text-blue-700", label: "Localização Atualizada" }
      case 'GPS_CONNECTED': 
        return { icon: Navigation, color: "bg-slate-500", bgColor: "bg-slate-50 text-slate-700", label: "GPS Conectado" }
      default: 
        return { icon: Activity, color: "bg-slate-500", bgColor: "bg-slate-50 text-slate-700", label: "Evento" }
    }
  }

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString)
    const today = new Date()
    const isToday = date.getDate() === today.getDate() && 
                    date.getMonth() === today.getMonth() && 
                    date.getFullYear() === today.getFullYear()
    
    const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    if (isToday) {
      return `Hoje, ${time}`
    } else {
      const dayStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      return `${dayStr}, ${time}`
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center">
            <History className="mr-2 h-8 w-8 text-slate-500" />
            Histórico de Eventos
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Carregando histórico...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-slate-500">Nenhum evento registrado ainda.</div>
        ) : (
          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-8 pb-8">
            {events.map((event) => {
              const style = getEventStyle(event.event_type)
              const Icon = style.icon

              return (
                <div key={event.id} className="relative pl-8 md:pl-10">
                  <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full ${style.color} border-4 border-white shadow-sm`}></div>
                  
                  <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${style.bgColor}`}>
                           <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">{style.label}</h3>
                          <p className="text-sm text-slate-500 mt-1">{event.description}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded whitespace-nowrap">
                        {formatDateTime(event.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
