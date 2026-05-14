# Espaço das Profissões

Aplicação desenvolvida para a disciplina de Computação e Sociedade da UFG. O projeto apresenta cursos, áreas correlatas, entidades estudantis e experiências interativas em uma interface web construída com Next.js.

## Visão geral

O aplicativo usa a arquitetura do App Router do Next.js, páginas server/client components, SEO centralizado e uma API de scores com validação e persistência em Redis. Também inclui animações, elementos gráficos e um minigame em estilo arcade/snake para engajamento da experiência.

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Front-end | Next.js 16, React 19, TypeScript 5 |
| Estilo | Tailwind CSS 4, CSS global |
| Animações | Framer Motion, GSAP, @gsap/react |
| Ícones | Lucide React |
| Backend/API | Next.js Route Handlers |
| Dados/Leaderboard | Upstash Redis |
| Telemetria | Vercel Analytics |
| Containerização | Docker, Docker Compose |

## Estrutura principal

| Caminho | Responsabilidade |
| --- | --- |
| app/ | Rotas, layout, metadata e API do Next.js |
| app/components/home/ | Seções da landing page e componentes da home |
| components/arcade/ | Componentes do jogo arcade |
| SnakeGame/ | Implementação do minigame Snake |
| systems/ | Sistemas de jogo, spawn, colisão, partículas e upgrades |
| lib/ | Redis, segurança, SEO e utilitários de score |

## Pré-requisitos

- Node.js 20 ou superior
- npm
- Conta no Upstash Redis se quiser usar a API de scores fora do ambiente local de desenvolvimento

## Configuração local

1. Clone o repositório.
2. Instale as dependências com `npm ci`.
3. Crie um arquivo `.env.local` na raiz com as variáveis necessárias.

Exemplo:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SNAKEGAME_KV_REST_API_URL=https://<seu-endpoint-upstash>
SNAKEGAME_KV_REST_API_TOKEN=<seu-token-upstash>
SIGNING_SECRET=<uma-chave-secreta-forte>
```

`NEXT_PUBLIC_SITE_URL` ajusta os metadados e URLs canônicas. `SNAKEGAME_KV_REST_API_URL` e `SNAKEGAME_KV_REST_API_TOKEN` são usados pela camada de Redis. `SIGNING_SECRET` é usado pelo fluxo seguro de sessão e assinatura dos scores.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Next.js |
| `npm run build` | Gera o build de produção em modo standalone |
| `npm run start` | Executa o build de produção |
| `npm run lint` | Executa o ESLint no projeto |

## Como executar

### Desenvolvimento

```bash
npm ci
npm run dev
```

O app fica disponível em `http://localhost:3000`.

### Produção local

```bash
npm ci
npm run build
npm run start
```

### Docker

O projeto também possui suporte via Docker.

```bash
docker compose up --build
```

No ambiente de desenvolvimento com Compose, a aplicação é exposta em `http://localhost:3004`.

## API e segurança de scores

A rota `app/api/scores/route.ts` usa Redis para persistência dos rankings e a biblioteca `lib/scoreSecurity.ts` para sessões, validação de IP, rate limiting e assinatura dos envios. Por isso, o projeto depende das variáveis de ambiente citadas acima para o fluxo completo de leaderboard funcionar corretamente.

## Deploy

O projeto foi preparado para deploy em ambientes compatíveis com Next.js standalone, como Vercel ou containers baseados no `Dockerfile` do repositório.

## Contribuição

Antes de abrir um pull request, rode ao menos:

```bash
npm run lint
npm run build
```

Se você for alterar a experiência visual ou os minigames, valide também a navegação entre as seções da home e o fluxo da API de scores.