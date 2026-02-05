---
title: "Filosofia: Compilador vs Runtime"
module: 2
order: 1
---

# 2.1 — Filosofia: Compilador vs Runtime

> A diferença fundamental que define tudo o mais.

## Objetivos da Aula

- Entender a diferença entre abordagem de compilador e runtime
- Compreender o que significa "Svelte desaparece"
- Analisar o impacto no tamanho do bundle e performance

---

## A Grande Divisão

A diferença mais fundamental entre Svelte e React está na **quando** o trabalho é feito:

<div class="not-prose my-8 rounded-xl border border-base-content/10 bg-base-200 p-6 space-y-8">
  <h3 class="text-center text-lg font-bold text-base-content tracking-wide uppercase">Quando o Trabalho Acontece</h3>

  <!-- React -->
  <div class="rounded-lg border border-blue-400/30 bg-blue-950/20 p-5 space-y-4">
    <p class="font-semibold text-blue-400 text-sm uppercase tracking-wider">React (Runtime)</p>
    <div class="flex flex-wrap items-center justify-center gap-3 text-sm">
      <div class="rounded-lg border border-blue-400/40 bg-blue-900/30 px-4 py-3 text-center text-blue-200 min-w-[7rem]">
        <div class="font-bold">Seu Codigo</div><div class="text-xs opacity-70">JSX</div>
      </div>
      <span class="text-blue-400 text-xl font-bold">&rarr;</span>
      <div class="rounded-lg border border-blue-400/40 bg-blue-900/30 px-4 py-3 text-center text-blue-200 min-w-[7rem]">
        <div class="font-bold">Bundle</div><div class="text-xs opacity-70">React + seu app</div>
      </div>
      <span class="text-blue-400 text-xl font-bold">&rarr;</span>
      <div class="rounded-lg border border-blue-400/40 bg-blue-900/30 px-4 py-3 text-center text-blue-200 min-w-[7rem]">
        <div class="font-bold">Runtime</div><div class="text-xs opacity-70">executa no navegador</div>
      </div>
      <span class="text-blue-400 text-xl font-bold">&rarr;</span>
      <div class="rounded-lg border border-blue-400/40 bg-blue-900/30 px-4 py-3 text-center text-blue-200 min-w-[7rem]">
        <div class="font-bold">DOM</div><div class="text-xs opacity-70">atualizado</div>
      </div>
    </div>
    <div class="space-y-1">
      <p class="text-xs text-blue-300 font-semibold">Trabalho:</p>
      <div class="flex h-5 w-full overflow-hidden rounded-full bg-base-300">
        <div class="h-full bg-blue-900/40" style="width:30%"></div>
        <div class="h-full bg-blue-500" style="width:70%"></div>
      </div>
      <div class="flex justify-between text-xs text-blue-300/80">
        <span>Build</span>
        <span>Navegador (runtime pesado)</span>
      </div>
    </div>
  </div>

  <!-- Svelte -->
  <div class="rounded-lg border border-orange-400/30 bg-orange-950/20 p-5 space-y-4">
    <p class="font-semibold text-orange-400 text-sm uppercase tracking-wider">Svelte (Compilador)</p>
    <div class="flex flex-wrap items-center justify-center gap-3 text-sm">
      <div class="rounded-lg border border-orange-400/40 bg-orange-900/30 px-4 py-3 text-center text-orange-200 min-w-[7rem]">
        <div class="font-bold">Seu Codigo</div><div class="text-xs opacity-70">.svelte</div>
      </div>
      <span class="text-orange-400 text-xl font-bold">&rarr;</span>
      <div class="rounded-lg border border-orange-400/40 bg-orange-900/30 px-4 py-3 text-center text-orange-200 min-w-[7rem]">
        <div class="font-bold">Compilador</div><div class="text-xs opacity-70">Svelte (build)</div>
      </div>
      <span class="text-orange-400 text-xl font-bold">&rarr;</span>
      <div class="rounded-lg border border-orange-400/40 bg-orange-900/30 px-4 py-3 text-center text-orange-200 min-w-[7rem]">
        <div class="font-bold">JS otimizado</div><div class="text-xs opacity-70">zero runtime</div>
      </div>
      <span class="text-orange-400 text-xl font-bold">&rarr;</span>
      <div class="rounded-lg border border-orange-400/40 bg-orange-900/30 px-4 py-3 text-center text-orange-200 min-w-[7rem]">
        <div class="font-bold">DOM</div><div class="text-xs opacity-70">atualizado</div>
      </div>
    </div>
    <div class="space-y-1">
      <p class="text-xs text-orange-300 font-semibold">Trabalho:</p>
      <div class="flex h-5 w-full overflow-hidden rounded-full bg-base-300">
        <div class="h-full bg-orange-500" style="width:70%"></div>
        <div class="h-full bg-orange-900/40" style="width:30%"></div>
      </div>
      <div class="flex justify-between text-xs text-orange-300/80">
        <span>Build (compilacao pesada)</span>
        <span>Navegador (leve)</span>
      </div>
    </div>
  </div>
</div>

---

## React: O Caminho do Runtime

### Como React Funciona

1. Você escreve **JSX** (uma extensão de sintaxe)
2. Babel transforma JSX em chamadas `React.createElement()`
3. O **React Runtime** (biblioteca) é enviado ao navegador
4. O runtime gerencia o **Virtual DOM**
5. A cada mudança de estado, o runtime:
   - Re-executa a função do componente
   - Gera nova árvore Virtual DOM
   - Compara com a anterior (diffing)
   - Aplica mudanças mínimas ao DOM real

```jsx
// O que você escreve
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>
    {count}
  </button>
}

// O que vai para o navegador (simplificado)
function Counter() {
  const [count, setCount] = React.useState(0);
  return React.createElement(
    "button",
    { onClick: () => setCount(c => c + 1) },
    count
  );
}

// + 40KB+ do React Runtime
// + 10KB+ do ReactDOM
// = 50KB+ antes do seu código
```

### O Custo do Runtime

```javascript
// React Runtime precisa:
// 1. Sistema de Virtual DOM
// 2. Algoritmo de Reconciliação (diffing)
// 3. Sistema de Hooks
// 4. Scheduler (Concurrent Mode)
// 5. Sistema de Eventos Sintéticos

// Tudo isso: ~50KB+ gzipped
```

---

## Svelte: O Caminho do Compilador

### Como Svelte Funciona

1. Você escreve código **`.svelte`**
2. O **Compilador Svelte** analisa seu código no build
3. Gera **JavaScript vanilla otimizado**
4. **Nenhum runtime** é enviado ao navegador
5. O código gerado manipula o DOM **diretamente**

```svelte
<!-- O que você escreve -->
<script>
  let count = 0
</script>

<button on:click={() => count++}>
  {count}
</button>
```

```javascript
// O que o compilador gera (simplificado)
function create_fragment(ctx) {
  let button;
  let t;

  return {
    c() {
      button = element("button");
      t = text(ctx[0]); // count
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t);
      // Event listener direto, sem sistema de eventos sintéticos
      button.addEventListener("click", ctx[1]);
    },
    p(ctx, [dirty]) {
      // Atualização cirúrgica - só muda o texto se count mudou
      if (dirty & 1) set_data(t, ctx[0]);
    },
    d(detaching) {
      if (detaching) detach(button);
      button.removeEventListener("click", ctx[1]);
    }
  };
}

// Helpers mínimos: ~2KB
// Seu componente: ~0.5KB
// Total: ~2.5KB
```

### O que "Svelte Desaparece" Significa

<div class="not-prose my-8 rounded-xl border border-base-content/10 bg-base-200 p-6 space-y-6">
  <h3 class="text-center text-lg font-bold text-base-content tracking-wide uppercase">Svelte Desaparece</h3>

  <!-- Build Time -->
  <div class="space-y-2">
    <p class="text-sm font-semibold text-orange-400">Tempo de Build:</p>
    <div class="rounded-lg border border-orange-400/30 bg-orange-950/20 p-4">
      <div class="flex flex-wrap items-center justify-center gap-3 text-sm">
        <div class="rounded border border-orange-400/40 bg-orange-900/30 px-4 py-2 text-center text-orange-200">
          <div class="font-bold">Seu codigo</div><div class="text-xs opacity-70">.svelte</div>
        </div>
        <span class="text-orange-400 text-xl font-bold">&rarr;</span>
        <div class="rounded border border-orange-400/40 bg-orange-900/30 px-4 py-2 text-center text-orange-200">
          <div class="font-bold">Compilador Svelte</div><div class="text-xs opacity-70">faz todo trabalho</div>
        </div>
        <span class="text-orange-400 text-xl font-bold">&rarr;</span>
        <div class="rounded border border-orange-400/40 bg-orange-900/30 px-4 py-2 text-center text-orange-200">
          <div class="font-bold">JS puro</div><div class="text-xs opacity-70">output</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Runtime -->
  <div class="space-y-2">
    <p class="text-sm font-semibold text-green-400">Runtime (navegador):</p>
    <div class="rounded-lg border border-green-400/30 bg-green-950/20 p-4 space-y-1 text-sm text-green-200">
      <p>Apenas o JS gerado executa</p>
      <p>Nao existe "Svelte" rodando</p>
      <p>So JavaScript vanilla manipulando DOM</p>
    </div>
  </div>

  <p class="text-center text-base-content font-semibold italic">"Svelte desaparece" = O framework nao existe em runtime</p>
</div>

---

## Comparação Visual: Virtual DOM vs DOM Direto

### React (Virtual DOM)

<div class="not-prose my-8 rounded-xl border border-blue-400/20 bg-blue-950/20 p-6 space-y-4">
  <p class="text-sm text-blue-300 font-mono">Estado muda: count = 1 &rarr; count = 2</p>
  <div class="space-y-3">
    <div class="flex items-start gap-3">
      <span class="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">1</span>
      <div class="text-sm text-blue-200">
        <p class="font-semibold">Re-executa toda a funcao do componente</p>
      </div>
    </div>
    <div class="ml-3 text-blue-400">&darr;</div>
    <div class="flex items-start gap-3">
      <span class="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">2</span>
      <div class="text-sm text-blue-200">
        <p class="font-semibold">Cria NOVA arvore Virtual DOM</p>
        <p class="font-mono text-xs opacity-70">&#123; type: 'button', props: &#123; children: 2 &#125; &#125;</p>
      </div>
    </div>
    <div class="ml-3 text-blue-400">&darr;</div>
    <div class="flex items-start gap-3">
      <span class="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">3</span>
      <div class="text-sm text-blue-200">
        <p class="font-semibold">COMPARA com arvore anterior (diffing)</p>
        <p class="font-mono text-xs opacity-70">&#123; type: 'button', props: &#123; children: 1 &#125; &#125;</p>
        <p class="text-xs opacity-70">&rarr; Encontra diferenca: children mudou</p>
      </div>
    </div>
    <div class="ml-3 text-blue-400">&darr;</div>
    <div class="flex items-start gap-3">
      <span class="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">4</span>
      <div class="text-sm text-blue-200">
        <p class="font-semibold">Aplica mudanca minima ao DOM real</p>
        <p class="font-mono text-xs opacity-70">textNode.textContent = 2</p>
      </div>
    </div>
  </div>
  <div class="mt-4 rounded-lg bg-blue-900/30 px-4 py-2 text-center text-sm font-semibold text-blue-300">
    Trabalho: Re-render + Diff + Patch = 3 passos
  </div>
</div>

### Svelte (DOM Direto)

<div class="not-prose my-8 rounded-xl border border-orange-400/20 bg-orange-950/20 p-6 space-y-4">
  <p class="text-sm text-orange-300 font-mono">Estado muda: count = 1 &rarr; count = 2</p>
  <div class="space-y-3">
    <div class="flex items-start gap-3">
      <span class="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">1</span>
      <div class="text-sm text-orange-200">
        <p class="font-semibold">Compilador JA SABE que <code class="text-xs">count</code> afeta o textNode</p>
        <p class="text-xs opacity-70">(analise estatica em tempo de build)</p>
      </div>
    </div>
    <div class="ml-3 text-orange-400">&darr;</div>
    <div class="flex items-start gap-3">
      <span class="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">2</span>
      <div class="text-sm text-orange-200">
        <p class="font-semibold">Codigo gerado atualiza DIRETAMENTE</p>
        <p class="font-mono text-xs opacity-70">if (dirty &amp; 1) textNode.data = count</p>
      </div>
    </div>
  </div>
  <div class="mt-4 rounded-lg bg-orange-900/30 px-4 py-2 text-center text-sm font-semibold text-orange-300">
    Trabalho: Update direto = 1 passo
  </div>
  <div class="mt-3 rounded-lg bg-red-950/30 border border-red-400/20 px-4 py-3 text-sm text-red-300 space-y-1">
    <p class="font-semibold">Nao existe:</p>
    <p class="flex items-center gap-2"><span class="text-red-400 font-bold">&#10007;</span> Re-execucao de funcao</p>
    <p class="flex items-center gap-2"><span class="text-red-400 font-bold">&#10007;</span> Criacao de objetos Virtual DOM</p>
    <p class="flex items-center gap-2"><span class="text-red-400 font-bold">&#10007;</span> Algoritmo de diff</p>
  </div>
</div>

---

## O Poder da Análise Estática

O compilador Svelte faz **análise estática** do seu código:

```svelte
<script>
  let name = 'mundo'        // ← Variável reativa
  let count = 0             // ← Variável reativa
  const PI = 3.14159        // ← Constante (não precisa rastrear)

  function increment() {
    count += 1              // ← Compilador sabe que isso muda `count`
  }
</script>

<h1>Olá, {name}!</h1>        <!-- Depende de `name` -->
<p>Contagem: {count}</p>     <!-- Depende de `count` -->
<p>Pi: {PI}</p>              <!-- Depende de `PI` (constante) -->
<button on:click={increment}>+</button>
```

O compilador **sabe em tempo de build**:
- Quais variáveis são reativas
- Quais partes do DOM dependem de cada variável
- Quais atualizações são necessárias quando algo muda

```javascript
// Código gerado (simplificado)
p(ctx, [dirty]) {
  // `dirty` é um bitmask indicando O QUE mudou

  // Se `name` mudou (bit 0)
  if (dirty & 1) set_data(t0, ctx[0]); // Atualiza "Olá, {name}!"

  // Se `count` mudou (bit 1)
  if (dirty & 2) set_data(t1, ctx[1]); // Atualiza "Contagem: {count}"

  // PI nunca muda, então não há código para atualizá-lo!
}
```

---

## Implicações Práticas

### Tamanho do Bundle

<div class="not-prose my-8 rounded-xl border border-base-content/10 bg-base-200 p-6 space-y-6">
  <h3 class="text-center text-lg font-bold text-base-content">Aplicacao "Hello World" com contador</h3>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- React -->
    <div class="rounded-lg border border-blue-400/30 bg-blue-950/20 p-4 space-y-3">
      <p class="font-semibold text-blue-400 text-sm uppercase tracking-wider">React</p>
      <div class="space-y-2 text-sm text-blue-200">
        <div class="flex justify-between"><span class="font-mono">react.production.min.js</span><span class="font-semibold">~2.5 KB</span></div>
        <div class="flex justify-between"><span class="font-mono">react-dom.production.min.js</span><span class="font-semibold">~40 KB</span></div>
        <div class="flex justify-between"><span class="font-mono">seu codigo</span><span class="font-semibold">~0.5 KB</span></div>
      </div>
      <div class="border-t border-blue-400/20 pt-2 flex justify-between text-blue-300 font-bold">
        <span>TOTAL</span><span>~43 KB</span>
      </div>
      <div class="h-4 w-full rounded-full bg-base-300 overflow-hidden">
        <div class="h-full bg-blue-500 rounded-full" style="width:100%"></div>
      </div>
    </div>

    <!-- Svelte -->
    <div class="rounded-lg border border-orange-400/30 bg-orange-950/20 p-4 space-y-3">
      <p class="font-semibold text-orange-400 text-sm uppercase tracking-wider">Svelte</p>
      <div class="space-y-2 text-sm text-orange-200">
        <div class="flex justify-between"><span class="font-mono">runtime helpers</span><span class="font-semibold">~2 KB</span></div>
        <div class="flex justify-between"><span class="font-mono">seu codigo compilado</span><span class="font-semibold">~1.5 KB</span></div>
      </div>
      <div class="border-t border-orange-400/20 pt-2 flex justify-between text-orange-300 font-bold">
        <span>TOTAL</span><span>~3.5 KB</span>
      </div>
      <div class="h-4 w-full rounded-full bg-base-300 overflow-hidden">
        <div class="h-full bg-orange-500 rounded-full" style="width:8%"></div>
      </div>
    </div>
  </div>

  <p class="text-center text-lg font-bold text-green-400">Svelte e ~12x menor!</p>
</div>

### Escalabilidade do Bundle

```text
Conforme sua aplicação cresce:

React:
  Base: ~43 KB (runtime fixo)
  + Componentes: cresce linearmente
  + Bibliotecas (Redux, etc): +30-50 KB

Svelte:
  Base: ~2 KB (helpers mínimos)
  + Componentes: cresce linearmente (mas código mais eficiente)
  + Stores nativos: 0 KB adicional

Em apps grandes, a diferença diminui proporcionalmente,
mas Svelte sempre começa menor.
```

### Performance de Atualização

```javascript
// Benchmark: Atualizar 1000 itens em uma lista

// React (Virtual DOM)
// 1. Cria 1000 objetos Virtual DOM novos
// 2. Compara com 1000 objetos anteriores
// 3. Identifica mudanças
// 4. Aplica ao DOM
// Tempo: ~15-25ms

// Svelte (DOM Direto)
// 1. Atualiza diretamente os elementos que mudaram
// Tempo: ~3-8ms
```

---

## Quando Cada Abordagem Brilha

### React (Runtime) é Melhor Quando:

- 🏢 **Ecossistema é prioridade** — milhares de bibliotecas
- 👥 **Time grande** — mais fácil encontrar desenvolvedores
- 🔄 **Mudanças dinâmicas intensas** — Virtual DOM amortiza custo
- 🧪 **Padrões estabelecidos** — arquiteturas bem documentadas

### Svelte (Compilador) é Melhor Quando:

- ⚡ **Performance é crítica** — apps que precisam ser rápidos
- 📱 **Mobile/Low-end devices** — menos JS = mais rápido
- 📦 **Bundle size importa** — landing pages, widgets, embeds
- 🎯 **DX é prioridade** — menos boilerplate, código mais limpo
- 🆕 **Projeto novo** — sem bagagem de código legado

---

## Exemplo Comparativo Completo

### React

```jsx
// Counter.jsx
import { useState, useCallback, useMemo } from 'react'
import './Counter.css'

export function Counter({ initialValue = 0, step = 1 }) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => {
    setCount(c => c + step)
  }, [step])

  const decrement = useCallback(() => {
    setCount(c => c - step)
  }, [step])

  const isEven = useMemo(() => count % 2 === 0, [count])

  return (
    <div className="counter">
      <span className={isEven ? 'even' : 'odd'}>
        {count}
      </span>
      <button onClick={decrement}>-{step}</button>
      <button onClick={increment}>+{step}</button>
    </div>
  )
}

// Linhas: 24
// Imports: 3 hooks
// Bundle: +43KB base + código
```

### Svelte

```svelte
<!-- Counter.svelte -->
<script>
  export let initialValue = 0
  export let step = 1

  let count = initialValue

  function increment() {
    count += step
  }

  function decrement() {
    count -= step
  }

  $: isEven = count % 2 === 0
</script>

<div class="counter">
  <span class:even={isEven} class:odd={!isEven}>
    {count}
  </span>
  <button on:click={decrement}>-{step}</button>
  <button on:click={increment}>+{step}</button>
</div>

<style>
  .counter { /* estilos */ }
  .even { color: green; }
  .odd { color: blue; }
</style>

<!-- Linhas: 28 (incluindo CSS!)
     Imports: 0
     Bundle: ~3KB base + código -->
```

---

## ✅ Desafio da Aula

### Objetivo
Analisar o output do compilador Svelte para entender o que ele gera.

### Instruções

1. Vá para [svelte.dev/repl](https://svelte.dev/repl)
2. Escreva um componente simples com uma variável e um botão
3. Clique na aba "JS output" para ver o código gerado
4. Identifique:
   - Onde o elemento é criado
   - Onde o evento é adicionado
   - Onde a atualização acontece

### Spec de Verificação

- [ ] Você consegue identificar a função `create_fragment`
- [ ] Você encontrou onde o `addEventListener` é chamado
- [ ] Você encontrou a função de update (`p`)
- [ ] Você entende que não há Virtual DOM no código gerado

### Reflexão

Responda mentalmente:
1. O código gerado usa `document.createElement` ou React.createElement?
2. Existe algum "diff" sendo feito?
3. Onde está o "Svelte" no código gerado?

---

## 📚 Recursos Adicionais

- [Svelte: Rethinking Reactivity (Rich Harris)](https://www.youtube.com/watch?v=AdNJ3fydeao)
- [Virtual DOM is pure overhead](https://svelte.dev/blog/virtual-dom-is-pure-overhead)
- [Svelte REPL](https://svelte.dev/repl) — veja o output do compilador

---

**Próxima aula:** [2.2 — Reatividade: atribuição vs hooks](./2.2-reatividade-atribuicao-vs-hooks.md)
