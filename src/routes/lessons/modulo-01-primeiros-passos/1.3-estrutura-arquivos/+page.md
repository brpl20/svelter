---
title: "Estrutura de Arquivos do Projeto"
module: 1
order: 3
---

<script>
import Tip from '$lib/components/Tip.svelte';
import Question from '$lib/components/Question.svelte';
</script>

# 1.3 — Estrutura de Arquivos do Projeto

> Tour completo por cada pasta e arquivo do seu projeto SvelteKit. Entenda onde cada coisa mora e por que.

## Objetivos da Aula

- Entender a estrutura de pastas de um projeto SvelteKit
- Conhecer o papel de cada arquivo de configuracao
- Dominar o sistema de rotas baseado em arquivos
- Saber a diferenca entre `src/routes`, `src/lib` e `static`

---

## Visao Geral da Estrutura

Apos criar um projeto com `npx sv create` (template minimal, TypeScript, prettier, eslint), voce tera algo assim:

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 p-4 sm:p-6 font-mono text-sm">
  <div class="mb-3 font-bold text-base-content text-base font-sans">Estrutura do projeto</div>
  <div class="space-y-1 text-base-content/90">
    <div>
      <span class="inline-block rounded bg-warning/20 text-warning px-2 py-0.5 font-bold">meu-projeto/</span>
    </div>
    <div class="ml-4 border-l-2 border-base-content/10 pl-4 space-y-1">
      <div>
        <span class="text-base-content/40">├──</span>
        <span class="inline-block rounded bg-info/20 text-info px-2 py-0.5">src/</span>
        <span class="text-base-content/50 font-sans text-xs ml-2">← seu codigo vive aqui</span>
      </div>
      <div class="ml-8 border-l-2 border-base-content/10 pl-4 space-y-1">
        <div>
          <span class="text-base-content/40">├──</span>
          <span class="inline-block rounded bg-success/20 text-success px-2 py-0.5">routes/</span>
          <span class="text-base-content/50 font-sans text-xs ml-2">← paginas e rotas</span>
        </div>
        <div>
          <span class="text-base-content/40">├──</span>
          <span class="inline-block rounded bg-success/20 text-success px-2 py-0.5">lib/</span>
          <span class="text-base-content/50 font-sans text-xs ml-2">← componentes e utilitarios</span>
        </div>
        <div>
          <span class="text-base-content/40">├──</span>
          <span class="text-base-content">app.html</span>
          <span class="text-base-content/50 font-sans text-xs ml-2">← template HTML base</span>
        </div>
        <div>
          <span class="text-base-content/40">└──</span>
          <span class="text-base-content">app.css</span>
          <span class="text-base-content/50 font-sans text-xs ml-2">← estilos globais</span>
        </div>
      </div>
      <div>
        <span class="text-base-content/40">├──</span>
        <span class="inline-block rounded bg-accent/20 text-accent px-2 py-0.5">static/</span>
        <span class="text-base-content/50 font-sans text-xs ml-2">← arquivos estaticos</span>
      </div>
      <div>
        <span class="text-base-content/40">├──</span>
        <span class="text-base-content">package.json</span>
      </div>
      <div>
        <span class="text-base-content/40">├──</span>
        <span class="text-base-content">svelte.config.js</span>
        <span class="text-base-content/50 font-sans text-xs ml-2">← config do SvelteKit</span>
      </div>
      <div>
        <span class="text-base-content/40">├──</span>
        <span class="text-base-content">vite.config.ts</span>
        <span class="text-base-content/50 font-sans text-xs ml-2">← config do Vite</span>
      </div>
      <div>
        <span class="text-base-content/40">└──</span>
        <span class="text-base-content">tsconfig.json</span>
        <span class="text-base-content/50 font-sans text-xs ml-2">← config do TypeScript</span>
      </div>
    </div>
  </div>
</div>

Parece muita coisa, mas na pratica voce vai trabalhar quase exclusivamente dentro da pasta `src/`. Vamos entender cada parte.

---

## A pasta `src/` — Onde seu codigo vive

### `src/routes/` — Paginas e Rotas

Esta e a pasta mais importante. No SvelteKit, **a estrutura de pastas define as URLs da sua aplicacao**.

Cada pasta dentro de `routes/` vira um caminho na URL. Cada arquivo `+page.svelte` dentro dessas pastas vira uma pagina.

```text
src/routes/
├── +page.svelte          → http://localhost:5173/
├── +layout.svelte        → layout que envolve todas as paginas
├── about/
│   └── +page.svelte      → http://localhost:5173/about
├── blog/
│   ├── +page.svelte      → http://localhost:5173/blog
│   └── [slug]/
│       └── +page.svelte  → http://localhost:5173/blog/meu-post
└── contato/
    └── +page.svelte      → http://localhost:5173/contato
```

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
  <div class="bg-success text-success-content px-4 py-2 font-bold text-center text-sm sm:text-base tracking-wide">PASTA → URL</div>
  <div class="p-4 sm:p-6 space-y-3">
    <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      <code class="bg-base-300 px-3 py-1 rounded text-sm font-mono w-full sm:w-auto text-center">src/routes/+page.svelte</code>
      <span class="text-success font-bold shrink-0">→</span>
      <code class="bg-success/20 text-success px-3 py-1 rounded text-sm font-mono w-full sm:w-auto text-center">/</code>
    </div>
    <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      <code class="bg-base-300 px-3 py-1 rounded text-sm font-mono w-full sm:w-auto text-center">src/routes/about/+page.svelte</code>
      <span class="text-success font-bold shrink-0">→</span>
      <code class="bg-success/20 text-success px-3 py-1 rounded text-sm font-mono w-full sm:w-auto text-center">/about</code>
    </div>
    <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      <code class="bg-base-300 px-3 py-1 rounded text-sm font-mono w-full sm:w-auto text-center">src/routes/blog/[slug]/+page.svelte</code>
      <span class="text-success font-bold shrink-0">→</span>
      <code class="bg-success/20 text-success px-3 py-1 rounded text-sm font-mono w-full sm:w-auto text-center">/blog/qualquer-coisa</code>
    </div>
  </div>
</div>

<Tip>
Voce nao precisa configurar rotas em nenhum arquivo de configuracao. Criou a pasta e o arquivo? A rota ja funciona. Deletou? A rota deixa de existir. Simples assim.
</Tip>

### Arquivos especiais nas rotas

Cada pasta de rota pode conter arquivos com o prefixo `+`. Cada um tem um papel especifico:

<div class="not-prose my-6 space-y-3">
  <div class="rounded-xl border border-base-content/10 bg-base-200 p-4">
    <div class="flex items-start gap-3">
      <code class="font-mono text-sm bg-base-300 px-2 py-1 rounded font-bold text-success shrink-0">+page.svelte</code>
      <div class="text-sm text-base-content/80">
        <strong>A pagina em si.</strong> O componente Svelte que sera renderizado quando o usuario acessar essa rota. Todo o HTML, CSS e logica da pagina ficam aqui.
      </div>
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 p-4">
    <div class="flex items-start gap-3">
      <code class="font-mono text-sm bg-base-300 px-2 py-1 rounded font-bold text-info shrink-0">+layout.svelte</code>
      <div class="text-sm text-base-content/80">
        <strong>Layout compartilhado.</strong> Envolve a pagina com elementos persistentes como navegacao, sidebar, footer. Tudo que aparece em todas as paginas vai aqui.
      </div>
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 p-4">
    <div class="flex items-start gap-3">
      <code class="font-mono text-sm bg-base-300 px-2 py-1 rounded font-bold text-warning shrink-0">+page.server.ts</code>
      <div class="text-sm text-base-content/80">
        <strong>Carregamento de dados no servidor.</strong> Funcao <code>load</code> que roda no servidor para buscar dados de banco, APIs, etc. Os dados ficam disponiveis na pagina.
      </div>
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 p-4">
    <div class="flex items-start gap-3">
      <code class="font-mono text-sm bg-base-300 px-2 py-1 rounded font-bold text-error shrink-0">+server.ts</code>
      <div class="text-sm text-base-content/80">
        <strong>API endpoint.</strong> Cria rotas de API (GET, POST, PUT, DELETE) que retornam JSON ou qualquer tipo de resposta. Nao renderiza HTML.
      </div>
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 p-4">
    <div class="flex items-start gap-3">
      <code class="font-mono text-sm bg-base-300 px-2 py-1 rounded font-bold text-accent shrink-0">+error.svelte</code>
      <div class="text-sm text-base-content/80">
        <strong>Pagina de erro.</strong> Componente exibido quando ocorre um erro nessa rota ou em rotas filhas. Permite personalizar a experiencia de erro.
      </div>
    </div>
  </div>
</div>

<Question question="Por que os arquivos comecam com o sinal de +?">
O prefixo <code>+</code> e uma convencao do SvelteKit para diferenciar arquivos especiais de rota de arquivos normais. Um arquivo <code>+page.svelte</code> e processado pelo roteador do SvelteKit. Um arquivo <code>Header.svelte</code> (sem <code>+</code>) e apenas um componente normal que voce importa manualmente.
</Question>

### O projeto inicial: `+page.svelte` da raiz

Quando voce cria o projeto, ja existe um arquivo `src/routes/+page.svelte` com conteudo basico:

```svelte
<h1>Welcome to SvelteKit</h1>
<p>
  Visit
  <a href="https://svelte.dev/docs/kit">
    svelte.dev/docs/kit
  </a>
  to read the documentation
</p>
```

Esta e a pagina que aparece quando voce acessa `http://localhost:5173/`. Voce pode editar livremente.

---

### `src/lib/` — Componentes e Utilitarios

A pasta `lib` e onde voce organiza tudo que **nao e uma pagina**: componentes reutilizaveis, funcoes utilitarias, stores, tipos, etc.

```text
src/lib/
├── components/
│   ├── Header.svelte
│   ├── Footer.svelte
│   └── Button.svelte
├── utils/
│   ├── formatDate.ts
│   └── api.ts
├── stores/
│   └── auth.ts
└── server/
    └── db.ts
```

O grande beneficio: voce pode importar qualquer coisa de `src/lib/` usando o alias `$lib`:

```svelte
<script lang="ts">
  // Em vez de: import Header from '../../../lib/components/Header.svelte'
  // Voce escreve:
  import Header from '$lib/components/Header.svelte'
</script>
```

<Tip>
O alias <code>$lib</code> funciona em qualquer arquivo do projeto. Nao importa quao profundo voce esteja na arvore de pastas — o caminho e sempre o mesmo. Isso evita aqueles imports com <code>../../../</code> que sao dificeis de manter.
</Tip>

A subpasta `lib/server/` e especial: arquivos aqui so podem ser importados em codigo que roda no servidor (`+page.server.ts`, `+server.ts`, hooks). O SvelteKit impede que voce importe acidentalmente codigo do servidor no cliente.

```typescript
// src/lib/server/db.ts
// Esse arquivo so roda no servidor
// Pode conter credenciais de banco, secrets, etc.

import { DATABASE_URL } from '$env/static/private'
```

<Question question="A pasta lib vem vazia?">
Sim. No template minimal, a pasta <code>lib</code> pode nao existir. Voce a cria quando precisar. Normalmente a primeira coisa que fazemos e criar <code>src/lib/components/</code> para nossos componentes reutilizaveis.
</Question>

---

### `src/app.html` — O Template HTML

Este e o esqueleto HTML de toda a sua aplicacao. O SvelteKit injeta o conteudo das paginas dentro dele:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport"
      content="width=device-width, initial-scale=1"
    />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">
      %sveltekit.body%
    </div>
  </body>
</html>
```

Os placeholders que o SvelteKit substitui:

<div class="not-prose my-6 space-y-3">
  <div class="rounded-lg border border-base-content/10 bg-base-200 p-4 flex flex-col sm:flex-row gap-3">
    <code class="font-mono text-sm bg-base-300 px-2 py-1 rounded text-info shrink-0">%sveltekit.head%</code>
    <span class="text-sm text-base-content/80">Tags <code>&lt;link&gt;</code>, <code>&lt;script&gt;</code>, e conteudo de <code>&lt;svelte:head&gt;</code> dos seus componentes</span>
  </div>
  <div class="rounded-lg border border-base-content/10 bg-base-200 p-4 flex flex-col sm:flex-row gap-3">
    <code class="font-mono text-sm bg-base-300 px-2 py-1 rounded text-info shrink-0">%sveltekit.body%</code>
    <span class="text-sm text-base-content/80">O HTML renderizado da pagina atual</span>
  </div>
  <div class="rounded-lg border border-base-content/10 bg-base-200 p-4 flex flex-col sm:flex-row gap-3">
    <code class="font-mono text-sm bg-base-300 px-2 py-1 rounded text-info shrink-0">%sveltekit.assets%</code>
    <span class="text-sm text-base-content/80">Caminho para a pasta <code>static/</code></span>
  </div>
</div>

<Tip title="Voce raramente edita esse arquivo">
Na maioria dos projetos, voce edita o <code>app.html</code> apenas uma vez — para mudar o <code>lang</code>, adicionar fontes ou tags de analytics. Todo o conteudo dinamico e gerenciado pelos componentes Svelte.
</Tip>

---

### `src/app.css` — Estilos Globais

Arquivo de estilos CSS que se aplica a toda a aplicacao. E importado no layout raiz:

```css
/* src/app.css */
:root {
  --color-primary: #ff3e00;
  --color-bg: #0a0a0a;
  --color-text: #ededed;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
}
```

---

## A pasta `static/` — Arquivos Estaticos

Arquivos na pasta `static/` sao servidos diretamente, sem processamento. Imagens, fontes, `robots.txt`, `favicon.png` — tudo que precisa estar acessivel por URL fixa.

```text
static/
├── favicon.png        → http://localhost:5173/favicon.png
├── robots.txt         → http://localhost:5173/robots.txt
└── images/
    └── logo.svg       → http://localhost:5173/images/logo.svg
```

<Question question="Qual a diferenca entre static/ e src/lib/assets/?">
Arquivos em <code>static/</code> sao copiados para a raiz do build sem alteracao — a URL e fixa e previsivel. Arquivos importados de <code>src/lib/</code> sao processados pelo Vite: recebem um hash no nome (para cache busting) e podem ser otimizados (compressao de imagens, por exemplo).
</Question>

---

## Arquivos de Configuracao na Raiz

### `svelte.config.js`

Configuracao central do SvelteKit:

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Pre-processadores (TypeScript, SCSS, etc.)
  preprocess: vitePreprocess(),

  kit: {
    // Adapter define onde o projeto sera hospedado
    // 'auto' detecta automaticamente (Vercel, Netlify, etc.)
    adapter: adapter()
  }
};

export default config;
```

Os principais campos que voce vai usar ao longo do curso:

- **`preprocess`** — habilita TypeScript e outros pre-processadores
- **`kit.adapter`** — define o target de deploy (Vercel, Node, static, etc.)
- **`kit.alias`** — aliases de importacao customizados

### `vite.config.ts`

Configuracao do Vite (o bundler por baixo do SvelteKit):

```typescript
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()]
});
```

Na maioria dos casos, voce nao precisa mexer neste arquivo. O plugin `sveltekit()` ja configura tudo que e necessario.

### `tsconfig.json`

Configuracao do TypeScript:

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

O SvelteKit gera automaticamente um `tsconfig.json` base na pasta `.svelte-kit/`. Seu arquivo apenas estende ele com customizacoes.

### `package.json`

Seu projeto vem com estas dependencias essenciais:

```json
{
  "name": "meu-projeto",
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^4.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^5.0.0",
    "svelte": "^5.0.0",
    "svelte-check": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^6.0.0"
  }
}
```

<Tip>
Note o <code>"type": "module"</code>. Isso habilita ESModules nativos no Node.js, permitindo usar <code>import/export</code> em vez de <code>require/module.exports</code>.
</Tip>

---

## A pasta `.svelte-kit/` — Gerada automaticamente

Quando voce roda `npm run dev` ou `npm run build`, o SvelteKit gera uma pasta `.svelte-kit/` com arquivos internos. Voce **nunca deve editar** esses arquivos — eles sao regenerados automaticamente.

Esta pasta esta no `.gitignore` e nao vai para o repositorio.

---

## Fluxo Completo: Da Pasta ao Navegador

<div class="not-prose my-6">
  <div class="text-center font-bold text-lg text-base-content mb-4 bg-base-200 rounded-t-xl py-3 border border-base-content/10">COMO O SVELTEKIT MONTA UMA PAGINA</div>
  <div class="flex flex-col items-center gap-0">
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">1</div>
      <div>
        <p class="font-semibold text-base-content">Usuario acessa uma URL</p>
        <p class="text-sm text-base-content/70">Ex: http://localhost:5173/about</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">2</div>
      <div>
        <p class="font-semibold text-base-content">SvelteKit encontra a rota</p>
        <p class="text-sm text-base-content/70">Procura: src/routes/about/+page.svelte</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">3</div>
      <div>
        <p class="font-semibold text-base-content">Executa funcoes load (se existirem)</p>
        <p class="text-sm text-base-content/70">+page.server.ts e +page.ts carregam dados</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">4</div>
      <div>
        <p class="font-semibold text-base-content">Renderiza o componente</p>
        <p class="text-sm text-base-content/70">Aplica layouts (+layout.svelte) e gera HTML</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">5</div>
      <div>
        <p class="font-semibold text-base-content">Injeta no app.html</p>
        <p class="text-sm text-base-content/70">Substitui %sveltekit.head% e %sveltekit.body%</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-success/10 border border-success/30 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-success badge-lg font-bold shrink-0">6</div>
      <div>
        <p class="font-semibold text-success">Pagina renderizada no navegador!</p>
      </div>
    </div>
  </div>
</div>

---

## Resumo: Mapa Mental do Projeto

| Local | O que mora aqui | Quando usar |
|-------|-----------------|-------------|
| `src/routes/` | Paginas, layouts, APIs | Sempre que criar uma nova pagina ou endpoint |
| `src/lib/` | Componentes, utils, stores | Codigo reutilizavel que nao e uma pagina |
| `src/lib/server/` | Codigo server-only | Acesso a banco, secrets, logica de servidor |
| `src/app.html` | Template HTML base | Raramente (fontes, meta tags globais) |
| `src/app.css` | Estilos globais | CSS que afeta toda a aplicacao |
| `static/` | Assets estaticos | Imagens, favicon, robots.txt |
| `svelte.config.js` | Config do SvelteKit | Adapter, aliases, pre-processadores |
| `vite.config.ts` | Config do Vite | Plugins extras, proxy, porta |

---

## Desafio da Aula

### Objetivo
Criar sua primeira pagina customizada no projeto SvelteKit.

### Instrucoes

1. Abra o projeto criado na aula anterior
2. Crie a pasta `src/routes/about/`
3. Dentro dela, crie o arquivo `+page.svelte`
4. Escreva uma pagina simples de "Sobre" com seu nome e uma breve descricao
5. Acesse `http://localhost:5173/about` no navegador

### Dica

```svelte
<!-- src/routes/about/+page.svelte -->
<h1>Sobre mim</h1>
<p>
  Estou aprendendo Svelte e SvelteKit!
</p>

<style>
  h1 {
    color: #ff3e00;
  }
</style>
```

### Spec de Verificacao

- [ ] A pasta `src/routes/about/` existe
- [ ] O arquivo `+page.svelte` existe dentro dela
- [ ] Acessar `/about` no navegador exibe sua pagina
- [ ] O CSS com escopo esta funcionando (so afeta essa pagina)

### Extra

Crie tambem um `+layout.svelte` na raiz (`src/routes/+layout.svelte`) com uma navegacao simples:

<details>
<summary>Clique para ver a solucao do extra</summary>

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  let { children } = $props()
</script>

<nav>
  <a href="/">Inicio</a>
  <a href="/about">Sobre</a>
</nav>

<main>
  {@render children()}
</main>

<style>
  nav {
    padding: 1rem;
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid #333;
  }

  nav a {
    color: #ff3e00;
    text-decoration: none;
  }

  nav a:hover {
    text-decoration: underline;
  }

  main {
    padding: 2rem;
  }
</style>
```

</details>

---

## Conclusao do Modulo 0

Parabens! Voce completou o **Modulo 1 — Primeiros Passos**.

### O que voce aprendeu

- O que e Svelte e como ele se diferencia de outros frameworks
- Como criar um projeto SvelteKit com `npx sv create`
- As opcoes do wizard: templates, TypeScript e add-ons
- A estrutura completa de arquivos e pastas
- Como o roteamento baseado em arquivos funciona
- Os arquivos especiais do SvelteKit (`+page`, `+layout`, `+server`)
- O papel de cada arquivo de configuracao

### Proximos passos

No proximo modulo, vamos mergulhar no **Vite** — o bundler que roda por baixo do SvelteKit. Entender o Vite vai te ajudar a compreender porque tudo e tao rapido e como otimizar seu ambiente de desenvolvimento.

---

**Proximo modulo:** [Fundamentos do Vite](../../modulo-77-vite/77.1-o-que-e-vite)
