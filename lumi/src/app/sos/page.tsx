"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function SOSPage() {
  const [sosStatus, setSosStatus] = useState<"idle" | "active" | "resolved">("idle")

  const triggerSOS = () => {
    setSosStatus("active")
  }

  const resolveSOS = () => {
    setSosStatus("resolved")
    setTimeout(() => setSosStatus("idle"), 3000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center">
            <Bell className="mr-2 h-8 w-8 text-red-500" />
            Central de Emergência
          </h2>
        </div>

        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="text-center pb-8 pt-12">
            <CardTitle className="text-2xl">Simulador de Alerta SOS</CardTitle>
            <CardDescription>
              Testar o fluxo de recebimento de alertas da pulseira.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pb-12">
            {sosStatus === "idle" && (
              <button 
                onClick={triggerSOS}
                className="w-48 h-48 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-full shadow-xl shadow-red-500/30 flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95"
              >
                <AlertTriangle className="h-16 w-16 mb-2" />
                <span className="text-2xl font-bold tracking-widest">S O S</span>
              </button>
            )}

            {sosStatus === "active" && (
              <div className="w-full max-w-md bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center animate-pulse">
                <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-700 mb-2">SOS ACIONADO</h3>
                <p className="text-red-600 mb-6 font-medium">A pulseira LUMI-001 (João Silva) acionou o botão de pânico.</p>
                <div className="space-y-2 mb-6 text-red-700 font-medium">
                  <p>✅ Responsável notificado</p>
                  <p>✅ Ocorrência registrada</p>
                  <p>✅ Equipe informada</p>
                </div>
                <div className="flex justify-center space-x-4">
                   <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-100">Ver no Mapa</Button>
                   <Button onClick={resolveSOS} className="bg-emerald-500 hover:bg-emerald-600 text-white">Marcar como Resolvido</Button>
                </div>
              </div>
            )}

            {sosStatus === "resolved" && (
              <div className="w-full max-w-md bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-emerald-700 mb-2">Situação Resolvida</h3>
                <p className="text-emerald-600">O alerta foi devidamente finalizado e o histórico foi atualizado.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
