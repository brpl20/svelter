---
title: "Plugins do Vite"
module: 2
order: 5
---

<script>
import Tip from '$lib/components/Tip.svelte';
import Question from '$lib/components/Question.svelte';
</script>

# 2.5 — Plugins do Vite

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

<Tip title="A ordem dos plugins importa!">
Plugins sao executados na ordem em que aparecem no array <code>plugins</code> do <code>vite.config.ts</code>. Plugins de framework (como o do Svelte) devem vir primeiro, seguidos por plugins utilitarios. A ordem pode afetar como as transformacoes sao aplicadas ao codigo.
</Tip>

### Estrutura Basica de um Plugin

```typescript
// Um plugin Vite e um objeto com nome e hooks
import type { Plugin } from 'vite'

const meuPlugin: Plugin = {
  // Nome do plugin (obrigatorio)
  name: 'meu-plugin',

  // Hooks do Vite (especificos)
  configureServer(server) {
    // Adiciona middleware ao servidor dev
  },

  // Hooks do Rollup (compartilhados)
  transform(code: string, id: string) {
    // Transforma codigo fonte
    return code
  }
}

// Usar no vite.config.ts
export default defineConfig({
  plugins: [meuPlugin]
})
```

---

## Plugins Oficiais

### @sveltejs/vite-plugin-svelte

O plugin principal para projetos Svelte e SvelteKit. Ele processa arquivos `.svelte`, habilita HMR, e integra o compilador Svelte ao pipeline do Vite.

```bash
pnpm add @sveltejs/vite-plugin-svelte -D
```

```typescript
// vite.config.ts
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    svelte({
      // Opcoes do compilador Svelte
      compilerOptions: {
        // Habilita verificacoes em dev
        dev: true
      },
      // Pre-processadores (SCSS, TS, etc.)
      preprocess: [],
      // HMR habilitado por padrao em dev
      hot: true
    })
  ]
})
```

O SvelteKit ja configura este plugin automaticamente, mas e importante saber que ele existe e quais opcoes aceita. No `svelte.config.js` do SvelteKit, as opcoes do compilador sao passadas diretamente.

### @vitejs/plugin-legacy

Suporte para navegadores antigos:

```bash
pnpm add @vitejs/plugin-legacy -D
```

```typescript
// vite.config.ts
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: [
        'regenerator-runtime/runtime'
      ]
    })
  ]
})
```

### @vitejs/plugin-react (para referencia)

Plugin para projetos React. Mencionamos aqui apenas como referencia, ja que o Vite suporta multiplos frameworks:

```typescript
// vite.config.ts
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
```

---

## Plugins Populares da Comunidade

### vite-plugin-compression

Comprime assets para producao:

```bash
pnpm add vite-plugin-compression -D
```

```typescript
// vite.config.ts
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
pnpm add vite-plugin-pwa -D
```

```typescript
// vite.config.ts
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
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

### vite-plugin-inspect

Debug de transformacoes de plugins:

```bash
pnpm add vite-plugin-inspect -D
```

```typescript
// vite.config.ts
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [
    // Acesse localhost:3000/__inspect/
    Inspect()
  ]
})
```

### rollup-plugin-visualizer

Visualiza o bundle:

```bash
pnpm add rollup-plugin-visualizer -D
```

```typescript
// vite.config.ts
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

Auto-import de funcoes comuns:

```bash
pnpm add unplugin-auto-import -D
```

```typescript
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        {
          svelte: [
            'onMount',
            'onDestroy',
            'tick',
            'untrack'
          ]
        },
        {
          'svelte/store': [
            'writable',
            'readable',
            'derived',
            'get'
          ]
        }
      ]
    })
  ]
})
```

---

<Question question="Quando criar um plugin customizado?">
Crie um plugin customizado quando precisar de algo que <strong>nenhum plugin existente resolve</strong>. Casos comuns: injetar dados de build no codigo, criar modulos virtuais com configuracao dinamica, adicionar middlewares ao servidor dev, ou transformar arquivos de formas especificas ao seu projeto. Antes de criar, pesquise no <strong>awesome-vite</strong> se ja existe uma solucao pronta.
</Question>

## Criando Plugins Customizados

### Plugin Simples: Log de Builds

```typescript
// plugins/build-logger.ts
import type { Plugin } from 'vite'

export function buildLogger(): Plugin {
  let startTime: number

  return {
    name: 'build-logger',

    // Inicio do build
    buildStart() {
      startTime = Date.now()
      console.log('\n Build iniciado...\n')
    },

    // Fim do build
    closeBundle() {
      const duration: number = Date.now() - startTime
      console.log(
        `\n Build completo em ${duration}ms\n`
      )
    }
  }
}
```

```typescript
// vite.config.ts
import { buildLogger } from './plugins/build-logger'

export default defineConfig({
  plugins: [buildLogger()]
})
```

### Plugin: Transformar Codigo

```typescript
// plugins/banner.ts
import type { Plugin } from 'vite'

export function banner(text: string): Plugin {
  return {
    name: 'banner',

    // Transforma arquivos JS
    transform(code: string, id: string) {
      // So processa arquivos JS/TS
      if (!id.match(/\.[jt]sx?$/)) return

      // Adiciona comentario no topo
      const bannerComment: string =
        `/**\n * ${text}\n` +
        ` * Gerado em: ${new Date().toISOString()}\n */\n`

      return {
        code: bannerComment + code,
        // Sem sourcemap para esta transformacao
        map: null
      }
    }
  }
}
```

### Plugin: Modulo Virtual

Modulos virtuais existem apenas em memoria:

```typescript
// plugins/virtual-config.ts
import type { Plugin } from 'vite'

export function virtualConfig(
  config: Record<string, unknown>
): Plugin {
  const virtualModuleId = 'virtual:config'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'virtual-config',

    // Resolve o import
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    // Carrega o conteudo
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${JSON.stringify(config)}`
      }
    }
  }
}
```

Uso:

```typescript
// vite.config.ts
import { virtualConfig } from './plugins/virtual-config'

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

```typescript
// No seu codigo
import config from 'virtual:config'

// "Meu Dashboard"
console.log(config.appName)
// ["dark-mode", "notifications"]
console.log(config.features)
```

<Tip title="Modulos virtuais sao poderosos!">
Modulos virtuais permitem injetar dados em tempo de build diretamente no codigo da aplicacao. Isso e util para configuracoes dinamicas, informacoes de versao, feature flags, e qualquer dado que so existe no momento do build. O prefixo <code>\0</code> no ID resolvido e uma convencao do Rollup que impede outros plugins de tentar processar o modulo.
</Tip>

### Plugin: Middleware do Servidor Dev

```typescript
// plugins/api-mock.ts
import type { Plugin } from 'vite'
import type {
  IncomingMessage,
  ServerResponse
} from 'http'

export function apiMock(): Plugin {
  return {
    name: 'api-mock',

    configureServer(server) {
      // Adiciona middleware ANTES do Vite
      server.middlewares.use((
        req: IncomingMessage,
        res: ServerResponse,
        next: () => void
      ) => {
        // Mock de API
        if (req.url === '/api/status') {
          res.setHeader(
            'Content-Type',
            'application/json'
          )
          res.end(JSON.stringify({
            status: 'ok',
            timestamp: Date.now(),
            env: 'development'
          }))
          return
        }

        if (req.url === '/api/users') {
          res.setHeader(
            'Content-Type',
            'application/json'
          )
          res.end(JSON.stringify([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
          ]))
          return
        }

        // Passa para o proximo middleware
        next()
      })
    }
  }
}
```

---

## Plugin Completo: Build Info

Vamos criar um plugin util que injeta informacoes de build:

```typescript
// plugins/build-info.ts
import type { Plugin } from 'vite'
import { execSync } from 'child_process'

interface BuildInfoData {
  buildTime: string
  nodeVersion: string
  gitCommit: string
  gitBranch: string
  env: string
}

export function buildInfo(): Plugin {
  const virtualModuleId = 'virtual:build-info'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'build-info',

    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        // Coleta informacoes
        let gitCommit = 'unknown'
        let gitBranch = 'unknown'

        try {
          gitCommit = execSync(
            'git rev-parse --short HEAD'
          ).toString().trim()
          gitBranch = execSync(
            'git rev-parse --abbrev-ref HEAD'
          ).toString().trim()
        } catch (e) {
          // Nao esta em um repositorio git
        }

        const info: BuildInfoData = {
          buildTime: new Date().toISOString(),
          nodeVersion: process.version,
          gitCommit,
          gitBranch,
          env: process.env.NODE_ENV || 'development'
        }

        return (
          `export default ${JSON.stringify(info, null, 2)}`
        )
      }
    }
  }
}
```

Uso no codigo:

```typescript
import buildInfo from 'virtual:build-info'

console.log(`
  Build: ${buildInfo.buildTime}
  Commit: ${buildInfo.gitCommit}
  Branch: ${buildInfo.gitBranch}
  Node: ${buildInfo.nodeVersion}
`)
```

---

## Mini-Projeto: Plugin de Metricas

Vamos criar um plugin customizado para nosso Dashboard:

### Plugin: Metricas de Build

```typescript
// src/plugins/metrics-plugin.ts
import type { Plugin } from 'vite'

interface ModuleCount {
  js: number
  css: number
  other: number
}

export function metricsPlugin(): Plugin {
  let buildStartTime: number
  const moduleCount: ModuleCount = {
    js: 0,
    css: 0,
    other: 0
  }

  return {
    name: 'metrics-plugin',

    // Inicio do build
    buildStart() {
      buildStartTime = Date.now()
      moduleCount.js = 0
      moduleCount.css = 0
      moduleCount.other = 0
    },

    // Conta modulos transformados
    transform(code: string, id: string) {
      if (id.includes('node_modules')) return

      if (id.match(/\.[jt]sx?$/)) {
        moduleCount.js++
      } else if (id.match(/\.css$/)) {
        moduleCount.css++
      } else {
        moduleCount.other++
      }

      // Nao modifica o codigo
      return null
    },

    // Relatorio final
    closeBundle() {
      const buildTime: number =
        Date.now() - buildStartTime
      const total: number =
        moduleCount.js +
        moduleCount.css +
        moduleCount.other

      console.log('\n' + '='.repeat(50))
      console.log(' METRICAS DE BUILD')
      console.log('='.repeat(50))
      console.log(
        ` Tempo total: ${buildTime}ms`
      )
      console.log(
        ` Modulos JS/TS: ${moduleCount.js}`
      )
      console.log(
        ` Modulos CSS: ${moduleCount.css}`
      )
      console.log(
        ` Outros: ${moduleCount.other}`
      )
      console.log(
        ` Total: ${total}`
      )
      console.log('='.repeat(50) + '\n')
    }
  }
}
```

### Plugin: Modulo Virtual de Metricas Dev

```typescript
// src/plugins/dev-metrics.ts
import type { Plugin } from 'vite'
import type {
  IncomingMessage,
  ServerResponse
} from 'http'

interface TransformEntry {
  file: string
  time: string
}

export function devMetricsPlugin(): Plugin {
  const virtualId = 'virtual:dev-metrics'
  const resolvedId = '\0' + virtualId

  let requestCount = 0
  let transformCount = 0
  const transformedFiles: TransformEntry[] = []

  return {
    name: 'dev-metrics',

    // So em desenvolvimento
    apply: 'serve',

    configureServer(server) {
      // Conta requisicoes
      server.middlewares.use((
        req: IncomingMessage,
        res: ServerResponse,
        next: () => void
      ) => {
        requestCount++
        next()
      })

      // Endpoint de metricas
      server.middlewares.use((
        req: IncomingMessage,
        res: ServerResponse,
        next: () => void
      ) => {
        if (req.url === '/__metrics') {
          res.setHeader(
            'Content-Type',
            'application/json'
          )
          res.end(JSON.stringify({
            requests: requestCount,
            transforms: transformCount,
            // Ultimos 20
            files: transformedFiles.slice(-20)
          }))
          return
        }
        next()
      })
    },

    transform(code: string, id: string) {
      if (!id.includes('node_modules')) {
        transformCount++
        transformedFiles.push({
          file: id.split('/').pop() ?? '',
          time: new Date().toISOString()
        })
      }
      return null
    },

    resolveId(id: string) {
      if (id === virtualId) return resolvedId
    },

    load(id: string) {
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

### Integrar no vite.config.ts

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import path from 'path'
import { metricsPlugin } from './src/plugins/metrics-plugin'
import { devMetricsPlugin } from './src/plugins/dev-metrics'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(
        __dirname, './src/components'
      ),
      '@utils': path.resolve(
        __dirname, './src/utils'
      ),
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

### Usar as Metricas no Dashboard

```typescript
// src/main.ts
import { getDevMetrics } from 'virtual:dev-metrics'

// Adicionar card de metricas do servidor
async function exibirMetricasServidor(): Promise<void> {
  const metricas = await getDevMetrics()

  const container =
    document.querySelector('#metricas-servidor')
  if (container) {
    container.innerHTML = `
      <div class="performance-card">
        <h3 class="card-title">Requisicoes</h3>
        <p class="card-value">
          ${metricas.requests}
        </p>
      </div>
      <div class="performance-card">
        <h3 class="card-title">Transformacoes</h3>
        <p class="card-value">
          ${metricas.transforms}
        </p>
      </div>
    `
  }
}

// Atualiza a cada 2 segundos
setInterval(exibirMetricasServidor, 2000)
```

---

## Desafio da Aula

### Objetivo
Criar um plugin que adiciona um watermark nos arquivos JS em producao.

### Instrucoes

1. Crie um plugin chamado `watermarkPlugin`
2. O plugin deve adicionar um comentario no topo de cada arquivo JS
3. O comentario deve incluir: nome do projeto, versao e data de build
4. O plugin so deve funcionar em build de producao (`apply: 'build'`)

### Spec de Verificacao

- [ ] Rode `pnpm build`
- [ ] Abra qualquer arquivo `.js` em `dist/`
- [ ] O arquivo deve comecar com o comentario de watermark

### Solucao

<details>
<summary>Clique para ver a solucao</summary>

```typescript
// plugins/watermark.ts
import type { Plugin } from 'vite'

interface WatermarkOptions {
  projectName?: string
  version?: string
}

export function watermarkPlugin(
  options: WatermarkOptions = {}
): Plugin {
  const {
    projectName = 'Meu Projeto',
    version = '1.0.0'
  } = options

  return {
    name: 'watermark',

    // So em build
    apply: 'build',

    // Gera o banner antes de emitir
    generateBundle(_, bundle) {
      const watermark =
        `/**\n` +
        ` * ${projectName} v${version}\n` +
        ` * Build: ${new Date().toISOString()}\n` +
        ` * Este arquivo foi gerado automaticamente.\n` +
        ` */\n`

      // Adiciona watermark em cada chunk JS
      for (const fileName in bundle) {
        const chunk = bundle[fileName]
        if (
          chunk.type === 'chunk' &&
          fileName.endsWith('.js')
        ) {
          chunk.code = watermark + chunk.code
        }
      }
    }
  }
}
```

```typescript
// vite.config.ts
import { watermarkPlugin } from './plugins/watermark'
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

**Proxima aula:** [2.6 — Variaveis de Ambiente e Modos](../2.6-variaveis-ambiente)
