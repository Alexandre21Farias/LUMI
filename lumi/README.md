# LUMI - Pulseira Inteligente de Segurança Infantil

Este é um protótipo acadêmico para o sistema LUMI, focado exclusivamente no rastreamento e monitoramento de crianças entre 1 e 12 anos. O sistema simula funcionalidades de GPS, área segura (Geofencing) e emissão de alertas SOS.

## Tecnologias

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, React Leaflet (OpenStreetMap)
- **Backend/Database:** Supabase (PostgreSQL)

## Estrutura do Projeto

- `/src/app`: Rotas da aplicação (Login, Dashboard, Rastreamento, Área Segura, SOS, Pulseiras, Histórico).
- `/src/components`: Componentes reutilizáveis (Layouts, UI Base e Mapa).
- `/supabase`: Scripts SQL para o banco de dados.

## Como Executar

### 1. Pré-requisitos
- Node.js (v18+)
- NPM ou Yarn
- Supabase CLI (opcional, caso queira rodar o banco localmente)

### 2. Instalação e Execução
Na pasta raiz (`lumi`):
```bash
npm install
npm run dev
```
Acesse `http://localhost:3000` no seu navegador. O login é simulado e você pode entrar com qualquer dado para testar o Dashboard.

### 3. Banco de Dados (Supabase)
Os scripts SQL foram gerados na pasta `supabase`.
- `supabase/migrations/00000000000000_initial_schema.sql` (Criação das tabelas)
- `supabase/seed.sql` (População de dados de exemplo)

Você pode executar esses scripts diretamente na interface web (SQL Editor) do seu projeto Supabase ou usar a CLI:
```bash
supabase start
supabase db reset
```

## Funcionalidades Simuladas
1. **Rastreamento:** O mapa em `/rastreamento` simula a movimentação da criança a cada 5 segundos através de um React Hook.
2. **Área Segura:** O limite circular de 50 metros e a interface alertará se a localização simulada ultrapassar esse limite.
3. **SOS:** Botão de emergência na página `/sos` altera os estados e simula um alerta sendo enviado.
