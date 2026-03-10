---
title: "Build de Produção e Otimização"
module: 2
order: 7
---

<script>
import Tip from '$lib/components/Tip.svelte';
import Question from '$lib/components/Question.svelte';
</script>

# 2.7 — Build de Produção e Otimização

> Gere builds otimizados, analise o bundle e aplique técnicas de performance.

## Objetivos da Aula

- Entender o processo de build com Rollup
- Analisar o tamanho e composição do bundle
- Aplicar técnicas de code splitting
- Otimizar assets (imagens, fontes, CSS)

---

## O Processo de Build

Quando você roda `pnpm build`, o Vite usa o **Rollup** para criar bundles otimizados:

<div class="not-prose my-6">
  <div class="w-full max-w-2xl mx-auto">
    <div class="text-center font-bold text-lg text-base-content mb-4 bg-base-200 rounded-t-xl py-3 border border-base-content/10">PROCESSO DE BUILD</div>
    <div class="flex flex-col items-center gap-0">
      <div class="bg-base-300 rounded-lg px-5 py-2 font-mono font-semibold text-base-content text-sm">pnpm build</div>
      <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
      <div class="w-full bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
        <div class="badge badge-primary badge-lg font-bold shrink-0">1</div>
        <div>
          <p class="font-semibold text-base-content">Resolucao de Modulos</p>
          <ul class="text-sm text-base-content/70 list-disc list-inside mt-1 space-y-0.5">
            <li>Analisa imports</li>
            <li>Constroi grafo de dependencias</li>
          </ul>
        </div>
      </div>
      <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
      <div class="w-full bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
        <div class="badge badge-primary badge-lg font-bold shrink-0">2</div>
        <div>
          <p class="font-semibold text-base-content">Transformacao</p>
          <ul class="text-sm text-base-content/70 list-disc list-inside mt-1 space-y-0.5">
            <li>TypeScript &rarr; JavaScript</li>
            <li>JSX &rarr; JavaScript</li>
            <li>CSS &rarr; CSS otimizado</li>
          </ul>
        </div>
      </div>
      <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
      <div class="w-full bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
        <div class="badge badge-primary badge-lg font-bold shrink-0">3</div>
        <div>
          <p class="font-semibold text-base-content">Tree Shaking</p>
          <ul class="text-sm text-base-content/70 list-disc list-inside mt-1 space-y-0.5">
            <li>Remove codigo nao usado</li>
            <li>Elimina imports mortos</li>
          </ul>
        </div>
      </div>
      <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
      <div class="w-full bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
        <div class="badge badge-primary badge-lg font-bold shrink-0">4</div>
        <div>
          <p class="font-semibold text-base-content">Minificacao (esbuild)</p>
          <ul class="text-sm text-base-content/70 list-disc list-inside mt-1 space-y-0.5">
            <li>Remove espacos/comentarios</li>
            <li>Encurta nomes de variaveis</li>
            <li>Otimiza codigo</li>
          </ul>
        </div>
      </div>
      <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
      <div class="w-full bg-base-200 border border-base-content/10 rounded-xl p-4 flex items-start gap-3">
        <div class="badge badge-primary badge-lg font-bold shrink-0">5</div>
        <div>
          <p class="font-semibold text-base-content">Code Splitting</p>
          <ul class="text-sm text-base-content/70 list-disc list-inside mt-1 space-y-0.5">
            <li>Divide em chunks</li>
            <li>Adiciona hashes para cache</li>
          </ul>
        </div>
      </div>
      <div class="text-primary text-2xl leading-none py-1">&#9660;</div>
      <div class="w-full bg-success/10 border border-success/30 rounded-xl p-4">
        <p class="font-semibold text-success mb-2">dist/</p>
        <div class="font-mono text-sm text-base-content/80 space-y-1 pl-4">
          <p>index.html</p>
          <p>assets/</p>
          <p class="pl-4">index-[hash].js</p>
          <p class="pl-4">index-[hash].css</p>
          <p class="pl-4">vendor-[hash].js</p>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Analisando o Build

### Output Padrão

```bash
pnpm build

# Output:
vite v5.0.0 building for production...
✓ 42 modules transformed.
dist/index.html                   0.46 kB │ gzip: 0.30 kB
dist/assets/index-DiwrgTda.css    1.24 kB │ gzip: 0.65 kB
dist/assets/index-D8mTLhPd.js     1.45 kB │ gzip: 0.75 kB
✓ built in 523ms
```

### Visualizando o Bundle

Instale o visualizer:

```bash
pnpm add -D rollup-plugin-visualizer
```

```typescript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      // Abre automaticamente
      open: true,
      // Nome do arquivo
      filename: 'stats.html',
      // Mostra tamanho gzip
      gzipSize: true,
      // Mostra tamanho brotli
      brotliSize: true
    })
  ]
})
```

Rode `pnpm build` e um gráfico interativo abrirá no navegador!

### Estrutura do dist/

```bash
tree dist/
# dist/
# ├── index.html
# ├── vite.svg
# └── assets/
#     ├── index-DiwrgTda.css    # CSS minificado
#     ├── index-D8mTLhPd.js     # JS principal
#     └── vendor-abc123.js       # Dependências

# Verificar tamanhos
du -sh dist/*
du -sh dist/assets/*
```

---

## Tree Shaking

Tree shaking remove código que nunca é usado:

<Tip title="ESModules obrigatorios">
Tree shaking so funciona com ESModules (`import`/`export`). Se a dependencia usa CommonJS (`require`/`module.exports`), o Rollup nao consegue eliminar codigo morto. Sempre prefira pacotes que exportam ESM.
</Tip>

```typescript
// utils.ts
export function soma(a: number, b: number): number {
  return a + b
}
export function subtracao(a: number, b: number): number {
  return a - b
}
export function multiplicacao(a: number, b: number): number {
  return a * b
}
export function divisao(a: number, b: number): number {
  return a / b
}

// main.ts
import { soma } from './utils'
console.log(soma(1, 2))

// No build final, APENAS soma() esta incluida!
// subtracao, multiplicacao, divisao sao removidas.
```

### Requisitos para Tree Shaking

```typescript
// Funciona - ESModules
export function foo() {}
import { foo } from './module'

// Nao funciona - CommonJS
// module.exports = { foo }
// const { foo } = require('./module')
```

### Marcando Pacotes como Side-Effect Free

```json
// package.json
{
  "sideEffects": false
}

// ou específico
{
  "sideEffects": ["*.css", "*.scss"]
}
```

---

## Code Splitting

<Question question="O que e code splitting e por que importa?">
Code splitting divide o bundle em pedacos menores (chunks) que sao carregados sob demanda. Isso reduz o tempo de carregamento inicial porque o navegador so baixa o codigo necessario para a pagina atual. Paginas ou funcionalidades que o usuario ainda nao acessou ficam em chunks separados, carregados apenas quando necessario.
</Question>

### Automatico por Rota

O Vite faz code splitting automatico para imports dinamicos:

```typescript
// Carregado imediatamente
import Header from './components/Header.svelte'

// Carregado sob demanda (lazy loading)
// Svelte usa import() dinamico para componentes
const AdminPanel = () => import('./components/AdminPanel.svelte')
const Settings = () => import('./components/Settings.svelte')

// Uso com await
if (isAdmin) {
  const { default: AdminPanel } = await AdminPanel()
  // AdminPanel esta em um chunk separado!
}
```

### Manual Chunks

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Agrupa lodash em chunk separado
          lodash: ['lodash-es'],

          // Agrupa bibliotecas de UI Svelte
          ui: ['bits-ui', 'melt-ui'],

          // Agrupa bibliotecas de graficos
          charts: ['chart.js', 'd3']
        }
      }
    }
  }
})
```

### Funcao para Chunks Dinamicos

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string): string | undefined {
          // Separa node_modules
          if (id.includes('node_modules')) {
            // Bibliotecas grandes separadas
            if (id.includes('lodash')) return 'vendor-lodash'
            if (id.includes('chart')) return 'vendor-charts'
            if (id.includes('bits-ui')) return 'vendor-ui'

            // Resto em vendor comum
            return 'vendor'
          }

          // Componentes compartilhados
          if (id.includes('/components/shared/')) {
            return 'shared'
          }
        }
      }
    }
  }
})
```

---

## Otimização de Assets

### Imagens

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // Imagens menores que 4KB viram base64 inline
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        assetFileNames: (assetInfo: { name: string }) => {
          // Organiza por tipo
          const ext = assetInfo.name.split('.').pop() ?? ''

          if (/png|jpe?g|svg|gif|webp|avif/.test(ext)) {
            return 'images/[name]-[hash][extname]'
          }

          if (/woff2?|eot|ttf|otf/.test(ext)) {
            return 'fonts/[name]-[hash][extname]'
          }

          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
```

### Importando Imagens Otimizadas

```typescript
// Import como URL (sera otimizada)
import logo from './logo.png'
// logo = /assets/logo-abc123.png

// Import com query para controle
// Sempre URL
import logoUrl from './logo.png?url'
// Conteudo bruto
import logoRaw from './logo.png?raw'
// Sempre base64
import logoInline from './logo.png?inline'
```

### CSS

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // CSS separado por chunk (default)
    cssCodeSplit: true,
    // cssCodeSplit: false
    // Todo CSS em um arquivo

    // ou 'lightningcss' (mais rapido)
    cssMinify: 'esbuild',
  },

  css: {
    // PostCSS com autoprefixer e cssnano
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')({
          preset: ['default', {
            discardComments: { removeAll: true }
          }]
        })
      ]
    }
  }
})
```

---

## Compressão

### Plugin de Compressão

```bash
pnpm add -D vite-plugin-compression
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    // Gzip
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      // Apenas arquivos > 1KB
      threshold: 1024
    }),

    // Brotli (melhor compressao)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024
    })
  ]
})
```

Resultado:
```text
dist/assets/
├── index-abc123.js      (50 KB)
├── index-abc123.js.gz   (15 KB)  # ~70% menor
├── index-abc123.js.br   (12 KB)  # ~76% menor
```

### Configurar Servidor para Servir Comprimido

```nginx
# nginx.conf
gzip_static on;
brotli_static on;
```

<Tip title="Brotli vs Gzip">
Brotli oferece compressao de 15-20% melhor que gzip para assets web. Todos os navegadores modernos suportam Brotli via HTTPS. Use ambos para garantir compatibilidade: Brotli como primeira opcao e gzip como fallback.
</Tip>

---

## Sourcemaps

### Opcoes de Sourcemap

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // Opcoes de sourcemap:
    // true = Arquivo .map separado
    // 'inline' = Inline no JS (maior)
    // 'hidden' = .map existe mas nao referenciado
    // false = Sem sourcemap (menor)
    sourcemap: true
  }
})
```

### Recomendacao por Ambiente

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  build: {
    // Dev/staging: sourcemaps completos
    // Production: hidden (upload para servico de erros)
    sourcemap: mode === 'production' ? 'hidden' : true
  }
}))
```

<Question question="Devo usar sourcemaps em producao?">
Depende. Sourcemaps facilitam o debug de erros em producao, mas expoem seu codigo-fonte. A melhor pratica e usar `'hidden'`: os arquivos `.map` sao gerados mas nao referenciados no bundle. Voce faz upload dos `.map` para um servico como Sentry e remove os arquivos do servidor publico.
</Question>

---

## Medindo Performance

### Lighthouse CI

```bash
pnpm add -g @lhci/cli

# Após o build
pnpm build
pnpm preview &
lhci autorun
```

### Script de Analise

```typescript
// scripts/analyze-build.ts
import { readdir, stat } from 'fs/promises'
import { join } from 'path'
import { gzipSync } from 'zlib'
import { readFileSync } from 'fs'

interface FileInfo {
  name: string
  size: number
  gzipped: number
}

async function analyzeBuild(
  dir: string = 'dist'
): Promise<void> {
  const files = await readdir(join(dir, 'assets'))

  let totalSize = 0
  let totalGzip = 0

  console.log('\nAnalise do Build\n')
  console.log(
    'Arquivo'.padEnd(40),
    'Tamanho'.padEnd(12),
    'Gzip'
  )
  console.log('-'.repeat(65))

  for (const file of files) {
    const filePath = join(dir, 'assets', file)
    const content: Buffer = readFileSync(filePath)
    const size: number = content.length
    const gzipped: number = gzipSync(content).length

    totalSize += size
    totalGzip += gzipped

    console.log(
      file.padEnd(40),
      formatBytes(size).padEnd(12),
      formatBytes(gzipped)
    )
  }

  console.log('-'.repeat(65))
  console.log(
    'TOTAL'.padEnd(40),
    formatBytes(totalSize).padEnd(12),
    formatBytes(totalGzip)
  )
}

function formatBytes(bytes: number): string {
  return (bytes / 1024).toFixed(2) + ' KB'
}

analyzeBuild()
```

---

## Mini-Projeto: Build Otimizado

Vamos otimizar nosso Dashboard para producao:

### Passo 1: Configuracao Otimizada

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'

export default defineConfig(({ mode }) => {
  const isProd: boolean = mode === 'production'

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(
          __dirname,
          './src/components'
        ),
        '@utils': path.resolve(
          __dirname,
          './src/utils'
        ),
      }
    },

    build: {
      // Sourcemaps apenas em staging
      sourcemap: mode === 'staging',

      // Target moderno para bundles menores
      target: 'esnext',

      // Limite de warning
      chunkSizeWarningLimit: 500,

      // Organizacao de assets
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: (
            assetInfo: { name: string }
          ) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'css/[name]-[hash][extname]'
            }
            if (/\.(png|jpg|jpeg|gif|svg|webp)$/.test(
              assetInfo.name
            )) {
              return 'images/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
          // Chunks manuais
          manualChunks(
            id: string
          ): string | undefined {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    },

    plugins: [
      sveltekit(),

      // Visualizacao do bundle
      // (so quando ANALYZE=true)
      process.env.ANALYZE && visualizer({
        open: true,
        filename: 'bundle-analysis.html',
        gzipSize: true
      }),

      // Compressao em producao
      isProd && compression({
        algorithm: 'gzip'
      }),
      isProd && compression({
        algorithm: 'brotliCompress',
        ext: '.br'
      })
    ].filter(Boolean),

    server: {
      port: 3000,
      open: true
    }
  }
})
```

### Passo 2: Scripts de Build

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "build:analyze": "ANALYZE=true vite build",
    "preview": "vite preview",
    "size": "pnpm build && du -sh dist dist/assets/*"
  }
}
```

### Passo 3: Componente de Info do Build

```typescript
// src/components/BuildInfo.ts
import { env } from '@/config/env'

interface BuildInfoElement extends HTMLDivElement {}

export function createBuildInfo(): BuildInfoElement | null {
  // So mostra em desenvolvimento ou staging
  if (env.runtime.isProd && !env.flags.debug) {
    return null
  }

  const info = document.createElement('div') as BuildInfoElement
  info.className = 'build-info'
  info.innerHTML = `
    <details>
      <summary>Build Info</summary>
      <ul>
        <li><strong>Ambiente:</strong> ${env.runtime.environment}</li>
        <li><strong>Modo:</strong> ${env.runtime.mode}</li>
        <li><strong>Versao:</strong> ${env.app.version}</li>
        <li><strong>Build:</strong> ${__BUILD_TIME__ || 'N/A'}</li>
      </ul>
    </details>
  `
  return info
}
```

### Passo 4: Testar

```bash
# Build normal
pnpm build

# Build com análise
pnpm build:analyze
# Abrirá gráfico do bundle

# Verificar tamanhos
pnpm size

# Preview de produção
pnpm preview
```

---

## Desafio da Aula

### Objetivo
Reduzir o tamanho do bundle adicionando e depois otimizando uma dependência pesada.

### Instrucoes

1. Instale `lodash-es`: `pnpm add lodash-es`
2. Use apenas a funcao `debounce` no codigo
3. Verifique que APENAS `debounce` esta no bundle (tree shaking)
4. Configure um chunk separado para lodash

### Spec de Verificacao

- [ ] `pnpm build:analyze` mostra lodash em chunk separado
- [ ] O tamanho do chunk de lodash é &lt; 5KB (so debounce)
- [ ] O app funciona normalmente com debounce

### Solucao

<details>
<summary>Clique para ver a solucao</summary>

```bash
pnpm add lodash-es
```

```typescript
// src/utils/debounce.ts
// Importa APENAS debounce, nao todo o lodash
import { debounce } from 'lodash-es'

export { debounce }
```

```typescript
// src/main.ts
import { debounce } from '@utils/debounce'

// Usar debounce para atualizar metricas
const atualizarMetricas = debounce((): void => {
  // ... codigo
}, 500)
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash-es']
        }
      }
    }
  }
})
```

Apos build:
```text
dist/assets/
├── index-xxx.js     (~2 KB)
├── lodash-xxx.js    (~4 KB)  # Apenas debounce!
└── index-xxx.css    (~1 KB)
```

Se lodash estivesse completo, seria ~70KB!

</details>

---

**Próxima aula:** [2.8 — Vite para Diferentes Frameworks](../2.8-vite-frameworks)
