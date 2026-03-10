---
title: "Vite para Diferentes Frameworks"
module: 2
order: 8
---

<script>
import Tip from '$lib/components/Tip.svelte';
import Question from '$lib/components/Question.svelte';
</script>

# 2.8 — Vite para Diferentes Frameworks

> Entenda como o Vite se integra com React, Vue e Svelte, preparando-se para o restante do curso.

## Objetivos da Aula

- Entender como plugins de framework funcionam
- Comparar a integração do Vite com React, Vue e Svelte
- Configurar um projeto Svelte com Vite (preparação para o próximo módulo)
- Conhecer o `vite-plugin-svelte` em detalhes

---

## Como Plugins de Framework Funcionam

Cada framework precisa de transformações específicas:

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 p-5">
  <div class="mb-4 rounded-lg bg-secondary/20 px-4 py-2 text-center font-bold text-base-content">PLUGINS DE FRAMEWORK</div>
  <div class="space-y-4">
    <div>
      <div class="mb-2 text-sm font-semibold text-info">React (.jsx/.tsx)</div>
      <div class="flex flex-col items-center gap-2 sm:flex-row">
        <div class="w-full rounded-lg border border-info/30 bg-info/10 px-4 py-2 text-center text-sm sm:w-1/3">
          <div class="font-bold">JSX</div>
          <div class="text-base-content/60">&lt;App /&gt;</div>
        </div>
        <div class="text-base-content/40 sm:rotate-0">&#9654;</div>
        <div class="w-full rounded-lg border border-base-content/20 bg-base-300 px-4 py-2 text-center text-sm sm:w-1/3">
          <div class="font-bold">Babel ou esbuild</div>
        </div>
        <div class="text-base-content/40 sm:rotate-0">&#9654;</div>
        <div class="w-full rounded-lg border border-success/30 bg-success/10 px-4 py-2 text-center text-sm sm:w-1/3">
          <div class="font-bold">JavaScript</div>
          <div class="text-base-content/60">React.createElement()</div>
        </div>
      </div>
    </div>
    <div>
      <div class="mb-2 text-sm font-semibold text-success">Vue (.vue)</div>
      <div class="flex flex-col items-center gap-2 sm:flex-row">
        <div class="w-full rounded-lg border border-success/30 bg-success/10 px-4 py-2 text-center text-sm sm:w-1/3">
          <div class="font-bold">SFC Vue</div>
          <div class="text-base-content/60">&lt;template&gt;</div>
        </div>
        <div class="text-base-content/40">&#9654;</div>
        <div class="w-full rounded-lg border border-base-content/20 bg-base-300 px-4 py-2 text-center text-sm sm:w-1/3">
          <div class="font-bold">@vue/compiler-sfc</div>
        </div>
        <div class="text-base-content/40">&#9654;</div>
        <div class="w-full rounded-lg border border-success/30 bg-success/10 px-4 py-2 text-center text-sm sm:w-1/3">
          <div class="font-bold">JavaScript + CSS</div>
        </div>
      </div>
    </div>
    <div>
      <div class="mb-2 text-sm font-semibold text-warning">Svelte (.svelte)</div>
      <div class="flex flex-col items-center gap-2 sm:flex-row">
        <div class="w-full rounded-lg border border-warning/30 bg-warning/10 px-4 py-2 text-center text-sm sm:w-1/3">
          <div class="font-bold">Componente Svelte</div>
        </div>
        <div class="text-base-content/40">&#9654;</div>
        <div class="w-full rounded-lg border border-base-content/20 bg-base-300 px-4 py-2 text-center text-sm sm:w-1/3">
          <div class="font-bold">Svelte Compiler</div>
        </div>
        <div class="text-base-content/40">&#9654;</div>
        <div class="w-full rounded-lg border border-warning/30 bg-warning/10 px-4 py-2 text-center text-sm sm:w-1/3">
          <div class="font-bold">JavaScript Vanilla</div>
        </div>
      </div>
    </div>
  </div>
</div>

<Tip title="Svelte e diferente!">
Diferente de React e Vue, que enviam um <strong>runtime</strong> inteiro para o navegador, o Svelte <strong>compila</strong> seus componentes em JavaScript puro durante o build. O resultado e um bundle muito menor e mais rapido, porque nao ha framework rodando no browser.
</Tip>

---

## Vite + React (referencia rapida)

React usa plugins para transformar JSX em chamadas `createElement`.

```bash
pnpm create vite@latest meu-app-react -- --template react-ts
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // Fast Refresh habilitado por padrao
      fastRefresh: true
    })
  ]
})
```

Estrutura tipica: `App.tsx`, `main.tsx`, componentes em `.tsx`.

---

## Vite + Vue (referencia rapida)

Vue usa Single File Components (`.vue`) com template, script e style.

```bash
pnpm create vite@latest meu-app-vue -- --template vue-ts
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Tratar tags com hifen como custom elements
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
})
```

Estrutura tipica: `App.vue`, `main.ts`, componentes em `.vue`.

---

## Vite + Svelte ⭐

Este é o foco do nosso curso!

### Setup

```bash
pnpm create vite@latest meu-app-svelte -- --template svelte
# ou com TypeScript (recomendado!)
pnpm create vite@latest meu-app-svelte -- --template svelte-ts
```

### Configuração Básica

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()]
})
```

### Configuração Avançada

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    svelte({
      // Opcoes do compilador Svelte
      compilerOptions: {
        // Modo de desenvolvimento
        dev: true,

        // CSS em arquivo separado ou injetado
        // 'external' | 'injected' | 'none'
        css: 'injected',

        // Habilitar runes (Svelte 5)
        runes: true,

        // Preservar espacos em branco
        preserveWhitespace: false
      },

      // Pre-processadores
      preprocess: [
        // vitePreprocess()
        // Para TypeScript, SCSS, etc.
      ],

      // Hot Module Replacement
      hot: {
        // Preservar estado local durante HMR
        preserveLocalState: true
      },

      // Extensoes de arquivo
      extensions: ['.svelte'],

      // Modo de emissao de CSS
      emitCss: true
    })
  ]
})
```

### Estrutura de um Projeto Svelte

```text
meu-app-svelte/
├── index.html
├── package.json
├── svelte.config.ts          # Configuração do Svelte
├── vite.config.ts            # Configuração do Vite
├── src/
│   ├── App.svelte            # Componente raiz
│   ├── main.ts               # Ponto de entrada
│   ├── app.css               # Estilos globais
│   ├── lib/                  # Componentes reutilizáveis
│   │   └── Counter.svelte
│   └── vite-env.d.ts         # Tipos do Vite (TS)
└── public/
    └── vite.svg
```

### Arquivos Principais

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meu App Svelte</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

```typescript
// src/main.ts
import './app.css'
import App from './App.svelte'
import { mount } from 'svelte'

// Svelte 5: usa mount() em vez de new App()
const app = mount(App, {
  target: document.getElementById('app')!
})

export default app
```

```svelte
<!-- src/App.svelte -->
<script lang="ts">
  import Counter from './lib/Counter.svelte'

  let name: string = $state('mundo')
</script>

<main>
  <h1>Olá, {name}!</h1>
  <Counter />
</main>

<style>
  main {
    text-align: center;
    padding: 2rem;
  }

  h1 {
    color: #ff3e00;
  }
</style>
```

```svelte
<!-- src/lib/Counter.svelte -->
<script lang="ts">
  let count: number = $state(0)

  function increment(): void {
    count += 1
  }
</script>

<button onclick={increment}>
  Cliques: {count}
</button>

<style>
  button {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
</style>
```

---

## Comparativo: O Mesmo Componente

### React

```jsx
// Counter.jsx
import { useState } from 'react'
import './Counter.css'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Cliques: {count}
    </button>
  )
}
```

### Vue

```vue
<!-- Counter.vue -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">
    Cliques: {{ count }}
  </button>
</template>

<style scoped>
button { /* estilos */ }
</style>
```

### Svelte

```svelte
<!-- Counter.svelte -->
<script lang="ts">
  // Svelte 5: $state() cria reatividade
  let count: number = $state(0)
</script>

<button onclick={() => count++}>
  Cliques: {count}
</button>

<style>
  button { /* estilos - escopo automático! */ }
</style>
```

<Question question="Por que o bundle do Svelte e menor?">
Porque o Svelte <strong>compila</strong> seus componentes em JavaScript puro durante o build. React e Vue precisam enviar um <strong>runtime</strong> (o motor do framework) junto com seu codigo. O Svelte elimina essa necessidade -- o compilador gera exatamente o codigo DOM necessario, sem intermediarios. Isso resulta em bundles significativamente menores.
</Question>

### Comparação

| Aspecto | React | Vue | Svelte 5 |
|---------|-------|-----|----------|
| **Estado** | `useState` hook | `ref()` | `$state()` rune |
| **Eventos** | `onClick` | `@click` | `onclick` |
| **Interpolação** | `{valor}` | `{{ valor }}` | `{valor}` |
| **CSS** | Externo/CSS-in-JS | `<style scoped>` | `<style>` (escopo auto) |
| **Bundle** | Runtime React | Runtime Vue | Zero runtime |

---

## Pré-processadores com Svelte

### Instalação do vitePreprocess

```bash
pnpm add -D @sveltejs/vite-plugin-svelte
pnpm add -D sass  # Para SCSS
pnpm add -D typescript  # Para TS
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    svelte({
      preprocess: vitePreprocess()
    })
  ]
})
```

### Usando TypeScript

```svelte
<!-- Componente.svelte -->
<script lang="ts">
  interface User {
    name: string
    age: number
  }

  // Svelte 5: $props() em vez de export let
  let { user }: { user: User } = $props()

  let count: number = $state(0)
</script>

<p>{user.name} tem {user.age} anos</p>
```

### Usando SCSS

```svelte
<!-- Componente.svelte -->
<style lang="scss">
  $primary: #ff3e00;

  button {
    background: $primary;

    &:hover {
      background: darken($primary, 10%);
    }
  }
</style>
```

---

## svelte.config.ts

Além do `vite.config.ts`, projetos Svelte têm um arquivo de configuração específico:

```typescript
// svelte.config.ts
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Pre-processadores (TS, SCSS, etc)
  preprocess: vitePreprocess(),

  // Opcoes do compilador
  compilerOptions: {
    // Svelte 5 runes
    runes: true
  },

  // Avisos a ignorar
  onwarn: (warning, handler) => {
    // Ignora avisos de acessibilidade especificos
    if (warning.code === 'a11y-click-events-have-key-events') return
    handler(warning)
  },

  // Extensoes de arquivo
  extensions: ['.svelte']
}
```

<Tip title="Runes sao o futuro do Svelte">
No Svelte 5, as <strong>runes</strong> (`$state`, `$derived`, `$effect`) substituem o modelo de reatividade implicito do Svelte 4. Elas tornam a reatividade <strong>explicita e previsivel</strong>, facilitando o entendimento do fluxo de dados. O `svelte.config` com `runes: true` garante que todos os componentes usem esse novo modelo.
</Tip>

---

## Mini-Projeto: Migrando para Svelte

Vamos criar a versão Svelte do nosso Dashboard!

### Passo 1: Criar Projeto Svelte

```bash
# Na pasta do curso
pnpm create vite@latest dashboard-svelte -- --template svelte-ts

cd dashboard-svelte
pnpm install
```

### Passo 2: Configurar Aliases

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

export default defineConfig({
  plugins: [svelte()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(
        __dirname, './src/components'
      ),
      '@utils': path.resolve(
        __dirname, './src/utils'
      )
    }
  },

  server: {
    port: 3000,
    open: true
  }
})
```

### Passo 3: Componente PerformanceCard

```svelte
<!-- src/components/PerformanceCard.svelte -->
<script lang="ts">
  // Svelte 5: $props() com tipagem
  let {
    titulo = '',
    valor = 0,
    unidade = 'ms'
  }: {
    titulo?: string
    valor?: number | string
    unidade?: string
  } = $props()
</script>

<div class="performance-card">
  <h3 class="card-title">{titulo}</h3>
  <p class="card-value">
    {valor}<span class="card-unit">{unidade}</span>
  </p>
</div>

<style>
  .performance-card {
    background: #242424;
    border-radius: 12px;
    padding: 1.5rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .performance-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  .card-title {
    font-size: 0.875rem;
    color: #a0a0a0;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card-value {
    font-size: 2rem;
    font-weight: 700;
    color: #4ade80;
    margin: 0;
  }

  .card-unit {
    font-size: 0.875rem;
    color: #a0a0a0;
    margin-left: 0.25rem;
  }
</style>
```

### Passo 4: Componente App Principal

```svelte
<!-- src/App.svelte -->
<script lang="ts">
  import { onMount } from 'svelte'
  import PerformanceCard from
    '@components/PerformanceCard.svelte'

  // Svelte 5: $state() para reatividade
  let metricas = $state({
    domReady: 0,
    pageLoad: 0,
    fcp: 'N/A' as string | number,
    renderTime: 0
  })

  const inicioRender = performance.now()

  onMount(() => {
    // Calcula tempo de render
    metricas.renderTime = parseFloat(
      (performance.now() - inicioRender).toFixed(2)
    )

    // Espera pagina carregar para metricas completas
    window.addEventListener('load', () => {
      const timing = performance.timing
      metricas.domReady =
        timing.domContentLoadedEventEnd
        - timing.navigationStart
      metricas.pageLoad =
        timing.loadEventEnd
        - timing.navigationStart

      // FCP
      const paintEntries =
        performance.getEntriesByType('paint')
      const fcp = paintEntries.find(
        e => e.name === 'first-contentful-paint'
      )
      metricas.fcp = fcp
        ? fcp.startTime.toFixed(2)
        : 'N/A'
    })
  })
</script>

<div class="dashboard">
  <header class="header">
    <img src="/vite.svg" class="logo" alt="Vite logo" />
    <h1>Dashboard Svelte</h1>
    <p class="subtitle">
      Agora com o poder do Svelte 5!
    </p>
  </header>

  <main class="main">
    <section class="section">
      <h2>Metricas de Performance</h2>
      <div class="cards-grid">
        <PerformanceCard
          titulo="DOM Ready"
          valor={metricas.domReady}
        />
        <PerformanceCard
          titulo="Page Load"
          valor={metricas.pageLoad}
        />
        <PerformanceCard
          titulo="FCP"
          valor={metricas.fcp}
        />
        <PerformanceCard
          titulo="Render"
          valor={metricas.renderTime}
        />
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>Feito com Svelte 5 + Vite</p>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, system-ui,
      -apple-system, sans-serif;
    background-color: #0f0f0f;
    color: #ffffff;
  }

  .dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .logo {
    width: 80px;
    height: 80px;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .header h1 {
    font-size: 2.5rem;
    margin: 1rem 0 0.5rem;
    background: linear-gradient(
      135deg, #ff3e00, #ff8a00
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    color: #a0a0a0;
    margin: 0;
  }

  .section {
    margin-bottom: 2rem;
  }

  .section h2 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    color: #a0a0a0;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit, minmax(200px, 1fr)
    );
    gap: 1rem;
  }

  .footer {
    margin-top: 3rem;
    text-align: center;
    color: #666;
  }
</style>
```

### Passo 5: Testar

```bash
pnpm dev
# Acesse http://localhost:3000

pnpm build
# Observe: bundle MUITO menor que React/Vue!
```

---

## Desafio da Aula

### Objetivo
Adicionar um componente Counter interativo ao Dashboard Svelte.

### Instruções

1. Crie `src/components/Counter.svelte`
2. O contador deve ter botões de + e -
3. Adicione o componente ao App.svelte
4. **Bônus:** Adicione uma animação quando o valor muda

### Spec de Verificação

- [ ] O contador aparece no dashboard
- [ ] Clicar em + aumenta o valor
- [ ] Clicar em - diminui o valor
- [ ] **Bônus:** Há animação visual na mudança

### Solução

<details>
<summary>Clique para ver a solução</summary>

```svelte
<!-- src/components/Counter.svelte -->
<script lang="ts">
  let count: number = $state(0)

  // $derived() para verificar se houve mudanca
  let hasMoved: boolean = $derived(count !== 0)

  function increment(): void {
    count += 1
  }

  function decrement(): void {
    count -= 1
  }
</script>

<div class="counter-card">
  <h3>Contador Interativo</h3>
  <div class="counter-display">
    <button
      onclick={decrement}
      class="btn-minus"
    >
      -
    </button>
    <span
      class="count"
      class:bump={hasMoved}
    >
      {count}
    </span>
    <button
      onclick={increment}
      class="btn-plus"
    >
      +
    </button>
  </div>
</div>

<style>
  .counter-card {
    background: #242424;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
  }

  h3 {
    margin: 0 0 1rem;
    color: #a0a0a0;
    font-size: 0.875rem;
    text-transform: uppercase;
  }

  .counter-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  button {
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.1s, background 0.2s;
  }

  button:hover {
    transform: scale(1.1);
  }

  button:active {
    transform: scale(0.95);
  }

  .btn-plus {
    background: #4ade80;
    color: #000;
  }

  .btn-minus {
    background: #ef4444;
    color: #fff;
  }

  .count {
    font-size: 3rem;
    font-weight: 700;
    min-width: 80px;
    color: #fff;
    transition: transform 0.1s;
  }

  .count.bump {
    animation: bump 0.1s ease-out;
  }

  @keyframes bump {
    50% { transform: scale(1.2); }
  }
</style>
```

No App.svelte, adicione:
```svelte
<script lang="ts">
  import Counter from '@components/Counter.svelte'
</script>

<!-- Na section -->
<Counter />
```

</details>

---

## Conclusão do Módulo — Fundamentos do Vite

Parabéns! Você completou o módulo sobre **Fundamentos do Vite**.

### O que você aprendeu

- Por que o Vite é mais rápido que bundlers tradicionais
- Arquitetura de ESModules nativos e HMR
- Criação e estrutura de projetos Vite
- Configuração avançada com `vite.config.ts`
- Sistema de plugins e criação de plugins customizados
- Variáveis de ambiente e múltiplos modos
- Build de produção e otimização
- Integração com diferentes frameworks (React, Vue, Svelte)

### Próximos passos

No próximo módulo, vamos fazer uma comparação profunda entre **Svelte e React**, entendendo as diferenças filosóficas e práticas entre os dois frameworks.

---

**Próximo módulo:** [Svelte vs React: Entendendo as Diferenças](/lessons/modulo-05-svelte-vs-react/5.1-filosofia-compilador-vs-runtime)
