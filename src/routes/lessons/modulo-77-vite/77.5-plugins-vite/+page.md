---
title: "Plugins do Vite"
module: 77
order: 5
---

# 77.5 — Plugins do Vite

> Entenda o sistema de plugins, conheça os mais úteis e crie seu próprio plugin.

## Objetivos da Aula

- Entender como o sistema de plugins funciona
- Conhecer os plugins oficiais e populares
- Criar um plugin customizado simples
- Integrar múltiplos plugins no projeto

---

## Como Plugins Funcionam

Plugins do Vite são baseados na interface de plugins do **Rollup**, com extensões específicas para desenvolvimento.

<div class="not-prose my-6">
  <div class="w-full max-w-2xl mx-auto rounded-xl border border-base-content/10 overflow-hidden">
    <div class="bg-secondary text-secondary-content font-bold text-lg text-center py-3">CICLO DE VIDA DO PLUGIN</div>
    <div class="bg-base-200 divide-y divide-base-content/10">
      <div class="flex items-center gap-4 px-5 py-3">
        <span class="badge badge-secondary badge-sm font-bold w-6 h-6 shrink-0">1</span>
        <span class="font-mono font-semibold text-base-content min-w-[10rem]">CONFIG</span>
        <span class="text-base-content/70 text-sm">Modificar configuracao do Vite</span>
      </div>
      <div class="flex items-center gap-4 px-5 py-3">
        <span class="badge badge-secondary badge-sm font-bold w-6 h-6 shrink-0">2</span>
        <span class="font-mono font-semibold text-base-content min-w-[10rem]">CONFIG RESOLVED</span>
        <span class="text-base-content/70 text-sm">Configuracao final resolvida</span>
      </div>
      <div class="flex items-center gap-4 px-5 py-3">
        <span class="badge badge-secondary badge-sm font-bold w-6 h-6 shrink-0">3</span>
        <span class="font-mono font-semibold text-base-content min-w-[10rem]">CONFIG SERVER</span>
        <span class="text-base-content/70 text-sm">Configurar servidor dev (apenas dev)</span>
      </div>
      <div class="flex items-center gap-4 px-5 py-3">
        <span class="badge badge-secondary badge-sm font-bold w-6 h-6 shrink-0">4</span>
        <span class="font-mono font-semibold text-base-content min-w-[10rem]">BUILD START</span>
        <span class="text-base-content/70 text-sm">Inicio do build</span>
      </div>
      <div class="flex items-center gap-4 px-5 py-3">
        <span class="badge badge-secondary badge-sm font-bold w-6 h-6 shrink-0">5</span>
        <span class="font-mono font-semibold text-base-content min-w-[10rem]">RESOLVE ID</span>
        <span class="text-base-content/70 text-sm">Resolver imports (ex: '@/foo' &rarr; '/src/foo')</span>
      </div>
      <div class="flex items-center gap-4 px-5 py-3">
        <span class="badge badge-secondary badge-sm font-bold w-6 h-6 shrink-0">6</span>
        <span class="font-mono font-semibold text-base-content min-w-[10rem]">LOAD</span>
        <span class="text-base-content/70 text-sm">Carregar conteudo de modulos virtuais</span>
      </div>
      <div class="flex items-center gap-4 px-5 py-3">
        <span class="badge badge-secondary badge-sm font-bold w-6 h-6 shrink-0">7</span>
        <span class="font-mono font-semibold text-base-content min-w-[10rem]">TRANSFORM</span>
        <span class="text-base-content/70 text-sm">Transformar codigo fonte</span>
      </div>
      <div class="flex items-center gap-4 px-5 py-3">
        <span class="badge badge-secondary badge-sm font-bold w-6 h-6 shrink-0">8</span>
        <span class="font-mono font-semibold text-base-content min-w-[10rem]">BUILD END</span>
        <span class="text-base-content/70 text-sm">Fim do build</span>
      </div>
      <div class="flex items-center gap-4 px-5 py-3">
        <span class="badge badge-secondary badge-sm font-bold w-6 h-6 shrink-0">9</span>
        <span class="font-mono font-semibold text-base-content min-w-[10rem]">CLOSE BUNDLE</span>
        <span class="text-base-content/70 text-sm">Finalizacao</span>
      </div>
    </div>
  </div>
</div>

### Estrutura Básica de um Plugin

```javascript
// Um plugin Vite é um objeto com nome e hooks
const meuPlugin = {
  // Nome do plugin (obrigatório)
  name: 'meu-plugin',

  // Hooks do Vite (específicos)
  configureServer(server) {
    // Adiciona middleware ao servidor dev
  },

  // Hooks do Rollup (compartilhados)
  transform(code, id) {
    // Transforma código fonte
    return code
  }
}

// Usar no vite.config.js
export default defineConfig({
  plugins: [meuPlugin]
})
```

---

## Plugins Oficiais

### @vitejs/plugin-legacy

Suporte para navegadores antigos:

```bash
npm install @vitejs/plugin-legacy -D
```

```javascript
// vite.config.js
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ]
})
```

### @vitejs/plugin-vue

Para projetos Vue:

```javascript
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
```

### @vitejs/plugin-react

Para projetos React:

```javascript
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
```

### @sveltejs/vite-plugin-svelte

Para projetos Svelte (usaremos muito!):

```javascript
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()]
})
```

---

## Plugins Populares da Comunidade

### vite-plugin-compression

Comprime assets para produção:

```bash
npm install vite-plugin-compression -D
```

```javascript
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ]
})
```

### vite-plugin-pwa

Transforma seu app em PWA:

```bash
npm install vite-plugin-pwa -D
```

```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Meu App',
        short_name: 'App',
        theme_color: '#646cff',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
```

### vite-plugin-inspect

Debug de transformações de plugins:

```bash
npm install vite-plugin-inspect -D
```

```javascript
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [
    Inspect() // Acesse localhost:3000/__inspect/
  ]
})
```

### rollup-plugin-visualizer

Visualiza o bundle:

```bash
npm install rollup-plugin-visualizer -D
```

```javascript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      filename: 'bundle-stats.html',
      gzipSize: true
    })
  ]
})
```

### unplugin-auto-import

Auto-import de funções comuns:

```bash
npm install unplugin-auto-import -D
```

```javascript
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router'],
      // ou para Svelte
      imports: [
        {
          svelte: ['onMount', 'onDestroy', 'createEventDispatcher']
        }
      ]
    })
  ]
})
```

---

## Criando Plugins Customizados

### Plugin Simples: Log de Builds

```javascript
// plugins/build-logger.js
export function buildLogger() {
  let startTime

  return {
    name: 'build-logger',

    // Início do build
    buildStart() {
      startTime = Date.now()
      console.log('\n🚀 Build iniciado...\n')
    },

    // Fim do build
    closeBundle() {
      const duration = Date.now() - startTime
      console.log(`\n✅ Build completo em ${duration}ms\n`)
    }
  }
}
```

```javascript
// vite.config.js
import { buildLogger } from './plugins/build-logger.js'

export default defineConfig({
  plugins: [buildLogger()]
})
```

### Plugin: Transformar Código

```javascript
// plugins/banner.js
export function banner(text) {
  return {
    name: 'banner',

    // Transforma arquivos JS
    transform(code, id) {
      // Só processa arquivos JS/TS
      if (!id.match(/\.[jt]sx?$/)) return

      // Adiciona comentário no topo
      const bannerComment = `/**\n * ${text}\n * Gerado em: ${new Date().toISOString()}\n */\n`

      return {
        code: bannerComment + code,
        map: null // Sem sourcemap para esta transformação
      }
    }
  }
}
```

### Plugin: Módulo Virtual

Módulos virtuais existem apenas em memória:

```javascript
// plugins/virtual-config.js
export function virtualConfig(config) {
  const virtualModuleId = 'virtual:config'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'virtual-config',

    // Resolve o import
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    // Carrega o conteúdo
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${JSON.stringify(config)}`
      }
    }
  }
}
```

Uso:

```javascript
// vite.config.js
import { virtualConfig } from './plugins/virtual-config.js'

export default defineConfig({
  plugins: [
    virtualConfig({
      appName: 'Meu Dashboard',
      version: '1.0.0',
      features: ['dark-mode', 'notifications']
    })
  ]
})
```

```javascript
// No seu código
import config from 'virtual:config'

console.log(config.appName) // "Meu Dashboard"
console.log(config.features) // ["dark-mode", "notifications"]
```

### Plugin: Middleware do Servidor Dev

```javascript
// plugins/api-mock.js
export function apiMock() {
  return {
    name: 'api-mock',

    configureServer(server) {
      // Adiciona middleware ANTES do Vite
      server.middlewares.use((req, res, next) => {
        // Mock de API
        if (req.url === '/api/status') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            status: 'ok',
            timestamp: Date.now(),
            env: 'development'
          }))
          return
        }

        if (req.url === '/api/users') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
          ]))
          return
        }

        // Passa para o próximo middleware
        next()
      })
    }
  }
}
```

---

## Plugin Completo: Build Info

Vamos criar um plugin útil que injeta informações de build:

```javascript
// plugins/build-info.js
import { execSync } from 'child_process'

export function buildInfo() {
  const virtualModuleId = 'virtual:build-info'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'build-info',

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        // Coleta informações
        let gitCommit = 'unknown'
        let gitBranch = 'unknown'

        try {
          gitCommit = execSync('git rev-parse --short HEAD')
            .toString().trim()
          gitBranch = execSync('git rev-parse --abbrev-ref HEAD')
            .toString().trim()
        } catch (e) {
          // Não está em um repositório git
        }

        const info = {
          buildTime: new Date().toISOString(),
          nodeVersion: process.version,
          gitCommit,
          gitBranch,
          env: process.env.NODE_ENV || 'development'
        }

        return `export default ${JSON.stringify(info, null, 2)}`
      }
    }
  }
}
```

Uso no código:

```javascript
import buildInfo from 'virtual:build-info'

console.log(`
  Build: ${buildInfo.buildTime}
  Commit: ${buildInfo.gitCommit}
  Branch: ${buildInfo.gitBranch}
  Node: ${buildInfo.nodeVersion}
`)
```

---

## 🎯 Mini-Projeto: Plugin de Métricas

Vamos criar um plugin customizado para nosso Dashboard:

### Plugin: Métricas de Build

```javascript
// src/plugins/metrics-plugin.js

export function metricsPlugin() {
  let buildStartTime
  const moduleCount = { js: 0, css: 0, other: 0 }

  return {
    name: 'metrics-plugin',

    // Início do build
    buildStart() {
      buildStartTime = Date.now()
      moduleCount.js = 0
      moduleCount.css = 0
      moduleCount.other = 0
    },

    // Conta módulos transformados
    transform(code, id) {
      if (id.includes('node_modules')) return

      if (id.match(/\.[jt]sx?$/)) {
        moduleCount.js++
      } else if (id.match(/\.css$/)) {
        moduleCount.css++
      } else {
        moduleCount.other++
      }

      return null // Não modifica o código
    },

    // Relatório final
    closeBundle() {
      const buildTime = Date.now() - buildStartTime

      console.log('\n' + '═'.repeat(50))
      console.log('📊 MÉTRICAS DE BUILD')
      console.log('═'.repeat(50))
      console.log(`⏱️  Tempo total: ${buildTime}ms`)
      console.log(`📄 Módulos JS/TS: ${moduleCount.js}`)
      console.log(`🎨 Módulos CSS: ${moduleCount.css}`)
      console.log(`📦 Outros: ${moduleCount.other}`)
      console.log(`📁 Total: ${moduleCount.js + moduleCount.css + moduleCount.other}`)
      console.log('═'.repeat(50) + '\n')
    }
  }
}
```

### Plugin: Módulo Virtual de Métricas Dev

```javascript
// src/plugins/dev-metrics.js

export function devMetricsPlugin() {
  const virtualId = 'virtual:dev-metrics'
  const resolvedId = '\0' + virtualId

  let requestCount = 0
  let transformCount = 0
  const transformedFiles = []

  return {
    name: 'dev-metrics',

    // Só em desenvolvimento
    apply: 'serve',

    configureServer(server) {
      // Conta requisições
      server.middlewares.use((req, res, next) => {
        requestCount++
        next()
      })

      // Endpoint de métricas
      server.middlewares.use((req, res, next) => {
        if (req.url === '/__metrics') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            requests: requestCount,
            transforms: transformCount,
            files: transformedFiles.slice(-20) // Últimos 20
          }))
          return
        }
        next()
      })
    },

    transform(code, id) {
      if (!id.includes('node_modules')) {
        transformCount++
        transformedFiles.push({
          file: id.split('/').pop(),
          time: new Date().toISOString()
        })
      }
      return null
    },

    resolveId(id) {
      if (id === virtualId) return resolvedId
    },

    load(id) {
      if (id === resolvedId) {
        return `
          export async function getDevMetrics() {
            const res = await fetch('/__metrics')
            return res.json()
          }
        `
      }
    }
  }
}
```

### Integrar no vite.config.js

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'
import { metricsPlugin } from './src/plugins/metrics-plugin.js'
import { devMetricsPlugin } from './src/plugins/dev-metrics.js'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  },

  plugins: [
    metricsPlugin(),
    devMetricsPlugin()
  ],

  server: {
    port: 3000,
    open: true
  }
})
```

### Usar as Métricas no Dashboard

```javascript
// src/main.js
import { getDevMetrics } from 'virtual:dev-metrics'

// Adicionar card de métricas do servidor
async function exibirMetricasServidor() {
  const metricas = await getDevMetrics()

  const container = document.querySelector('#metricas-servidor')
  if (container) {
    container.innerHTML = `
      <div class="performance-card">
        <h3 class="card-title">Requisições</h3>
        <p class="card-value">${metricas.requests}</p>
      </div>
      <div class="performance-card">
        <h3 class="card-title">Transformações</h3>
        <p class="card-value">${metricas.transforms}</p>
      </div>
    `
  }
}

// Atualiza a cada 2 segundos
setInterval(exibirMetricasServidor, 2000)
```

---

## ✅ Desafio da Aula

### Objetivo
Criar um plugin que adiciona um watermark nos arquivos JS em produção.

### Instruções

1. Crie um plugin chamado `watermarkPlugin`
2. O plugin deve adicionar um comentário no topo de cada arquivo JS
3. O comentário deve incluir: nome do projeto, versão e data de build
4. O plugin só deve funcionar em build de produção (`apply: 'build'`)

### Spec de Verificação

- [ ] Rode `npm run build`
- [ ] Abra qualquer arquivo `.js` em `dist/`
- [ ] O arquivo deve começar com o comentário de watermark

### Solução

<details>
<summary>🔍 Clique para ver a solução</summary>

```javascript
// plugins/watermark.js
export function watermarkPlugin(options = {}) {
  const {
    projectName = 'Meu Projeto',
    version = '1.0.0'
  } = options

  return {
    name: 'watermark',

    // Só em build
    apply: 'build',

    // Gera o banner antes de emitir
    generateBundle(_, bundle) {
      const watermark = `/**
 * ${projectName} v${version}
 * Build: ${new Date().toISOString()}
 * Este arquivo foi gerado automaticamente.
 */
`
      // Adiciona watermark em cada chunk JS
      for (const fileName in bundle) {
        const chunk = bundle[fileName]
        if (chunk.type === 'chunk' && fileName.endsWith('.js')) {
          chunk.code = watermark + chunk.code
        }
      }
    }
  }
}
```

```javascript
// vite.config.js
import { watermarkPlugin } from './plugins/watermark.js'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    watermarkPlugin({
      projectName: 'Dashboard Vite',
      version: pkg.version
    })
  ]
})
```

</details>

---

**Próxima aula:** [77.6 — Variáveis de Ambiente e Modos](../77.6-variaveis-ambiente)
