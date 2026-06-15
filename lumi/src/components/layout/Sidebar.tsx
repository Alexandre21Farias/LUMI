"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const routes = [
  { label: "Dashboard", iconClass: "ti ti-layout-dashboard", href: "/dashboard", isSos: false },
  { label: "Crianças", iconClass: "ti ti-users", href: "/criancas", isSos: false },
  { label: "Rastreamento", iconClass: "ti ti-map-pin", href: "/rastreamento", isSos: false },
  { label: "Área Segura", iconClass: "ti ti-shield", href: "/area-segura", isSos: false },
  { label: "SOS", iconClass: "ti ti-alert-triangle", href: "/sos", isSos: true },
  { label: "Pulseiras", iconClass: "ti ti-device-watch", href: "/pulseiras", isSos: false },
  { label: "Histórico", iconClass: "ti ti-history", href: "/historico", isSos: false },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark"><i className="ti ti-clock"></i></div>
        <span className="logo-wordmark">LUMI</span>
      </div>
      
      <nav className="sidebar-nav">
        {routes.map((route) => {
          const isActive = pathname === route.href
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "nav-item",
                isActive && "active",
                route.isSos && "nav-item--sos"
              )}
            >
              <i className={route.iconClass}></i> {route.label}
            </Link>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        v1.0 · LUMI
      </div>
    </div>
  )
}
