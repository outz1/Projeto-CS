# Arquitetura de Segurança — Leaderboard do Jogo da Cobrinha

# Objetivo

O sistema de leaderboard foi projetado para impedir:

- manipulação trivial de score
- spam automatizado
- spoofing visual
- payloads maliciosos
- corrupção do estado frontend
- abuso básico via DevTools
- ataques simples de script kiddies

A arquitetura utiliza múltiplas camadas de validação e proteção tanto no frontend quanto no backend.

---

# Fluxo Geral da Segurança

```
Usuário digita nome
        ↓
Sanitização do input
        ↓
Normalização unicode
        ↓
Validação do ID
        ↓
Jogo executa
        ↓
Score é enviado
        ↓
Backend valida payload
        ↓
Rate limit aplicado
        ↓
Anti-cheat heurístico
        ↓
Persistência do score
        ↓
Frontend faz parsing defensivo
        ↓
Renderização segura

_____________________________________
1. Sanitização do Nome do Jogador
Como funciona

Toda entrada do usuário passa por:

sanitizePlayerNameInput()

e depois:

normalizePlayerName()

O sistema:

remove caracteres perigosos
remove caracteres invisíveis
remove caracteres bidi
normaliza unicode
limita tamanho
aplica trim
padroniza uppercase
Exemplo

´´´
Entrada maliciosa:

<script>alert(1)</script>

Resultado sanitizado:

SCRIPTALERT1SCRIPT
´´´

O payload perde completamente a capacidade de execução.

O que isso impede
Stored XSS
HTML injection
Unicode spoofing
Invisible character abuse
Homoglyph attacks
Bidi override attacks
2. Allowlist de Caracteres
Como funciona

O sistema utiliza uma regex whitelist:

/[^A-Za-zÀ-ÖØ-öø-ÿ0-9 _-]/g

Isso significa:

apenas caracteres explicitamente permitidos passam.

Caracteres permitidos
letras
números
espaço
underline
hífen

Todo o resto é removido.

O que isso impede
payloads HTML
caracteres especiais maliciosos
obfuscação de payload
unicode perigoso
3. Normalização Unicode
Como funciona

O sistema usa:

normalize("NFKC")

para transformar caracteres unicode visualmente equivalentes em uma forma padronizada.

Exemplo
ＡＤＭＩＮ

vira:

ADMIN
O que isso impede
spoofing visual
usernames falsificados
ataques com homoglyphs unicode
4. Remoção de Caracteres Invisíveis
Como funciona

O sistema remove:

zero-width chars
invisible unicode chars
unicode formatting chars
Exemplo

Isso:

A​D​M​I​N

vira:

ADMIN
O que isso impede
usernames invisivelmente alterados
bypass visual
impersonação
5. Remoção de Caracteres Bidirecionais
Como funciona

Caracteres bidi são removidos:

BIDI_CHARS_REGEX
Exemplo de ataque

Um atacante poderia tentar:

abcexe.jpg

para parecer:

abcjpg.exe
O que isso impede
manipulação visual
engenharia social textual
disfarce de conteúdo
6. Validação do ID do Jogador
Como funciona

O ID possui:

tamanho fixo
charset restrito
regex própria
Formato permitido
[A-HJ-NP-Z2-9]{6}
Caracteres removidos

O sistema remove:

O
0
I
1

para evitar confusão visual.

O que isso impede
IDs falsificados visualmente
spoofing de jogador
payload injection em IDs
7. Validação do Score
Como funciona

O backend valida:

tipo numérico
integer
range mínimo
range máximo
múltiplos válidos
Regras
mínimo: 0
máximo: 5000
step: 10
Exemplo inválido
{
  "score": 777
}

O score é rejeitado porque o jogo só gera múltiplos de 10.

O que isso impede
score forging
manipulação trivial de ranking
valores impossíveis
8. Anti-Cheat por Tempo de Partida
Como funciona

O cliente envia:

{
  "score": 300,
  "durationMs": 8000
}

O backend calcula:

quantidade de comidas
tempo mínimo plausível

Se o tempo for impossível:

o score é rejeitado
Exemplo
{
  "score": 500,
  "durationMs": 100
}

Isso é detectado como impossível.

O que isso impede
cheats triviais
score injection automatizado
payloads absurdos
9. Rate Limiting
Como funciona

O backend aplica limite por:

IP
ID do jogador

Quando excedido:

429 Too Many Requests
O que isso impede
flood
spam
brute force de ranking
automação simples
10. Cooldown Server-Side
Antes

O cooldown existia apenas no localStorage.

Isso podia ser burlado via DevTools.

Agora

O backend valida o cooldown.

Mesmo apagando localStorage:

o servidor ainda bloqueia.
O que isso impede
bypass trivial
spam manual
manipulação client-side
11. Best Score Only
Como funciona

O sistema mantém:

apenas a melhor pontuação do jogador
O que isso impede
flood do ranking
múltiplas entradas do mesmo usuário
poluição visual do leaderboard
12. Parsing Defensivo da API
Como funciona

O frontend NÃO confia mais diretamente no JSON da API.

Tudo passa por:

parseScoresApiResponse()
O que é validado

Cada entrada precisa possuir:

nome válido
ID válido
score válido

Entradas inválidas:

são descartadas
O que isso impede
crashes
state poisoning
payloads malformados
corrupção do React state
13. Runtime Validation
Como funciona

O sistema valida:

tipos
estrutura
ranges
formatos

em runtime.

Importante

TypeScript sozinho NÃO protege runtime.

O backend agora valida tudo explicitamente.

O que isso impede
malformed JSON
type confusion
object injection
14. Defense in Depth
Como funciona

A validação ocorre em múltiplas camadas:

input
modal
game
API
parsing
renderização
Objetivo

Mesmo que uma camada falhe:

outra camada bloqueia.
15. Renderização Segura
Como funciona

O React renderiza:

{entry.name}

sem:

dangerouslySetInnerHTML
O que isso impede
execução de HTML
execução de JavaScript
stored XSS
Tipos de Ataques Mitigados
Ataque	Status
Stored XSS	Mitigado
HTML Injection	Mitigado
Unicode Spoofing	Mitigado
Homoglyph Attack	Mitigado
Invisible Character Abuse	Mitigado
Bidi Override Attack	Mitigado
Score Forgery	Mitigado
Leaderboard Flooding	Mitigado
Spam Automatizado	Mitigado
DevTools Cooldown Bypass	Mitigado
Malformed JSON Abuse	Mitigado
State Poisoning	Mitigado
Rank Pollution	Mitigado
Script Kiddie Abuse	Fortemente reduzido
Limitações

O sistema ainda é client-side em parte.

Um atacante avançado ainda poderia:

reproduzir requests válidos
automatizar payloads plausíveis
estudar heurísticas
simular partidas

Porém agora ele precisa:

entender toda a lógica
reproduzir validações
respeitar limites
contornar heurísticas
automatizar payloads legítimos

Isso aumenta drasticamente o custo do ataque.

Resultado Final

O projeto saiu de um modelo baseado em:

confiança total no cliente

para uma arquitetura baseada em:

validação defensiva
runtime validation
trust boundaries
anti-abuse
parsing seguro
sanitização consistente
heurísticas anti-cheat
defesa em profundidade