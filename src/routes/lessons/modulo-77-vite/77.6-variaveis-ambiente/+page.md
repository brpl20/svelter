---
title: "Variáveis de Ambiente e Modos"
module: 77
order: 6
---

# 77.6 — Variáveis de Ambiente e Modos

> Configure diferentes ambientes (dev, staging, produção) com variáveis seguras.

## Objetivos da Aula

- Entender o sistema de variáveis de ambiente do Vite
- Criar arquivos `.env` para diferentes ambientes
- Diferenciar variáveis públicas e privadas
- Usar modos customizados

---

## Como Variáveis de Ambiente Funcionam

O Vite usa arquivos `.env` para definir variáveis de ambiente:

<div class="not-prose my-6">
  <div class="w-full max-w-2xl mx-auto rounded-xl border border-base-content/10 overflow-hidden">
    <div class="bg-info text-info-content font-bold text-lg text-center py-3">ARQUIVOS .env</div>
    <div class="bg-base-200 p-5 space-y-3">
      <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <span class="font-mono font-semibold text-base-content">.env</span>
        <span class="text-base-content/70">Carregado em TODOS os casos</span>
        <span class="font-mono font-semibold text-base-content">.env.local</span>
        <span class="text-base-content/70">Carregado em todos, ignorado pelo git</span>
        <span class="font-mono font-semibold text-base-content">.env.[mode]</span>
        <span class="text-base-content/70">Carregado apenas no modo especificado</span>
        <span class="font-mono font-semibold text-base-content">.env.[mode].local</span>
        <span class="text-base-content/70">Carregado no modo, ignorado pelo git</span>
      </div>
      <div class="border-t border-base-content/10 pt-3 mt-3">
        <p class="font-semibold text-base-content text-sm mb-2">Ordem de prioridade (maior para menor):</p>
        <ol class="list-none space-y-1 text-sm">
          <li class="flex items-center gap-2">
            <span class="badge badge-info badge-sm font-bold w-5 h-5 shrink-0">1</span>
            <span class="font-mono text-base-content">.env.[mode].local</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="badge badge-info badge-sm font-bold w-5 h-5 shrink-0">2</span>
            <span class="font-mono text-base-content">.env.[mode]</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="badge badge-info badge-sm font-bold w-5 h-5 shrink-0">3</span>
            <span class="font-mono text-base-content">.env.local</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="badge badge-info badge-sm font-bold w-5 h-5 shrink-0">4</span>
            <span class="font-mono text-base-content">.env</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</div>

### Modos Padrão

| Comando | Modo |
|---------|------|
| `vite` / `vite dev` | `development` |
| `vite build` | `production` |
| `vite preview` | `production` |

---

## Criando Arquivos .env

### `.env` — Base (todos os ambientes)

```bash
# .env
# Variáveis compartilhadas entre todos os ambientes

# PÚBLICAS (acessíveis no cliente)
VITE_APP_NAME=Dashboard Vite
VITE_APP_VERSION=1.0.0

# PRIVADAS (só no servidor/build)
DATABASE_URL=postgresql://localhost:5432/mydb
SECRET_KEY=minha-chave-secreta
```

### `.env.development` — Desenvolvimento

```bash
# .env.development
# Sobrescreve .env quando mode=development

VITE_API_URL=http://localhost:8080/api
VITE_DEBUG=true

# Banco de dev
DATABASE_URL=postgresql://localhost:5432/mydb_dev
```

### `.env.production` — Produção

```bash
# .env.production
# Sobrescreve .env quando mode=production

VITE_API_URL=https://api.meuprojeto.com
VITE_DEBUG=false

# Banco de produção (nunca commite senhas reais!)
DATABASE_URL=postgresql://prod-server:5432/mydb_prod
```

### `.env.local` — Local (não commitado)

```bash
# .env.local
# NUNCA vai para o git - para secrets locais

# Chaves pessoais de API
VITE_MAPS_API_KEY=sua-chave-pessoal-aqui
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

### `.gitignore`

```bash
# .gitignore
.env.local
.env.*.local
```

---

## Acessando Variáveis

### No Cliente (VITE_ prefix)

**Importante:** Apenas variáveis com prefixo `VITE_` são expostas ao cliente!

```javascript
// ✅ Funciona - tem prefixo VITE_
console.log(import.meta.env.VITE_APP_NAME)
console.log(import.meta.env.VITE_API_URL)

// ❌ undefined - sem prefixo VITE_
console.log(import.meta.env.DATABASE_URL) // undefined
console.log(import.meta.env.SECRET_KEY)   // undefined
```

### Variáveis Automáticas

```javascript
// Variáveis sempre disponíveis
import.meta.env.MODE       // 'development' ou 'production'
import.meta.env.BASE_URL   // URL base (config.base)
import.meta.env.PROD       // true se production
import.meta.env.DEV        // true se development
import.meta.env.SSR        // true se server-side rendering
```

### Exemplo Prático

```javascript
// src/config.js
export const config = {
  appName: import.meta.env.VITE_APP_NAME,
  apiUrl: import.meta.env.VITE_API_URL,
  debug: import.meta.env.VITE_DEBUG === 'true',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE
}

// Uso condicional
if (config.isDev) {
  console.log('Modo desenvolvimento')
  console.log('Config:', config)
}

// API URL dinâmica
async function fetchData(endpoint) {
  const url = `${config.apiUrl}/${endpoint}`
  return fetch(url).then(r => r.json())
}
```

---

## TypeScript e Variáveis de Ambiente

### Tipagem das Variáveis

Crie um arquivo de tipos:

```typescript
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_API_URL: string
  readonly VITE_DEBUG: string
  readonly VITE_MAPS_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

Agora você tem autocomplete!

```typescript
// TypeScript sabe que essas variáveis existem
const apiUrl = import.meta.env.VITE_API_URL // string
const debug = import.meta.env.VITE_DEBUG    // string
```

---

## Modos Customizados

### Criando um Modo Staging

```bash
# .env.staging
VITE_APP_NAME=Dashboard Vite (Staging)
VITE_API_URL=https://staging-api.meuprojeto.com
VITE_DEBUG=true
```

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "preview": "vite preview"
  }
}
```

### Modo de Preview/QA

```bash
# .env.preview
VITE_APP_NAME=Dashboard Vite (Preview)
VITE_API_URL=https://preview-api.meuprojeto.com
VITE_FEATURE_FLAGS={"newUI":true,"betaFeatures":true}
```

```json
{
  "scripts": {
    "build:preview": "vite build --mode preview"
  }
}
```

---

## Usando no vite.config.js

### Carregando Variáveis na Config

```javascript
// vite.config.js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente
  // process.cwd() = diretório atual
  // '' = prefixo vazio (carrega TODAS as variáveis)
  const env = loadEnv(mode, process.cwd(), '')

  console.log(`Modo: ${mode}`)
  console.log(`API URL: ${env.VITE_API_URL}`)

  return {
    define: {
      // Injeta variáveis customizadas (cuidado com segurança!)
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION)
    },

    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true
        }
      }
    }
  }
})
```

### Variáveis em Tempo de Build

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    // Disponíveis em todo o código
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __COMMIT_HASH__: JSON.stringify(process.env.COMMIT_SHA || 'local')
  }
})
```

```javascript
// No código
console.log(`Build: ${__BUILD_TIME__}`)
console.log(`Commit: ${__COMMIT_HASH__}`)
```

---

## Substituição de Variáveis em HTML

### index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>%VITE_APP_NAME%</title>
    <meta name="version" content="%VITE_APP_VERSION%">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

O Vite substitui `%VITE_*%` automaticamente!

---

## Segurança

### ⚠️ Regras Importantes

<div class="not-prose my-6">
  <div class="w-full max-w-2xl mx-auto rounded-xl border border-base-content/10 overflow-hidden">
    <div class="bg-warning text-warning-content font-bold text-lg text-center py-3">SEGURANCA DE VARIAVEIS</div>
    <div class="bg-base-200 p-5 space-y-4">
      <div class="bg-success/10 border border-success/30 rounded-lg p-4">
        <p class="font-bold text-success text-sm mb-2">VITE_ (publico) &mdash; Visivel no navegador, ok expor</p>
        <ul class="list-disc list-inside text-sm text-base-content/80 space-y-1">
          <li>URLs de API publicas</li>
          <li>Nomes de app</li>
          <li>Feature flags publicos</li>
          <li>Chaves de API publicas (Google Maps, etc)</li>
        </ul>
      </div>
      <div class="bg-base-300/50 border border-base-content/10 rounded-lg p-4">
        <p class="font-bold text-base-content text-sm mb-2">SEM PREFIXO (privado) &mdash; NUNCA exposto, seguro</p>
        <ul class="list-disc list-inside text-sm text-base-content/80 space-y-1">
          <li>Senhas de banco</li>
          <li>Tokens de autenticacao</li>
          <li>Chaves secretas</li>
          <li>API keys privadas</li>
        </ul>
      </div>
      <div class="bg-error/10 border border-error/30 rounded-lg p-4">
        <p class="font-bold text-error text-sm mb-2">NUNCA faca:</p>
        <ul class="list-disc list-inside text-sm text-base-content/80 space-y-1">
          <li><code class="text-error">VITE_DATABASE_PASSWORD=...</code></li>
          <li><code class="text-error">VITE_STRIPE_SECRET_KEY=...</code></li>
          <li>Commitar .env.local</li>
        </ul>
      </div>
    </div>
  </div>
</div>

### Validação de Variáveis

```javascript
// src/env.js
// Valida que todas as variáveis necessárias existem

const requiredEnvVars = [
  'VITE_APP_NAME',
  'VITE_API_URL'
]

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Variável de ambiente ${envVar} não definida!`)
  }
}

export const env = {
  appName: import.meta.env.VITE_APP_NAME,
  apiUrl: import.meta.env.VITE_API_URL,
  debug: import.meta.env.VITE_DEBUG === 'true',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD
}
```

---

## 🎯 Mini-Projeto: Configuração Multi-Ambiente

Vamos configurar nosso Dashboard para múltiplos ambientes:

### Passo 1: Criar arquivos .env

```bash
# .env
VITE_APP_NAME=Dashboard Vite
VITE_APP_VERSION=1.0.0
```

```bash
# .env.development
VITE_API_URL=http://localhost:3001
VITE_DEBUG=true
VITE_ENVIRONMENT=development
```

```bash
# .env.staging
VITE_API_URL=https://staging-api.example.com
VITE_DEBUG=true
VITE_ENVIRONMENT=staging
```

```bash
# .env.production
VITE_API_URL=https://api.example.com
VITE_DEBUG=false
VITE_ENVIRONMENT=production
```

### Passo 2: Criar módulo de configuração

```javascript
// src/config/env.js

// Validação
const required = ['VITE_APP_NAME', 'VITE_API_URL']
for (const key of required) {
  if (!import.meta.env[key]) {
    console.error(`❌ Variável ${key} não definida!`)
  }
}

// Exporta configuração tipada
export const env = {
  app: {
    name: import.meta.env.VITE_APP_NAME,
    version: import.meta.env.VITE_APP_VERSION || '0.0.0'
  },
  api: {
    url: import.meta.env.VITE_API_URL
  },
  flags: {
    debug: import.meta.env.VITE_DEBUG === 'true'
  },
  runtime: {
    mode: import.meta.env.MODE,
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    environment: import.meta.env.VITE_ENVIRONMENT || 'unknown'
  }
}

// Log em desenvolvimento
if (env.flags.debug) {
  console.log('🔧 Configuração carregada:', env)
}
```

### Passo 3: Componente de status do ambiente

```javascript
// src/components/EnvironmentBadge.js

import { env } from '@/config/env.js'

const colors = {
  development: '#22c55e', // verde
  staging: '#f59e0b',     // amarelo
  production: '#ef4444'   // vermelho
}

export function createEnvironmentBadge() {
  const badge = document.createElement('div')
  badge.className = 'environment-badge'
  badge.style.cssText = `
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    background: ${colors[env.runtime.environment] || '#666'};
    color: white;
    z-index: 9999;
  `
  badge.textContent = `${env.runtime.environment} • v${env.app.version}`

  // Não mostra em produção (opcional)
  if (env.runtime.isProd && !env.flags.debug) {
    badge.style.display = 'none'
  }

  return badge
}
```

### Passo 4: Atualizar main.js

```javascript
// src/main.js
import '@/style.css'
import { env } from '@/config/env.js'
import { createEnvironmentBadge } from '@components/EnvironmentBadge.js'
// ... outros imports

function renderApp() {
  // ... código existente

  // Adiciona badge de ambiente
  document.body.appendChild(createEnvironmentBadge())

  // Atualiza título com nome do app
  document.title = `${env.app.name} - ${env.runtime.environment}`
}

renderApp()
```

### Passo 5: Scripts no package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "preview": "vite preview",
    "preview:staging": "vite preview --mode staging"
  }
}
```

---

## ✅ Desafio da Aula

### Objetivo
Criar um sistema de feature flags baseado em variáveis de ambiente.

### Instruções

1. Crie uma variável `VITE_FEATURE_FLAGS` com JSON de features
2. Crie um módulo que parseia e expõe as flags
3. Use as flags para mostrar/esconder um card "Beta Features"

### Exemplo de .env

```bash
VITE_FEATURE_FLAGS={"darkMode":true,"betaCard":true,"analytics":false}
```

### Spec de Verificação

- [ ] O módulo `featureFlags` exporta um objeto com as flags
- [ ] Quando `betaCard: true`, um card especial aparece no dashboard
- [ ] Quando `betaCard: false`, o card não aparece

### Solução

<details>
<summary>🔍 Clique para ver a solução</summary>

```javascript
// src/config/features.js
const flagsJson = import.meta.env.VITE_FEATURE_FLAGS || '{}'

let flags = {}
try {
  flags = JSON.parse(flagsJson)
} catch (e) {
  console.error('Erro ao parsear feature flags:', e)
}

export const featureFlags = {
  darkMode: flags.darkMode ?? false,
  betaCard: flags.betaCard ?? false,
  analytics: flags.analytics ?? false
}

export function isEnabled(flag) {
  return featureFlags[flag] === true
}
```

```javascript
// src/components/BetaCard.js
import { isEnabled } from '@/config/features.js'

export function createBetaCard() {
  if (!isEnabled('betaCard')) {
    return null
  }

  const card = document.createElement('div')
  card.className = 'performance-card beta-card'
  card.innerHTML = `
    <span class="beta-badge">BETA</span>
    <h3 class="card-title">Funcionalidade Beta</h3>
    <p>Esta é uma funcionalidade experimental!</p>
  `
  return card
}
```

```javascript
// src/main.js
import { createBetaCard } from '@components/BetaCard.js'

// Na função de render
const betaCard = createBetaCard()
if (betaCard) {
  document.querySelector('.cards-grid').appendChild(betaCard)
}
```

</details>

---

**Próxima aula:** [77.7 — Build de Produção e Otimização](../77.7-build-producao)
