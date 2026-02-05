---
title: "Configuração do vite.config.js"
module: 1
order: 4
---

<script>
import CodeSwitch from '$lib/components/CodeSwitch.svelte'
</script>

# 1.4 — Configuração do `vite.config.js`

> Domine o arquivo de configuração: aliases, servidor dev, build e variáveis de ambiente.

## Objetivos da Aula

- Criar e entender o `vite.config.js`
- Configurar aliases de importação
- Customizar o servidor de desenvolvimento
- Ajustar opções de build

---

## Criando o Arquivo de Configuração

Por padrão, o Vite funciona sem configuração. Mas para projetos reais, você vai querer personalizar. Crie o arquivo na raiz:

<CodeSwitch>
<div data-lang="js">

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // Suas configurações aqui
})
```

</div>
<div data-lang="ts">

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  // Suas configurações aqui
})
```

</div>
</CodeSwitch>

### Por que `defineConfig()`?

Fornece **autocomplete e type-checking** no seu editor:

```javascript
// Sem defineConfig - sem autocomplete
export default {
  server: { port: 3000 }
}

// Com defineConfig - autocomplete completo! ✨
export default defineConfig({
  server: { port: 3000 } // Editor sugere todas as opções
})
```

---

## Configurações Principais

### Estrutura Geral

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // Diretório raiz do projeto
  root: '.',

  // Caminho base para produção (útil para GitHub Pages)
  base: '/',

  // Diretório de assets públicos
  publicDir: 'public',

  // Modo (development, production)
  mode: 'development',

  // Plugins
  plugins: [],

  // Configurações do servidor dev
  server: {},

  // Configurações de build
  build: {},

  // Configurações de preview
  preview: {},

  // Resolução de módulos
  resolve: {},

  // CSS
  css: {},

  // Variáveis de ambiente
  envDir: '.',
  envPrefix: 'VITE_',

  // Otimização de dependências
  optimizeDeps: {}
})
```

---

## Aliases de Importação

Aliases permitem criar atalhos para caminhos longos:

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      // @ aponta para src/
      '@': path.resolve(__dirname, './src'),

      // Aliases específicos
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
    }
  }
})
```

### Usando Aliases no Código

```javascript
// ANTES (caminho relativo longo e confuso)
import { formatarData } from '../../../utils/data.js'
import Button from '../../../components/ui/Button.js'

// DEPOIS (limpo e legível)
import { formatarData } from '@utils/data.js'
import Button from '@components/ui/Button.js'

// Ou simplesmente
import { formatarData } from '@/utils/data.js'
import Button from '@/components/ui/Button.js'
```

### TypeScript e Aliases

Se usar TypeScript, configure também o `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

---

## Servidor de Desenvolvimento

```javascript
// vite.config.js
export default defineConfig({
  server: {
    // Porta (default: 5173)
    port: 3000,

    // Falhar se a porta estiver ocupada (default: false)
    strictPort: true,

    // Abrir navegador automaticamente
    open: true,

    // Abrir em URL específica
    open: '/admin',

    // Host (default: localhost)
    host: true, // Expõe na rede local (0.0.0.0)

    // HTTPS
    https: {
      key: './certs/localhost-key.pem',
      cert: './certs/localhost.pem'
    },

    // Proxy para APIs
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },

    // CORS
    cors: true,

    // Headers customizados
    headers: {
      'X-Custom-Header': 'valor'
    },

    // Hot Module Replacement
    hmr: {
      overlay: true, // Mostrar erros na tela
      port: 24678    // Porta do WebSocket
    },

    // Observar arquivos específicos
    watch: {
      usePolling: true, // Útil em Docker/WSL
      interval: 100
    }
  }
})
```

### Exemplo: Proxy para API Backend

```javascript
// Seu frontend chama /api/users
// Vite redireciona para http://localhost:8080/users

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Log de debug
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`[Proxy] ${req.method} ${req.url} -> ${proxyReq.path}`)
          })
        }
      }
    }
  }
})
```

---

## Configurações de Build

```javascript
// vite.config.js
export default defineConfig({
  build: {
    // Diretório de saída
    outDir: 'dist',

    // Diretório de assets (dentro do outDir)
    assetsDir: 'assets',

    // Inline assets menores que (em bytes)
    assetsInlineLimit: 4096, // 4KB

    // Gerar sourcemaps
    sourcemap: true, // ou 'hidden', 'inline'

    // Minificação (esbuild é default, pode usar terser)
    minify: 'esbuild', // 'esbuild' | 'terser' | false

    // Target de browsers
    target: 'esnext', // ou ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']

    // CSS code splitting
    cssCodeSplit: true,

    // Limpar outDir antes do build
    emptyOutDir: true,

    // Reportar tamanho comprimido
    reportCompressedSize: true,

    // Limite de warning para chunks grandes (em KB)
    chunkSizeWarningLimit: 500,

    // Configurações do Rollup
    rollupOptions: {
      input: {
        main: './index.html',
        admin: './admin.html' // Multi-page app
      },
      output: {
        // Nomes customizados
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',

        // Manual chunks para otimização
        manualChunks: {
          vendor: ['lodash', 'axios'],
          // ou função para lógica customizada
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    }
  }
})
```

### Exemplo: Separar Vendor de App

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separa node_modules em chunk vendor
          if (id.includes('node_modules')) {
            // Bibliotecas grandes em chunks separados
            if (id.includes('lodash')) return 'lodash'
            if (id.includes('chart.js')) return 'charts'
            return 'vendor'
          }
        }
      }
    }
  }
})
```

---

## CSS

```javascript
// vite.config.js
export default defineConfig({
  css: {
    // Opções do preprocessador
    preprocessorOptions: {
      scss: {
        // Variáveis globais disponíveis em todos os arquivos
        additionalData: `@import "@/styles/variables.scss";`
      },
      less: {
        math: 'always',
        globalVars: {
          primaryColor: '#646cff'
        }
      }
    },

    // CSS Modules
    modules: {
      // Padrão de nomes de classes
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      // ou em produção
      generateScopedName: process.env.NODE_ENV === 'production'
        ? '[hash:base64:8]'
        : '[name]__[local]___[hash:base64:5]'
    },

    // PostCSS (pode também usar postcss.config.js)
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')
      ]
    },

    // Dev sourcemaps para CSS
    devSourcemap: true
  }
})
```

---

## Otimização de Dependências

```javascript
// vite.config.js
export default defineConfig({
  optimizeDeps: {
    // Incluir no pré-bundling
    include: [
      'lodash-es',
      'axios',
      // Dependências que são importadas dinamicamente
      'some-dynamic-import'
    ],

    // Excluir do pré-bundling
    exclude: [
      'minha-lib-local' // Libs que você está desenvolvendo
    ],

    // Força re-bundle
    force: true, // Útil para debug, não deixe em produção

    // Entradas adicionais para descoberta de dependências
    entries: [
      './src/**/*.html'
    ],

    // esbuild options
    esbuildOptions: {
      target: 'esnext',
      // Plugins do esbuild
      plugins: []
    }
  }
})
```

---

## Configuração Condicional

### Por Ambiente

```javascript
// vite.config.js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // command: 'serve' (dev) ou 'build' (prod)
  // mode: 'development', 'production', ou custom

  // Carrega variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '')

  // Configuração base
  const config = {
    plugins: [],
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }

  // Configurações específicas por comando
  if (command === 'serve') {
    // Dev-specific
    config.server = {
      port: 3000,
      open: true
    }
  } else {
    // Build-specific
    config.build = {
      sourcemap: mode !== 'production',
      minify: mode === 'production'
    }
  }

  // Configurações por modo
  if (mode === 'staging') {
    config.base = '/staging/'
  }

  return config
})
```

### Por Modo Customizado

```bash
# package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "build:preview": "vite build --mode preview"
  }
}
```

---

## 🎯 Mini-Projeto: Configurando o Dashboard

Vamos criar uma configuração profissional para nosso dashboard:

### Criar vite.config.js

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // Aliases para imports limpos
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  },

  // Servidor de desenvolvimento
  server: {
    port: 3000,
    open: true,
    // Mostra erros na tela
    hmr: {
      overlay: true
    }
  },

  // Build otimizado
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Assets pequenos inline
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Organização dos arquivos
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // CSS em pasta separada
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash][extname]'
          }
          // Imagens em pasta separada
          if (/\.(png|jpg|jpeg|gif|svg|webp)$/.test(assetInfo.name)) {
            return 'images/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },

  // CSS
  css: {
    devSourcemap: true
  }
})
```

### Atualizar imports para usar aliases

```javascript
// src/main.js
import '@/style.css'
import { setupCounter } from '@components/Counter.js'
import { createPerformanceCard } from '@components/PerformanceCard.js'
import { getMetricasPagina, medirTempo } from '@utils/performance.js'

// ... resto do código
```

### Testar a configuração

```bash
# Dev server na porta 3000
npm run dev
# Deve abrir http://localhost:3000 automaticamente

# Build de produção
npm run build

# Verificar estrutura do dist/
ls -la dist/
# dist/
# ├── index.html
# ├── js/
# │   └── main-abc123.js
# ├── css/
# │   └── style-def456.css
# └── images/
```

---

## ✅ Desafio da Aula

### Objetivo
Criar uma configuração que funciona diferente em dev e produção.

### Instruções

1. Em desenvolvimento: servidor na porta 3000, com proxy para `/api` → `https://jsonplaceholder.typicode.com`
2. Em produção: gerar sourcemaps, mas minificar
3. Criar um modo `staging` com base URL `/staging/`

### Spec de Verificação

- [ ] `npm run dev` abre na porta 3000
- [ ] Chamar `fetch('/api/users')` em dev retorna dados do JSONPlaceholder
- [ ] `npm run build` gera arquivos minificados
- [ ] `npm run build -- --mode staging` usa base `/staging/`

### Solução

<details>
<summary>🔍 Clique para ver a solução</summary>

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve'
  const isStaging = mode === 'staging'

  return {
    // Base URL condicional
    base: isStaging ? '/staging/' : '/',

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
      }
    },

    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'https://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },

    build: {
      sourcemap: true,
      minify: mode === 'production' || mode === 'staging',
      outDir: isStaging ? 'dist-staging' : 'dist'
    }
  }
})
```

Adicione ao `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "preview": "vite preview"
  }
}
```

Teste o proxy no console do navegador:

```javascript
fetch('/api/users')
  .then(r => r.json())
  .then(console.log)
// Deve retornar usuários do JSONPlaceholder
```

</details>

---

**Próxima aula:** [1.5 — Plugins do Vite](./1.5-plugins-vite.md)
