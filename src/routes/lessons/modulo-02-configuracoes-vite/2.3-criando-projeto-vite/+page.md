---
title: "Criando e Explorando um Projeto Vite"
module: 2
order: 3
---

# 2.3 — Criando e Explorando um Projeto Vite

> Crie um projeto do zero, entenda cada arquivo e o fluxo desde o index.html até o navegador.

## Objetivos da Aula

- Criar um projeto Vite usando `npm create vite`
- Entender a estrutura de pastas e o papel de cada arquivo
- Compreender o fluxo de execução do index.html ao navegador
- Dominar os scripts npm disponíveis

---

## Criando um Projeto Vite

### Método 1: Interativo

```bash
npm create vite@latest
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
```

### Método 2: Direto (recomendado para o curso)

```bash
# Projeto Vanilla (JavaScript puro)
npm create vite@latest meu-projeto -- --template vanilla

# Projeto Vanilla com TypeScript
npm create vite@latest meu-projeto -- --template vanilla-ts

# Projeto Svelte (usaremos mais tarde)
npm create vite@latest meu-projeto -- --template svelte

# Projeto Svelte com TypeScript
npm create vite@latest meu-projeto -- --template svelte-ts
```

### Templates Disponíveis

| Template | Descrição |
|----------|-----------|
| `vanilla` | JavaScript puro |
| `vanilla-ts` | JavaScript puro + TypeScript |
| `vue` | Vue 3 |
| `vue-ts` | Vue 3 + TypeScript |
| `react` | React |
| `react-ts` | React + TypeScript |
| `react-swc` | React + SWC (mais rápido) |
| `preact` | Preact |
| `lit` | Lit (Web Components) |
| `svelte` | Svelte |
| `svelte-ts` | Svelte + TypeScript |
| `solid` | SolidJS |
| `qwik` | Qwik |

---

## Estrutura do Projeto

Após criar um projeto vanilla, você terá:

```text
meu-projeto/
├── index.html          # Ponto de entrada HTML
├── main.js             # Módulo JavaScript principal
├── counter.js          # Módulo de exemplo (contador)
├── style.css           # Estilos CSS
├── public/             # Arquivos estáticos (copiados sem processamento)
│   └── vite.svg        # Ícone do Vite
├── package.json        # Dependências e scripts
├── package-lock.json   # Lock de versões
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <!-- Container onde sua app será montada -->
    <div id="app"></div>

    <!-- O SEGREDO: type="module" ativa ESModules nativos -->
    <script type="module" src="/main.js"></script>
  </body>
</html>
```

**Diferenças do Webpack/CRA:**
- O `index.html` fica na **raiz**, não em `public/`
- O `index.html` é o **verdadeiro ponto de entrada** (não o JavaScript)
- Você pode ter múltiplos pontos de entrada (multi-page apps)

#### `main.js` — O Módulo Principal

```javascript
// Importa CSS como módulo (Vite processa automaticamente)
import './style.css'

// Importa função de outro módulo
import { setupCounter } from './counter.js'

// Importa asset da pasta public
import viteLogo from '/vite.svg'

// Monta a interface
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`

// Configura interatividade
setupCounter(document.querySelector('#counter'))
```

#### `counter.js` — Módulo de Exemplo

```javascript
// Função que configura um contador
export function setupCounter(element) {
  let counter = 0

  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }

  element.addEventListener('click', () => setCounter(counter + 1))

  // Inicializa
  setCounter(0)
}
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
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

**Importante:** `"type": "module"` habilita ESModules no Node.js.

---

## Fluxo de Execução

### Do `npm run dev` ao Navegador

<div class="not-prose my-6">
  <div class="text-center font-bold text-lg text-base-content mb-4 bg-base-200 rounded-t-xl py-3 border border-base-content/10">FLUXO DE EXECUCAO</div>
  <div class="flex flex-col items-center gap-0">
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">1</div>
      <div>
        <p class="font-semibold text-base-content">npm run dev</p>
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
        <p class="text-sm text-base-content/70">Encontra: &lt;script type="module" src="/main.js"&gt;</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">5</div>
      <div>
        <p class="font-semibold text-base-content">Navegador requisita /main.js</p>
        <p class="text-sm text-base-content/70">Vite transforma e serve main.js</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">6</div>
      <div>
        <p class="font-semibold text-base-content">Navegador parseia main.js</p>
        <p class="text-sm text-base-content/70">Encontra: import './style.css'</p>
        <p class="text-sm text-base-content/70">Encontra: import {'{'} setupCounter {'}'} from './counter.js'</p>
      </div>
    </div>
    <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
    <div class="w-full max-w-xl bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
      <div class="badge badge-primary badge-lg font-bold shrink-0">7</div>
      <div>
        <p class="font-semibold text-base-content">Navegador requisita style.css e counter.js</p>
        <p class="text-sm text-base-content/70">Vite transforma CSS (injeta via JS)</p>
        <p class="text-sm text-base-content/70">Vite serve counter.js</p>
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
main.js                 200       script    0.8 KB   3ms
style.css               200       script    1.1 KB   2ms
counter.js              200       script    0.3 KB   2ms
vite.svg               200       svg       1.5 KB   1ms
```

Note: `style.css` aparece como `script` porque o Vite injeta CSS via JavaScript para HMR!

---

## Scripts NPM

### `npm run dev`

Inicia o servidor de desenvolvimento:

```bash
npm run dev

# Output:
  VITE v5.0.0  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Opções úteis:**

```bash
# Expor na rede local (para testar em celular)
npm run dev -- --host

# Usar porta específica
npm run dev -- --port 3000

# Abrir navegador automaticamente
npm run dev -- --open
```

### `npm run build`

Gera build de produção:

```bash
npm run build

# Output:
vite v5.0.0 building for production...
✓ 4 modules transformed.
dist/index.html                  0.46 kB │ gzip:  0.30 kB
dist/assets/index-DiwrgTda.css   1.24 kB │ gzip:  0.65 kB
dist/assets/index-D8mTLhPd.js    1.45 kB │ gzip:  0.75 kB
✓ built in 234ms
```

### `npm run preview`

Serve o build de produção localmente:

```bash
npm run build   # Primeiro, gere o build
npm run preview # Depois, sirva localmente

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

<!-- Em JavaScript: string direta -->
const img = document.createElement('img')
img.src = '/vite.svg'
```

### Quando usar `public/`

| Use `public/` quando... | Use imports quando... |
|-------------------------|----------------------|
| Precisa de URL fixa | Quer hash para cache |
| robots.txt, favicon | Imagens em componentes |
| Arquivos muito grandes | Bundling e otimização |
| Arquivos referenciados externamente | Tree-shaking necessário |

---

## Importando Assets

### Imagens

```javascript
// Import como URL
import imgUrl from './img/foto.png'
document.querySelector('img').src = imgUrl

// Em produção: /assets/foto-abc123.png (com hash)
```

### JSON

```javascript
// Import direto como objeto
import dados from './dados.json'
console.log(dados.nome) // Acesso direto
```

### CSS

```javascript
// CSS global (injetado no <head>)
import './styles/global.css'

// CSS Modules
import styles from './Button.module.css'
element.className = styles.button
```

### Texto/Raw

```javascript
// Importar como string
import texto from './arquivo.txt?raw'
console.log(texto) // Conteúdo do arquivo

// Importar como URL
import url from './arquivo.txt?url'
console.log(url) // /assets/arquivo-abc123.txt
```

---

## 🎯 Mini-Projeto: Estrutura do Dashboard

Vamos organizar melhor nosso dashboard criando uma estrutura profissional:

### Nova Estrutura

```text
dashboard-vite/
├── index.html
├── src/
│   ├── main.js              # Ponto de entrada
│   ├── style.css            # Estilos globais
│   ├── components/
│   │   ├── Counter.js       # Componente contador
│   │   ├── HmrMonitor.js    # Monitor de HMR
│   │   └── PerformanceCard.js # Card de métricas
│   └── utils/
│       └── performance.js    # Utilitários de performance
├── public/
│   └── vite.svg
└── package.json
```

### Passo 1: Criar as pastas

```bash
cd dashboard-vite
mkdir -p src/components src/utils
mv main.js src/
mv counter.js src/components/Counter.js
mv style.css src/
```

### Passo 2: Atualizar index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard Vite - Performance Monitor</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- Note: caminho atualizado! -->
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### Passo 3: Criar utils/performance.js

```javascript
// src/utils/performance.js

/**
 * Mede o tempo de execução de uma função
 */
export function medirTempo(fn, label = 'Execução') {
  const inicio = performance.now()
  const resultado = fn()
  const fim = performance.now()

  console.log(`⏱️ ${label}: ${(fim - inicio).toFixed(2)}ms`)

  return resultado
}

/**
 * Retorna métricas de performance da página
 */
export function getMetricasPagina() {
  const timing = performance.timing || {}
  const navigation = performance.getEntriesByType('navigation')[0] || {}

  return {
    // Tempo até o DOM estar pronto
    domReady: timing.domContentLoadedEventEnd - timing.navigationStart,

    // Tempo até a página carregar completamente
    pageLoad: timing.loadEventEnd - timing.navigationStart,

    // Tempo de DNS
    dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,

    // Tempo de conexão
    tcpConnect: timing.connectEnd - timing.connectStart,

    // Tempo de resposta do servidor
    serverResponse: timing.responseEnd - timing.requestStart,

    // Tempo de download
    download: timing.responseEnd - timing.responseStart,

    // Métricas modernas (se disponíveis)
    ttfb: navigation.responseStart || 0,
    fcp: getFirstContentfulPaint()
  }
}

/**
 * Obtém o First Contentful Paint
 */
function getFirstContentfulPaint() {
  const paintEntries = performance.getEntriesByType('paint')
  const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')
  return fcp ? fcp.startTime.toFixed(2) : 'N/A'
}

/**
 * Formata bytes para leitura humana
 */
export function formatarBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
```

### Passo 4: Criar components/PerformanceCard.js

```javascript
// src/components/PerformanceCard.js

/**
 * Cria um card de métrica de performance
 */
export function createPerformanceCard(titulo, valor, unidade = 'ms') {
  const card = document.createElement('div')
  card.className = 'performance-card'
  card.innerHTML = `
    <h3 class="card-title">${titulo}</h3>
    <p class="card-value">${valor}<span class="card-unit">${unidade}</span></p>
  `
  return card
}

/**
 * Atualiza o valor de um card existente
 */
export function updatePerformanceCard(card, valor) {
  const valueEl = card.querySelector('.card-value')
  const unit = card.querySelector('.card-unit')?.textContent || ''
  valueEl.innerHTML = `${valor}<span class="card-unit">${unit}</span>`
}
```

### Passo 5: Atualizar main.js

```javascript
// src/main.js
import './style.css'
import { setupCounter } from './components/Counter.js'
import { createPerformanceCard } from './components/PerformanceCard.js'
import { getMetricasPagina, medirTempo } from './utils/performance.js'

// Mede o tempo de renderização
const inicioRender = performance.now()

function renderApp() {
  const app = document.querySelector('#app')

  app.innerHTML = `
    <div class="dashboard">
      <header class="header">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
        <h1>Dashboard de Performance</h1>
        <p class="subtitle">Monitorando seu ambiente Vite</p>
      </header>

      <main class="main">
        <section class="section">
          <h2>⚡ Métricas de Carregamento</h2>
          <div id="metricas-container" class="cards-grid">
            <!-- Cards serão inseridos aqui -->
          </div>
        </section>

        <section class="section">
          <h2>🔧 Interatividade</h2>
          <div class="cards-grid">
            <div class="card">
              <h3>Contador de Teste</h3>
              <button id="counter" type="button">Clique!</button>
            </div>
          </div>
        </section>
      </main>

      <footer class="footer">
        <p>Tempo de renderização: <span id="tempo-render">calculando...</span></p>
      </footer>
    </div>
  `

  // Setup do contador
  setupCounter(document.querySelector('#counter'))

  // Exibe métricas após a página carregar
  window.addEventListener('load', exibirMetricas)

  // Exibe tempo de render
  requestAnimationFrame(() => {
    const tempoRender = (performance.now() - inicioRender).toFixed(2)
    document.querySelector('#tempo-render').textContent = `${tempoRender}ms`
  })
}

function exibirMetricas() {
  const container = document.querySelector('#metricas-container')
  const metricas = getMetricasPagina()

  const cards = [
    createPerformanceCard('DOM Ready', metricas.domReady || 'N/A'),
    createPerformanceCard('Page Load', metricas.pageLoad || 'N/A'),
    createPerformanceCard('FCP', metricas.fcp),
    createPerformanceCard('TTFB', metricas.ttfb?.toFixed(2) || 'N/A')
  ]

  cards.forEach(card => container.appendChild(card))
}

// Renderiza a aplicação
medirTempo(renderApp, 'Render inicial')

// HMR
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    medirTempo(renderApp, 'HMR Re-render')
  })
}
```

### Passo 6: Atualizar style.css

```css
/* src/style.css */
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

```javascript
const recursos = performance.getEntriesByType('resource')
const scripts = recursos.filter(r => r.initiatorType === 'script')
console.log('Scripts carregados:', scripts.length)
```

### Spec de Verificação

- [ ] O dashboard mostra quantos módulos JS foram carregados
- [ ] O número atualiza após HMR (se novos módulos forem adicionados)
- [ ] **Bônus:** mostra o tamanho total dos scripts

### Solução

<details>
<summary>🔍 Clique para ver a solução</summary>

Adicione em `utils/performance.js`:

```javascript
export function getModulosCarregados() {
  const recursos = performance.getEntriesByType('resource')
  const scripts = recursos.filter(r =>
    r.initiatorType === 'script' ||
    r.name.endsWith('.js')
  )

  const tamanhoTotal = scripts.reduce((acc, s) => acc + (s.transferSize || 0), 0)

  return {
    quantidade: scripts.length,
    tamanhoTotal: tamanhoTotal,
    lista: scripts.map(s => ({
      nome: s.name.split('/').pop(),
      tamanho: s.transferSize
    }))
  }
}
```

E em `main.js`, na função `exibirMetricas()`:

```javascript
const modulos = getModulosCarregados()
cards.push(
  createPerformanceCard('Módulos JS', modulos.quantidade, 'arquivos')
)
```

</details>

---

**Próxima aula:** [2.4 — Configuração do vite.config.js](../2.4-configuracao-vite)
