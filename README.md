# Espaço das Profissões — Computação e Sociedade

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000000?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=111111)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=ffffff)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=for-the-badge&logo=docker&logoColor=ffffff)

Aplicação institucional e interativa criada para a disciplina de **Computação e Sociedade da UFG**. O projeto apresenta o Instituto de Informática, o curso de Ciência da Computação, áreas correlatas, entidades estudantis, galeria, FAQ e experiências gamificadas com ranking seguro.

O objetivo técnico é entregar uma landing page moderna, performática, acessível, escalável e preparada para deploy com **Next.js App Router**, **SEO estruturado**, **componentização por feature**, **leaderboard seguro** e **build standalone**.

---

## Índice

- [Destaques](#destaques)
- [Stack principal](#stack-principal)
- [Arquitetura](#arquitetura)
- [Estrutura de diretórios](#estrutura-de-diretórios)
- [Pré-requisitos](#pré-requisitos)
- [Configuração de ambiente](#configuração-de-ambiente)
- [Como executar](#como-executar)
- [Scripts](#scripts)
- [API de scores e leaderboard](#api-de-scores-e-leaderboard)
- [SEO, performance e PageSpeed](#seo-performance-e-pagespeed)
- [Docker](#docker)
- [Checklist de qualidade](#checklist-de-qualidade)
- [Guia de contribuição](#guia-de-contribuição)
- [Troubleshooting](#troubleshooting)

---

## Destaques

- **Home institucional completa** com seções para INF, curso, áreas correlatas, entidades, jogos, galeria e FAQ.
- **Hero high-tech** com imagem full background, efeito Matrix e overlays otimizados para leitura.
- **Header responsivo** com comportamento em dois estados: topo full-width e menu flutuante ao rolar.
- **Footer institucional premium** mantendo identidade visual e links externos.
- **Minigames integrados**: Snake e Space Arcade com ranking mensal.
- **API segura de scores** com sessão, device ID, validação defensiva, rate limit e anti-cheat.
- **Fallback local em memória para Redis**, permitindo rodar o projeto sem credenciais reais durante desenvolvimento.
- **SEO centralizado** com metadata, sitemap, robots, manifest e JSON-LD.
- **Next Image Optimization** com AVIF/WebP e cache configurado.
- **Docker standalone** pronto para ambientes containerizados.

---

## Stack principal

| Camada | Tecnologias |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript 5 |
| Estilo | Tailwind CSS 4, CSS global |
| Animações | Framer Motion, GSAP, `@gsap/react`, CSS animations |
| Ícones | Lucide React |
| API | Next.js Route Handlers |
| Dados | Upstash Redis com fallback local em memória |
| SEO | Metadata API, sitemap, robots, manifest, JSON-LD |
| Analytics | Vercel Analytics |
| Build/Deploy | Next standalone, Docker, Docker Compose |

---

## Arquitetura

O projeto está em migração para uma organização mais escalável baseada em **features**, **services** e **responsabilidades isoladas**.

### Princípios adotados

- **Separação de responsabilidades**: componentes visuais não devem concentrar regras de API, score ou persistência.
- **Feature-first**: seções da Home, leaderboard e SEO ficam organizados por domínio funcional.
- **Compatibilidade incremental**: arquivos antigos podem permanecer como re-export temporário para evitar refatoração big bang.
- **Copy/design freeze**: textos, ordem das seções e identidade visual devem ser preservados em refatorações estruturais.
- **Defesa em profundidade**: scores não são confiados ao cliente; o backend valida sessão, payload, frequência e coerência.

### Fluxo da Home

```text
app/page.tsx
  ├─ Header
  ├─ HeroSection
  ├─ features/home/sections/*
  ├─ CareerMindMapSection
  ├─ Game sections
  ├─ Footer
  └─ BackToTop
```

### Fluxo seguro de scores

```text
Cliente inicia jogo
  ↓
POST /api/scores/session
  ↓
Servidor gera sessionId e associa IP/device/game
  ↓
Cliente termina jogo
  ↓
POST /api/scores com sessionId + deviceId + payload
  ↓
Servidor valida sessão, rate limit, payload e anomalias
  ↓
Redis/fallback local grava apenas o melhor score válido
```

---

## Estrutura de diretórios

```text
app/
  api/
    scores/
      _handlers/          # Handlers compartilhados da API de scores
      session/            # Rota real POST /api/scores/session
      route.ts            # GET leaderboard e POST score
  components/home/        # Componentes legados/compatibilidade da Home
  arcade/                 # Página do arcade
  layout.tsx              # Fontes, metadata global, analytics e JSON-LD
  page.tsx                # Orquestrador da landing page
  manifest.ts
  robots.ts
  sitemap.ts

features/
  home/
    sections/             # Seções atomizadas da Home
    shared/               # Componentes reutilizáveis da Home
  leaderboard/
    hooks/                # Hooks de ranking
    services/             # Clients de score, sessão e cooldown
  seo/
    StructuredData.tsx    # JSON-LD invisível para SEO

components/arcade/        # UI e canvas do Space Arcade
SnakeGame/                # Componentes do Snake
systems/                  # Sistemas de jogo: spawn, colisão, partículas etc.
lib/                      # Redis, segurança, SEO, validações e tipos
public/                   # Assets estáticos, fontes, imagens e ícones
```

---

## Pré-requisitos

- **Node.js 20+**
- **npm**
- **Docker** e **Docker Compose** opcionalmente
- Conta no **Upstash Redis** apenas se quiser persistência real de leaderboard fora do fallback local

---

## Configuração de ambiente

O projeto versiona um `.env.local` com valores de desenvolvimento e placeholders para facilitar o onboarding. Assim, quem clonar o repositório consegue subir a aplicação sem criar o arquivo do zero.

```env
SNAKEGAME_KV_REST_API_URL="https://example-upstash-url.upstash.io"
SNAKEGAME_KV_REST_API_TOKEN="replace-with-upstash-token"
SIGNING_SECRET="replace-with-a-long-random-secret"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ENV=development
```

### Variáveis

| Variável | Obrigatória para navegação local? | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Sim | Base de canonical, sitemap, metadata e JSON-LD |
| `SNAKEGAME_KV_REST_API_URL` | Não, se usar fallback | Endpoint do Upstash Redis |
| `SNAKEGAME_KV_REST_API_TOKEN` | Não, se usar fallback | Token do Upstash Redis |
| `SIGNING_SECRET` | Sim | HMAC/session security para score |
| `ENV` | Não | Sinalização simples de ambiente |

> Importante: o fallback em memória permite desenvolvimento sem Redis real. Scores nesse modo não são persistidos entre reinicializações do servidor.

---

## Como executar

### Desenvolvimento local

```bash
npm ci
npm run dev
```

A aplicação fica disponível em:

```text
http://localhost:3000
```

Se a porta `3000` já estiver ocupada por outro processo Next, o próprio Next pode sugerir outra porta ou indicar o PID ativo.

### Build de produção

```bash
npm run build
npm run start
```

---

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção com Next/Turbopack |
| `npm run start` | Executa o build de produção |
| `npm run lint` | Executa ESLint no projeto |

---

## API de scores e leaderboard

### Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/scores` | Lista ranking do Snake |
| `GET` | `/api/scores?game=arcade` | Lista ranking do Space Arcade |
| `POST` | `/api/scores/session` | Inicializa sessão segura de jogo |
| `POST` | `/api/scores` | Submete score com `sessionId` e `deviceId` |

### Inicializar sessão

```bash
curl -X POST http://localhost:3000/api/scores/session \
  -H "Content-Type: application/json" \
  -d '{
    "deviceId": "dev-12345-device-id",
    "gameType": "snake"
  }'
```

Resposta esperada:

```json
{
  "ok": true,
  "data": {
    "sessionId": "token-gerado-pelo-servidor",
    "expiresIn": 3600
  }
}
```

### Enviar score

```bash
curl -X POST http://localhost:3000/api/scores \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "token-gerado-pelo-servidor",
    "deviceId": "dev-12345-device-id",
    "name": "JOGADOR",
    "id": "ABC234",
    "score": 120,
    "durationMs": 45000,
    "game": "snake"
  }'
```

### Camadas de segurança

- `sessionId` obrigatório para submissão.
- Sessão vinculada ao IP e ao tipo de jogo.
- Reuso de sessão é bloqueado.
- `deviceId` obrigatório.
- Rate limit por IP, jogador, device e combinação.
- Validação de payload por tipo de jogo.
- Anti-cheat por coerência temporal, score máximo e anomalias históricas.
- Parsing defensivo das respostas da API no frontend.

---

## SEO, performance e PageSpeed

O projeto inclui uma base técnica para alta pontuação em Lighthouse/PageSpeed:

- `lib/seo.ts` centraliza metadados, canonical, Open Graph e Twitter Card.
- `app/sitemap.ts` lista `/` e `/arcade`.
- `app/robots.ts` aponta para o sitemap.
- `app/manifest.ts` define nome, tema e ícones.
- `features/seo/StructuredData.tsx` injeta JSON-LD para organização educacional, website e evento.
- `next.config.mjs` habilita compressão, remove `x-powered-by` e configura imagens AVIF/WebP.
- `HeroSection` usa `next/image` com `priority`, `sizes="100vw"`, `fill` e qualidade controlada.
- Fontes usam `display: "swap"` para melhorar experiência de carregamento.

### Validação recomendada

```bash
npm run lint
npm run build
```

Depois do deploy, valide também em:

- PageSpeed Insights
- Lighthouse no Chrome DevTools
- Rich Results Test para JSON-LD

---

## Docker

### Desenvolvimento com Docker Compose

```bash
docker compose up --build
```

O Compose expõe a aplicação em:

```text
http://localhost:3004
```

### Produção com Dockerfile

O `Dockerfile` usa build multi-stage:

1. `deps`: instala dependências com `npm ci`.
2. `builder`: gera `npm run build`.
3. `runner`: executa o standalone server como usuário não-root.

---

## Checklist de qualidade

Antes de abrir PR ou fazer deploy, execute:

```bash
npm run lint
npm run build
```

Checklist manual recomendado:

- [ ] Home abre em desktop e mobile.
- [ ] Header mantém estado de topo e flutuante no scroll.
- [ ] Hero preserva imagem, efeito Matrix e legibilidade.
- [ ] Seções `O INF`, `Nosso Curso`, `Entidades`, `Galeria` e `FAQ` renderizam na ordem correta.
- [ ] Snake inicia, termina e tenta enviar score sem erro visual.
- [ ] Arcade abre em `/arcade` e mantém HUD/controles.
- [ ] `GET /api/scores` responde mesmo sem Redis real.
- [ ] `POST /api/scores/session` responde com `sessionId`.
- [ ] `npm run build` lista `/api/scores/session` como rota dinâmica.

---

## Guia de contribuição

1. Crie uma branch a partir da branch de trabalho do time.
2. Instale dependências com `npm ci`.
3. Rode `npm run dev` e valide visualmente a Home.
4. Preserve copy, ordem das seções e identidade visual ao refatorar.
5. Centralize lógica de API/ranking em `features/leaderboard`.
6. Prefira componentes pequenos e reutilizáveis em `features/home`.
7. Rode `npm run lint` e `npm run build` antes do PR.

### Convenções atuais

- Use imports com alias `@/`.
- Não mova tudo para `src/` sem planejamento; a arquitetura atual usa raiz do projeto.
- Evite colocar regra de negócio dentro de componentes visuais.
- Para novas seções da Home, prefira `features/home/sections`.
- Para clients/hooks de score, prefira `features/leaderboard`.
- Para SEO invisível/estruturado, prefira `features/seo`.

---

## Troubleshooting

### `npm run dev` informa que já existe outro Next rodando

Isso significa que uma instância já está ativa na porta do projeto. Verifique o PID informado pelo terminal. Se você realmente quiser encerrar a instância antiga no Windows:

```powershell
taskkill /PID <PID_INFORMADO> /F
```

### Aviso: Redis usando storage em memória

Mensagem esperada quando o `.env.local` ainda usa placeholders:

```text
[redis] Usando storage em memória. Configure SNAKEGAME_KV_REST_API_URL e SNAKEGAME_KV_REST_API_TOKEN para persistência real.
```

Para persistência real, substitua os placeholders pelas credenciais do Upstash.

### Ranking vazio em desenvolvimento

Em fallback local, o ranking começa vazio e é perdido quando o servidor reinicia. Isso é normal.

### Score rejeitado com `invalid_session`

O score precisa ser enviado com `sessionId` gerado por `POST /api/scores/session`. Sessões reutilizadas ou expiradas são recusadas.

---

## Status do projeto

| Área | Status |
| --- | --- |
| Landing page institucional | Operacional |
| Componentização por feature | Em evolução |
| Leaderboard seguro | Implementado |
| Fallback Redis local | Implementado |
| SEO técnico | Implementado |
| Docker standalone | Implementado |
| Testes automatizados | Próxima etapa recomendada |

---

## Licença e uso acadêmico

Projeto acadêmico desenvolvido para fins educacionais no contexto da disciplina de **Computação e Sociedade — UFG**.
