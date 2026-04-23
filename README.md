# 📦 Nome do Projeto

> GITFLOW E ESQUEMATIZAÇÃO SOBRE COMO CONSTRUIR A APLICAÇÃO - ATENÇÃO GRUPOS COM DETERMINADOS CARGOS LER O README E ATUALIZAR DE MANEIRA CORRETA A SUA PARTE

> O README SERÁ ATUALIZADO CONFORME O PROJETO ANDAR PARA DEIXAR CLARO AS TECNOLOGIAS USADAS, ESSE É SOMENTE O PROTÓTIPO, O TIME RESPONSÁVEL PELA INICIALIZAÇÃO PODE JÁ COMEÇAR
---

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Fluxo de Trabalho Git (Gitflow)](#fluxo-de-trabalho-git-gitflow)
  - [Branches Principais](#branches-principais)
  - [Diagrama do Fluxo](#diagrama-do-fluxo)
  - [Convenções de Commit](#convenções-de-commit)
  - [Passo a Passo para Contribuir](#passo-a-passo-para-contribuir)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Time](#time)

---

## Sobre o Projeto

Aplicação de Computação e Sociedade para a semana das profissões na UFG

---

## Tecnologias

> CADA GRUPO IRÁ ATUALIZAR A SUA PARTE

| Camada      | Tecnologia         |
|-------------|--------------------|
| Front-end   | (ex: React, Vue)   |
| Back-end    | (ex: Node, Django) |
| Banco de Dados | (ex: PostgreSQL) |
| Hospedagem  | Vercel |

---

## Fluxo de Trabalho Git (Gitflow)

Este projeto adota um modelo simplificado de Gitflow com **duas branches principais**, garantindo organização e rastreabilidade do desenvolvimento.

### Branches Principais

| Branch      | Finalidade                                                                 |
|-------------|----------------------------------------------------------------------------|
| `dev`       | Branch de desenvolvimento e integração. Todo trabalho deve entrar primeiro aqui. |
| `prod`      | Branch estável e pronta para produção. Nunca recebe commits diretos.      |

> ⚠️ **Regra fundamental:** nenhum desenvolvedor deve fazer `push` ou `commit` diretamente em `prod`. Todo código entra via Pull Request e é validado primeiro em `dev`. Somente os líderes de cada grupo devem fazer o merge para a produção

---

### Diagrama do Fluxo

```mermaid
gitGraph
   commit id: "init"

  branch dev
  checkout dev
   commit id: "setup base"

  commit id: "add features"
  commit id: "fix bugs"

  checkout prod
  merge dev id: "release v1.0"
```

---

### Convenções de Commit

Seguimos o padrão **Conventional Commits** para manter o histórico legível:

```
<tipo>: <descrição curta no imperativo>
```

| Tipo       | Quando usar                                      |
|------------|--------------------------------------------------|
| `feat`     | Nova funcionalidade                              |
| `fix`      | Correção de bug                                  |
| `docs`     | Alterações em documentação                       |
| `style`    | Formatação, espaçamento (sem mudança de lógica)  |
| `refactor` | Refatoração sem adição de feature ou fix         |
| `test`     | Adição ou correção de testes                     |
| `chore`    | Tarefas de build, configs, dependências          |

**Exemplos:**
```
feat: adicionar tela de cadastro de usuário
fix: corrigir validação de e-mail no login
docs: atualizar README com instruções de setup
```

---

### Passo a Passo para Contribuir

Siga esse fluxo sempre que for desenvolver algo novo:

**1. Atualize a branch `dev` local antes de começar:**
```bash
git checkout dev
git pull origin dev
```

**2. Faça suas alterações diretamente na branch `dev`:**
```bash
git checkout dev
```

**3. Desenvolva e faça commits seguindo a convenção:**
```bash
git add .
git commit -m "feat: descrição do que foi feito"
```

**4. Suba as alterações para o repositório remoto:**
```bash
git push origin dev
```

**5. Abra um Pull Request no GitHub:**
- Base: `prod`
- Compare: `dev`
- Adicione descrição clara do que foi feito
- Solicite revisão de ao menos um colega

**6. Após aprovação e merge, sincronize a `dev` localmente:**
```bash
git pull origin prod
```

> 🔁 O merge de `dev` → `prod` é feito pelo responsável de DevOps ao final de cada entrega.

---

## Como Rodar o Projeto

```bash
# Clone o repositório
git clone https://github.com/usuario/nome-do-projeto.git
cd nome-do-projeto

# Instale as dependências
# (ajuste conforme a stack do projeto)
npm install

# Rode o projeto
npm run dev
```

---

- Adicionar o seu grupo e a sua função:
## Time


| Nome | Papel |
|------|-------|
| GRUPO 8 - DevOps     | Colocar para rodar o projeto 👍​ |
|      |       |
|      |       |