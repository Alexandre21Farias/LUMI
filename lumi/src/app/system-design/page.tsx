"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  HelpCircle, 
  Sparkles, 
  Shield, 
  MapPin, 
  Battery, 
  Phone, 
  Share2, 
  Bell, 
  Search, 
  User, 
  Star, 
  Lock, 
  History,
  ArrowLeft
} from "lucide-react"

export default function SystemDesignPage() {
  const [activeSos, setActiveSos] = useState(false)

  return (
    <div className="min-h-screen bg-[#F7FBFE] text-[#0D2137] font-sans antialiased">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-[#0D2137] text-white py-20 px-6 md:px-16 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/45 via-slate-950 to-indigo-950 opacity-60"></div>
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#AED6F1] mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 animate-pulse" /> LUMI · Sistema de Design
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white font-display">
              Design <span className="text-[#AED6F1]">System</span>
            </h1>
            <p className="mt-4 text-[#AED6F1]/80 max-w-xl font-light text-base leading-relaxed">
              Diretrizes visuais e de componentes para a pulseira inteligente de segurança infantil.
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md text-xs text-[#D6EAF8]/80">
            <div><strong>Versão:</strong> 1.0.0</div>
            <div><strong>Ano:</strong> 2026</div>
            <div><strong>Instituição:</strong> UNIFAN — Centro Universitário Nobre</div>
            <div><strong>Orientadora:</strong> Profª. Ivonete Maciel</div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#D6EAF8] px-6 md:px-16 flex overflow-x-auto gap-4 scrollbar-none shadow-sm">
        <div className="max-w-6xl mx-auto w-full flex items-center">
          <Link href="/dashboard" className="mr-6 flex items-center text-[#2C5F7A] hover:text-[#0D2137] font-semibold text-sm">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Painel
          </Link>
          <div className="flex items-center gap-1">
            {[
              { label: "Marca", href: "#marca" },
              { label: "Cores", href: "#cores" },
              { label: "Tipografia", href: "#tipografia" },
              { label: "Espaçamento", href: "#espacamento" },
              { label: "Componentes", href: "#componentes" },
              { label: "Ícones", href: "#icones" },
              { label: "Tom de voz", href: "#voz" },
              { label: "Interface", href: "#interface" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-4 px-3 text-xs font-semibold text-[#5B8FA8] hover:text-[#0D2137] hover:border-b-2 hover:border-[#5DADE2] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-16 py-16 space-y-24">
        {/* Marca */}
        <section id="marca" className="scroll-mt-20">
          <span className="text-xs font-bold text-[#5DADE2] uppercase tracking-wider">01 — Identidade</span>
          <h2 className="text-3xl font-bold font-display text-[#0D2137] mt-2 mb-6">Marca LUMI</h2>
          <p className="text-[#2C5F7A] max-w-3xl leading-relaxed mb-8">
            A marca LUMI traduz segurança, leveza e cuidado. O nome evoca luminosidade — uma
            presença gentil que guia e protege. O logotipo combina a solidez da tipografia com um símbolo de
            rastreamento que remete à localização e ao elo entre criança e família.
          </p>

          <div className="flex flex-wrap items-center gap-12 p-8 bg-white rounded-3xl border border-[#D6EAF8]/80 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#5DADE2] rounded-2xl flex items-center justify-center shadow-lg shadow-[#5DADE2]/20 text-white">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <div className="text-3xl font-extrabold tracking-tight text-[#0D2137] font-display">LUMI</div>
                <div className="text-xs text-[#5B8FA8] tracking-wide mt-0.5">Conecta o que mais importa.</div>
              </div>
            </div>

            <div className="h-12 w-[1px] bg-[#D6EAF8] hidden md:block"></div>

            <div className="flex flex-wrap gap-4">
              <div className="bg-[#0D2137] text-white rounded-2xl p-4 flex items-center gap-3 shadow-inner">
                <Shield className="h-6 w-6 text-[#AED6F1]" />
                <span className="font-bold tracking-wider text-sm font-display">LUMI</span>
              </div>
              <div className="bg-[#5DADE2] text-white rounded-2xl p-4 flex items-center gap-3 shadow-inner">
                <Shield className="h-6 w-6 text-white" />
                <span className="font-bold tracking-wider text-sm font-display">LUMI</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cores */}
        <section id="cores" className="scroll-mt-20 border-t border-[#D6EAF8] pt-16">
          <span className="text-xs font-bold text-[#5DADE2] uppercase tracking-wider">02 — Identidade Visual</span>
          <h2 className="text-3xl font-bold font-display text-[#0D2137] mt-2 mb-6">Paleta de Cores</h2>
          <p className="text-[#2C5F7A] max-w-3xl leading-relaxed mb-10">
            O sistema de cores da LUMI é construído em torno do azul bebê e branco — transmitindo
            tranquilidade, segurança e confiança. O azul profundo ancora a identidade, enquanto tons claros criam
            respiração visual e suavidade.
          </p>

          <div className="space-y-10">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5B8FA8] mb-4">Cores Primárias</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Azul Bebê", hex: "#AED6F1", bg: "bg-[#AED6F1]", desc: "Cor principal da marca" },
                  { name: "Azul Profundo", hex: "#5DADE2", bg: "bg-[#5DADE2]", desc: "Destaque e interação" },
                  { name: "Branco Puro", hex: "#FFFFFF", bg: "bg-white border border-[#D6EAF8]", desc: "Fundo e superfícies" },
                  { name: "Azul Noturno", hex: "#0D2137", bg: "bg-[#0D2137] text-white", desc: "Texto e contraste" },
                ].map((color) => (
                  <div key={color.hex} className="bg-white rounded-2xl border border-[#D6EAF8] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className={`h-24 ${color.bg}`} />
                    <div className="p-4">
                      <span className="block font-bold text-sm text-[#0D2137]">{color.name}</span>
                      <code className="text-xs text-[#5B8FA8] font-mono">{color.hex}</code>
                      <p className="text-xs text-[#5B8FA8] mt-1">{color.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5B8FA8] mb-4">Cores de Status</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Sucesso", hex: "#27AE60", bg: "bg-[#27AE60]", desc: "Conectado, área segura" },
                  { name: "Atenção", hex: "#F39C12", bg: "bg-[#F39C12]", desc: "Bateria baixa, alerta" },
                  { name: "Perigo / SOS", hex: "#E74C3C", bg: "bg-[#E74C3C]", desc: "Emergência, botão SOS" },
                  { name: "Fundo Base", hex: "#F7FBFE", bg: "bg-[#F7FBFE] border border-[#D6EAF8]", desc: "Cor de fundo geral" },
                ].map((color) => (
                  <div key={color.hex} className="bg-white rounded-2xl border border-[#D6EAF8] overflow-hidden shadow-sm">
                    <div className={`h-24 ${color.bg}`} />
                    <div className="p-4">
                      <span className="block font-bold text-sm text-[#0D2137]">{color.name}</span>
                      <code className="text-xs text-[#5B8FA8] font-mono">{color.hex}</code>
                      <p className="text-xs text-[#5B8FA8] mt-1">{color.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tipografia */}
        <section id="tipografia" className="scroll-mt-20 border-t border-[#D6EAF8] pt-16">
          <span className="text-xs font-bold text-[#5DADE2] uppercase tracking-wider">03 — Tipografia</span>
          <h2 className="text-3xl font-bold font-display text-[#0D2137] mt-2 mb-6">Fontes e Escala</h2>
          <p className="text-[#2C5F7A] max-w-3xl leading-relaxed mb-10">
            A tipografia da LUMI usa duas famílias: <strong>Sora</strong> para títulos e exibição —
            moderna e amigável — e <strong>Inter</strong> para corpo e interface — altamente legível e neutra.
          </p>

          <div className="divide-y divide-[#D6EAF8] bg-white border border-[#D6EAF8]/80 rounded-3xl p-6 md:p-8 shadow-sm">
            {[
              {
                role: "Display",
                spec: "Sora Bold / 56px / -0.03em",
                sample: <span className="text-5xl md:text-6xl font-bold tracking-tight text-[#0D2137] font-display">LUMI</span>
              },
              {
                role: "Heading 1",
                spec: "Sora SemiBold / 36px / -0.02em",
                sample: <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0D2137] font-display">Segurança sem distração</h1>
              },
              {
                role: "Heading 2",
                spec: "Sora SemiBold / 24px",
                sample: <h2 className="text-2xl font-semibold text-[#0D2137] font-display">Localização em tempo real</h2>
              },
              {
                role: "Body",
                spec: "Inter Regular / 16px / Line 1.75",
                sample: (
                  <p className="text-[#2C5F7A] text-sm md:text-base leading-relaxed max-w-xl font-sans">
                    O LUMI é uma pulseira inteligente infantil voltada para segurança e
                    rastreamento em tempo real. Pensado para crianças de 1 a 12 anos, oferece tranquilidade sem
                    incentivar o uso precoce de telas.
                  </p>
                )
              },
              {
                role: "Caption",
                spec: "Inter Medium / 12px / Uppercase",
                sample: <span className="text-xs font-medium tracking-wider text-[#5B8FA8] uppercase font-sans">STATUS DA CONEXÃO · GPS ATIVO · BATERIA 84%</span>
              }
            ].map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 py-8 first:pt-0 last:pb-0">
                <div className="md:col-span-1">
                  <span className="text-xs font-bold text-[#5DADE2] uppercase tracking-widest block">{item.role}</span>
                  <span className="text-xs text-[#5B8FA8] font-mono block mt-1">{item.spec}</span>
                </div>
                <div className="md:col-span-3 flex items-center">
                  {item.sample}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Espaçamento */}
        <section id="espacamento" className="scroll-mt-20 border-t border-[#D6EAF8] pt-16">
          <span className="text-xs font-bold text-[#5DADE2] uppercase tracking-wider">04 — Fundação</span>
          <h2 className="text-3xl font-bold font-display text-[#0D2137] mt-2 mb-6">Espaçamento e Raios</h2>
          <p className="text-[#2C5F7A] max-w-3xl leading-relaxed mb-10">
            Sistema de espaçamento baseado em múltiplos de 4px e escala de raios de bordas, garantindo ritmo e formas consistentes.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#D6EAF8] rounded-3xl p-6 shadow-sm">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5B8FA8] mb-6">Raios de Borda</h4>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "0px (Nenhum)", radius: "rounded-none" },
                  { label: "4px (Sutil)", radius: "rounded-[4px]" },
                  { label: "8px (Pequeno)", radius: "rounded-[8px]" },
                  { label: "14px (Médio)", radius: "rounded-[14px]" },
                  { label: "20px (Grande)", radius: "rounded-[20px]" },
                  { label: "999px (Pílula)", radius: "rounded-full" },
                ].map((r, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className={`w-16 h-12 bg-[#D6EAF8] border border-[#5DADE2]/40 ${r.radius}`} />
                    <span className="text-[10px] text-[#5B8FA8] text-center font-mono leading-none">{r.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#D6EAF8] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5B8FA8] mb-6">Escala de Espaçamento</h4>
                <div className="flex items-end gap-3.5 overflow-x-auto pb-2">
                  {[4, 8, 12, 16, 24, 32, 48, 64, 80].map((space) => (
                    <div key={space} className="flex flex-col items-center gap-2">
                      <div className="bg-[#AED6F1] rounded-sm w-4" style={{ height: `${space}px` }} />
                      <span className="text-[10px] text-[#5B8FA8] font-mono">{space}px</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Componentes */}
        <section id="componentes" className="scroll-mt-20 border-t border-[#D6EAF8] pt-16">
          <span className="text-xs font-bold text-[#5DADE2] uppercase tracking-wider">05 — Componentes</span>
          <h2 className="text-3xl font-bold font-display text-[#0D2137] mt-2 mb-6">Biblioteca de Componentes</h2>
          <p className="text-[#2C5F7A] max-w-3xl leading-relaxed mb-10">
            Componentes reutilizáveis da interface da plataforma LUMI, focados em simplicidade e excelente contraste visual.
          </p>

          <div className="space-y-12">
            {/* Botoes */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5B8FA8] mb-4">Botões</h4>
              <div className="flex flex-wrap gap-4 items-center bg-white border border-[#D6EAF8]/80 rounded-3xl p-6 shadow-sm">
                <button className="px-6 py-2.5 bg-[#0D2137] text-white rounded-full text-sm font-semibold hover:opacity-90 active:scale-95 transition-all">
                  Monitorar agora
                </button>
                <button className="px-6 py-2.5 bg-[#5DADE2] text-white rounded-full text-sm font-semibold hover:opacity-90 active:scale-95 transition-all">
                  Ver localização
                </button>
                <button className="px-6 py-2.5 bg-transparent border border-[#5DADE2] text-[#0D2137] rounded-full text-sm font-semibold hover:bg-[#EBF5FB] transition-all">
                  Configurar área
                </button>
                <button className="px-6 py-2.5 bg-transparent text-[#5B8FA8] hover:text-[#0D2137] text-sm font-semibold transition-colors">
                  Cancelar
                </button>
                <button className="px-6 py-2.5 bg-[#E74C3C] text-white rounded-full text-sm font-semibold hover:bg-[#C0392B] active:scale-95 transition-all flex items-center gap-1.5 shadow-lg shadow-red-500/20">
                  <span>🚨</span> Acionar SOS
                </button>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5B8FA8] mb-4">Badges de Status</h4>
              <div className="flex flex-wrap gap-4 items-center bg-white border border-[#D6EAF8]/80 rounded-3xl p-6 shadow-sm">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#EAFAF1] text-[#1E8449] border border-[#27AE60]/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27AE60] animate-pulse"></span> GPS Ativo
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#EBF5FB] text-[#1A5276] border border-[#AED6F1]/40 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5DADE2]"></span> Conectado
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FEF9E7] text-[#9A7D0A] border border-[#F39C12]/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F39C12] animate-pulse"></span> Bateria Baixa
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FDEDEC] text-[#C0392B] border border-[#E74C3C]/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E74C3C] animate-ping"></span> Fora da Área
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F2F3F4] text-[#566573] border border-slate-200">
                  Offline
                </span>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5B8FA8] mb-4">Campos de Entrada</h4>
              <div className="grid md:grid-cols-2 gap-6 bg-white border border-[#D6EAF8]/80 rounded-3xl p-6 shadow-sm">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0D2137] uppercase tracking-wider">Nome da criança</label>
                  <input className="w-full px-4 py-2.5 border border-[#D6EAF8] rounded-xl outline-none focus:border-[#5DADE2] text-sm" type="text" defaultValue="Sofia Nascimento" />
                  <span className="text-xs text-[#5B8FA8] block">Nome que aparece no mapa</span>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0D2137] uppercase tracking-wider">E-mail do responsável</label>
                  <input className="w-full px-4 py-2.5 border border-red-300 rounded-xl outline-none text-sm bg-red-50/20" type="email" placeholder="email@exemplo.com" />
                  <span className="text-xs text-red-600 block">E-mail inválido ou já cadastrado.</span>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5B8FA8] mb-4">Cards</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white border border-[#D6EAF8] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[#EBF5FB] rounded-xl flex items-center justify-center text-[#1A5276] mb-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h5 className="font-bold text-[#0D2137] text-sm font-display mb-1">Localização em tempo real</h5>
                  <p className="text-xs text-[#5B8FA8] leading-relaxed">Acompanhe onde a criança está a qualquer momento pelo mapa.</p>
                </div>

                <div className="bg-[#EBF5FB] border border-[#5DADE2] rounded-3xl p-6 shadow-sm">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#5DADE2] mb-4 shadow-sm">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h5 className="font-bold text-[#0D2137] text-sm font-display mb-1">Áreas seguras</h5>
                  <p className="text-xs text-[#2C5F7A] leading-relaxed">Defina zonas de conforto e receba alertas quando a criança sair.</p>
                </div>

                <div className="bg-white border border-[#D6EAF8] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[#EBF5FB] rounded-xl flex items-center justify-center text-[#1A5276] mb-4">
                    <History className="h-5 w-5" />
                  </div>
                  <h5 className="font-bold text-[#0D2137] text-sm font-display mb-1">Histórico de rotas</h5>
                  <p className="text-xs text-[#5B8FA8] leading-relaxed">Visualize por onde a criança passou ao longo do dia.</p>
                </div>

                <div className="bg-[#0D2137] text-white rounded-3xl p-6 shadow-xl">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#AED6F1] mb-4">
                    <Share2 className="h-5 w-5" />
                  </div>
                  <h5 className="font-bold text-white text-sm font-display mb-1">Compartilhar com família</h5>
                  <p className="text-xs text-white/60 leading-relaxed">Adicione múltiplos responsáveis para acompanhar juntos.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Icones */}
        <section id="icones" className="scroll-mt-20 border-t border-[#D6EAF8] pt-16">
          <span className="text-xs font-bold text-[#5DADE2] uppercase tracking-wider">06 — Iconografia</span>
          <h2 className="text-3xl font-bold font-display text-[#0D2137] mt-2 mb-6">Sistema de Ícones</h2>
          <p className="text-[#2C5F7A] max-w-3xl leading-relaxed mb-10">
            Ícones de traço linear fino (1.8px) sem preenchimento, minimalistas e altamente legíveis.
          </p>

          <div className="grid grid-cols-4 md:grid-cols-6 gap-6 bg-white border border-[#D6EAF8]/80 rounded-3xl p-8 shadow-sm">
            {[
              { icon: <MapPin className="h-6 w-6" />, label: "localização" },
              { icon: <Shield className="h-6 w-6" />, label: "segurança" },
              { icon: <Battery className="h-6 w-6" />, label: "bateria" },
              { icon: <Phone className="h-6 w-6" />, label: "contato" },
              { icon: <Share2 className="h-6 w-6" />, label: "compartilhar" },
              { icon: <Bell className="h-6 w-6" />, label: "alerta" },
              { icon: <Search className="h-6 w-6" />, label: "buscar" },
              { icon: <User className="h-6 w-6" />, label: "responsável" },
              { icon: <Star className="h-6 w-6" />, label: "favorito" },
              { icon: <Lock className="h-6 w-6" />, label: "privacidade" },
              { icon: <HelpCircle className="h-6 w-6" />, label: "info" },
              { icon: <History className="h-6 w-6" />, label: "histórico" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-14 h-14 bg-[#EBF5FB] rounded-2xl flex items-center justify-center text-[#1A5276] group-hover:bg-[#5DADE2] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-[11px] text-[#5B8FA8] text-center font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tom de voz */}
        <section id="voz" className="scroll-mt-20 border-t border-[#D6EAF8] pt-16">
          <span className="text-xs font-bold text-[#5DADE2] uppercase tracking-wider">07 — Comunicação</span>
          <h2 className="text-3xl font-bold font-display text-[#0D2137] mt-2 mb-6">Tom de Voz</h2>
          <p className="text-[#2C5F7A] max-w-3xl leading-relaxed mb-10">
            A LUMI fala com calma, clareza e cuidado. É uma voz de extrema confiança — como a de um familiar responsável.
            Nunca alarmista, direta mas gentil.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-l-4 border-[#27AE60] border-y border-r border-[#D6EAF8] rounded-r-2xl p-6 shadow-sm space-y-4">
              <span className="text-xs font-bold text-[#27AE60] uppercase tracking-wider block">✓ Use</span>
              <div className="space-y-2 text-[#2C5F7A] text-sm">
                <p className="p-3 bg-[#EAFAF1] rounded-xl text-[#1E8449] font-medium">&quot;Sofia está em área segura.&quot;</p>
                <p className="p-3 bg-[#EAFAF1] rounded-xl text-[#1E8449] font-medium">&quot;Bateria baixa. Lembre de carregar a pulseira hoje.&quot;</p>
                <p className="p-3 bg-[#EAFAF1] rounded-xl text-[#1E8449] font-medium">&quot;João acionou o SOS. Ele pode precisar de você.&quot;</p>
              </div>
            </div>

            <div className="bg-white border-l-4 border-[#E74C3C] border-y border-r border-[#D6EAF8] rounded-r-2xl p-6 shadow-sm space-y-4">
              <span className="text-xs font-bold text-[#E74C3C] uppercase tracking-wider block">✕ Evite</span>
              <div className="space-y-2 text-[#2C5F7A] text-sm">
                <p className="p-3 bg-[#FDEDEC] rounded-xl text-[#C0392B]">&quot;ALERTA: criança fora do perímetro definido pelo usuário.&quot;</p>
                <p className="p-3 bg-[#FDEDEC] rounded-xl text-[#C0392B]">&quot;Nível de energia do dispositivo crítico. Risco de desconexão.&quot;</p>
                <p className="p-3 bg-[#FDEDEC] rounded-xl text-[#C0392B]">&quot;Botão de emergência pressionado. Contato imediato necessário.&quot;</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interface Mockup */}
        <section id="interface" className="scroll-mt-20 border-t border-[#D6EAF8] pt-16">
          <span className="text-xs font-bold text-[#5DADE2] uppercase tracking-wider">08 — Interface</span>
          <h2 className="text-3xl font-bold font-display text-[#0D2137] mt-2 mb-6">Mockup do Aplicativo</h2>
          <p className="text-[#2C5F7A] max-w-3xl leading-relaxed mb-10">
            Prévia da interface interativa do app LUMI para os pais. Design focado, dados imediatos de bateria, sinal e SOS visíveis num toque.
          </p>

          <div className="flex flex-col lg:flex-row gap-16 justify-center items-center bg-white border border-[#D6EAF8]/80 rounded-3xl p-8 shadow-sm">
            {/* Phone Container */}
            <div className="w-[300px] bg-[#0D2137] border-[8px] border-[#1a2f42] rounded-[40px] p-5 shadow-2xl relative">
              <div className="flex justify-between items-center px-4 mb-4 text-white text-[11px] font-mono">
                <span>09:24</span>
                <div className="flex gap-1.5 items-center">
                  <span>📶</span>
                  <span>🔋 84%</span>
                </div>
              </div>
              <div className="bg-[#F7FBFE] rounded-3xl overflow-hidden min-h-[440px] flex flex-col justify-between border border-white/5">
                <div className="bg-[#5DADE2] p-4 text-white flex justify-between items-center">
                  <div>
                    <h5 className="font-bold font-display text-sm">LUMI</h5>
                    <span className="text-[10px] text-white/80 block mt-0.5">Sofia · 3 km de distância</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-[9px] font-bold border border-white/10">GPS ativo</span>
                </div>

                <div className="flex-1 bg-gradient-to-br from-[#d6eaf8] via-[#AED6F1] to-[#85C1E9]/40 relative flex items-center justify-center min-h-[180px]">
                  <div className="relative">
                    <div className="w-8 h-8 bg-[#5DADE2] rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-bounce">
                      <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                    </div>
                    <div className="absolute -inset-2 rounded-full border-2 border-[#5DADE2]/50 animate-ping"></div>
                  </div>
                </div>

                <div className="p-4 space-y-3 bg-white border-t border-[#D6EAF8]/50">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#F7FBFE] border border-[#D6EAF8] rounded-xl p-2 text-center">
                      <span className="text-[9px] text-[#5B8FA8] block">Bateria</span>
                      <span className="text-xs font-bold text-[#0D2137]">84%</span>
                    </div>
                    <div className="bg-[#F7FBFE] border border-[#D6EAF8] rounded-xl p-2 text-center">
                      <span className="text-[9px] text-[#5B8FA8] block">GPS</span>
                      <span className="text-xs font-bold text-[#0D2137]">Forte</span>
                    </div>
                    <div className="bg-[#F7FBFE] border border-[#D6EAF8] rounded-xl p-2 text-center">
                      <span className="text-[9px] text-[#5B8FA8] block">Área</span>
                      <span className="text-xs font-bold text-[#27AE60]">Segura</span>
                    </div>
                  </div>

                  <div className="p-2 bg-[#EBF5FB] border border-[#AED6F1]/40 rounded-lg text-[10px] text-[#1A5276] text-center font-medium">
                    📍 Rua das Flores, 248 — há 2 min
                  </div>

                  <button 
                    onClick={() => setActiveSos(!activeSos)}
                    className={`w-full py-3 text-xs font-bold uppercase tracking-wider text-white rounded-xl shadow-lg transition-all active:scale-95 ${activeSos ? 'bg-[#27AE60] shadow-emerald-500/20' : 'bg-[#E74C3C] shadow-red-500/20 hover:bg-[#C0392B]'}`}
                  >
                    {activeSos ? "✅ SOS RESOLVIDO" : "🆘 ACIONAR SOS"}
                  </button>
                </div>
              </div>
            </div>

            {/* Explanation List */}
            <div className="max-w-md space-y-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5B8FA8]">Hierarquia de Informação</h4>
              <div className="space-y-4">
                {[
                  { num: "1", title: "Localização no mapa", text: "Primeiro elemento visual — responde à pergunta principal 'onde a criança está?'." },
                  { num: "2", title: "Status da pulseira", text: "Bateria, GPS e área segura visíveis de forma imediata num piscar de olhos." },
                  { num: "3", title: "Último endereço", text: "Endereço legível e horário do último sinal de telemetria recebido." },
                  { num: "4", title: "Botão SOS", text: "Sempre acessível no rodapé com cor de perigo (vermelho) para acionamento de emergência instantâneo." }
                ].map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <span className="w-7 h-7 bg-[#EBF5FB] rounded-full flex items-center justify-center font-bold text-xs text-[#1A5276] flex-shrink-0">{step.num}</span>
                    <div>
                      <h5 className="font-bold text-sm text-[#0D2137]">{step.title}</h5>
                      <p className="text-xs text-[#5B8FA8] leading-relaxed mt-0.5">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0D2137] text-white/50 border-t border-white/5 py-12 px-6 md:px-16 text-xs mt-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <strong>LUMI</strong> — Sistema de Design v1.0<br />
            Engenharia da Computação · UNIFAN · Feira de Santana, 2026
          </div>
          <div className="text-right">
            Orientadora: Profª. Ivonete Maciel<br />
            &quot;Segurança sem distração.&quot;
          </div>
        </div>
      </footer>
    </div>
  )
}
