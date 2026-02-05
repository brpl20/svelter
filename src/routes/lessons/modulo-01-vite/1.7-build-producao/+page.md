---
title: "Build de Produção e Otimização"
module: 1
order: 7
---

# 1.7 — Build de Produção e Otimização

> Gere builds otimizados, analise o bundle e aplique técnicas de performance.

## Objetivos da Aula

- Entender o processo de build com Rollup
- Analisar o tamanho e composição do bundle
- Aplicar técnicas de code splitting
- Otimizar assets (imagens, fontes, CSS)

---

## O Processo de Build

Quando você roda `npm run build`, o Vite usa o **Rollup** para criar bundles otimizados:

<div class="not-prose my-6">
  <div class="w-full max-w-2xl mx-auto">
    <div class="text-center font-bold text-lg text-base-content mb-4 bg-base-200 rounded-t-xl py-3 border border-base-content/10">PROCESSO DE BUILD</div>
    <div class="flex flex-col items-center gap-0">
      <div class="bg-base-300 rounded-lg px-5 py-2 font-mono font-semibold text-base-content text-sm">npm run build</div>
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
npm run build

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
npm install rollup-plugin-visualizer -D
```

```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      open: true,           // Abre automaticamente
      filename: 'stats.html', // Nome do arquivo
      gzipSize: true,       // Mostra tamanho gzip
      brotliSize: true      // Mostra tamanho brotli
    })
  ]
})
```

Rode `npm run build` e um gráfico interativo abrirá no navegador!

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

```javascript
// utils.js
export function soma(a, b) { return a + b }
export function subtracao(a, b) { return a - b }
export function multiplicacao(a, b) { return a * b }
export function divisao(a, b) { return a / b }

// main.js
import { soma } from './utils.js'
console.log(soma(1, 2))

// No build final, APENAS soma() está incluída!
// subtracao, multiplicacao, divisao são removidas.
```

### Requisitos para Tree Shaking

```javascript
// ✅ Funciona - ESModules
export function foo() {}
import { foo } from './module'

// ❌ Não funciona - CommonJS
module.exports = { foo }
const { foo } = require('./module')
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

### Automático por Rota

O Vite faz code splitting automático para imports dinâmicos:

```javascript
// Carregado imediatamente
import { Header } from './components/Header.js'

// Carregado sob demanda (lazy loading)
const AdminPanel = () => import('./components/AdminPanel.js')
const Settings = () => import('./components/Settings.js')

// Uso
if (isAdmin) {
  const { default: AdminPanel } = await AdminPanel()
  // AdminPanel está em um chunk separado!
}
```

### Manual Chunks

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Agrupa lodash em chunk separado
          lodash: ['lodash-es'],

          // Agrupa bibliotecas de UI
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown'],

          // Agrupa bibliotecas de gráficos
          charts: ['chart.js', 'd3']
        }
      }
    }
  }
})
```

### Função para Chunks Dinâmicos

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separa node_modules
          if (id.includes('node_modules')) {
            // Bibliotecas grandes separadas
            if (id.includes('lodash')) return 'vendor-lodash'
            if (id.includes('chart')) return 'vendor-charts'
            if (id.includes('@radix')) return 'vendor-radix'

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

```javascript
// vite.config.js
export default defineConfig({
  build: {
    // Imagens menores que 4KB viram base64 inline
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Organiza por tipo
          const ext = assetInfo.name.split('.').pop()

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

```javascript
// Import como URL (será otimizada)
import logo from './logo.png'
img.src = logo // /assets/logo-abc123.png

// Import com query para controle
import logoUrl from './logo.png?url'       // Sempre URL
import logoRaw from './logo.png?raw'       // Conteúdo bruto
import logoInline from './logo.png?inline' // Sempre base64
```

### CSS

```javascript
// vite.config.js
export default defineConfig({
  build: {
    cssCodeSplit: true, // CSS separado por chunk (default)
    // cssCodeSplit: false // Todo CSS em um arquivo

    cssMinify: 'esbuild', // ou 'lightningcss' (mais rápido)
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
npm install vite-plugin-compression -D
```

```javascript
// vite.config.js
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    // Gzip
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024 // Apenas arquivos > 1KB
    }),

    // Brotli (melhor compressão)
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

---

## Sourcemaps

### Opções de Sourcemap

```javascript
// vite.config.js
export default defineConfig({
  build: {
    // Opções de sourcemap
    sourcemap: true,           // Arquivo .map separado
    sourcemap: 'inline',       // Inline no JS (maior)
    sourcemap: 'hidden',       // .map existe mas não referenciado
    sourcemap: false           // Sem sourcemap (menor)
  }
})
```

### Recomendação por Ambiente

```javascript
export default defineConfig(({ mode }) => ({
  build: {
    // Dev/staging: sourcemaps completos
    // Production: hidden (upload para serviço de erros)
    sourcemap: mode === 'production' ? 'hidden' : true
  }
}))
```

---

## Medindo Performance

### Lighthouse CI

```bash
npm install -g @lhci/cli

# Após o build
npm run build
npm run preview &
lhci autorun
```

### Script de Análise

```javascript
// scripts/analyze-build.js
import { readdir, stat } from 'fs/promises'
import { join } from 'path'
import { gzipSync } from 'zlib'
import { readFileSync } from 'fs'

async function analyzeBuild(dir = 'dist') {
  const files = await readdir(join(dir, 'assets'))

  let totalSize = 0
  let totalGzip = 0

  console.log('\n📊 Análise do Build\n')
  console.log('Arquivo'.padEnd(40), 'Tamanho'.padEnd(12), 'Gzip')
  console.log('─'.repeat(65))

  for (const file of files) {
    const path = join(dir, 'assets', file)
    const content = readFileSync(path)
    const size = content.length
    const gzipped = gzipSync(content).length

    totalSize += size
    totalGzip += gzipped

    console.log(
      file.padEnd(40),
      formatBytes(size).padEnd(12),
      formatBytes(gzipped)
    )
  }

  console.log('─'.repeat(65))
  console.log(
    'TOTAL'.padEnd(40),
    formatBytes(totalSize).padEnd(12),
    formatBytes(totalGzip)
  )
}

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(2) + ' KB'
}

analyzeBuild()
```

---

## 🎯 Mini-Projeto: Build Otimizado

Vamos otimizar nosso Dashboard para produção:

### Passo 1: Configuração Otimizada

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
      }
    },

    build: {
      // Sourcemaps apenas em staging
      sourcemap: mode === 'staging',

      // Target moderno para bundles menores
      target: 'esnext',

      // Limite de warning
      chunkSizeWarningLimit: 500,

      // Organização de assets
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'css/[name]-[hash][extname]'
            }
            if (/\.(png|jpg|jpeg|gif|svg|webp)$/.test(assetInfo.name)) {
              return 'images/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
          // Chunks manuais
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    },

    plugins: [
      // Visualização do bundle (só quando ANALYZE=true)
      process.env.ANALYZE && visualizer({
        open: true,
        filename: 'bundle-analysis.html',
        gzipSize: true
      }),

      // Compressão em produção
      isProd && compression({ algorithm: 'gzip' }),
      isProd && compression({ algorithm: 'brotliCompress', ext: '.br' })
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
    "size": "npm run build && du -sh dist dist/assets/*"
  }
}
```

### Passo 3: Componente de Info do Build

```javascript
// src/components/BuildInfo.js
import { env } from '@/config/env.js'

export function createBuildInfo() {
  // Só mostra em desenvolvimento ou staging
  if (env.runtime.isProd && !env.flags.debug) {
    return null
  }

  const info = document.createElement('div')
  info.className = 'build-info'
  info.innerHTML = `
    <details>
      <summary>🔧 Build Info</summary>
      <ul>
        <li><strong>Ambiente:</strong> ${env.runtime.environment}</li>
        <li><strong>Modo:</strong> ${env.runtime.mode}</li>
        <li><strong>Versão:</strong> ${env.app.version}</li>
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
npm run build

# Build com análise
npm run build:analyze
# Abrirá gráfico do bundle

# Verificar tamanhos
npm run size

# Preview de produção
npm run preview
```

---

## ✅ Desafio da Aula

### Objetivo
Reduzir o tamanho do bundle adicionando e depois otimizando uma dependência pesada.

### Instruções

1. Instale `lodash-es`: `npm install lodash-es`
2. Use apenas a função `debounce` no código
3. Verifique que APENAS `debounce` está no bundle (tree shaking)
4. Configure um chunk separado para lodash

### Spec de Verificação

- [ ] `npm run build:analyze` mostra lodash em chunk separado
- [ ] O tamanho do chunk de lodash é &lt; 5KB (só debounce)
- [ ] O app funciona normalmente com debounce

### Solução

<details>
<summary>🔍 Clique para ver a solução</summary>

```bash
npm install lodash-es
```

```javascript
// src/utils/debounce.js
// Importa APENAS debounce, não todo o lodash
import { debounce } from 'lodash-es'

export { debounce }
```

```javascript
// src/main.js
import { debounce } from '@utils/debounce.js'

// Usar debounce para atualizar métricas
const atualizarMetricas = debounce(() => {
  // ... código
}, 500)
```

```javascript
// vite.config.js
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

Após build:
```text
dist/assets/
├── index-xxx.js     (~2 KB)
├── lodash-xxx.js    (~4 KB)  # Apenas debounce!
└── index-xxx.css    (~1 KB)
```

Se lodash estivesse completo, seria ~70KB!

</details>

---

**Próxima aula:** [1.8 — Vite para Diferentes Frameworks](./1.8-vite-frameworks.md)
