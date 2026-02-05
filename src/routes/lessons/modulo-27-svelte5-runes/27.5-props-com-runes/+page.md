---
title: "$props — Props com Runes"
module: 27
order: 5
---

# 27.5 — `$props` — Props com Runes

> A nova forma de declarar as propriedades que seu componente recebe.

## Objetivos da Aula

- Entender a sintaxe de `$props()`
- Dominar desestruturação com defaults
- Conhecer rest props e children
- Usar TypeScript com props

---

## Svelte 4 vs Svelte 5

### Svelte 4

```svelte
<script>
  export let name
  export let count = 0
  export let items = []
</script>
```

### Svelte 5

```svelte
<script>
  let { name, count = 0, items = [] } = $props()
</script>
```

---

## Sintaxe Básica

```svelte
<script>
  // Todas as props de uma vez
  let { name, age, email } = $props()
</script>

<p>Nome: {name}</p>
<p>Idade: {age}</p>
<p>Email: {email}</p>
```

### Com Valores Padrão

```svelte
<script>
  let {
    name = 'Anônimo',
    age = 0,
    active = true,
    items = []
  } = $props()
</script>
```

### Uso no Pai

```svelte
<!-- Parent.svelte -->
<script>
  import Child from './Child.svelte'
</script>

<Child name="João" age={25} />
<Child name="Maria" />  <!-- age = 0 (default) -->
<Child />  <!-- name = 'Anônimo', age = 0 -->
```

---

## Rest Props

Capturar props não desestruturadas:

```svelte
<!-- Button.svelte -->
<script>
  let { variant = 'primary', size = 'md', ...rest } = $props()
</script>

<button class="btn btn-{variant} btn-{size}" {...rest}>
  <slot />
</button>
```

```svelte
<!-- Uso -->
<Button
  variant="danger"
  onclick={handleClick}
  disabled={isLoading}
  aria-label="Deletar item"
>
  Deletar
</Button>
```

---

## Props são Read-Only

No Svelte 5, props são **read-only por padrão**:

```svelte
<script>
  let { count } = $props()

  function increment() {
    // ❌ ERRO! Props são read-only
    count++
  }
</script>
```

Para props que podem ser alteradas pelo filho, use `$bindable`:

```svelte
<script>
  let { count = $bindable(0) } = $props()

  function increment() {
    count++  // ✅ Funciona com $bindable
  }
</script>
```

---

## Children (Slot Content)

Acesso ao conteúdo do slot via props:

```svelte
<!-- Card.svelte -->
<script>
  let { title, children } = $props()
</script>

<div class="card">
  <h2>{title}</h2>
  <div class="card-body">
    {@render children()}
  </div>
</div>
```

```svelte
<!-- Uso -->
<Card title="Meu Card">
  <p>Este é o conteúdo do card.</p>
  <button>Ação</button>
</Card>
```

---

## TypeScript com Props

### Tipagem Inline

```svelte
<script lang="ts">
  let {
    name,
    age = 0,
    items = []
  }: {
    name: string
    age?: number
    items?: string[]
  } = $props()
</script>
```

### Com Interface

```svelte
<script lang="ts">
  interface Props {
    name: string
    age?: number
    items?: string[]
    onSave?: (data: FormData) => void
  }

  let { name, age = 0, items = [], onSave }: Props = $props()
</script>
```

### Generics

```svelte
<script lang="ts" generics="T">
  interface Props<T> {
    items: T[]
    selected?: T
    onSelect: (item: T) => void
  }

  let { items, selected, onSelect }: Props<T> = $props()
</script>
```

---

## Padrões Comuns

### Componente de Input

```svelte
<!-- Input.svelte -->
<script lang="ts">
  interface Props {
    value?: string
    label?: string
    error?: string
    type?: 'text' | 'email' | 'password'
  }

  let {
    value = $bindable(''),
    label,
    error,
    type = 'text',
    ...rest
  }: Props = $props()
</script>

{#if label}
  <label>{label}</label>
{/if}

<input
  {type}
  bind:value
  class:error={!!error}
  {...rest}
/>

{#if error}
  <span class="error-message">{error}</span>
{/if}

<style>
  .error { border-color: red; }
  .error-message { color: red; font-size: 0.875rem; }
</style>
```

### Componente com Callbacks

```svelte
<!-- Modal.svelte -->
<script lang="ts">
  interface Props {
    open: boolean
    title: string
    onClose: () => void
    onConfirm?: () => void
    children: any
  }

  let { open, title, onClose, onConfirm, children }: Props = $props()
</script>

{#if open}
  <div class="overlay" onclick={onClose}>
    <div class="modal" onclick={e => e.stopPropagation()}>
      <header>
        <h2>{title}</h2>
        <button onclick={onClose}>×</button>
      </header>

      <main>
        {@render children()}
      </main>

      <footer>
        <button onclick={onClose}>Cancelar</button>
        {#if onConfirm}
          <button onclick={onConfirm}>Confirmar</button>
        {/if}
      </footer>
    </div>
  </div>
{/if}
```

### Lista Genérica

```svelte
<!-- List.svelte -->
<script lang="ts" generics="T extends { id: string | number }">
  interface Props<T> {
    items: T[]
    renderItem: (item: T) => any
    emptyMessage?: string
  }

  let {
    items,
    renderItem,
    emptyMessage = 'Nenhum item'
  }: Props<T> = $props()
</script>

{#if items.length === 0}
  <p class="empty">{emptyMessage}</p>
{:else}
  <ul>
    {#each items as item (item.id)}
      <li>{@render renderItem(item)}</li>
    {/each}
  </ul>
{/if}
```

---

## Comparativo: Svelte 4 vs 5

| Aspecto | Svelte 4 | Svelte 5 |
|---------|----------|----------|
| Declaração | `export let prop` | `let { prop } = $props()` |
| Default | `export let prop = val` | `let { prop = val } = $props()` |
| Rest props | `$$restProps` | `...rest` |
| Tipagem | Separada | Inline na desestruturação |
| Mutabilidade | Mutável (com warning) | Read-only por padrão |
| Binding | Implícito | Explícito com `$bindable` |

---

## ⚠️ Armadilhas Comuns

### 1. Tentar mutar props

```svelte
<script>
  let { count } = $props()

  // ❌ Erro em runtime
  count = 10
</script>
```

### 2. Esquecer a desestruturação

```svelte
<script>
  // ❌ props é um objeto, não as props individuais
  let props = $props()
  console.log(props.name)  // Funciona, mas...

  // ✅ Desestruture para reatividade correta
  let { name } = $props()
</script>
```

### 3. Confundir children com slot

```svelte
<!-- Svelte 4 -->
<slot />

<!-- Svelte 5 -->
<script>
  let { children } = $props()
</script>
{@render children?.()}
```

---

## Resumo

| Sintaxe | Descrição |
|---------|-----------|
| `let { prop } = $props()` | Prop obrigatória |
| `let { prop = default } = $props()` | Prop com valor padrão |
| `let { ...rest } = $props()` | Rest props |
| `let { prop = $bindable() } = $props()` | Prop bindable |
| `let { children } = $props()` | Conteúdo do slot |

---

**Próxima aula:** [27.6 — `$bindable` — Props Bindable](./27.6-bindable-props.md)
