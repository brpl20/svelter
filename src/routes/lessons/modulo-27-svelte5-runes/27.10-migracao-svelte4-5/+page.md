---
title: "Migração: Svelte 4 para 5"
module: 27
order: 10
---

# 27.10 — Migração: Svelte 4 → 5

> Guia completo para migrar projetos existentes para Svelte 5.

## Objetivos da Aula

- Entender a estratégia de migração incremental
- Usar a ferramenta de migração automática
- Migrar padrões comuns manualmente
- Resolver problemas frequentes

---

## Compatibilidade: Não Precisa Migrar Tudo

**Boa notícia:** Svelte 5 é quase totalmente retrocompatível!

```svelte
<!-- Este código Svelte 4 FUNCIONA no Svelte 5 -->
<script>
  export let name = 'mundo'
  let count = 0

  $: doubled = count * 2
  $: console.log('count mudou:', count)
</script>

<h1>Olá, {name}!</h1>
<button on:click={() => count++}>
  {count} (dobro: {doubled})
</button>
```

Você pode migrar **gradualmente**, componente por componente.

---

## Ferramenta de Migração Automática

O Svelte oferece uma ferramenta CLI para migração:

```bash
# Migrar um arquivo específico
npx sv migrate svelte-5 src/lib/Counter.svelte

# Migrar uma pasta inteira
npx sv migrate svelte-5 src/lib/

# Migrar todo o projeto
npx sv migrate svelte-5
```

### O que a ferramenta faz

- ✅ Converte `export let` para `$props()`
- ✅ Converte `$:` reativo para `$derived`
- ✅ Converte `$:` com efeitos para `$effect`
- ✅ Converte `on:event` para `onevent`
- ✅ Converte slots para snippets
- ⚠️ Pode precisar de ajustes manuais

---

## Checklist de Migração

### 1. Props

```svelte
<!-- Svelte 4 -->
<script>
  export let name
  export let count = 0
  export let items = []
</script>

<!-- Svelte 5 -->
<script>
  let { name, count = 0, items = [] } = $props()
</script>
```

#### Com TypeScript

```svelte
<!-- Svelte 4 -->
<script lang="ts">
  export let name: string
  export let count: number = 0
</script>

<!-- Svelte 5 -->
<script lang="ts">
  interface Props {
    name: string
    count?: number
  }
  let { name, count = 0 }: Props = $props()
</script>
```

---

### 2. Estado Reativo

```svelte
<!-- Svelte 4 -->
<script>
  let count = 0
  let items = []
  let user = { name: 'Ana' }
</script>

<!-- Svelte 5 -->
<script>
  let count = $state(0)
  let items = $state([])
  let user = $state({ name: 'Ana' })
</script>
```

#### Cuidado com Primitivos vs Objetos

```svelte
<script>
  // Primitivos: sem mudanças no uso
  let count = $state(0)
  count++  // ✅ Funciona igual

  // Arrays: métodos mutáveis agora são reativos!
  let items = $state([1, 2, 3])
  items.push(4)  // ✅ Svelte 5 detecta isso!
  // No Svelte 4, precisava: items = [...items, 4]

  // Objetos: mesma coisa
  let user = $state({ name: 'Ana' })
  user.name = 'Bruno'  // ✅ Reativo!
</script>
```

---

### 3. Valores Derivados

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

#### Derivados Complexos

```svelte
<!-- Svelte 4 -->
<script>
  let items = []
  let filter = ''

  $: filtered = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  )
</script>

<!-- Svelte 5 -->
<script>
  let items = $state([])
  let filter = $state('')

  let filtered = $derived.by(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    )
  })
</script>
```

---

### 4. Efeitos Colaterais

```svelte
<!-- Svelte 4 -->
<script>
  let count = 0

  // Efeito simples
  $: console.log('count é:', count)

  // Efeito com lógica
  $: {
    if (count > 10) {
      alert('Passou de 10!')
    }
  }

  // Efeito assíncrono
  $: fetch(`/api/data/${count}`)
    .then(r => r.json())
    .then(data => results = data)
</script>

<!-- Svelte 5 -->
<script>
  let count = $state(0)
  let results = $state(null)

  // Efeito simples
  $effect(() => {
    console.log('count é:', count)
  })

  // Efeito com lógica
  $effect(() => {
    if (count > 10) {
      alert('Passou de 10!')
    }
  })

  // Efeito assíncrono
  $effect(() => {
    fetch(`/api/data/${count}`)
      .then(r => r.json())
      .then(data => results = data)
  })
</script>
```

---

### 5. Eventos

```svelte
<!-- Svelte 4 -->
<button on:click={handleClick}>Clique</button>
<button on:click|preventDefault={handleSubmit}>Enviar</button>
<input on:input={(e) => value = e.target.value} />

<!-- Svelte 5 -->
<button onclick={handleClick}>Clique</button>
<button onclick={(e) => { e.preventDefault(); handleSubmit(e) }}>Enviar</button>
<input oninput={(e) => value = e.target.value} />
```

#### Event Dispatch → Callbacks

```svelte
<!-- Svelte 4 - Child.svelte -->
<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  function select(item) {
    dispatch('select', { item })
  }
</script>

<!-- Uso -->
<Child on:select={(e) => console.log(e.detail.item)} />

<!-- Svelte 5 - Child.svelte -->
<script>
  let { onselect } = $props()

  function select(item) {
    onselect?.({ item })
  }
</script>

<!-- Uso -->
<Child onselect={({ item }) => console.log(item)} />
```

---

### 6. Slots → Snippets

```svelte
<!-- Svelte 4 - Card.svelte -->
<div class="card">
  <div class="header">
    <slot name="header" />
  </div>
  <slot />
  <div class="footer">
    <slot name="footer" />
  </div>
</div>

<!-- Uso Svelte 4 -->
<Card>
  <h2 slot="header">Título</h2>
  <p>Conteúdo</p>
  <button slot="footer">Ação</button>
</Card>

<!-- Svelte 5 - Card.svelte -->
<script>
  let { header, children, footer } = $props()
</script>

<div class="card">
  <div class="header">
    {#if header}{@render header()}{/if}
  </div>
  {@render children()}
  <div class="footer">
    {#if footer}{@render footer()}{/if}
  </div>
</div>

<!-- Uso Svelte 5 -->
<Card>
  {#snippet header()}
    <h2>Título</h2>
  {/snippet}

  {#snippet children()}
    <p>Conteúdo</p>
  {/snippet}

  {#snippet footer()}
    <button>Ação</button>
  {/snippet}
</Card>
```

#### Slot Props → Snippet Parameters

```svelte
<!-- Svelte 4 -->
<List {items} let:item let:index>
  <span>#{index}: {item.name}</span>
</List>

<!-- Svelte 5 -->
<List {items}>
  {#snippet children(item, index)}
    <span>#{index}: {item.name}</span>
  {/snippet}
</List>
```

---

### 7. Stores → Runes

```svelte
<!-- Svelte 4 - stores.js -->
import { writable, derived } from 'svelte/store'

export const count = writable(0)
export const doubled = derived(count, $count => $count * 2)

<!-- Svelte 4 - Component.svelte -->
<script>
  import { count, doubled } from './stores.js'
</script>

<p>{$count} × 2 = {$doubled}</p>
<button on:click={() => $count++}>+1</button>

<!-- Svelte 5 - state.svelte.js -->
export const count = $state(0)
export const doubled = $derived(count * 2)

// Ou com encapsulamento
function createCounter() {
  let count = $state(0)

  return {
    get count() { return count },
    get doubled() { return count * 2 },
    increment() { count++ },
    decrement() { count-- }
  }
}

export const counter = createCounter()

<!-- Svelte 5 - Component.svelte -->
<script>
  import { counter } from './state.svelte.js'
</script>

<p>{counter.count} × 2 = {counter.doubled}</p>
<button onclick={() => counter.increment()}>+1</button>
```

---

## Problemas Comuns de Migração

### 1. "Cannot use runes in .js files"

```javascript
// ❌ arquivo.js
let count = $state(0)  // Erro!

// ✅ arquivo.svelte.js (note a extensão!)
let count = $state(0)  // Funciona!
```

### 2. Reatividade "Perdida" em Objetos

```svelte
<script>
  // ❌ Isso não é reativo como você espera
  let { user } = $props()
  let name = user.name  // 'name' não atualiza quando user.name muda!

  // ✅ Use $derived para valores derivados de props
  let name = $derived(user.name)

  // ✅ Ou acesse diretamente no template
</script>

<!-- ✅ Isso sempre mostra o valor atual -->
<p>{user.name}</p>
```

### 3. $effect Rodando Demais

```svelte
<script>
  let config = $state({ theme: 'dark', lang: 'pt' })

  // ❌ Roda quando QUALQUER propriedade de config muda
  $effect(() => {
    console.log('Tema:', config.theme)
  })

  // ✅ Extraia só o que precisa
  $effect(() => {
    const theme = config.theme  // Só depende de theme agora
    console.log('Tema:', theme)
  })
</script>
```

### 4. Bind Two-Way

```svelte
<!-- Svelte 4 -->
<script>
  export let value
</script>
<input bind:value />

<!-- Svelte 5 - PRECISA de $bindable -->
<script>
  let { value = $bindable() } = $props()
</script>
<input bind:value />
```

### 5. Rest Props e Event Handlers

```svelte
<!-- Svelte 4 -->
<script>
  export let disabled = false
  // $$restProps inclui on:click automaticamente
</script>
<button {disabled} {...$$restProps}>
  <slot />
</button>

<!-- Svelte 5 -->
<script>
  let { disabled = false, children, ...restProps } = $props()
  // restProps inclui onclick, onmouseenter, etc.
</script>
<button {disabled} {...restProps}>
  {@render children()}
</button>
```

---

## Migração de Bibliotecas de Componentes

### Mantendo Compatibilidade

Se você mantém uma biblioteca, pode suportar ambas as versões:

```svelte
<!-- Button.svelte - Compatível com Svelte 4 e 5 -->
<script>
  // Detecta se estamos em modo runes
  const isRunes = typeof $props === 'function'

  // Svelte 5
  let props = isRunes ? $props() : {}

  // Svelte 4 fallback
  export let variant = props.variant ?? 'primary'
  export let disabled = props.disabled ?? false
</script>
```

Ou use o campo `svelte` no package.json para versões específicas.

---

## Script de Migração Completo

Exemplo de como migrar um componente real:

### Antes (Svelte 4)

```svelte
<!-- TodoList.svelte - Svelte 4 -->
<script>
  import { createEventDispatcher } from 'svelte'

  export let todos = []
  export let filter = 'all'

  const dispatch = createEventDispatcher()

  $: filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  $: remaining = todos.filter(t => !t.completed).length

  $: {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  function addTodo(text) {
    todos = [...todos, { id: Date.now(), text, completed: false }]
  }

  function toggleTodo(id) {
    todos = todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
    dispatch('toggle', { id })
  }

  function removeTodo(id) {
    todos = todos.filter(t => t.id !== id)
    dispatch('remove', { id })
  }
</script>

<div class="todo-list">
  <slot name="header" {remaining} />

  {#each filteredTodos as todo (todo.id)}
    <div class="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        on:change={() => toggleTodo(todo.id)}
      />
      <span class:completed={todo.completed}>{todo.text}</span>
      <button on:click={() => removeTodo(todo.id)}>×</button>
    </div>
  {/each}

  <slot name="footer" {filteredTodos} />
</div>
```

### Depois (Svelte 5)

```svelte
<!-- TodoList.svelte - Svelte 5 -->
<script>
  let {
    todos = $bindable([]),
    filter = 'all',
    ontoggle,
    onremove,
    header,
    footer
  } = $props()

  let filteredTodos = $derived.by(() => {
    return todos.filter(todo => {
      if (filter === 'active') return !todo.completed
      if (filter === 'completed') return todo.completed
      return true
    })
  })

  let remaining = $derived(todos.filter(t => !t.completed).length)

  $effect(() => {
    localStorage.setItem('todos', JSON.stringify($state.snapshot(todos)))
  })

  function addTodo(text) {
    todos.push({ id: Date.now(), text, completed: false })
  }

  function toggleTodo(id) {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
      ontoggle?.({ id })
    }
  }

  function removeTodo(id) {
    const index = todos.findIndex(t => t.id === id)
    if (index !== -1) {
      todos.splice(index, 1)
      onremove?.({ id })
    }
  }
</script>

<div class="todo-list">
  {#if header}
    {@render header({ remaining })}
  {/if}

  {#each filteredTodos as todo (todo.id)}
    <div class="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onchange={() => toggleTodo(todo.id)}
      />
      <span class:completed={todo.completed}>{todo.text}</span>
      <button onclick={() => removeTodo(todo.id)}>×</button>
    </div>
  {/each}

  {#if footer}
    {@render footer({ filteredTodos })}
  {/if}
</div>
```

---

## Resumo da Migração

| Svelte 4 | Svelte 5 |
|----------|----------|
| `export let prop` | `let { prop } = $props()` |
| `let x = value` | `let x = $state(value)` |
| `$: derived = ...` | `let derived = $derived(...)` |
| `$: { sideEffect }` | `$effect(() => { ... })` |
| `on:event={fn}` | `onevent={fn}` |
| `createEventDispatcher()` | Callback props |
| `<slot name="x">` | `{@render x()}` |
| `let:prop` | Snippet parameters |
| `.js` com runes | `.svelte.js` |

### Estratégia Recomendada

1. ✅ Atualize o Svelte para v5
2. ✅ Código existente continua funcionando
3. ✅ Migre componentes novos com runes
4. ✅ Migre componentes antigos gradualmente
5. ✅ Use a ferramenta de migração para acelerar

---

## ✅ Desafio Final do Módulo

### Objetivo

Migrar um mini-projeto completo de Svelte 4 para Svelte 5.

### Componentes para Migrar

1. **Counter.svelte** — Estado e eventos básicos
2. **UserCard.svelte** — Props e slots
3. **TodoApp.svelte** — Estado complexo, derivados, efeitos
4. **stores.js** → **state.svelte.js** — Stores para runes

### Spec de Verificação

- [ ] Todos os componentes usam runes
- [ ] Nenhum `export let`, `$:`, ou `on:` no código
- [ ] Funcionalidade idêntica à versão original
- [ ] TypeScript sem erros (se aplicável)
- [ ] Testes passando (se existentes)

---

**Parabéns! 🎉** Você completou o módulo de Svelte 5 Runes!

**Próximo módulo:** SvelteKit — O Meta-framework
