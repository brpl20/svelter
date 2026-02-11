---
title: "Introdução ao Svelte 5 e Runes"
module: 8
order: 1
---

# 8.1 — Introdução ao Svelte 5 e Runes

> Entenda a maior mudança na história do Svelte e por que ela existe.

## Objetivos da Aula

- Compreender a motivação por trás dos Runes
- Entender a diferença entre reatividade implícita (Svelte 4) e explícita (Svelte 5)
- Ver o panorama das novas APIs
- Entender a estratégia de compatibilidade

---

## Por que Mudar?

O Svelte 4 tinha "mágica" — o compilador detectava automaticamente o que era reativo:

```svelte
<script>
  let count = 0  // O compilador "sabe" que isso é estado
  $: doubled = count * 2  // O compilador "sabe" que isso é derivado

  function increment() {
    count++  // O compilador "sabe" que precisa atualizar o DOM
  }
</script>
```

### Os Problemas da Mágica

**1. Não funciona fora de componentes `.svelte`**

```javascript
// utils.js — isso NÃO é reativo!
let count = 0
export const increment = () => count++
```

Para ter reatividade em `.js`, você precisava de stores:

```javascript
// stores.js
import { writable, derived } from 'svelte/store'

export const count = writable(0)
export const doubled = derived(count, $c => $c * 2)
```

**2. TypeScript tinha dificuldades**

```svelte
<script lang="ts">
  export let items: string[]  // OK
  export let count: number    // OK

  $: doubled = count * 2  // ❌ TypeScript não sabe que 'doubled' existe
  $: filtered = items.filter(i => i.startsWith('a'))  // ❌ Tipo difícil de inferir
</script>
```

**3. `$:` era confuso**

```svelte
<script>
  let count = 0

  // Isso é derivado? Efeito? Ambos?
  $: doubled = count * 2

  // E isso?
  $: console.log(count)

  // E isso??
  $: if (count > 10) {
    alert('muito alto!')
  }
</script>
```

**4. Arrays e objetos não eram deep reactive**

```svelte
<script>
  let items = [1, 2, 3]

  function addItem() {
    items.push(4)  // ❌ NÃO atualiza o DOM!
    items = items  // Hack necessário
  }

  // Ou usar spread
  function addItemCorreto() {
    items = [...items, 4]  // ✅ Funciona
  }
</script>
```

---

## A Solução: Runes

Runes são **funções especiais** que começam com `$` e declaram explicitamente a reatividade:

```svelte
<script>
  // Estado
  let count = $state(0)

  // Derivado
  let doubled = $derived(count * 2)

  // Efeito
  $effect(() => {
    console.log('count mudou:', count)
  })

  function increment() {
    count++  // ✅ Atualiza o DOM automaticamente
  }
</script>
```

### Runes Disponíveis

| Rune | Propósito | Substitui |
|------|-----------|-----------|
| `$state` | Estado reativo | `let x = valor` |
| `$state.raw` | Estado sem deep reactivity | - |
| `$derived` | Valor computado | `$: x = calc` |
| `$derived.by` | Derivado com função | `$: x = calc` |
| `$effect` | Efeito colateral | `$: { efeito }` |
| `$effect.pre` | Efeito antes do DOM | `beforeUpdate` |
| `$effect.root` | Efeito fora de componente | - |
| `$props` | Props do componente | `export let` |
| `$bindable` | Prop com binding | `export let` |
| `$inspect` | Debug reativo | `console.log` |

---

## Comparativo: Svelte 4 vs Svelte 5

### Estado

```svelte
<!-- Svelte 4 -->
<script>
  let count = 0
</script>

<!-- Svelte 5 -->
<script>
  let count = $state(0)
</script>
```

### Derivados

```svelte
<!-- Svelte 4 -->
<script>
  let count = 0
  $: doubled = count * 2
  $: quadrupled = doubled * 2
</script>

<!-- Svelte 5 -->
<script>
  let count = $state(0)
  let doubled = $derived(count * 2)
  let quadrupled = $derived(doubled * 2)
</script>
```

### Efeitos

```svelte
<!-- Svelte 4 -->
<script>
  let count = 0

  $: {
    console.log('count é', count)
    localStorage.setItem('count', count)
  }
</script>

<!-- Svelte 5 -->
<script>
  let count = $state(0)

  $effect(() => {
    console.log('count é', count)
    localStorage.setItem('count', count)
  })
</script>
```

### Props

```svelte
<!-- Svelte 4 -->
<script>
  export let name = 'mundo'
  export let count = 0
</script>

<!-- Svelte 5 -->
<script>
  let { name = 'mundo', count = 0 } = $props()
</script>
```

---

## Deep Reactivity: A Grande Melhoria

### Svelte 4: Armadilhas com Arrays

```svelte
<script>
  let items = ['a', 'b', 'c']

  function addItem() {
    items.push('d')     // ❌ DOM não atualiza!
    // items = items    // Hack 1
    // items = [...items, 'd']  // Hack 2
  }

  function updateFirst() {
    items[0] = 'Z'      // ❌ DOM não atualiza!
    // items = items    // Hack necessário
  }
</script>
```

### Svelte 5: Simplesmente Funciona

```svelte
<script>
  let items = $state(['a', 'b', 'c'])

  function addItem() {
    items.push('d')     // ✅ DOM atualiza!
  }

  function updateFirst() {
    items[0] = 'Z'      // ✅ DOM atualiza!
  }

  // Objetos também!
  let user = $state({ name: 'João', age: 25 })

  function birthday() {
    user.age++          // ✅ DOM atualiza!
  }
</script>
```

---

## Runes em Arquivos `.js` e `.ts`

Uma das maiores vantagens: reatividade fora de componentes!

```javascript
// counter.svelte.js (note a extensão!)
export function createCounter(initial = 0) {
  let count = $state(initial)
  let doubled = $derived(count * 2)

  return {
    get count() { return count },
    get doubled() { return doubled },
    increment: () => count++,
    decrement: () => count--
  }
}
```

```svelte
<!-- App.svelte -->
<script>
  import { createCounter } from './counter.svelte.js'

  const counter = createCounter(10)
</script>

<button onclick={counter.increment}>
  {counter.count} × 2 = {counter.doubled}
</button>
```

### Por que `.svelte.js`?

O compilador Svelte precisa processar arquivos com runes. A extensão `.svelte.js` ou `.svelte.ts` indica que o arquivo usa runes e deve ser compilado.

---

## Compatibilidade: Migração Gradual

O Svelte 5 é **retrocompatível** com Svelte 4:

```svelte
<!-- Isso AINDA funciona no Svelte 5! -->
<script>
  export let name
  let count = 0
  $: doubled = count * 2
</script>

<button on:click={() => count++}>
  {count} × 2 = {doubled}
</button>
```

Você pode migrar gradualmente:
1. Atualizar para Svelte 5
2. Código antigo continua funcionando
3. Migrar componente por componente
4. Usar script automático: `npx sv migrate svelte-5`

---

## ⚠️ Armadilhas Comuns

### 1. Usar Runes em arquivos `.js` normais

```javascript
// utils.js — ❌ NÃO FUNCIONA!
let count = $state(0)

// utils.svelte.js — ✅ Funciona!
let count = $state(0)
```

### 2. Esquecer que `$state` retorna um proxy

```svelte
<script>
  let items = $state([1, 2, 3])

  // ❌ Comparação por referência falha
  console.log(items === [1, 2, 3])  // false

  // ✅ Use $state.snapshot() para valor bruto
  console.log($state.snapshot(items))  // [1, 2, 3]
</script>
```

### 3. Usar `$effect` para derivar valores

```svelte
<script>
  let count = $state(0)

  // ❌ ERRADO! Causa loops infinitos
  let doubled
  $effect(() => {
    doubled = count * 2  // Atribui → dispara efeito → atribui...
  })

  // ✅ CORRETO! Use $derived
  let doubled = $derived(count * 2)
</script>
```

---

## Resumo

| Conceito | Descrição |
|----------|-----------|
| **Runes** | Funções especiais `$` para reatividade explícita |
| **$state** | Declara estado reativo (deep por padrão) |
| **$derived** | Declara valores computados |
| **$effect** | Declara efeitos colaterais |
| **$props** | Declara props do componente |
| **Extensão .svelte.js** | Permite runes fora de componentes |
| **Compatibilidade** | Svelte 4 funciona no Svelte 5 |

---

## 🧪 Exercício Interativo

📁 **Local:** `exercicios/modulo-27/exercicio-27.1/`

No exercício você vai:
- Converter um componente Svelte 4 para Svelte 5
- Usar `$state` e `$derived` corretamente
- Identificar e corrigir uso incorreto de `$effect`

---

## 📚 Recursos

- [Documentação Oficial: Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Blog Post: Introducing Runes](https://svelte.dev/blog/runes)

---

**Próxima aula:** [8.2 — `$state` — Estado Reativo](../8.2-state-estado-reativo)
