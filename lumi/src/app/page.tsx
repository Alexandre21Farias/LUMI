import Link from "next/link"
import { Shield, MapPin, Bell, Activity, ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="px-6 lg:px-14 h-20 flex items-center bg-white shadow-sm sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Shield className="h-8 w-8 text-blue-500" />
          <span className="font-bold text-2xl tracking-tight text-slate-900">LUMI</span>
        </Link>
        <nav className="ml-auto flex gap-6 sm:gap-8 items-center">
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors hidden md:block" href="#como-funciona">
            Como Funciona
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors hidden md:block" href="#diferenciais">
            Diferenciais
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/sobre">
            Sobre o Projeto
          </Link>
          <Link href="/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6">
              Acessar Plataforma
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-10 text-center">
              <div className="space-y-6 max-w-4xl">
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-none">
                  Segurança <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-700">sem distração.</span>
                </h1>
                <p className="mx-auto max-w-[750px] text-slate-600 md:text-xl leading-relaxed">
                  Monitore crianças em tempo real sem expô-las a telas, redes sociais ou distrações de dispositivos inteligentes complexos.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="#como-funciona" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full rounded-full border-blue-200 text-blue-600 hover:bg-blue-50/50 px-8 py-6 text-lg font-semibold transition-all">
                    Conhecer Solução
                  </Button>
                </Link>
                <Link href="/login" className="w-full sm:w-auto">
                  <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-6 text-lg font-semibold shadow-xl shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all text-white">
                    Acessar Plataforma <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section id="como-funciona" className="w-full py-24 bg-white relative">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-slate-900">Como Funciona</h2>
              <p className="max-w-[700px] text-slate-500 md:text-xl leading-relaxed">
                Quatro passos simples e intuitivos para garantir a total segurança de quem você mais ama.
              </p>
            </div>
            <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:grid-cols-4 lg:gap-8">
              {[
                {
                  icon: <Activity className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />,
                  title: "1. Vestibilidade",
                  description: "A criança utiliza a pulseira LUMI no dia a dia de forma leve e prática.",
                },
                {
                  icon: <MapPin className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />,
                  title: "2. Transmissão",
                  description: "O dispositivo envia coordenadas de geolocalização em tempo real.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />,
                  title: "3. Monitoramento",
                  description: "Os responsáveis acessam as informações de qualquer lugar via painel web.",
                },
                {
                  icon: <Bell className="h-8 w-8 text-red-500 group-hover:text-white transition-colors duration-300" />,
                  title: "4. Alertas SOS",
                  description: "Notificações instantâneas são enviadas se a criança sair da área de segurança.",
                },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center p-8 bg-slate-50/50 hover:bg-white rounded-3xl border border-slate-100 hover:border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
                  <div className="p-4 bg-white rounded-2xl shadow-sm mb-6 group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="text-slate-500 mt-2 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais Section */}
        <section id="diferenciais" className="w-full py-24 bg-slate-50/50 border-y border-slate-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-slate-900">Diferenciais</h2>
              <p className="max-w-[700px] text-slate-500 md:text-xl">
                Entenda por que a LUMI é a melhor e mais segura opção em comparação a smartwatches comuns.
              </p>
            </div>
            
            <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-8 items-stretch">
              {/* Concorrente */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                    Smartwatch Comum
                  </h3>
                  <ul className="space-y-4">
                    {['Jogos viciantes', 'Acesso a redes sociais', 'Distrações em sala de aula', 'Câmeras invasivas', 'Bateria de baixa duração'].map((item, i) => (
                      <li key={i} className="flex items-center text-slate-600 text-sm">
                        <XCircle className="h-5 w-5 mr-3 text-red-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* LUMI */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-2xl border border-blue-500 relative overflow-hidden transform md:scale-105 flex flex-col justify-between text-white">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    Pulseira LUMI
                  </h3>
                  <ul className="space-y-4">
                    {['Sem jogos ou distrações', 'Foco 100% na segurança infantil', 'Sem acesso a redes sociais', 'Proteção e privacidade garantidas', 'Longa durabilidade de bateria'].map((item, i) => (
                      <li key={i} className="flex items-center text-blue-50 font-semibold text-sm">
                        <CheckCircle2 className="h-5 w-5 mr-3 text-blue-200 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-center">Recursos Essenciais Integrados:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-blue-100">
                    <div className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Rastreamento Real</div>
                    <div className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Botão Físico SOS</div>
                    <div className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Perímetro Seguro</div>
                    <div className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Monitoramento 24h</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tecnologias Section */}
        <section className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-slate-900 mb-12">Tecnologias Utilizadas</h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {['GPS', 'Bluetooth', 'IoT', 'Geolocalização', 'Supabase', 'Next.js', 'PostgreSQL', 'React Leaflet'].map((tech) => (
                <span key={tech} className="px-6 py-3 bg-blue-50 text-blue-700 rounded-full font-medium border border-blue-100">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
        {/* Viabilidade Section */}
        <section className="w-full py-20 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900">Viabilidade do Produto</h2>
              <p className="max-w-[700px] text-slate-600 md:text-xl/relaxed">
                Solução acessível para famílias que desejam monitoramento infantil sem depender de smartphones.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center">
                <p className="text-slate-500 font-medium mb-2">Custo Estimado de Produção</p>
                <p className="text-4xl font-bold text-slate-900">R$ 60,00</p>
              </div>
              <div className="bg-blue-50 p-8 rounded-3xl shadow-sm border border-blue-200 text-center">
                <p className="text-blue-600 font-medium mb-2">Preço Sugerido (Varejo)</p>
                <p className="text-4xl font-bold text-blue-900">R$ 149,90</p>
              </div>
            </div>
          </div>
        </section>

        {/* Equipe Section */}
        <section className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-slate-900 mb-12">Equipe do Projeto</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {[
                'Alexandre Lima Farias',
                'Gabriel Rodrigues Santos',
                'Iago Araújo Vasconcelos',
                'João Manoel Nascimento',
                'Rafael Moraes Araújo',
                'Vinícius da Cruz de Santana'
              ].map((member) => (
                <div key={member} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="font-semibold text-slate-800">{member}</p>
                </div>
              ))}
            </div>
            <div className="inline-block p-4 px-8 bg-blue-50 rounded-full border border-blue-100">
              <p className="text-blue-800"><span className="font-semibold">Orientadora:</span> Profª. Ivonete Maciel</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-8 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <Shield className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-xl text-white">LUMI</span>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Projeto Acadêmico LUMI. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link className="text-sm hover:text-white transition-colors" href="/sobre">
              Sobre o Projeto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
