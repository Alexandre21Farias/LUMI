"use client"

import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { History, ShieldAlert, Navigation, BatteryWarning, MapPin, CheckCircle } from "lucide-react"

const timelineEvents = [
  {
    id: 1,
    time: "Hoje, 10:15",
    title: "SOS acionado",
    description: "O botão de emergência foi acionado. Equipe e responsável notificados.",
    icon: ShieldAlert,
    color: "bg-red-500",
    bgColor: "bg-red-50 text-red-700"
  },
  {
    id: 2,
    time: "Hoje, 09:45",
    title: "Bateria baixa",
    description: "A bateria da pulseira atingiu o nível de 15%.",
    icon: BatteryWarning,
    color: "bg-orange-500",
    bgColor: "bg-orange-50 text-orange-700"
  },
  {
    id: 3,
    time: "Hoje, 09:10",
    title: "Saída de área segura",
    description: "Criança saiu do perímetro configurado (UNIFAN).",
    icon: Navigation,
    color: "bg-purple-500",
    bgColor: "bg-purple-50 text-purple-700"
  },
  {
    id: 4,
    time: "Hoje, 08:40",
    title: "Entrada em área segura",
    description: "Criança entrou no perímetro configurado (UNIFAN).",
    icon: CheckCircle,
    color: "bg-emerald-500",
    bgColor: "bg-emerald-50 text-emerald-700"
  },
  {
    id: 5,
    time: "Hoje, 08:20",
    title: "Localização atualizada",
    description: "Mercantil próximo à UNIFAN.",
    icon: MapPin,
    color: "bg-blue-500",
    bgColor: "bg-blue-50 text-blue-700"
  },
  {
    id: 6,
    time: "Hoje, 08:00",
    title: "Localização atualizada",
    description: "Bio Hit Vila Mariana.",
    icon: MapPin,
    color: "bg-blue-500",
    bgColor: "bg-blue-50 text-blue-700"
  },
  {
    id: 7,
    time: "Hoje, 07:30",
    title: "GPS conectado",
    description: "Sinal de rastreamento estabelecido com sucesso.",
    icon: Navigation,
    color: "bg-slate-500",
    bgColor: "bg-slate-50 text-slate-700"
  }
]

export default function HistoricoPage() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center">
            <History className="mr-2 h-8 w-8 text-slate-500" />
            Histórico de Eventos
          </h2>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-8 pb-8">
          {timelineEvents.map((event) => (
            <div key={event.id} className="relative pl-8 md:pl-10">
              <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full ${event.color} border-4 border-white shadow-sm`}></div>
              
              <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${event.bgColor}`}>
                       <event.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{event.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{event.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded whitespace-nowrap">
                    {event.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
