---
title: "Arquitetura do Vite"
module: 77
order: 2
---

# 77.2 — Arquitetura do Vite

> Entenda como o Vite funciona internamente: servidor de desenvolvimento, pré-bundling e o papel do esbuild e Rollup.

## Objetivos da Aula

- Compreender a arquitetura interna do servidor de desenvolvimento
- Entender o processo de pré-bundling de dependências com esbuild
- Conhecer o fluxo de transformação de arquivos
- Diferenciar o funcionamento em desenvolvimento vs produção

---

## Visão Geral da Arquitetura

O Vite possui duas arquiteturas distintas que trabalham em conjunto:

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 p-4 sm:p-6">
  <h3 class="mb-4 text-center text-lg font-bold text-base-content">ARQUITETURA DO VITE</h3>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div class="rounded-lg border border-primary/30 bg-base-100 p-4">
      <div class="mb-3 rounded-md bg-primary px-3 py-1.5 text-center font-semibold text-primary-content">DESENVOLVIMENTO</div>
      <ul class="space-y-1 text-sm text-base-content">
        <li>Servidor ESM</li>
        <li>+ esbuild</li>
        <li>+ HMR nativo</li>
      </ul>
      <div class="mt-3 rounded bg-base-200 px-2 py-1 text-center font-mono text-sm text-base-content/70">npm run dev</div>
    </div>
    <div class="rounded-lg border border-secondary/30 bg-base-100 p-4">
      <div class="mb-3 rounded-md bg-secondary px-3 py-1.5 text-center font-semibold text-secondary-content">PRODUÇÃO</div>
      <ul class="space-y-1 text-sm text-base-content">
        <li>Rollup Bundler</li>
        <li>+ Plugins</li>
        <li>+ Otimizações</li>
      </ul>
      <div class="mt-3 rounded bg-base-200 px-2 py-1 text-center font-mono text-sm text-base-content/70">npm run build</div>
    </div>
  </div>
</div>

---

## O Servidor de Desenvolvimento

### Fluxo de uma Requisição

Quando você acessa `http://localhost:5173`, acontece o seguinte:

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 p-4 sm:p-6">
  <h3 class="mb-4 text-center text-lg font-bold text-base-content">FLUXO DE REQUISIÇÃO</h3>
  <div class="space-y-3">
    <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
      <div class="badge badge-primary badge-lg font-bold">1</div>
      <div class="flex flex-1 flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <div class="w-full rounded-lg border border-base-content/10 bg-base-100 px-4 py-2 text-center text-sm font-mono sm:w-auto">GET /</div>
        <span class="text-xl text-base-content/50 rotate-90 sm:rotate-0">&#9654;</span>
        <div class="w-full rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-center text-sm sm:w-auto">Serve index.html</div>
      </div>
    </div>
    <div class="text-2xl text-center text-base-content/30">&#9660;</div>
    <div class="rounded-lg border border-base-content/10 bg-base-100 px-4 py-2 text-center text-sm text-base-content/70">
      Navegador encontra <code class="text-xs bg-base-200 px-1 py-0.5 rounded">&lt;script type="module" src="/src/main.js"&gt;</code>
    </div>
    <div class="text-2xl text-center text-base-content/30">&#9660;</div>
    <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
      <div class="badge badge-secondary badge-lg font-bold">2</div>
      <div class="flex flex-1 flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <div class="w-full rounded-lg border border-base-content/10 bg-base-100 px-4 py-2 text-center text-sm font-mono sm:w-auto">GET /src/main.js</div>
        <span class="text-xl text-base-content/50 rotate-90 sm:rotate-0">&#9654;</span>
        <div class="w-full rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-2 text-center text-sm sm:w-auto">Transforma main.js sob demanda</div>
      </div>
    </div>
    <div class="text-2xl text-center text-base-content/30">&#9660;</div>
    <div class="rounded-lg border border-base-content/10 bg-base-100 px-4 py-2 text-center text-sm text-base-content/70">
      Navegador recebe main.js, encontra: <code class="text-xs bg-base-200 px-1 py-0.5 rounded">import './app.js'</code>
    </div>
    <div class="text-2xl text-center text-base-content/30">&#9660;</div>
    <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
      <div class="badge badge-accent badge-lg font-bold">3</div>
      <div class="flex flex-1 flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <div class="w-full rounded-lg border border-base-content/10 bg-base-100 px-4 py-2 text-center text-sm font-mono sm:w-auto">GET /src/app.js</div>
        <span class="text-xl text-base-content/50 rotate-90 sm:rotate-0">&#9654;</span>
        <div class="w-full rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-center text-sm sm:w-auto">Transforma app.js sob demanda</div>
      </div>
    </div>
    <div class="text-2xl text-center text-base-content/30">&#9660;</div>
    <div class="rounded-lg border border-info/30 bg-info/10 px-4 py-3 text-center text-sm font-medium text-base-content/70 italic">
      E assim por diante para cada import...
    </div>
  </div>
</div>

### Código Exemplo: Vendo na Prática

Crie estes arquivos no seu projeto:

```javascript
// src/main.js
import { saudacao } from './utils/saudacao.js'
import { formataData } from './utils/data.js'

console.log(saudacao('Mundo'))
console.log(formataData(new Date()))
```

```javascript
// src/utils/saudacao.js
export function saudacao(nome) {
  return `Olá, ${nome}!`
}
```

```javascript
// src/utils/data.js
export function formataData(data) {
  return data.toLocaleDateString('pt-BR')
}
```

Abra o **DevTools do navegador** → **Network** e observe:

```text
Request 1: /src/main.js         (200 OK)
Request 2: /src/utils/saudacao.js (200 OK)
Request 3: /src/utils/data.js     (200 OK)
```

Cada arquivo é uma requisição separada! O navegador resolve os imports.

---

## Pré-bundling de Dependências

### O Problema com node_modules

Nem todas as dependências funcionam bem com ESModules nativos:

```javascript
// lodash tem centenas de módulos internos
import { debounce } from 'lodash-es'
// Isso causaria CENTENAS de requisições HTTP!

// react usa CommonJS internamente
import React from 'react'
// CommonJS não funciona direto no navegador!
```

### A Solução: esbuild

O Vite usa o **esbuild** para pré-compilar dependências no primeiro start:

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 p-4 sm:p-6">
  <h3 class="mb-2 text-center text-lg font-bold text-base-content">PRÉ-BUNDLING</h3>
  <p class="mb-4 text-center text-sm text-base-content/60">Primeiro <code class="bg-base-300 px-1 py-0.5 rounded text-xs">npm run dev</code>:</p>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr]">
    <div class="rounded-lg border border-error/30 bg-base-100 p-4">
      <div class="mb-3 font-mono text-sm font-bold text-base-content">node_modules/</div>
      <div class="space-y-1 text-sm text-base-content/80 font-mono">
        <div class="ml-2">lodash-es/</div>
        <div class="ml-6 text-base-content/50">debounce.js</div>
        <div class="ml-6 text-base-content/50">throttle.js</div>
        <div class="ml-6 text-base-content/50">...300+ files</div>
        <div class="ml-2 mt-2">react/</div>
        <div class="ml-6 text-base-content/50">index.js</div>
        <div class="ml-6 text-base-content/50">cjs/</div>
        <div class="ml-6 text-base-content/50">...</div>
      </div>
    </div>
    <div class="flex items-center justify-center text-3xl text-primary font-bold">
      <span class="hidden md:inline">&#9654;</span>
      <span class="md:hidden">&#9660;</span>
    </div>
    <div class="rounded-lg border border-success/30 bg-base-100 p-4">
      <div class="mb-3 font-mono text-sm font-bold text-base-content">node_modules/.vite/deps/</div>
      <div class="space-y-1 text-sm font-mono">
        <div class="ml-2 text-success">lodash-es.js <span class="text-base-content/50 font-sans">(1 arquivo)</span></div>
        <div class="ml-2 mt-2 text-success">react.js <span class="text-base-content/50 font-sans">(1 arquivo)</span></div>
        <div class="ml-6 text-base-content/50 font-sans text-xs">(CommonJS &rarr; ESM)</div>
      </div>
    </div>
  </div>
  <div class="mt-4 text-center text-sm font-semibold text-warning">&#9889; esbuild faz isso em ~100ms</div>
</div>

### Vendo o Cache

Após rodar `npm run dev`, observe a pasta criada:

```bash
ls node_modules/.vite/deps/
```

Você verá arquivos como:
```text
_metadata.json
lodash-es.js
lodash-es.js.map
react.js
react.js.map
```

### Reescrita de Imports

O Vite reescreve seus imports automaticamente:

```javascript
// Seu código (o que você escreve):
import { debounce } from 'lodash-es'

// O que o navegador recebe:
import { debounce } from '/node_modules/.vite/deps/lodash-es.js?v=abc123'
```

---

## Hot Module Replacement (HMR)

### Como Funciona

O HMR do Vite usa WebSockets para comunicação instantânea:

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 p-4 sm:p-6">
  <h3 class="mb-4 text-center text-lg font-bold text-base-content">HMR FLOW</h3>
  <div class="space-y-3">
    <div class="flex items-start gap-3 rounded-lg border border-primary/30 bg-base-100 p-3">
      <div class="badge badge-primary font-bold shrink-0">1</div>
      <div class="text-sm text-base-content">Você edita: <code class="bg-base-200 px-1 py-0.5 rounded text-xs">src/components/Button.js</code></div>
    </div>
    <div class="text-2xl text-center text-base-content/30">&#9660;</div>
    <div class="flex items-start gap-3 rounded-lg border border-secondary/30 bg-base-100 p-3">
      <div class="badge badge-secondary font-bold shrink-0">2</div>
      <div class="text-sm text-base-content">Vite detecta a mudança <span class="text-base-content/50">(chokidar file watcher)</span></div>
    </div>
    <div class="text-2xl text-center text-base-content/30">&#9660;</div>
    <div class="flex items-start gap-3 rounded-lg border border-accent/30 bg-base-100 p-3">
      <div class="badge badge-accent font-bold shrink-0">3</div>
      <div class="text-sm text-base-content">
        <div class="mb-1">Vite envia via WebSocket:</div>
        <div class="rounded bg-base-200 p-2 font-mono text-xs text-base-content/80">
          &#123; type: 'update', updates: [&#123;<br>
          &nbsp;&nbsp;path: '/src/components/Button.js',<br>
          &nbsp;&nbsp;timestamp: 1699123456789<br>
          &#125;] &#125;
        </div>
      </div>
    </div>
    <div class="text-2xl text-center text-base-content/30">&#9660;</div>
    <div class="flex items-start gap-3 rounded-lg border border-info/30 bg-base-100 p-3">
      <div class="badge badge-info font-bold shrink-0">4</div>
      <div class="text-sm text-base-content">
        <div class="mb-1 font-semibold">Cliente Vite (no navegador):</div>
        <ul class="ml-4 list-disc space-y-0.5 text-base-content/80">
          <li>Recebe a mensagem</li>
          <li>Faz <code class="bg-base-200 px-1 py-0.5 rounded text-xs">import()</code> dinâmico do módulo atualizado</li>
          <li>Substitui o módulo antigo pelo novo</li>
          <li class="font-semibold text-success">Estado da aplicação é PRESERVADO!</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="mt-4 text-center text-sm font-semibold text-info">&#9202; Tempo total: 10-20ms</div>
</div>

### Exemplo: Observando o HMR

Abra o DevTools → Console e observe as mensagens:

```text
[vite] connecting...
[vite] connected.

# Quando você edita um arquivo:
[vite] hot updated: /src/main.js
```

### API do HMR

Você pode interagir com o HMR programaticamente:

```javascript
// main.js
import { contador } from './contador.js'

console.log('Contagem:', contador)

// API de HMR do Vite
if (import.meta.hot) {
  // Aceita atualizações deste módulo
  import.meta.hot.accept()

  // Executa quando o módulo é substituído
  import.meta.hot.dispose(() => {
    console.log('Módulo antigo sendo descartado')
  })
}
```

---

## Transformação de Arquivos

### Pipeline de Transformação

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 p-4 sm:p-6">
  <h3 class="mb-4 text-center text-lg font-bold text-base-content">PIPELINE DE TRANSFORMAÇÃO</h3>
  <div class="mx-auto max-w-md space-y-2">
    <div class="rounded-lg border border-base-content/20 bg-base-100 px-4 py-2 text-center text-sm font-semibold text-base-content">
      Arquivo Fonte
    </div>
    <div class="text-2xl text-center text-base-content/30">&#9660;</div>
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
      <div class="flex-1 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-center">
        <div class="font-semibold text-sm text-base-content">Resolve Imports</div>
        <div class="text-xs text-base-content/60">(ex: 'lodash')</div>
      </div>
      <div class="hidden sm:block text-xs text-base-content/50 max-w-[11rem]">Reescreve bare imports para caminhos válidos</div>
    </div>
    <div class="sm:hidden text-xs text-center text-base-content/50">Reescreve bare imports para caminhos válidos</div>
    <div class="text-2xl text-center text-base-content/30">&#9660;</div>
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
      <div class="flex-1 rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-3 text-center">
        <div class="font-semibold text-sm text-base-content">Plugins</div>
        <div class="text-xs text-base-content/60">(opcional)</div>
      </div>
      <div class="hidden sm:block text-xs text-base-content/50 max-w-[11rem]">Plugins transformam o código (TypeScript, JSX, Vue, Svelte)</div>
    </div>
    <div class="sm:hidden text-xs text-center text-base-content/50">Plugins transformam o código (TypeScript, JSX, Vue, Svelte)</div>
    <div class="text-2xl text-center text-base-content/30">&#9660;</div>
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
      <div class="flex-1 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-center">
        <div class="font-semibold text-sm text-base-content">esbuild</div>
        <div class="text-xs text-base-content/60">(se TS/JSX)</div>
      </div>
      <div class="hidden sm:block text-xs text-base-content/50 max-w-[11rem]">Transpila TS/JSX se necessário (10-100x mais rápido que Babel)</div>
    </div>
    <div class="sm:hidden text-xs text-center text-base-content/50">Transpila TS/JSX se necessário (10-100x mais rápido que Babel)</div>
    <div class="text-2xl text-center text-base-content/30">&#9660;</div>
    <div class="rounded-lg border border-success/30 bg-success/10 px-4 py-2 text-center text-sm font-semibold text-success">
      Código ESM pronto para o navegador
    </div>
  </div>
</div>

### Exemplo: TypeScript

```typescript
// src/utils/math.ts
export function soma(a: number, b: number): number {
  return a + b
}
```

O Vite transforma para:

```javascript
// O que o navegador recebe:
export function soma(a, b) {
  return a + b
}
```

A transformação acontece **sob demanda**, não antecipadamente!

---

## Arquitetura de Produção

No build de produção, o Vite usa **Rollup**:

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 p-4 sm:p-6">
  <h3 class="mb-2 text-center text-lg font-bold text-base-content">BUILD DE PRODUÇÃO</h3>
  <p class="mb-4 text-center text-sm font-mono text-base-content/60">npm run build</p>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr]">
    <div class="rounded-lg border border-warning/30 bg-base-100 p-4">
      <div class="mb-3 font-mono text-sm font-bold text-base-content">src/</div>
      <div class="space-y-1 font-mono text-sm text-base-content/70">
        <div class="ml-2">main.js</div>
        <div class="ml-2">app.js</div>
        <div class="ml-2">utils/</div>
        <div class="ml-2">styles.css</div>
      </div>
    </div>
    <div class="flex items-center justify-center text-3xl text-primary font-bold">
      <span class="hidden md:inline">&#9654;</span>
      <span class="md:hidden">&#9660;</span>
    </div>
    <div class="rounded-lg border border-success/30 bg-base-100 p-4">
      <div class="mb-3 font-mono text-sm font-bold text-base-content">dist/</div>
      <div class="space-y-1 font-mono text-sm text-base-content/70">
        <div class="ml-2">index.html</div>
        <div class="ml-2">assets/</div>
        <div class="ml-6 text-success">main-a1b2c3.js</div>
        <div class="ml-6 text-success">style-d4e5f6.css</div>
        <div class="ml-2">vite.svg</div>
      </div>
    </div>
  </div>
  <div class="mt-4 rounded-lg border border-info/20 bg-info/5 p-3">
    <div class="mb-2 text-sm font-semibold text-base-content">Rollup aplica:</div>
    <div class="grid grid-cols-1 gap-1 sm:grid-cols-2 text-sm text-base-content/80">
      <div>&#10003; Tree-shaking <span class="text-base-content/50">(remove código não usado)</span></div>
      <div>&#10003; Minificação <span class="text-base-content/50">(reduz tamanho)</span></div>
      <div>&#10003; Code splitting <span class="text-base-content/50">(divide em chunks)</span></div>
      <div>&#10003; Hashing <span class="text-base-content/50">(cache busting)</span></div>
    </div>
  </div>
</div>

### Por que Rollup e não esbuild para produção?

```text
esbuild:
✓ Extremamente rápido
✗ Code splitting ainda não é ideal
✗ Plugins menos flexíveis

Rollup:
✓ Code splitting maduro
✓ Ecossistema de plugins robusto
✓ Otimizações avançadas
✗ Mais lento (mas OK para builds ocasionais)
```

---

## Exemplo Prático: Observando a Arquitetura

### 1. Veja o pré-bundling acontecendo

```bash
# Delete o cache
rm -rf node_modules/.vite

# Rode o dev server e observe o terminal
npm run dev
```

Você verá:
```text
Optimizing dependencies:
  lodash-es, react, react-dom
Pre-bundling them to speed up dev server page load...
```

### 2. Compare dev vs build

```bash
# Em desenvolvimento
npm run dev
# Abra DevTools → Network → observe dezenas de arquivos .js

# Para build
npm run build
# Observe a pasta dist/ → poucos arquivos otimizados
```

### 3. Inspecione o output do build

```bash
npm run build
cat dist/assets/index-*.js | head -20
# Código minificado e otimizado!
```

---

## 🎯 Mini-Projeto: Continuação

Vamos adicionar **monitoramento de HMR** ao nosso Dashboard:

### Arquivo: src/hmr-monitor.js

```javascript
// src/hmr-monitor.js
// Monitor de atualizações HMR

const atualizacoes = []

export function registrarAtualizacao(path) {
  atualizacoes.push({
    path,
    timestamp: new Date().toLocaleTimeString('pt-BR')
  })
}

export function getAtualizacoes() {
  return [...atualizacoes]
}

export function getUltimaAtualizacao() {
  return atualizacoes[atualizacoes.length - 1] || null
}

// Configura listener de HMR
if (import.meta.hot) {
  // Quando QUALQUER módulo for atualizado
  import.meta.hot.on('vite:beforeUpdate', (payload) => {
    payload.updates.forEach(update => {
      registrarAtualizacao(update.path)
      console.log(`🔄 HMR: ${update.path}`)
    })
  })
}
```

### Atualize o main.js

```javascript
// main.js
import './style.css'
import { setupCounter } from './counter.js'
import { getAtualizacoes, getUltimaAtualizacao } from './hmr-monitor.js'

const inicioCarregamento = performance.now()

function renderApp() {
  const atualizacoes = getAtualizacoes()
  const ultima = getUltimaAtualizacao()

  document.querySelector('#app').innerHTML = `
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <h1>Dashboard Vite</h1>

      <div class="card">
        <button id="counter" type="button"></button>
      </div>

      <div class="stats">
        <p id="tempo-carregamento">Calculando...</p>
        <p id="hmr-stats">
          📊 HMR Updates: ${atualizacoes.length}
          ${ultima ? `<br>Último: ${ultima.path} às ${ultima.timestamp}` : ''}
        </p>
      </div>
    </div>
  `

  setupCounter(document.querySelector('#counter'))

  requestAnimationFrame(() => {
    const fimCarregamento = performance.now()
    const tempoTotal = (fimCarregamento - inicioCarregamento).toFixed(2)
    document.querySelector('#tempo-carregamento').textContent =
      `⚡ Carregado em ${tempoTotal}ms`
  })
}

renderApp()

// Aceita HMR e re-renderiza
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    renderApp()
  })
}
```

### Teste o HMR

1. Rode `npm run dev`
2. Abra o navegador em `http://localhost:5173`
3. Edite qualquer arquivo e salve
4. Observe o contador de HMR aumentar!

---

## ✅ Desafio da Aula

### Objetivo
Criar um componente que mostra o tempo de cada atualização HMR.

### Instruções

1. Modifique `hmr-monitor.js` para também registrar **quanto tempo** cada HMR levou
2. Use `performance.now()` para medir o tempo entre o início e fim do HMR
3. Exiba a média de tempo de HMR no dashboard

### Dica

```javascript
// Você pode usar estes eventos do HMR:
import.meta.hot.on('vite:beforeUpdate', () => { /* antes */ })
import.meta.hot.on('vite:afterUpdate', () => { /* depois */ })
```

### Spec de Verificação

- [ ] O dashboard mostra quantas atualizações HMR ocorreram
- [ ] O dashboard mostra o tempo médio das atualizações
- [ ] Ao editar um arquivo, os números atualizam automaticamente

### Solução

<details>
<summary>🔍 Clique para ver a solução</summary>

```javascript
// src/hmr-monitor.js
const atualizacoes = []
let hmrInicio = null

export function registrarInicio() {
  hmrInicio = performance.now()
}

export function registrarFim(path) {
  if (hmrInicio) {
    const duracao = performance.now() - hmrInicio
    atualizacoes.push({
      path,
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      duracao: duracao.toFixed(2)
    })
    hmrInicio = null
  }
}

export function getAtualizacoes() {
  return [...atualizacoes]
}

export function getMediaTempo() {
  if (atualizacoes.length === 0) return 0
  const soma = atualizacoes.reduce((acc, a) => acc + parseFloat(a.duracao), 0)
  return (soma / atualizacoes.length).toFixed(2)
}

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    registrarInicio()
  })

  import.meta.hot.on('vite:afterUpdate', (payload) => {
    payload.updates.forEach(update => {
      registrarFim(update.path)
      console.log(`🔄 HMR: ${update.path}`)
    })
  })
}
```

</details>

---

## 📚 Recursos Adicionais

- [Dependency Pre-Bundling - Vite Docs](https://vite.dev/guide/dep-pre-bundling)
- [HMR API - Vite Docs](https://vite.dev/guide/api-hmr)
- [How Vite Works - esbuild docs](https://esbuild.github.io/)

---

**Próxima aula:** [77.3 — Criando e Explorando um Projeto Vite](../77.3-criando-projeto-vite)
