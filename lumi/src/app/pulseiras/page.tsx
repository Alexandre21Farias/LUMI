"use client"

import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Watch, MapPin, Battery, Droplets, Clock, Activity } from "lucide-react"

export default function PulseirasPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center">
            <Watch className="mr-2 h-8 w-8 text-orange-500" />
            Pulseiras
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Pulseira Ativa */}
          <Card className="shadow-sm border-0 bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-4 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-800">LUMI-001</CardTitle>
                <p className="text-sm text-slate-500 mt-1 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                  Cor: Azul bebê
                </p>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
                Ativa
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                      <Battery className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Bateria</p>
                      <p className="text-xs text-slate-500">Boa condição</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600">87%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">GPS</p>
                      <p className="text-xs text-slate-500">Sinal forte</p>
                    </div>
                  </div>
                  <span className="font-bold text-blue-600">Conectado</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
                      <Droplets className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Resistência à água</p>
                    </div>
                  </div>
                  <span className="font-bold text-cyan-600">Sim</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-200 text-slate-600 rounded-lg">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Última atualização</p>
                    </div>
                  </div>
                  <span className="font-medium text-slate-700">Agora</span>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-2 flex items-center">
                    <Activity className="h-4 w-4 mr-2" /> Vinculada a:
                  </p>
                  <div className="flex items-center gap-3">
                    <img src="https://ui-avatars.com/api/?name=Joao+Silva&background=2563eb&color=fff" className="w-8 h-8 rounded-full" alt="João" />
                    <span className="font-medium text-slate-900">João Silva</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Adicionar nova pulseira placeholder */}
          <Card className="shadow-sm border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <Watch className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-slate-700 mb-1">Adicionar Pulseira</h3>
            <p className="text-sm text-slate-500 max-w-[200px]">
              Vincule uma nova pulseira LUMI à sua conta.
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
