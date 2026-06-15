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
  //{ label: "Design System", icon: Palette, href: "/system-design", color: "text-pink-400" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white w-64 border-r border-white/5 shadow-2xl relative">
      <div className="px-4 py-6 flex-1 flex flex-col relative z-10">
        <Link href="/dashboard" className="flex items-center pl-3 mb-10 transition-transform hover:scale-102">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center mr-2 shadow-lg shadow-blue-500/30">
            <span className="text-white font-extrabold text-lg">L</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-wider">
            LUMI<span className="text-blue-500">.</span>
          </h1>
        </Link>
        <div className="space-y-2 flex-1">
          {routes.map((route) => {
            const isActive = pathname === route.href
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-semibold cursor-pointer rounded-xl transition-all duration-300 relative overflow-hidden",
                  isActive
                    ? "text-white bg-white/10 shadow-lg shadow-white/5 border border-white/10 backdrop-blur-md"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-3 bottom-3 w-[4px] rounded-r-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                )}
                <div className="flex items-center flex-1">
                  <route.icon className={cn(
                    "h-5 w-5 mr-3 transition-transform group-hover:scale-110 duration-300",
                    isActive ? "text-blue-400" : route.color
                  )} />
                  {route.label}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
