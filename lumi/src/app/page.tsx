"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, MapPin, Bell, Activity, ArrowRight, CheckCircle2, XCircle, Menu, X, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="px-6 lg:px-14 h-20 flex items-center bg-white shadow-sm sticky top-0 z-50 justify-between">
        <Link className="flex items-center gap-2" href="/">
          <Shield className="h-8 w-8 text-blue-500" />
          <span className="font-bold text-2xl tracking-tight text-slate-900">LUMI</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 sm:gap-8 items-center">
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#como-funciona">
            Como Funciona
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#diferenciais">
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

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-blue-600 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-white border-b border-slate-200 shadow-lg z-40 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col p-6 gap-4">
            <Link 
              className="text-base font-medium text-slate-700 hover:text-blue-600 transition-colors py-2 border-b border-slate-100" 
              href="#como-funciona"
              onClick={() => setMobileMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link 
              className="text-base font-medium text-slate-700 hover:text-blue-600 transition-colors py-2 border-b border-slate-100" 
              href="#diferenciais"
              onClick={() => setMobileMenuOpen(false)}
            >
              Diferenciais
            </Link>
            <Link 
              className="text-base font-medium text-slate-700 hover:text-blue-600 transition-colors py-2 border-b border-slate-100" 
              href="/sobre"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre o Projeto
            </Link>
            <Link href="/login" className="pt-2" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-6">
                Acessar Plataforma
              </Button>
            </Link>
          </nav>
        </div>
      )}

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

        {/* Smartphone Integration / Access Section */}
        <section className="w-full py-24 bg-gradient-to-b from-white to-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              
              {/* Text Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold animate-pulse">
                  <Smartphone className="h-4 w-4" /> Otimizado para Celulares
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-slate-900">
                  Todo o controle na palma da sua mão
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Não é necessário baixar aplicativos pesados nas lojas virtuais. Nossa plataforma web é 100% responsiva e otimizada para smartphones, permitindo que você monitore seu filho de qualquer lugar com facilidade.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Rastreamento Instantâneo</h4>
                      <p className="text-slate-600 text-sm">Visualize a localização exata no mapa com atualizações contínuas.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 text-red-600">
                      <Bell className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Alertas Inteligentes</h4>
                      <p className="text-slate-600 text-sm">Receba notificações de emergência de forma instantânea em seu smartphone.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Configuração de Perímetros</h4>
                      <p className="text-slate-600 text-sm">Altere áreas seguras e gerencie números de SOS em poucos toques na tela.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smartphone Mockup */}
              <div className="flex justify-center items-center">
                {/* CSS Phone Frame */}
                <div className="relative w-[310px] h-[620px] bg-slate-950 rounded-[50px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] border-[10px] border-slate-800 ring-1 ring-slate-700/50 overflow-hidden flex flex-col">
                  {/* Speaker and Camera Notch */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center">
                    <div className="w-16 h-1.5 bg-slate-950 rounded-full mb-1"></div>
                  </div>

                  {/* Status Bar */}
                  <div className="h-8 pt-6 px-6 bg-white flex justify-between items-center text-[10px] font-bold text-slate-600 z-30 select-none">
                    <span>18:25</span>
                    <div className="flex items-center gap-1">
                      <span>5G</span>
                      <div className="w-4 h-2.5 border border-slate-600 rounded-sm p-[1px] flex items-center">
                        <div className="w-full h-full bg-slate-600 rounded-2xs"></div>
                      </div>
                    </div>
                  </div>

                  {/* Screen Content */}
                  <div className="flex-1 bg-slate-50 flex flex-col p-4 relative overflow-y-auto pt-2">
                    {/* Header of mock app */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <div className="p-1 bg-blue-500 rounded-lg text-white">
                          <Shield className="h-4 w-4" />
                        </div>
                        <span className="font-extrabold text-sm text-slate-800 tracking-tight">LUMI</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        Pulseira Online
                      </span>
                    </div>

                    {/* Simulated Map */}
                    <div className="w-full h-44 bg-slate-200 rounded-2xl relative overflow-hidden border border-slate-100 shadow-inner mb-4 flex items-center justify-center">
                      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                      <div className="absolute top-1/2 left-0 w-full h-4 bg-slate-300 transform -translate-y-1/2"></div>
                      <div className="absolute left-1/3 top-0 w-4 h-full bg-slate-300"></div>
                      
                      {/* Safe Zone circle */}
                      <div className="absolute top-[20%] left-[15%] w-28 h-28 rounded-full border-2 border-blue-500 bg-blue-500/10 flex items-center justify-center">
                        <span className="text-[8px] text-blue-600 font-bold bg-white/85 px-1 rounded-sm shadow-2xs">Área Segura</span>
                      </div>

                      {/* Child/Tracker Pin */}
                      <div className="absolute top-[40%] left-[42%] flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold animate-bounce">
                          👦
                        </div>
                        <div className="bg-slate-900 text-white text-[8px] font-semibold px-1.5 py-0.5 rounded-full mt-0.5 shadow-sm whitespace-nowrap">
                          Lucas • Online
                        </div>
                      </div>
                    </div>

                    {/* Alert Box Mockup */}
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl mb-4 flex gap-2.5 items-start">
                      <div className="p-1.5 bg-red-500 rounded-lg text-white mt-0.5">
                        <Bell className="h-3.5 w-3.5 animate-bounce" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-red-900">Alerta de Saída</p>
                        <p className="text-[10px] text-red-700 leading-tight">O dispositivo saiu do perímetro de segurança às 18:24.</p>
                      </div>
                    </div>

                    {/* Device Status */}
                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm mb-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Status do Dispositivo</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-50 p-2 rounded-lg text-center">
                          <p className="text-[9px] text-slate-500">Bateria</p>
                          <p className="font-bold text-slate-800">88%</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg text-center">
                          <p className="text-[9px] text-slate-500">Sinal GPS</p>
                          <p className="font-bold text-slate-800">Excelente</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 mt-auto">
                      <Smartphone className="w-3.5 h-3.5" /> Ligar para Pulseira
                    </button>
                  </div>

                  {/* Home Indicator */}
                  <div className="h-5 bg-slate-900 flex items-center justify-center pb-1 z-30">
                    <div className="w-28 h-1 bg-slate-700 rounded-full"></div>
                  </div>
                </div>
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
