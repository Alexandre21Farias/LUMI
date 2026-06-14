"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MapPin, ShieldAlert, Watch, History, Bell, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const routes = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-blue-500" },
  { label: "Crianças", icon: Users, href: "/criancas", color: "text-purple-500" },
  { label: "Rastreamento", icon: MapPin, href: "/rastreamento", color: "text-emerald-500" },
  { label: "Área Segura", icon: ShieldAlert, href: "/area-segura", color: "text-indigo-500" },
  { label: "SOS", icon: Bell, href: "/sos", color: "text-red-500" },
  { label: "Pulseiras", icon: Watch, href: "/pulseiras", color: "text-orange-500" },
  { label: "Histórico", icon: History, href: "/historico", color: "text-slate-500" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white w-64">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold text-white">
            LUMI<span className="text-blue-500">.</span>
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
