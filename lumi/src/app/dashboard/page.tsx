"use client"

import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Watch, Map, History, Activity, MapPin } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Visão Geral</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Card: Crianças Monitoradas */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Crianças Monitoradas</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">2</div>
              <p className="text-xs text-slate-500 mt-1">
                João Silva, Maria Souza
              </p>
            </CardContent>
          </Card>

          {/* Card: Pulseiras Ativas */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Pulseiras Ativas</CardTitle>
              <Watch className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">1</div>
              <p className="text-xs text-emerald-500 mt-1 flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>
                LUMI-001 (87%)
              </p>
            </CardContent>
          </Card>

          {/* Card: Área Segura */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Área Segura Ativa</CardTitle>
              <Map className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">UNIFAN</div>
              <p className="text-xs text-indigo-500 mt-1">
                Raio de 300 metros
              </p>
            </CardContent>
          </Card>

          {/* Card: Último Evento */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Último Evento</CardTitle>
              <History className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">Localização Atualizada</div>
              <p className="text-xs text-slate-500 mt-1">Agora mesmo</p>
            </CardContent>
          </Card>
        </div>

        {/* Localização Atual Mapa Resumo */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 shadow-sm border-0 overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                Rastreamento em Tempo Real
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[350px] w-full bg-slate-100 relative group cursor-pointer">
                {/* Imagem estática do mapa para o dashboard com overlay para ir para o mapa real */}
                <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/14/6265/8615.png')] bg-cover bg-center opacity-70"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm bg-white/30 group-hover:bg-white/10 transition-all">
                  <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 transform group-hover:scale-105 transition-transform">
                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                       <MapPin className="h-6 w-6 text-blue-600" />
                     </div>
                     <div>
                       <p className="font-bold text-slate-900">UNIFAN</p>
                       <p className="text-sm text-slate-500">Feira de Santana, BA</p>
                     </div>
                  </div>
                  <Link href="/rastreamento" className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-lg transition-colors">
                    Abrir Mapa Interativo
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Atividades Recentes */}
          <Card className="col-span-3 shadow-sm border-0">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-500" />
                Eventos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex relative">
                  <div className="absolute left-[7px] top-6 bottom-[-24px] w-0.5 bg-slate-100"></div>
                  <div className="w-4 h-4 rounded-full bg-emerald-500 mt-1 z-10 border-2 border-white shadow-sm ring-2 ring-emerald-50"></div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-bold text-slate-800">Entrada em área segura: UNIFAN</p>
                    <p className="text-xs text-slate-500">Agora mesmo</p>
                  </div>
                </div>
                <div className="flex relative">
                  <div className="absolute left-[7px] top-6 bottom-[-24px] w-0.5 bg-slate-100"></div>
                  <div className="w-4 h-4 rounded-full bg-blue-500 mt-1 z-10 border-2 border-white shadow-sm ring-2 ring-blue-50"></div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-bold text-slate-800">Localização atualizada (Mercantil)</p>
                    <p className="text-xs text-slate-500">Há 20 minutos</p>
                  </div>
                </div>
                <div className="flex relative">
                  <div className="absolute left-[7px] top-6 bottom-[-24px] w-0.5 bg-slate-100"></div>
                  <div className="w-4 h-4 rounded-full bg-blue-500 mt-1 z-10 border-2 border-white shadow-sm ring-2 ring-blue-50"></div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-bold text-slate-800">Localização atualizada (Bio Hit)</p>
                    <p className="text-xs text-slate-500">Há 40 minutos</p>
                  </div>
                </div>
                <div className="flex relative">
                  <div className="w-4 h-4 rounded-full bg-slate-400 mt-1 z-10 border-2 border-white shadow-sm"></div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-bold text-slate-800">GPS conectado</p>
                    <p className="text-xs text-slate-500">Há 1 hora e 30 min</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href="/historico" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Ver histórico completo &rarr;
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
