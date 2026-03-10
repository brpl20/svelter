---
title: "O que é o Vite e por que ele existe"
module: 2
order: 1
---

<script>
import Tip from '$lib/components/Tip.svelte';
import Question from '$lib/components/Question.svelte';
</script>

# 2.1 — O que é o Vite e por que ele existe

> Entenda o problema que o Vite resolve e por que ele é tão mais rápido que bundlers tradicionais.

## Objetivos da Aula

- Compreender o contexto histórico dos bundlers JavaScript
- Entender os problemas de performance do Webpack e similares
- Conhecer a abordagem revolucionária do Vite com ESModules nativos

---

## O Problema: A Era do Bundling

Antes dos ES Modules serem suportados nativamente pelos navegadores, não existia uma forma nativa de escrever JavaScript modular. Por isso surgiu o conceito de **bundling**: ferramentas que processam, transformam e concatenam seus módulos em arquivos que o navegador consegue executar.

### Como funcionam os bundlers tradicionais

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
  <div class="bg-primary text-primary-content px-4 py-2 font-bold text-center text-sm sm:text-base tracking-wide">WEBPACK / PARCEL</div>
  <div class="p-4 sm:p-6">
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
      <div class="bg-base-100 rounded-lg border border-base-content/10 p-4 font-mono text-sm text-base-content w-full sm:w-auto">
        <div class="font-bold mb-1">src/</div>
        <div class="pl-3">├── index.js</div>
        <div class="pl-3">├── App.svelte</div>
        <div class="pl-3">├── utils.js</div>
        <div class="pl-3">└── styles.css</div>
      </div>
      <div class="flex flex-col items-center text-base-content font-bold text-sm shrink-0">
        <span class="hidden sm:inline text-2xl">→</span>
        <span class="sm:hidden text-2xl">▼</span>
        <span class="text-xs uppercase tracking-wider opacity-70">Bundler</span>
        <span class="hidden sm:inline text-2xl">→</span>
        <span class="sm:hidden text-2xl">▼</span>
      </div>
      <div class="bg-base-100 rounded-lg border border-base-content/10 p-4 text-center text-base-content w-full sm:w-auto">
        <div class="font-bold font-mono text-sm mb-1">bundle.js</div>
        <div class="text-sm opacity-80">Todo codigo</div>
        <div class="text-sm opacity-80">concatenado</div>
        <div class="text-sm opacity-80">e otimizado</div>
      </div>
    </div>
    <div class="mt-4 pt-4 border-t border-base-content/10 space-y-1 text-sm text-base-content/80">
      <div>⏱️ Tempo: 2-5 segundos (projeto pequeno)</div>
      <div>⏱️ Tempo: 30s - 2min (projeto grande)</div>
    </div>
  </div>
</div>

O bundler precisa:
1. Ler **todos** os arquivos do projeto
2. Construir um grafo de dependências completo
3. Transformar o código (TypeScript, JSX, etc.)
4. Concatenar tudo em um ou mais bundles
5. **Só então** servir para o navegador

### O problema de escala

Projetos modernos podem ter **milhares de módulos**. Em aplicações grandes:

- O servidor de desenvolvimento pode levar **minutos** para iniciar
- Alterações simples podem demorar **segundos** para aparecer no navegador
- O Hot Module Replacement (HMR) fica lento conforme o projeto cresce

<Tip title="O que é HMR?">
HMR (Hot Module Replacement) é a capacidade do servidor de desenvolvimento de atualizar módulos no navegador <strong>sem recarregar a página inteira</strong>. Quando você edita um arquivo, apenas aquele módulo é substituído em tempo real, preservando o estado da aplicação. Bundlers tradicionais como Webpack precisam recalcular dependências a cada mudança, o que fica cada vez mais lento em projetos grandes.
</Tip>

```text
src/
├── components/     150 componentes
├── pages/          50 páginas
├── utils/          80 utilitários
├── hooks/          40 hooks
├── services/       30 serviços
└── styles/         60 arquivos CSS

Total: ~400+ módulos
Webpack cold start: 15-45 segundos
Webpack HMR: 500ms - 2s por edição
```

---

## A Solução: Vite e ESModules Nativos

O Vite resolve esse problema com uma abordagem fundamentalmente diferente: **não fazer bundling durante o desenvolvimento**.

### ESModules Nativos no Navegador

Desde 2018, todos os navegadores modernos suportam ESModules nativamente:

```html
<!-- O navegador entende isso nativamente agora! -->
<script type="module" src="/src/main.ts"></script>
```

```typescript
// main.ts
// imports funcionam direto no navegador!
import { createApp } from './app.ts'
import { formatDate } from './utils/date.ts'

createApp()
```

### Como o Vite funciona

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
  <div class="bg-secondary text-secondary-content px-4 py-2 font-bold text-center text-sm sm:text-base tracking-wide">VITE</div>
  <div class="p-4 sm:p-6 flex flex-col items-center gap-3">
    <div class="bg-base-100 rounded-lg border border-base-content/10 px-4 py-3 text-base-content text-sm text-center w-full sm:w-auto">
      <span class="opacity-70">Navegador solicita:</span> <code class="font-mono font-bold">/src/main.js</code>
    </div>
    <div class="text-2xl text-base-content">▼</div>
    <div class="bg-base-100 rounded-lg border border-base-content/10 p-4 text-base-content text-sm w-full sm:max-w-md">
      <div class="font-bold mb-2">Servidor Dev Vite</div>
      <ol class="list-decimal list-inside space-y-1 opacity-90">
        <li>Intercepta a requisicao</li>
        <li>Transforma <strong>SO</strong> esse arquivo</li>
        <li>Retorna imediatamente</li>
      </ol>
    </div>
    <div class="text-2xl text-base-content">▼</div>
    <div class="bg-base-100 rounded-lg border border-base-content/10 px-4 py-3 text-base-content text-sm text-center w-full sm:w-auto">
      Navegador recebe <code class="font-mono font-bold">main.js</code> e faz<br>mais requisicoes para os imports
    </div>
    <div class="mt-2 pt-3 border-t border-base-content/10 space-y-1 text-sm text-base-content/80 w-full">
      <div>⏱️ Cold start: ~170ms</div>
      <div>⏱️ HMR: 10-20ms</div>
    </div>
  </div>
</div>

O Vite **delega o trabalho de resolução de módulos para o navegador**. Ele só transforma os arquivos quando são solicitados.

---

## Comparativo de Performance

| Métrica | Webpack | Vite |
|---------|---------|------|
| Cold Start (projeto médio) | 2.5s - 10s | ~170ms |
| Cold Start (projeto grande) | 30s - 2min | ~500ms |
| HMR (edição simples) | 500ms - 1.6s | 10-20ms |
| Escala com nº de módulos | Performance degrada | Performance constante |

### Por que essa diferença?

**Webpack**: Precisa processar **todo** o projeto antes de servir qualquer coisa.

**Vite**: Processa apenas o que é solicitado, **sob demanda**.


---

## Exemplo Prático: Sentindo a Diferença

Vamos criar dois projetos idênticos para sentir a diferença:

### Projeto com Webpack

```bash
# NÃO execute isso agora, é só para ilustração
mkdir meu-app-webpack && cd meu-app-webpack
pnpm init
pnpm add webpack webpack-cli webpack-dev-server html-webpack-plugin
# configurar webpack.config.js manualmente...
pnpm dlx webpack serve

# ⏱️ Tempo até ver algo no navegador: ~15-30 segundos
```

### Projeto com Vite

```bash
# Vamos criar esse!
pnpm create vite@latest meu-app-vite -- --template svelte-ts
cd meu-app-vite
pnpm install
pnpm dev

# ⏱️ Tempo até ver algo no navegador: ~2-3 segundos
```

---

## As Duas Faces do Vite

O Vite funciona de forma diferente em desenvolvimento e produção:

### Desenvolvimento
- Usa ESModules nativos
- Não faz bundling
- Transforma arquivos sob demanda
- HMR ultra-rápido

<Question question="O que é HMR?">
HMR (Hot Module Replacement) permite que o navegador <strong>substitua módulos individuais em tempo real</strong>, sem recarregar a página inteira. Isso preserva o estado da aplicação enquanto você edita o código, tornando o ciclo de desenvolvimento muito mais rápido.
</Question>

### Produção
- Usa Rollup para bundling
- Gera bundles otimizados
- Tree-shaking, minificação
- Code splitting automático

<Question question="O que é Rollup?">
Rollup é um <strong>bundler de módulos JavaScript</strong> otimizado para gerar pacotes de produção pequenos e eficientes. Ele entende nativamente ESModules e é excelente em eliminar código não utilizado. O Vite usa o Rollup internamente para o build de produção.
</Question>

<Question question="O que é Tree-Shaking?">
Tree-shaking é o processo de <strong>eliminar código morto</strong> (dead code) do bundle final. Se você importa uma biblioteca mas usa apenas uma função dela, o tree-shaking remove todo o restante. O nome vem da analogia de "sacudir a árvore" para derrubar folhas mortas.
</Question>

<div class="not-prose my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div class="rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
    <div class="bg-info text-info-content px-4 py-2 font-bold text-center text-sm tracking-wide">DESENVOLVIMENTO</div>
    <div class="p-4 text-base-content text-sm space-y-2">
      <div class="font-mono">ESModules Nativos + esbuild</div>
      <div class="pt-2 border-t border-base-content/10 opacity-80"><strong>Foco:</strong> Velocidade de desenvolvimento</div>
    </div>
  </div>
  <div class="rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
    <div class="bg-accent text-accent-content px-4 py-2 font-bold text-center text-sm tracking-wide">PRODUCAO</div>
    <div class="p-4 text-base-content text-sm space-y-2">
      <div class="font-mono">Rollup Bundle + Otimizacoes</div>
      <div class="pt-2 border-t border-base-content/10 opacity-80"><strong>Foco:</strong> Tamanho e performance</div>
    </div>
  </div>
</div>

---

## Tecnologias por Trás do Vite

### esbuild
Escrito em **Go**, é 10-100x mais rápido que bundlers JavaScript. O Vite usa para:
- Pré-compilar dependências
- Transformar TypeScript/JSX

### Rollup
Bundler maduro e otimizado. O Vite usa para:
- Build de produção
- Code splitting
- Tree-shaking

---

## Resumo

| Conceito | Descrição |
|----------|-----------|
| **Bundlers tradicionais** | Processam todo o projeto antes de servir |
| **ESModules nativos** | Navegadores modernos entendem imports diretamente |
| **Vite dev server** | Transforma arquivos sob demanda, não faz bundle |
| **esbuild** | Pré-compilador ultra-rápido escrito em Go |
| **Rollup** | Bundler usado apenas no build de produção |

---

## 🎯 Mini-Projeto: Primeiros Passos

Nesta aula, vamos **criar a base** do nosso Dashboard de Performance:

### Passo 1: Criar o projeto

```bash
# Navegue até a pasta onde quer criar o projeto
cd ~/projetos  # ou sua pasta preferida

# Crie o projeto Vite
pnpm create vite@latest dashboard-vite -- --template svelte-ts

# Entre na pasta
cd dashboard-vite

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

### Passo 2: Observe o tempo de inicialização

Quando rodar `pnpm dev`, observe:
- Quanto tempo levou para o servidor iniciar?
- A mensagem mostra algo como `ready in XXX ms`

```bash
# Você deve ver algo assim:
  VITE v5.x.x  ready in 237 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Passo 3: Explore a estrutura criada

```text
dashboard-vite/
├── index.html          # Ponto de entrada (note o script type="module")
├── src/
│   ├── App.svelte      # Componente principal
│   ├── main.ts         # Módulo principal
│   ├── app.css         # Estilos
│   └── vite-env.d.ts   # Tipos do Vite
├── public/             # Arquivos estáticos
│   └── vite.svg
├── svelte.config.js    # Configuração do Svelte
├── tsconfig.json       # Configuração do TypeScript
├── vite.config.ts      # Configuração do Vite
├── package.json        # Dependências e scripts
└── node_modules/       # Dependências instaladas
```

### Passo 4: Abra o index.html e observe

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- Note o type="module" - isso ativa ESModules nativos! -->
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

---

## ✅ Desafio da Aula

### Objetivo
Modificar o projeto criado para exibir o tempo de carregamento da página.

### Instruções

1. Abra o arquivo `main.ts`
2. Adicione código para medir e exibir quanto tempo a página levou para carregar
3. O tempo deve aparecer na tela, dentro do `#app`

### Dica
Use `performance.now()` para medir o tempo:

```typescript
const inicio: number = performance.now()
// ... código ...
const fim: number = performance.now()
const tempo: number = fim - inicio
```

### Spec de Verificação

Seu desafio está completo quando:

- [ ] A página exibe o tempo de carregamento em milissegundos
- [ ] O tempo aparece em algum lugar visível na página
- [ ] O console não mostra erros

### Solução (só olhe depois de tentar!)

<details>
<summary>🔍 Clique para ver a solução</summary>

```typescript
// main.ts
import './style.css'
import { setupCounter } from './counter.ts'

// Marca o início
const inicioCarregamento: number = performance.now()

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <h1>Dashboard Vite</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p id="tempo-carregamento" class="read-the-docs">
      Calculando tempo de carregamento...
    </p>
  </div>
`

setupCounter(
  document.querySelector<HTMLButtonElement>('#counter')!
)

// Calcula e exibe o tempo após o DOM ser atualizado
requestAnimationFrame(() => {
  const fimCarregamento: number = performance.now()
  const tempoTotal: string =
    (fimCarregamento - inicioCarregamento).toFixed(2)

  document
    .querySelector('#tempo-carregamento')!
    .textContent = `Página carregada em ${tempoTotal}ms`
})
```

</details>

---

## 🧪 Exercício Interativo

Pratique o que aprendeu com o exercício interativo!

📁 **Local:** `exercicios/modulo-01/exercicio-1.1/`

```bash
cd ../../exercicios/modulo-01/exercicio-1.1
pnpm install
pnpm test
```

No exercício você vai criar funções para:
- Medir tempo de execução de funções
- Formatar o tempo em milissegundos ou segundos

**Todos os testes passando = aula concluída com sucesso!** ✅

---

## 📚 Recursos Adicionais

- [Por que Vite? - Documentação Oficial](https://vite.dev/guide/why)
- [Features do Vite](https://vite.dev/guide/features)

---

**Próxima aula:** [2.2 — Arquitetura do Vite](../2.2-arquitetura-vite)
