---
title: "Criando e Explorando um Projeto Vite"
module: 2
order: 3
---

<script>
import Tip from '$lib/components/Tip.svelte';
import Question from '$lib/components/Question.svelte';
</script>

# 2.3 — Criando e Explorando um Projeto Vite

> Crie um projeto do zero, entenda cada arquivo e o fluxo desde o index.html até o navegador.

## Objetivos da Aula

- Criar um projeto Vite usando `pnpm create vite`
- Entender a estrutura de pastas e o papel de cada arquivo
- Compreender o fluxo de execução do index.html ao navegador
- Dominar os scripts pnpm disponíveis

---

## Criando um Projeto Vite

### Método 1: Interativo

```bash
pnpm create vite@latest
```

O CLI vai perguntar:
```text
? Project name: › meu-projeto
? Select a framework: › - Use arrow-keys. Return to submit.
    Vanilla
    Vue
    React
    Preact
    Lit
❯   Svelte
    Solid
    Qwik
    Others
? Select a variant: › - Use arrow-keys. Return to submit.
❯   TypeScript
    JavaScript
    SvelteKit
```

### Método 2: Direto (recomendado para o curso)

```bash
# Projeto Svelte com TypeScript (recomendado)
pnpm create vite@latest meu-projeto -- --template svelte-ts

# Projeto Vanilla com TypeScript (para comparação)
pnpm create vite@latest meu-projeto -- --template vanilla-ts
```

### Templates Disponíveis

| Template | Descrição |
|----------|-----------|
| `svelte-ts` | **Svelte + TypeScript (recomendado)** |
| `svelte` | Svelte |
| `vanilla` | JavaScript puro |
| `vanilla-ts` | JavaScript puro + TypeScript |
| `vue` | Vue 3 |
| `vue-ts` | Vue 3 + TypeScript |
| `react` | React |
| `react-ts` | React + TypeScript |
| `react-swc` | React + SWC (mais rápido) |
| `preact` | Preact |
| `lit` | Lit (Web Components) |
| `solid` | SolidJS |
| `qwik` | Qwik |

---

## Estrutura do Projeto

Após criar um projeto com `svelte-ts`, você terá:

```text
meu-projeto/
├── index.html          # Ponto de entrada HTML
├── src/
│   ├── main.ts         # Módulo TypeScript principal
│   ├── app.css         # Estilos globais
│   ├── App.svelte      # Componente raiz
│   ├── lib/
│   │   └── Counter.svelte  # Componente de exemplo (contador)
│   └── vite-env.d.ts   # Tipos do Vite
├── public/             # Arquivos estáticos (copiados sem processamento)
│   └── vite.svg        # Ícone do Vite
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração do TypeScript
├── svelte.config.js    # Configuração do Svelte
├── vite.config.ts      # Configuração do Vite
└── node_modules/       # Dependências instaladas
```

### Entendendo Cada Arquivo

#### `index.html` — O Ponto de Entrada

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- Favicon vindo da pasta public/ -->
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Vite + Svelte + TS</title>
  </head>
  <body>
    <!-- Container onde sua app será montada -->
    <div id="app"></div>

    <!-- O SEGREDO: type="module" ativa ESModules nativos -->
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

**Diferenças do Webpack:**
- O `index.html` fica na **raiz**, não em `public/`
- O `index.html` é o **verdadeiro ponto de entrada** (não o JavaScript)
- Você pode ter múltiplos pontos de entrada (multi-page apps)

<Tip title="Importância do type='module'">
O atributo <code>type="module"</code> no script tag é essencial. Sem ele, o navegador trata o arquivo como um script clássico e os <code>import</code>/<code>export</code> não funcionam. Com <code>type="module"</code>, o navegador ativa o suporte nativo a ESModules, permitindo que o Vite sirva cada módulo individualmente durante o desenvolvimento.
</Tip>

#### `main.ts` — O Módulo Principal

```typescript
import './app.css'
import App from './App.svelte'

// Monta o componente raiz no DOM
const app = new App({
  target: document.getElementById('app')!,
})

export default app
```

#### `App.svelte` — Componente Raiz

```svelte
<script lang="ts">
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src="/vite.svg" class="logo" alt="Vite Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>
</main>
```

#### `Counter.svelte` — Componente de Exemplo

```svelte
<script lang="ts">
  // Estado reativo com rune $state
  let count: number = $state(0)

  // Função tipada para incrementar
  const increment = (): void => {
    count += 1
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
```

#### `style.css` — Estilos

```css
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
}

/* ... mais estilos ... */
```

#### `package.json` — Configuração do Projeto

```json
{
  "name": "meu-projeto",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^3.0.0",
    "@tsconfig/svelte": "^5.0.0",
    "svelte": "^4.0.0",
    "svelte-check": "^3.0.0",
    "tslib": "^2.6.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

**Importante:** `"type": "module"` habilita ESModules no Node.js.

---

## Fluxo de Execução

### Do `pnpm dev` ao Navegador

<div class="not-prose my-6">
  <div class="text-center font-bold text-lg text-base-content mb-4 bg-base-200 rounded-t-xl py-3 border border-base-content/10">FLUXO DE EXECUCAO</div>
  <div class="flex flex-col items-center gap-0">
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">1</div>
      <div>
        <p class="font-semibold text-base-content">pnpm dev</p>
        <p class="text-sm text-base-content/70">Executa: vite</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">2</div>
      <div>
        <p class="font-semibold text-base-content">Vite inicia servidor em localhost:5173</p>
        <p class="text-sm text-base-content/70">Pre-compila dependencias (node_modules/.vite/)</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">3</div>
      <div>
        <p class="font-semibold text-base-content">Navegador acessa localhost:5173</p>
        <p class="text-sm text-base-content/70">Vite serve index.html</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">4</div>
      <div>
        <p class="font-semibold text-base-content">Navegador parseia index.html</p>
        <p class="text-sm text-base-content/70">Encontra: &lt;script type="module" src="/src/main.ts"&gt;</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">5</div>
      <div>
        <p class="font-semibold text-base-content">Navegador requisita /src/main.ts</p>
        <p class="text-sm text-base-content/70">Vite transpila TS e serve como JS</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">6</div>
      <div>
        <p class="font-semibold text-base-content">Navegador parseia main.ts</p>
        <p class="text-sm text-base-content/70">Encontra: import './app.css'</p>
        <p class="text-sm text-base-content/70">Encontra: import App from './App.svelte'</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">7</div>
      <div>
        <p class="font-semibold text-base-content">Navegador requisita app.css e App.svelte</p>
        <p class="text-sm text-base-content/70">Vite transforma CSS (injeta via JS)</p>
        <p class="text-sm text-base-content/70">Vite compila .svelte para JS</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-success/10 border border-success/30 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-success badge-lg font-bold shrink-0">8</div>
      <div>
        <p class="font-semibold text-success">Aplicacao renderiza!</p>
      </div>
    </div>
  </div>
</div>

### Visualizando no DevTools

Abra o DevTools → Network e observe:

```text
Name                    Status    Type      Size     Time
────────────────────────────────────────────────────────────
localhost               200       document  1.2 KB   5ms
main.ts                 200       script    0.4 KB   3ms
App.svelte              200       script    1.5 KB   3ms
app.css                 200       script    1.1 KB   2ms
Counter.svelte          200       script    0.6 KB   2ms
vite.svg               200       svg       1.5 KB   1ms
```

Note: `app.css` aparece como `script` porque o Vite injeta CSS via JavaScript para HMR!

---

## Scripts pnpm

### `pnpm dev`

Inicia o servidor de desenvolvimento:

```bash
pnpm dev

# Output:
  VITE v5.0.0  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Opções úteis:**

```bash
# Expor na rede local (para testar em celular)
pnpm dev --host

# Usar porta específica
pnpm dev --port 3000

# Abrir navegador automaticamente
pnpm dev --open
```

### `pnpm build`

Gera build de produção:

```bash
pnpm build

# Output:
vite v5.0.0 building for production...
✓ 4 modules transformed.
dist/index.html                  0.46 kB │ gzip:  0.30 kB
dist/assets/index-DiwrgTda.css   1.24 kB │ gzip:  0.65 kB
dist/assets/index-D8mTLhPd.js    1.45 kB │ gzip:  0.75 kB
✓ built in 234ms
```

### `pnpm preview`

Serve o build de produção localmente:

```bash
pnpm build   # Primeiro, gere o build
pnpm preview # Depois, sirva localmente

# Output:
  ➜  Local:   http://localhost:4173/
```

---

## Pasta `public/`

Arquivos em `public/` são **copiados** para a raiz do build sem processamento:

```text
public/
├── vite.svg        → dist/vite.svg
├── robots.txt      → dist/robots.txt
└── images/
    └── logo.png    → dist/images/logo.png
```

### Como referenciar

```html
<!-- Em HTML: caminho absoluto -->
<img src="/vite.svg" />
```

```typescript
// Em TypeScript: string direta
const img: HTMLImageElement = document.createElement('img')
img.src = '/vite.svg'
```

### Quando usar `public/`

| Use `public/` quando... | Use imports quando... |
|-------------------------|----------------------|
| Precisa de URL fixa | Quer hash para cache |
| robots.txt, favicon | Imagens em componentes |
| Arquivos muito grandes | Bundling e otimização |
| Arquivos referenciados externamente | Tree-shaking necessário |

<Question question="Quando usar public/ vs imports?">
Use <code>public/</code> para arquivos que precisam de URL fixa e previsível (como <code>robots.txt</code>, <code>favicon.ico</code>, ou assets referenciados por serviços externos). Use <strong>imports</strong> para tudo que faz parte do código da aplicação: o Vite adiciona um hash ao nome do arquivo (ex: <code>foto-abc123.png</code>), o que garante cache-busting automático quando o arquivo muda. Imports também permitem tree-shaking e otimização de tamanho.
</Question>

---

## Importando Assets

### Imagens

```typescript
// Import como URL (Vite resolve o caminho)
import imgUrl from './img/foto.png'

const img: HTMLImageElement = document.querySelector('img')!
img.src = imgUrl
// Em produção: /assets/foto-abc123.png (com hash)
```

### JSON

```typescript
// Import direto como objeto tipado
import dados from './dados.json'

// TypeScript infere o tipo automaticamente
console.log(dados.nome)
```

### CSS

```typescript
// CSS global (injetado no <head>)
import './styles/global.css'

// CSS Modules (retorna objeto com classes)
import styles from './Button.module.css'
element.className = styles.button
```

### Texto/Raw

```typescript
// Importar como string bruta
import texto from './arquivo.txt?raw'
console.log(texto)

// Importar como URL (sem processar conteúdo)
import url from './arquivo.txt?url'
console.log(url)
// /assets/arquivo-abc123.txt
```

<Tip title="Sufixos especiais de import do Vite">
O Vite suporta sufixos especiais nas importações: <code>?raw</code> importa o conteúdo como string bruta (útil para shaders, templates, etc.), <code>?url</code> retorna apenas a URL resolvida do asset, e <code>?worker</code> importa o arquivo como Web Worker. Esses sufixos são processados pelo Vite em tempo de build e não existem no JavaScript padrão.
</Tip>

---

## 🎯 Mini-Projeto: Estrutura do Dashboard

Vamos organizar melhor nosso dashboard criando uma estrutura profissional:

### Nova Estrutura

```text
dashboard-vite/
├── index.html
├── src/
│   ├── main.ts              # Ponto de entrada
│   ├── App.svelte           # Componente raiz
│   ├── app.css              # Estilos globais
│   ├── lib/
│   │   ├── Counter.svelte       # Componente contador
│   │   ├── HmrMonitor.svelte    # Monitor de HMR
│   │   └── PerformanceCard.svelte # Card de métricas
│   └── utils/
│       └── performance.ts    # Utilitários de performance
├── public/
│   └── vite.svg
├── tsconfig.json
├── svelte.config.js
├── vite.config.ts
└── package.json
```

### Passo 1: Criar as pastas

```bash
cd dashboard-vite
mkdir -p src/lib src/utils
```

### Passo 2: Atualizar index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Dashboard Vite - Performance Monitor</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- Note: caminho atualizado para TypeScript! -->
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### Passo 3: Criar utils/performance.ts

```typescript
// src/utils/performance.ts

interface MetricasPagina {
  domReady: number | string
  pageLoad: number | string
  dnsLookup: number | string
  tcpConnect: number | string
  serverResponse: number | string
  download: number | string
  ttfb: number
  fcp: string
}

/**
 * Mede o tempo de execução de uma função
 */
export function medirTempo(
  fn: () => void,
  label: string = 'Execução'
): void {
  const inicio: number = performance.now()
  fn()
  const fim: number = performance.now()

  console.log(
    `⏱️ ${label}: ${(fim - inicio).toFixed(2)}ms`
  )
}

/**
 * Retorna métricas de performance da página
 */
export function getMetricasPagina(): MetricasPagina {
  const navigation = performance
    .getEntriesByType('navigation')[0] as
    PerformanceNavigationTiming | undefined

  return {
    domReady: navigation
      ? navigation.domContentLoadedEventEnd
      : 'N/A',
    pageLoad: navigation
      ? navigation.loadEventEnd
      : 'N/A',
    dnsLookup: navigation
      ? navigation.domainLookupEnd -
        navigation.domainLookupStart
      : 'N/A',
    tcpConnect: navigation
      ? navigation.connectEnd -
        navigation.connectStart
      : 'N/A',
    serverResponse: navigation
      ? navigation.responseEnd -
        navigation.requestStart
      : 'N/A',
    download: navigation
      ? navigation.responseEnd -
        navigation.responseStart
      : 'N/A',
    ttfb: navigation
      ? navigation.responseStart
      : 0,
    fcp: getFirstContentfulPaint()
  }
}

/**
 * Obtém o First Contentful Paint
 */
function getFirstContentfulPaint(): string {
  const paintEntries = performance
    .getEntriesByType('paint')
  const fcp = paintEntries.find(
    (entry) => entry.name === 'first-contentful-paint'
  )
  return fcp
    ? fcp.startTime.toFixed(2)
    : 'N/A'
}

/**
 * Formata bytes para leitura humana
 */
export function formatarBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k: number = 1024
  const sizes: string[] = [
    'Bytes', 'KB', 'MB', 'GB'
  ]
  const i: number = Math.floor(
    Math.log(bytes) / Math.log(k)
  )
  return (
    parseFloat(
      (bytes / Math.pow(k, i)).toFixed(2)
    ) + ' ' + sizes[i]
  )
}
```

### Passo 4: Criar lib/PerformanceCard.svelte

```svelte
<!-- src/lib/PerformanceCard.svelte -->
<script lang="ts">
  let {
    titulo,
    valor,
    unidade = 'ms'
  }: {
    titulo: string
    valor: string | number
    unidade?: string
  } = $props()
</script>

<div class="performance-card">
  <h3 class="card-title">{titulo}</h3>
  <p class="card-value">
    {valor}<span class="card-unit">{unidade}</span>
  </p>
</div>
```

### Passo 5: Atualizar main.ts

```typescript
// src/main.ts
import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')!,
})

export default app
```

### Passo 6: Criar App.svelte

```svelte
<!-- src/App.svelte -->
<script lang="ts">
  import Counter from './lib/Counter.svelte'
  import PerformanceCard from './lib/PerformanceCard.svelte'
  import {
    getMetricasPagina,
    medirTempo,
    type MetricasPagina
  } from './utils/performance'

  let metricas: MetricasPagina | null = $state(null)
  let tempoRender: string = $state('calculando...')

  const inicioRender: number = performance.now()

  $effect(() => {
    // Calcula tempo de render
    requestAnimationFrame(() => {
      tempoRender =
        (performance.now() - inicioRender).toFixed(2)
    })

    // Carrega métricas após a página carregar
    window.addEventListener('load', () => {
      metricas = getMetricasPagina()
    })
  })
</script>

<div class="dashboard">
  <header class="header">
    <img src="/vite.svg" class="logo" alt="Vite logo" />
    <h1>Dashboard de Performance</h1>
    <p class="subtitle">
      Monitorando seu ambiente Vite
    </p>
  </header>

  <main class="main">
    <section class="section">
      <h2>Métricas de Carregamento</h2>
      <div class="cards-grid">
        {#if metricas}
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
            titulo="TTFB"
            valor={metricas.ttfb.toFixed(2)}
          />
        {/if}
      </div>
    </section>

    <section class="section">
      <h2>Interatividade</h2>
      <div class="cards-grid">
        <div class="card">
          <h3>Contador de Teste</h3>
          <Counter />
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>
      Tempo de renderização:
      <span id="tempo-render">{tempoRender}ms</span>
    </p>
  </footer>
</div>
```

### Passo 7: Atualizar style.css

```css
/* src/app.css */
:root {
  --bg-primary: #0f0f0f;
  --bg-secondary: #1a1a1a;
  --bg-card: #242424;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --accent: #646cff;
  --accent-hover: #535bf2;
  --success: #4ade80;
  --warning: #fbbf24;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Inter, system-ui, -apple-system, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
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
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--accent), #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: var(--text-secondary);
}

.section {
  margin-bottom: 2rem;
}

.section h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: var(--text-secondary);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.card,
.performance-card {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover,
.performance-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.card-title {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--success);
}

.card-unit {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-left: 0.25rem;
}

button {
  background: var(--accent);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: var(--accent-hover);
}

.footer {
  margin-top: 3rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

#tempo-render {
  color: var(--success);
  font-weight: 600;
}
```

---

## ✅ Desafio da Aula

### Objetivo
Adicionar um card que mostra quantos módulos JavaScript foram carregados.

### Instruções

1. Use `performance.getEntriesByType('resource')` para listar recursos
2. Filtre apenas arquivos `.js`
3. Crie um card mostrando a quantidade
4. **Bônus:** mostre o tamanho total em KB

### Dica

```typescript
const recursos: PerformanceResourceTiming[] =
  performance.getEntriesByType(
    'resource'
  ) as PerformanceResourceTiming[]

const scripts = recursos.filter(
  (r) => r.initiatorType === 'script'
)

console.log('Scripts carregados:', scripts.length)
```

### Spec de Verificação

- [ ] O dashboard mostra quantos módulos JS foram carregados
- [ ] O número atualiza após HMR (se novos módulos forem adicionados)
- [ ] **Bônus:** mostra o tamanho total dos scripts

### Solução

<details>
<summary>🔍 Clique para ver a solução</summary>

Adicione em `utils/performance.ts`:

```typescript
interface ModulosInfo {
  quantidade: number
  tamanhoTotal: number
  lista: Array<{
    nome: string
    tamanho: number
  }>
}

export function getModulosCarregados(): ModulosInfo {
  const recursos = performance
    .getEntriesByType(
      'resource'
    ) as PerformanceResourceTiming[]

  const scripts = recursos.filter(
    (r) =>
      r.initiatorType === 'script' ||
      r.name.endsWith('.js')
  )

  const tamanhoTotal: number = scripts.reduce(
    (acc, s) => acc + (s.transferSize || 0),
    0
  )

  return {
    quantidade: scripts.length,
    tamanhoTotal,
    lista: scripts.map((s) => ({
      nome: s.name.split('/').pop() || '',
      tamanho: s.transferSize
    }))
  }
}
```

E no `App.svelte`, adicione o card:

```svelte
<PerformanceCard
  titulo="Módulos JS"
  valor={modulosInfo.quantidade}
  unidade="arquivos"
/>
```

</details>

---

**Próxima aula:** [2.4 — Configuração do vite.config.js](../2.4-configuracao-vite)