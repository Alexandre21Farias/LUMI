"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Watch, MapPin, Battery, Droplets, Activity, Plus } from "lucide-react"
import { dbService, Bracelet } from "@/lib/db"

interface PopulatedBracelet extends Bracelet {
  children?: {
    name: string
    photo_url?: string
  }
}

export default function PulseirasPage() {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  const [bracelets, setBracelets] = useState<PopulatedBracelet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBracelets = async () => {
      setLoading(true)
      try {
        const bList = await dbService.getBracelets()
        const cList = await dbService.getChildren()
        const populated: PopulatedBracelet[] = bList.map(b => {
          const child = cList.find(c => c.id === b.child_id)
          return {
            ...b,
            children: child ? { name: child.name, photo_url: child.photo_url || '' } : undefined
          }
        })
        setBracelets(populated)
      } catch (error) {
        console.error("Erro ao buscar pulseiras:", error)
      }
      setLoading(false)
    }

    const timer = setTimeout(() => {
      fetchBracelets()
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center">
            <Watch className="mr-2 h-8 w-8 text-orange-500" />
            Pulseiras
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Carregando pulseiras...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bracelets.map((bracelet) => (
              <Card key={bracelet.id} className="shadow-sm border-0 bg-white hover:shadow-md transition-shadow relative group">
                <CardHeader className="pb-4 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-800">{bracelet.code}</CardTitle>
                    <p className="text-sm text-slate-500 mt-1 flex items-center">
                      <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: bracelet.color || '#94a3b8' }}></span>
                      Cor: {bracelet.color || 'Padrão'}
                    </p>
                  </div>
                  <Badge className={`border-0 ${bracelet.is_connected ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-700 hover:bg-slate-100'}`}>
                    {bracelet.is_connected ? 'Ativa' : 'Desconectada'}
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
                          <p className="text-xs text-slate-500">
                            {bracelet.battery > 20 ? 'Boa condição' : 'Bateria Baixa'}
                          </p>
                        </div>
                      </div>
                      <span className={`font-bold ${bracelet.battery > 20 ? 'text-emerald-600' : 'text-red-600'}`}>{bracelet.battery}%</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">GPS</p>
                          <p className="text-xs text-slate-500">{bracelet.is_connected ? 'Sinal forte' : 'Sem sinal'}</p>
                        </div>
                      </div>
                      <span className={`font-bold ${bracelet.is_connected ? 'text-blue-600' : 'text-slate-500'}`}>
                        {bracelet.is_connected ? 'Conectado' : 'Offline'}
                      </span>
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
                      <span className="font-bold text-cyan-600">{bracelet.water_resistant ? 'Sim' : 'Não'}</span>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-sm text-slate-500 mb-2 flex items-center">
                        <Activity className="h-4 w-4 mr-2" /> Vinculada a:
                      </p>
                      {bracelet.children ? (
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                             {getInitials(bracelet.children.name)}
                           </div>
                           <span className="font-medium text-slate-900">{bracelet.children.name}</span>
                        </div>
                      ) : (
                        <span className="font-medium text-slate-500">Nenhuma criança vinculada</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="shadow-sm border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <Plus className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-slate-700 mb-1">Adicionar Pulseira</h3>
              <p className="text-sm text-slate-500 max-w-[200px]">
                Vincule uma nova pulseira LUMI à sua conta.
              </p>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
