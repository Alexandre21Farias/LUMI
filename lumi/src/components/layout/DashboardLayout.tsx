import { Sidebar } from "@/components/layout/Sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}
