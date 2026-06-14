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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900">
                  Segurança <span className="text-blue-500">sem distração.</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl leading-relaxed">
                  Monitore crianças em tempo real sem expô-las a telas, redes sociais ou dispositivos complexos.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="#como-funciona" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full rounded-full border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
                    Conhecer Solução
                  </Button>
                </Link>
                <Link href="/login" className="w-full sm:w-auto">
                  <Button className="w-full rounded-full bg-blue-500 hover:bg-blue-600 px-8 py-6 text-lg shadow-lg shadow-blue-200">
                    Acessar Plataforma <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              {/* Imagem ilustrativa / Mockup */}
              <div className="mt-16 w-full max-w-4xl mx-auto relative group">
                <div className="absolute inset-0 bg-blue-400 rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white rounded-3xl border border-blue-100 shadow-2xl p-4 flex flex-col md:flex-row items-center overflow-hidden h-64 md:h-96">
                   <div className="flex-1 flex justify-center items-center h-full w-full bg-blue-50 rounded-2xl relative">
                     <div className="w-48 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold tracking-widest shadow-inner relative z-10">
                        PULSEIRA LUMI
                     </div>
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section id="como-funciona" className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">Como Funciona</h2>
              <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Quatro passos simples para garantir a segurança de quem você mais ama.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 md:grid-cols-4 lg:gap-10">
              {[
                {
                  icon: <Activity className="h-10 w-10 mb-4 text-blue-500" />,
                  title: "Passo 1",
                  description: "A criança utiliza a pulseira LUMI.",
                },
                {
                  icon: <MapPin className="h-10 w-10 mb-4 text-blue-500" />,
                  title: "Passo 2",
                  description: "A pulseira transmite sua localização continuamente.",
                },
                {
                  icon: <Shield className="h-10 w-10 mb-4 text-blue-500" />,
                  title: "Passo 3",
                  description: "Os responsáveis acompanham tudo em tempo real pelo app.",
                },
                {
                  icon: <Bell className="h-10 w-10 mb-4 text-red-500" />,
                  title: "Passo 4",
                  description: "Alertas são emitidos em situações de risco ou saída da área segura.",
                },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="text-slate-600 mt-2">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais Section */}
        <section id="diferenciais" className="w-full py-20 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">Diferenciais</h2>
              <p className="max-w-[700px] text-slate-600 md:text-xl/relaxed">
                Por que a LUMI é a melhor escolha em comparação a um smartwatch comum?
              </p>
            </div>
            
            <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-8">
              {/* Concorrente */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center justify-center">
                  Smartwatch Infantil
                </h3>
                <ul className="space-y-4">
                  {['Jogos', 'Redes sociais', 'Chamadas', 'Câmera', 'Apps diversos'].map((item, i) => (
                    <li key={i} className="flex items-center text-slate-600">
                      <XCircle className="h-6 w-6 mr-3 text-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* LUMI */}
              <div className="bg-blue-500 rounded-3xl p-8 shadow-xl border border-blue-400 relative overflow-hidden transform md:scale-105">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                  Pulseira LUMI
                </h3>
                <ul className="space-y-4 relative z-10">
                  {['Sem jogos', 'Sem redes sociais', 'Sem chamadas', 'Sem câmera', 'Foco exclusivo em segurança'].map((item, i) => (
                    <li key={i} className="flex items-center text-blue-50 font-medium">
                      <CheckCircle2 className="h-6 w-6 mr-3 text-blue-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-6 border-t border-blue-400/50">
                  <p className="text-white font-semibold mb-4 text-center">Recursos essenciais mantidos:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-blue-100">
                    <div className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Rastreamento</div>
                    <div className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Botão SOS</div>
                    <div className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Área Segura</div>
                    <div className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Monitoramento</div>
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
