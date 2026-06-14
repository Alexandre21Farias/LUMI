import Link from "next/link"
import { Shield, ArrowLeft, Lightbulb, Target, Cpu, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SobreProjeto() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Simples */}
      <header className="px-6 lg:px-14 h-20 flex items-center bg-white shadow-sm sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Shield className="h-8 w-8 text-blue-500" />
          <span className="font-bold text-2xl tracking-tight text-slate-900">LUMI</span>
        </Link>
        <nav className="ml-auto flex gap-4 items-center">
          <Link href="/">
            <Button variant="ghost" className="text-slate-600">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Sobre o Projeto</h1>
            <p className="text-xl text-slate-600">Conheça a história e o propósito por trás da LUMI.</p>
          </div>

          <div className="space-y-12">
            {/* Problema */}
            <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-red-400"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 rounded-xl text-red-500 mt-1">
                  <Target className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">O Problema</h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Atualmente, pais utilizam smartphones e smartwatches complexos para monitorar suas crianças. 
                    Isso aumenta drasticamente a exposição precoce a telas, jogos e redes sociais, prejudicando 
                    o desenvolvimento cognitivo e social na infância.
                  </p>
                </div>
              </div>
            </section>

            {/* Solução & Inovação */}
            <section className="bg-blue-50 p-8 md:p-10 rounded-3xl shadow-sm border border-blue-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-blue-500 mt-1 shadow-sm">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">A Solução e Inovação</h2>
                  <p className="text-slate-700 leading-relaxed text-lg mb-4">
                    A LUMI é uma pulseira inteligente focada <strong>exclusivamente em segurança</strong>. 
                    Sem tela, sem jogos, sem redes sociais e sem chamadas.
                  </p>
                  <p className="text-slate-700 leading-relaxed text-lg font-medium">
                    Inovação: Segurança sem distração digital.
                  </p>
                </div>
              </div>
            </section>

            {/* Impactos */}
            <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-400"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500 mt-1">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Impactos Sociais</h2>
                  <ul className="space-y-3 text-slate-600 text-lg">
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Redução do tempo de tela na infância.</li>
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Maior tranquilidade para pais e responsáveis.</li>
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Foco nas atividades reais, brincadeiras e estudos.</li>
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Acesso democratizado à segurança infantil.</li>
                  </ul>
                </div>
              </div>
            </section>

             {/* Tecnologias */}
             <section className="bg-slate-900 p-8 md:p-10 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-800 rounded-xl text-indigo-400 mt-1">
                  <Cpu className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">Stack Tecnológico</h2>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Supabase', 'PostgreSQL', 'React Leaflet', 'OpenStreetMap', 'IoT (Simulado)', 'GPS (Simulado)'].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-slate-800 text-indigo-200 text-sm rounded-md border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 bg-white border-t border-slate-200 text-center">
        <p className="text-slate-500">
          © {new Date().getFullYear()} Projeto Acadêmico LUMI.
        </p>
      </footer>
    </div>
  )
}
