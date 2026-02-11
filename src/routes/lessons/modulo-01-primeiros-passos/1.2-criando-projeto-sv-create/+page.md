---
title: "Criando seu Projeto com sv create"
module: 1
order: 2
---

<script>
import Tip from '$lib/components/Tip.svelte';
import Question from '$lib/components/Question.svelte';
</script>

# 1.2 — Criando seu Projeto com `sv create`

> Crie seu primeiro projeto SvelteKit usando a ferramenta oficial e entenda cada opcao do wizard interativo.

## Objetivos da Aula

- Conhecer o `sv` — a CLI oficial do Svelte
- Criar um projeto SvelteKit com `npx sv create`
- Entender cada opcao do wizard interativo
- Conhecer os add-ons disponiveis e quando usar cada um
- Rodar o servidor de desenvolvimento pela primeira vez

---

## O que e o `sv`?

O `sv` e a **ferramenta de linha de comando oficial do Svelte**. Ela unifica tudo que voce precisa para trabalhar com projetos Svelte em um unico lugar.

Historicamente, o ecossistema Svelte tinha varias ferramentas separadas:

- `create-svelte` — para criar projetos
- `svelte-add` — para adicionar funcionalidades (mantido pela comunidade)
- `svelte-migrate` — para migrar entre versoes

Agora, tudo isso vive dentro do `sv`.

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
  <div class="bg-warning text-warning-content px-4 py-2 font-bold text-center text-sm sm:text-base tracking-wide">O CLI UNIFICADO: sv</div>
  <div class="p-4 sm:p-6">
    <div class="space-y-3">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <code class="font-mono text-sm bg-base-300 px-3 py-1 rounded font-bold text-warning shrink-0">sv create</code>
        <span class="text-sm text-base-content/80">Cria um novo projeto SvelteKit</span>
      </div>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <code class="font-mono text-sm bg-base-300 px-3 py-1 rounded font-bold text-warning shrink-0">sv add</code>
        <span class="text-sm text-base-content/80">Adiciona funcionalidades a um projeto existente</span>
      </div>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <code class="font-mono text-sm bg-base-300 px-3 py-1 rounded font-bold text-warning shrink-0">sv migrate</code>
        <span class="text-sm text-base-content/80">Migra codigo entre versoes do Svelte</span>
      </div>
    </div>
  </div>
</div>

<Question question="Preciso instalar o sv globalmente?">
Nao. Voce usa o `sv` atraves do `npx` (que ja vem com o npm). Ao rodar `npx sv create`, o npm baixa e executa o `sv` automaticamente, sempre na versao mais recente. Nao precisa instalar nada antes.
</Question>

---

## Criando seu primeiro projeto

Abra o terminal e execute:

```bash
npx sv create meu-projeto
```

Esse comando vai iniciar um **wizard interativo** que guia voce pelas opcoes do projeto. Vamos entender cada etapa.

<Tip>
Se voce usa `pnpm`, o comando equivalente e `pnpx sv create meu-projeto`. Com `bun`, use `bunx sv create meu-projeto`. Neste curso usaremos `npm`/`npx` por ser o mais universal.
</Tip>

---

## Etapa 1: Template do Projeto

A primeira pergunta e sobre qual **template** usar:

```text
┌  Welcome to the Svelte CLI! (v0.6.x)
│
◇  Which template would you like?
│  ● SvelteKit minimal
│  ○ SvelteKit demo
│  ○ SvelteKit library
```

### As opcoes

<div class="not-prose my-6 space-y-3">
  <div class="rounded-xl border border-success/30 bg-base-200 p-4 flex flex-col sm:flex-row gap-3 items-start">
    <div class="badge badge-success font-bold shrink-0">RECOMENDADO</div>
    <div>
      <div class="font-bold text-base-content">SvelteKit minimal</div>
      <div class="text-sm text-base-content/70">Projeto limpo, com o minimo necessario para comecar. Ideal para aprender e para projetos reais. E o que vamos usar neste curso.</div>
    </div>
  </div>
  <div class="rounded-xl border border-base-content/10 bg-base-200 p-4 flex flex-col sm:flex-row gap-3 items-start">
    <div class="badge badge-neutral font-bold shrink-0">DEMO</div>
    <div>
      <div class="font-bold text-base-content">SvelteKit demo</div>
      <div class="text-sm text-base-content/70">Inclui uma aplicacao de exemplo (um jogo de adivinhar palavras) que funciona ate sem JavaScript. Bom para explorar, mas nao para projetos reais.</div>
    </div>
  </div>
  <div class="rounded-xl border border-base-content/10 bg-base-200 p-4 flex flex-col sm:flex-row gap-3 items-start">
    <div class="badge badge-neutral font-bold shrink-0">LIBRARY</div>
    <div>
      <div class="font-bold text-base-content">SvelteKit library</div>
      <div class="text-sm text-base-content/70">Template para criar bibliotecas de componentes Svelte que serao publicadas no npm. Vem configurado com <code>svelte-package</code>.</div>
    </div>
  </div>
</div>

**Escolha: SvelteKit minimal**

---

## Etapa 2: Tipagem (TypeScript)

```text
◇  Add type checking with Typescript?
│  ● Yes, using Typescript syntax
│  ○ Yes, using Javascript with JSDoc comments
│  ○ No
```

### As opcoes

**TypeScript syntax** — Seus arquivos usam a extensao `.ts` e componentes Svelte usam `lang="ts"`:

```svelte
<script lang="ts">
  // tipagem direto no codigo
  let nome: string = 'mundo'
</script>
```

**JSDoc comments** — Seus arquivos continuam `.js`, mas voce adiciona tipos como comentarios:

```javascript
// tipagem via comentarios JSDoc
/** @type {string} */
let nome = 'mundo'
```

**No** — Sem tipagem. Nao recomendado, pois TypeScript ajuda muito a evitar erros.

<Tip>
Para este curso, vamos escolher **Yes, using Typescript syntax**. Mesmo que voce nao conheca TypeScript, os tipos basicos sao simples e o editor vai te ajudar com autocompletar e deteccao de erros.
</Tip>

---

## Etapa 3: Add-ons

Essa e a etapa mais interessante. O `sv` permite configurar varias ferramentas no momento da criacao do projeto:

```text
◇  Which add-ons would you like?
│  ◻ prettier
│  ◻ eslint
│  ◻ vitest
│  ◻ playwright
│  ◻ tailwindcss
│  ◻ drizzle
│  ◻ lucia
│  ◻ mdsvex
│  ◻ paraglide
│  ◻ storybook
```

Voce pode selecionar **multiplos** add-ons usando a barra de espaco e confirmando com Enter.

### Entendendo cada add-on

<div class="not-prose my-6 space-y-3">

  <div class="rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
    <div class="flex items-center gap-3 px-4 py-3 border-b border-base-content/10">
      <div class="badge badge-info badge-sm font-bold">FORMATACAO</div>
      <span class="font-bold text-base-content">prettier</span>
    </div>
    <div class="px-4 py-3 text-sm text-base-content/80">
      Formatador de codigo automatico. Voce escreve o codigo de qualquer jeito e o Prettier padroniza a formatacao (aspas, indentacao, ponto-e-virgula, etc.). Inclui o plugin especifico para arquivos <code>.svelte</code>.
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
    <div class="flex items-center gap-3 px-4 py-3 border-b border-base-content/10">
      <div class="badge badge-info badge-sm font-bold">QUALIDADE</div>
      <span class="font-bold text-base-content">eslint</span>
    </div>
    <div class="px-4 py-3 text-sm text-base-content/80">
      Ferramenta de linting que analisa seu codigo e aponta problemas comuns — variaveis nao usadas, imports incorretos, padroes perigosos. Ajuda a manter a qualidade do codigo.
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
    <div class="flex items-center gap-3 px-4 py-3 border-b border-base-content/10">
      <div class="badge badge-secondary badge-sm font-bold">TESTES</div>
      <span class="font-bold text-base-content">vitest</span>
    </div>
    <div class="px-4 py-3 text-sm text-base-content/80">
      Framework de testes unitarios. Usa a mesma toolchain do Vite, entao funciona perfeitamente com TypeScript e Svelte sem configuracao extra. Ideal para testar funcoes, stores e logica isolada.
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
    <div class="flex items-center gap-3 px-4 py-3 border-b border-base-content/10">
      <div class="badge badge-secondary badge-sm font-bold">TESTES</div>
      <span class="font-bold text-base-content">playwright</span>
    </div>
    <div class="px-4 py-3 text-sm text-base-content/80">
      Framework de testes end-to-end. Abre um navegador real e simula a interacao do usuario — clicar em botoes, preencher formularios, navegar entre paginas. Testa o fluxo completo da aplicacao.
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
    <div class="flex items-center gap-3 px-4 py-3 border-b border-base-content/10">
      <div class="badge badge-accent badge-sm font-bold">ESTILIZACAO</div>
      <span class="font-bold text-base-content">tailwindcss</span>
    </div>
    <div class="px-4 py-3 text-sm text-base-content/80">
      Framework CSS utility-first. Em vez de escrever CSS em arquivos separados, voce aplica classes diretamente no HTML: <code>class="bg-blue-500 text-white p-4"</code>. Muito popular e produtivo.
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
    <div class="flex items-center gap-3 px-4 py-3 border-b border-base-content/10">
      <div class="badge badge-warning badge-sm font-bold">BANCO DE DADOS</div>
      <span class="font-bold text-base-content">drizzle</span>
    </div>
    <div class="px-4 py-3 text-sm text-base-content/80">
      ORM (Object Relational Mapper) para banco de dados. Permite escrever queries com TypeScript type-safe, gerenciar schemas e fazer migrations. Suporta PostgreSQL, MySQL e SQLite.
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
    <div class="flex items-center gap-3 px-4 py-3 border-b border-base-content/10">
      <div class="badge badge-warning badge-sm font-bold">AUTENTICACAO</div>
      <span class="font-bold text-base-content">lucia</span>
    </div>
    <div class="px-4 py-3 text-sm text-base-content/80">
      Guia de implementacao de autenticacao (login, registro, sessoes). Configura a estrutura base para gerenciar usuarios e sessoes com seguranca, usando cookies HttpOnly.
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
    <div class="flex items-center gap-3 px-4 py-3 border-b border-base-content/10">
      <div class="badge badge-error badge-sm font-bold">CONTEUDO</div>
      <span class="font-bold text-base-content">mdsvex</span>
    </div>
    <div class="px-4 py-3 text-sm text-base-content/80">
      Permite escrever paginas usando Markdown com componentes Svelte embutidos. Perfeito para blogs, documentacao e sites de conteudo. E o equivalente do MDX no ecossistema Svelte.
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
    <div class="flex items-center gap-3 px-4 py-3 border-b border-base-content/10">
      <div class="badge badge-error badge-sm font-bold">i18n</div>
      <span class="font-bold text-base-content">paraglide</span>
    </div>
    <div class="px-4 py-3 text-sm text-base-content/80">
      Biblioteca de internacionalizacao (i18n). Permite traduzir sua aplicacao para multiplos idiomas, com deteccao automatica do idioma do usuario e rotas localizadas.
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
    <div class="flex items-center gap-3 px-4 py-3 border-b border-base-content/10">
      <div class="badge badge-error badge-sm font-bold">UI DEV</div>
      <span class="font-bold text-base-content">storybook</span>
    </div>
    <div class="px-4 py-3 text-sm text-base-content/80">
      Workshop de componentes isolados. Permite desenvolver e testar componentes de UI individualmente, fora do contexto da aplicacao. Muito usado em equipes grandes e bibliotecas de componentes.
    </div>
  </div>

</div>

### O que selecionar para comecar?

Para este curso, vamos comecar com o essencial:

<div class="not-prose my-6 rounded-xl border border-success/30 bg-success/5 p-5">
  <div class="font-bold text-success mb-3">Add-ons recomendados para comecar:</div>
  <div class="space-y-2 text-sm text-base-content">
    <div class="flex items-center gap-2">
      <span class="text-success font-bold">✓</span>
      <strong>prettier</strong> — formatar codigo automaticamente
    </div>
    <div class="flex items-center gap-2">
      <span class="text-success font-bold">✓</span>
      <strong>eslint</strong> — detectar problemas no codigo
    </div>
  </div>
  <div class="mt-3 pt-3 border-t border-success/20 text-sm text-base-content/70">
    Os demais add-ons vamos aprender e adicionar mais adiante no curso usando <code>sv add</code>.
  </div>
</div>

<Tip title="Voce pode adicionar depois">
Qualquer add-on que voce nao selecionar agora pode ser adicionado depois com <code>npx sv add tailwindcss</code>, por exemplo. Nao precisa decidir tudo agora.
</Tip>

---

## Etapa 4: Instalacao das dependencias

Apos selecionar os add-ons, o wizard pergunta qual gerenciador de pacotes usar:

```text
◇  Which package manager do you want to install dependencies with?
│  ● npm
│  ○ pnpm
│  ○ yarn
│  ○ bun
```

**Escolha `npm`** (o padrao, ja vem com o Node.js).

---

## Passo a Passo Completo

Agora que voce entende cada opcao, vamos criar o projeto de fato:

```bash
# 1. Crie o projeto
npx sv create meu-projeto
```

Selecione:
- Template: **SvelteKit minimal**
- TypeScript: **Yes, using Typescript syntax**
- Add-ons: **prettier** e **eslint**
- Package manager: **npm**

```bash
# 2. Entre na pasta do projeto
cd meu-projeto

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Voce vera algo assim no terminal:

```text
  VITE v6.x.x  ready in 534 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

<div class="not-prose my-6 rounded-xl border border-success/30 bg-success/5 p-5">
  <div class="text-center">
    <div class="text-4xl mb-2">🎉</div>
    <div class="font-bold text-success text-lg">Seu projeto esta rodando!</div>
    <div class="text-sm text-base-content/70 mt-1">Abra <code>http://localhost:5173</code> no navegador</div>
  </div>
</div>

---

## Criacao Direta (sem wizard)

Se voce ja sabe o que quer, pode pular o wizard passando as opcoes diretamente:

```bash
# Criar com template minimal e TypeScript
npx sv create meu-projeto --template minimal --types ts

# Criar e ja adicionar Tailwind e Prettier
npx sv create meu-projeto --template minimal --types ts --add prettier,tailwindcss

# Criar sem instalar dependencias (instalar manualmente depois)
npx sv create meu-projeto --no-install
```

<Question question="Qual a diferenca entre sv create e npm create vite?">
O <code>npm create vite</code> cria projetos Vite genericos (React, Vue, Svelte puro, etc.). Ja o <code>npx sv create</code> cria projetos <strong>SvelteKit</strong> — que vem com roteamento, SSR, e toda a estrutura do framework. Para projetos Svelte serios, use sempre <code>sv create</code>.
</Question>

---

## Adicionando funcionalidades depois: `sv add`

Esqueceu de adicionar Tailwind na criacao? Sem problema:

```bash
# Adicionar Tailwind a um projeto existente
npx sv add tailwindcss

# Adicionar testes
npx sv add vitest

# Adicionar multiplos add-ons de uma vez
npx sv add prettier eslint
```

O `sv add` modifica os arquivos necessarios automaticamente — instala dependencias, cria arquivos de configuracao e atualiza o que for preciso.

---

## Scripts disponiveis

Apos criar o projeto, voce tem estes scripts no `package.json`:

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de producao
npm run build

# Visualizar o build localmente
npm run preview

# Verificar tipos TypeScript
npm run check

# Rodar o linter (se adicionou ESLint)
npm run lint

# Formatar codigo (se adicionou Prettier)
npm run format
```

### O mais importante: `npm run dev`

Este e o comando que voce mais vai usar. Ele inicia o servidor de desenvolvimento com:
- **Hot Module Replacement (HMR)** — alteracoes aparecem instantaneamente no navegador
- **Compilacao sob demanda** — so compila o que voce esta usando
- **Deteccao de erros** — erros aparecem direto no navegador e no terminal

```bash
npm run dev

# Opcoes uteis:
npm run dev -- --open
# Abre o navegador automaticamente

npm run dev -- --port 3000
# Usa a porta 3000 em vez da 5173

npm run dev -- --host
# Expoe na rede local (para testar no celular)
```

---

## Resumo

| Comando | O que faz |
|---------|-----------|
| `npx sv create` | Cria novo projeto SvelteKit (interativo) |
| `npx sv add` | Adiciona funcionalidades a projeto existente |
| `npx sv migrate` | Migra codigo entre versoes do Svelte |
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de producao |

---

## Desafio da Aula

### Objetivo
Criar seu primeiro projeto SvelteKit e confirmar que esta funcionando.

### Instrucoes

1. Abra o terminal
2. Execute `npx sv create meu-primeiro-svelte`
3. Selecione: minimal, TypeScript, prettier + eslint
4. Entre na pasta e rode `npm run dev`
5. Acesse `http://localhost:5173` no navegador

### Spec de Verificacao

- [ ] O projeto foi criado sem erros
- [ ] O servidor de desenvolvimento esta rodando
- [ ] A pagina padrao do SvelteKit aparece no navegador
- [ ] O terminal mostra "ready in XXX ms"

---

**Proxima aula:** [1.3 — Estrutura de Arquivos do Projeto](../1.3-estrutura-arquivos)
