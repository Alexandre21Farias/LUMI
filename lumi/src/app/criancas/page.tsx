"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, AlertCircle, Watch, HeartPulse, Plus, Pencil, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { supabase } from "@/lib/supabase"

type Child = {
  id: string
  name: string
  age: number
  blood_type: string
  allergies: string
  photo_url: string
  user_id: string
}

export default function CriancasPage() {
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingChild, setEditingChild] = useState<Child | null>(null)

  // Form states
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [bloodType, setBloodType] = useState("")
  const [allergies, setAllergies] = useState("")

  const fetchChildren = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error("Erro ao buscar crianças:", error)
    } else {
      setChildren(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchChildren()
  }, [])

  const resetForm = () => {
    setName("")
    setAge("")
    setBloodType("")
    setAllergies("")
    setEditingChild(null)
  }

  const handleOpenModal = (child?: Child) => {
    if (child) {
      setEditingChild(child)
      setName(child.name)
      setAge(child.age.toString())
      setBloodType(child.blood_type || "")
      setAllergies(child.allergies || "")
    } else {
      resetForm()
    }
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    if (!name || !age) return

    // Admin mock user ID (from seed)
    const adminId = '11111111-1111-1111-1111-111111111111'
    const photoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff`

    if (editingChild) {
      // Update
      const { error } = await supabase
        .from('children')
        .update({
          name,
          age: parseInt(age),
          blood_type: bloodType,
          allergies,
          photo_url: photoUrl
        })
        .eq('id', editingChild.id)
        
      if (!error) {
        setIsModalOpen(false)
        fetchChildren()
      } else {
        alert("Erro ao atualizar: " + error.message)
      }
    } else {
      // Create
      const { error } = await supabase
        .from('children')
        .insert([{
          user_id: adminId,
          name,
          age: parseInt(age),
          blood_type: bloodType,
          allergies,
          photo_url: photoUrl
        }])

      if (!error) {
        setIsModalOpen(false)
        fetchChildren()
      } else {
        alert("Erro ao criar: " + error.message)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta criança? Todos os dados vinculados serão perdidos.")) {
      const { error } = await supabase.from('children').delete().eq('id', id)
      if (!error) {
        fetchChildren()
      } else {
        alert("Erro ao excluir: " + error.message)
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center">
            <Users className="mr-2 h-8 w-8 text-blue-500" />
            Crianças
          </h2>
          
          <Dialog open={isModalOpen} onOpenChange={(open) => {
            setIsModalOpen(open)
            if (!open) resetForm()
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" /> Nova Criança
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingChild ? "Editar Criança" : "Cadastrar Nova Criança"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: João Silva" />
                </div>
                <div className="space-y-2">
                  <Label>Idade</Label>
                  <Input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Ex: 8" />
                </div>
                <div className="space-y-2">
                  <Label>Tipo Sanguíneo</Label>
                  <Input value={bloodType} onChange={e => setBloodType(e.target.value)} placeholder="Ex: O+" />
                </div>
                <div className="space-y-2">
                  <Label>Alergias</Label>
                  <Input value={allergies} onChange={e => setAllergies(e.target.value)} placeholder="Ex: Amendoim (ou Nenhuma)" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSave}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Carregando dados...</div>
        ) : children.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
             <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
             <h3 className="text-lg font-medium text-slate-900">Nenhuma criança cadastrada</h3>
             <p className="text-slate-500 mb-4">Cadastre uma criança para iniciar o monitoramento.</p>
             <Button onClick={() => handleOpenModal()} variant="outline">Adicionar Criança</Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {children.map((child) => (
              <Card key={child.id} className="shadow-sm border border-slate-200 bg-white overflow-hidden relative group">
                {/* Ações Hover */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <Button size="icon" variant="secondary" className="h-8 w-8 bg-white shadow-md hover:bg-slate-100" onClick={() => handleOpenModal(child)}>
                    <Pencil className="h-4 w-4 text-slate-600" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8 shadow-md" onClick={() => handleDelete(child.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="h-24 bg-gradient-to-r from-blue-400 to-indigo-500 w-full relative">
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 text-white border-0 hover:bg-white/30 backdrop-blur-sm">Monitorado</Badge>
                  </div>
                </div>
                <CardContent className="pt-0 relative">
                  <div className="flex flex-col items-center gap-2 -mt-12 mb-4">
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-white z-10">
                      <img src={child.photo_url} alt={child.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center w-full">
                      <h3 className="text-2xl font-bold text-slate-900 truncate px-2" title={child.name}>{child.name}</h3>
                      <p className="text-slate-500">{child.age} anos</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-500 flex items-center">
                        <HeartPulse className="h-3 w-3 mr-1 text-red-400" /> Sanguíneo
                      </p>
                      <p className="font-semibold text-sm text-slate-800 truncate" title={child.blood_type}>{child.blood_type || "Não info."}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-500 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1 text-orange-400" /> Alergias
                      </p>
                      <p className="font-semibold text-sm text-slate-800 truncate" title={child.allergies}>{child.allergies || "Nenhuma"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
