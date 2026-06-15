"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Watch, MapPin, Battery, Droplets, Activity, Plus, Pencil, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { dbService, Bracelet, Child } from "@/lib/db"

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
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBracelet, setEditingBracelet] = useState<Bracelet | null>(null)

  // Form states
  const [code, setCode] = useState("")
  const [childId, setChildId] = useState("")
  const [color, setColor] = useState("")
  const [waterResistant, setWaterResistant] = useState(false)
  const [battery, setBattery] = useState(100)
  const [isConnected, setIsConnected] = useState(true)

  const fetchBraceletsAndChildren = async () => {
    setLoading(true)
    try {
      const bList = await dbService.getBracelets()
      const cList = await dbService.getChildren()
      setChildren(cList)

      const populated: PopulatedBracelet[] = bList.map(b => {
        const child = cList.find(c => c.id === b.child_id)
        return {
          ...b,
          children: child ? { name: child.name, photo_url: child.photo_url || '' } : undefined
        }
      })
      setBracelets(populated)
    } catch (error) {
      console.error("Erro ao buscar dados de pulseiras:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBraceletsAndChildren()
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const resetForm = () => {
    setCode("")
    setChildId("")
    setColor("")
    setWaterResistant(false)
    setBattery(100)
    setIsConnected(true)
    setEditingBracelet(null)
  }

  const handleOpenModal = (bracelet?: Bracelet) => {
    if (bracelet) {
      setEditingBracelet(bracelet)
      setCode(bracelet.code)
      setChildId(bracelet.child_id || "")
      setColor(bracelet.color || "")
      setWaterResistant(bracelet.water_resistant || false)
      setBattery(bracelet.battery)
      setIsConnected(bracelet.is_connected)
    } else {
      resetForm()
    }
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    if (!code) return

    try {
      await dbService.saveBracelet({
        id: editingBracelet?.id,
        code,
        child_id: childId || null,
        battery,
        is_connected: isConnected,
        color,
        water_resistant: waterResistant
      })
      setIsModalOpen(false)
      fetchBraceletsAndChildren()
    } catch (error: any) {
      alert("Erro ao salvar pulseira: " + error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta pulseira?")) {
      try {
        const success = await dbService.deleteBracelet(id)
        if (success) {
          fetchBraceletsAndChildren()
        } else {
          alert("Erro ao excluir pulseira")
        }
      } catch (error: any) {
        alert("Erro ao excluir pulseira: " + error.message)
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center">
            <Watch className="mr-2 h-8 w-8 text-orange-500" />
            Pulseiras
          </h2>
          
          <Dialog open={isModalOpen} onOpenChange={(open) => {
            setIsModalOpen(open)
            if (!open) resetForm()
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenModal()} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
                <Plus className="h-4 w-4 mr-2" /> Nova Pulseira
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl border border-slate-100 p-6 shadow-2xl">
              <DialogHeader className="pb-4 border-b">
                <DialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Watch className="h-6 w-6 text-orange-500" />
                  {editingBracelet ? "Editar Pulseira" : "Cadastrar Nova Pulseira"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-1">
                  <Label className="text-sm font-semibold text-slate-600">Código do Dispositivo</Label>
                  <Input value={code} onChange={e => setCode(e.target.value)} placeholder="Ex: LUMI-002" className="rounded-xl border-slate-200 focus:border-orange-500" />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-sm font-semibold text-slate-600">Vincular a Criança</Label>
                  <select 
                    value={childId} 
                    onChange={e => setChildId(e.target.value)} 
                    className="w-full flex h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    <option value="">Nenhuma criança vinculada</option>
                    {children.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-semibold text-slate-600">Cor</Label>
                  <Input value={color} onChange={e => setColor(e.target.value)} placeholder="Ex: Azul bebê" className="rounded-xl border-slate-200 focus:border-orange-500" />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="water_resistant" 
                    checked={waterResistant} 
                    onChange={e => setWaterResistant(e.target.checked)} 
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" 
                  />
                  <Label htmlFor="water_resistant" className="text-sm font-semibold text-slate-600">Resistente à Água</Label>
                </div>

                {editingBracelet && (
                  <>
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold text-slate-600">Bateria (%)</Label>
                      <Input type="number" min="0" max="100" value={battery} onChange={e => setBattery(parseInt(e.target.value))} className="rounded-xl border-slate-200" />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="is_connected" 
                        checked={isConnected} 
                        onChange={e => setIsConnected(e.target.checked)} 
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" 
                      />
                      <Label htmlFor="is_connected" className="text-sm font-semibold text-slate-600">Sinal de GPS Ativo (Conectado)</Label>
                    </div>
                  </>
                )}
              </div>
              <DialogFooter className="pt-4 border-t flex gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50">Cancelar</Button>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-5" onClick={handleSave}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Carregando pulseiras...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bracelets.map((bracelet) => (
              <Card key={bracelet.id} className="shadow-sm border-0 bg-white hover:shadow-md transition-shadow relative group">
                <CardHeader className="pb-4 flex flex-row items-start justify-between relative">
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-800">{bracelet.code}</CardTitle>
                    <p className="text-sm text-slate-500 mt-1 flex items-center">
                      <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: bracelet.color ? '#f97316' : '#94a3b8' }}></span>
                      Cor: {bracelet.color || 'Padrão'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`border-0 ${bracelet.is_connected ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-700 hover:bg-slate-100'}`}>
                      {bracelet.is_connected ? 'Ativa' : 'Desconectada'}
                    </Badge>
                  </div>

                  {/* Edit and Delete Actions */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <Button size="icon" variant="secondary" className="h-8 w-8 bg-white shadow-md hover:bg-slate-100 border" onClick={() => handleOpenModal(bracelet)}>
                      <Pencil className="h-4 w-4 text-slate-600" />
                    </Button>
                    <Button size="icon" variant="destructive" className="h-8 w-8 shadow-md" onClick={() => handleDelete(bracelet.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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

            <Card 
              onClick={() => handleOpenModal()} 
              className="shadow-sm border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer"
            >
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
