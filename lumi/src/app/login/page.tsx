"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Mock para a demonstração ou auth real se as chaves existirem
      if (email === "admin@lumi.com") {
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      } else {
        setError("Credenciais inválidas. Use admin@lumi.com")
        setLoading(false)
      }
    } catch {
      setError("Erro ao fazer login")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-2 text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <ShieldAlert className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">LUMI<span className="text-blue-500">.</span></CardTitle>
          <CardDescription>
            Sistema Inteligente de Segurança Infantil
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@lumi.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg rounded-xl">
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
