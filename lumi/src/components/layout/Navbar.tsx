"use client"

import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <div className="flex items-center p-4 h-16 border-b bg-white">
      <div className="flex w-full justify-end">
        <div className="flex gap-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon" className="bg-slate-100 rounded-full">
            <User className="h-5 w-5 text-slate-600" />
          </Button>
        </div>
      </div>
    </div>
  )
}
