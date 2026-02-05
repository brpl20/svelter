---
title: "Event Handlers no Svelte 5"
module: 27
order: 9
---

# 27.9 — Event Handlers no Svelte 5

> Nova sintaxe unificada para eventos: de `on:click` para `onclick`.

## Objetivos da Aula

- Entender a mudança na sintaxe de eventos
- Dominar event handlers com a nova sintaxe
- Conhecer event modifiers no Svelte 5
- Implementar event forwarding

---

## A Mudança: `on:` para `on`

Uma das mudanças mais visíveis do Svelte 5:

```svelte
<!-- Svelte 4 -->
<button on:click={handleClick}>Clique</button>
<input on:input={handleInput} on:focus={handleFocus} />

<!-- Svelte 5 -->
<button onclick={handleClick}>Clique</button>
<input oninput={handleInput} onfocus={handleFocus} />
```

### Por que essa mudança?

1. **Consistência com o DOM** — É assim que o HTML funciona
2. **Menos magia** — Não é sintaxe especial do Svelte
3. **Melhor TypeScript** — Eventos são propriedades tipadas
4. **Simplicidade** — Uma forma de fazer as coisas

---

## Sintaxe Básica

### Eventos Inline

```svelte
<script>
  let count = $state(0)
</script>

<!-- Função inline -->
<button onclick={() => count++}>
  Cliques: {count}
</button>

<!-- Função com evento -->
<button onclick={(e) => {
  console.log('Botão clicado:', e.target)
  count++
}}>
  Clique aqui
</button>
```

### Funções Nomeadas

```svelte
<script>
  let count = $state(0)

  function handleClick(event) {
    console.log('Evento:', event)
    count++
  }

  function handleReset() {
    count = 0
  }
</script>

<button onclick={handleClick}>Incrementar</button>
<button onclick={handleReset}>Resetar</button>
```

---

## Eventos Comuns

```svelte
<script>
  let value = $state('')
  let focused = $state(false)
</script>

<!-- Input -->
<input
  value={value}
  oninput={(e) => value = e.target.value}
  onfocus={() => focused = true}
  onblur={() => focused = false}
/>

<!-- Mouse -->
<div
  onmouseenter={() => console.log('entrou')}
  onmouseleave={() => console.log('saiu')}
  onmousemove={(e) => console.log(e.clientX, e.clientY)}
/>

<!-- Teclado -->
<input
  onkeydown={(e) => {
    if (e.key === 'Enter') {
      submit()
    }
  }}
  onkeyup={(e) => console.log('soltou:', e.key)}
/>

<!-- Form -->
<form onsubmit={(e) => {
  e.preventDefault()
  handleSubmit()
}}>
  <button type="submit">Enviar</button>
</form>
```

---

## Event Modifiers: A Grande Diferença

No Svelte 4, tínhamos modifiers:

```svelte
<!-- Svelte 4 -->
<form on:submit|preventDefault={handleSubmit}>
<button on:click|stopPropagation={handle}>
<button on:click|once={handle}>
<div on:scroll|passive={handleScroll}>
```

No Svelte 5, modifiers são funções ou código explícito:

### preventDefault e stopPropagation

```svelte
<script>
  function handleSubmit(e) {
    e.preventDefault()
    // ... lógica
  }

  function handleClick(e) {
    e.stopPropagation()
    // ... lógica
  }
</script>

<form onsubmit={handleSubmit}>
  <button onclick={handleClick}>Clique</button>
</form>
```

### Helpers para Modifiers

Você pode criar helpers reutilizáveis:

```javascript
// utils/events.js

export function preventDefault(fn) {
  return function(event) {
    event.preventDefault()
    fn.call(this, event)
  }
}

export function stopPropagation(fn) {
  return function(event) {
    event.stopPropagation()
    fn.call(this, event)
  }
}

export function once(fn) {
  let ran = false
  return function(event) {
    if (ran) return
    ran = true
    fn.call(this, event)
  }
}

export function self(fn) {
  return function(event) {
    if (event.target === event.currentTarget) {
      fn.call(this, event)
    }
  }
}
```

### Usando os Helpers

```svelte
<script>
  import { preventDefault, stopPropagation, once } from './utils/events.js'

  function handleSubmit(e) {
    console.log('Submetido!')
  }

  function handleClick(e) {
    console.log('Clicado uma vez!')
  }
</script>

<form onsubmit={preventDefault(handleSubmit)}>
  <button onclick={once(handleClick)}>
    Clique só uma vez
  </button>
</form>
```

---

## Eventos em Componentes

### Svelte 4: Event Forwarding com `on:click`

```svelte
<!-- Svelte 4 - Button.svelte -->
<button on:click>
  <slot />
</button>

<!-- Uso -->
<Button on:click={handleClick}>Clique</Button>
```

### Svelte 5: Props de Callback

```svelte
<!-- Svelte 5 - Button.svelte -->
<script>
  let { children, onclick, disabled = false } = $props()
</script>

<button {onclick} {disabled}>
  {@render children()}
</button>

<!-- Uso -->
<Button onclick={handleClick}>Clique</Button>
```

### Spread de Props (incluindo eventos)

```svelte
<!-- Button.svelte -->
<script>
  let { children, ...restProps } = $props()
</script>

<button {...restProps}>
  {@render children()}
</button>

<!-- Uso - qualquer evento ou atributo funciona -->
<Button
  onclick={handleClick}
  onmouseenter={handleHover}
  class="btn-primary"
  disabled={loading}
>
  Clique
</Button>
```

---

## Multiple Handlers

No Svelte 5, você pode ter múltiplos handlers de forma diferente:

```svelte
<script>
  function logClick() {
    console.log('Clicado!')
  }

  function trackAnalytics() {
    analytics.track('button_click')
  }

  // Combinar handlers
  function handleClick(e) {
    logClick()
    trackAnalytics()
  }
</script>

<!-- Uma função que faz tudo -->
<button onclick={handleClick}>
  Clique
</button>

<!-- Ou inline -->
<button onclick={(e) => {
  logClick()
  trackAnalytics()
}}>
  Clique
</button>
```

### Helper para Múltiplos Handlers

```javascript
// utils/events.js
export function compose(...handlers) {
  return function(event) {
    for (const handler of handlers) {
      handler.call(this, event)
    }
  }
}
```

```svelte
<script>
  import { compose } from './utils/events.js'
</script>

<button onclick={compose(logClick, trackAnalytics, updateUI)}>
  Clique
</button>
```

---

## Eventos Customizados

No Svelte 5, eventos customizados são simplesmente callbacks:

```svelte
<!-- ColorPicker.svelte -->
<script>
  let { color = '#000000', onchange } = $props()

  function handleInput(e) {
    color = e.target.value
    onchange?.(color)  // Chama se existir
  }
</script>

<input type="color" value={color} oninput={handleInput} />

<!-- Uso -->
<script>
  function handleColorChange(newColor) {
    console.log('Nova cor:', newColor)
  }
</script>

<ColorPicker onchange={handleColorChange} />
```

### Eventos com Dados Complexos

```svelte
<!-- FileUploader.svelte -->
<script>
  let {
    onupload,
    onerror,
    onprogress
  } = $props()

  async function handleFileSelect(e) {
    const file = e.target.files[0]
    if (!file) return

    try {
      onprogress?.({ percent: 0, file })

      const result = await uploadFile(file, (progress) => {
        onprogress?.({ percent: progress, file })
      })

      onupload?.({ file, url: result.url })
    } catch (err) {
      onerror?.({ file, error: err })
    }
  }
</script>

<input type="file" onchange={handleFileSelect} />

<!-- Uso -->
<FileUploader
  onupload={({ file, url }) => {
    console.log('Upload completo:', file.name, url)
  }}
  onerror={({ file, error }) => {
    console.error('Erro no upload:', error)
  }}
  onprogress={({ percent, file }) => {
    console.log(`${file.name}: ${percent}%`)
  }}
/>
```

---

## TypeScript com Eventos

```svelte
<script lang="ts">
  import type { MouseEventHandler, FormEventHandler } from 'svelte/elements'

  interface Props {
    onclick?: MouseEventHandler<HTMLButtonElement>
    onsubmit?: FormEventHandler<HTMLFormElement>
    onchange?: (value: string) => void
  }

  let { onclick, onsubmit, onchange }: Props = $props()
</script>

<!-- Eventos nativos tipados automaticamente -->
<button {onclick}>Clique</button>

<!-- Form tipado -->
<form {onsubmit}>
  <input onchange={(e) => onchange?.(e.currentTarget.value)} />
</form>
```

### Tipos de Eventos Customizados

```svelte
<script lang="ts">
  interface SelectChangeEvent {
    value: string
    previousValue: string
    index: number
  }

  interface Props {
    options: string[]
    value?: string
    onchange?: (event: SelectChangeEvent) => void
  }

  let { options, value = '', onchange }: Props = $props()

  function handleChange(newValue: string, index: number) {
    const previousValue = value
    value = newValue
    onchange?.({ value: newValue, previousValue, index })
  }
</script>
```

---

## Comparativo: Svelte 4 vs 5

| Aspecto | Svelte 4 | Svelte 5 |
|---------|----------|----------|
| Sintaxe | `on:click={fn}` | `onclick={fn}` |
| Modifiers | `on:click\|preventDefault` | `e.preventDefault()` |
| Forwarding | `on:click` (sem valor) | `{onclick}` prop |
| Dispatch | `createEventDispatcher()` | Callbacks props |
| Múltiplos | `on:click on:click` | Combinar em uma função |

---

## Migração de Eventos

### Antes (Svelte 4)

```svelte
<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function handleClick() {
    dispatch('select', { id: 123 })
  }
</script>

<button on:click={handleClick}>Selecionar</button>

<!-- Uso -->
<Component on:select={(e) => console.log(e.detail.id)} />
```

### Depois (Svelte 5)

```svelte
<script>
  let { onselect } = $props()

  function handleClick() {
    onselect?.({ id: 123 })
  }
</script>

<button onclick={handleClick}>Selecionar</button>

<!-- Uso -->
<Component onselect={({ id }) => console.log(id)} />
```

---

## Padrões Úteis

### Debounce em Input

```svelte
<script>
  let value = $state('')
  let timeoutId

  function handleInput(e) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      value = e.target.value
      search(value)
    }, 300)
  }
</script>

<input oninput={handleInput} />
```

### Keyboard Shortcuts

```svelte
<script>
  let modalOpen = $state(false)

  function handleKeydown(e) {
    if (e.key === 'Escape' && modalOpen) {
      modalOpen = false
    }
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      modalOpen = true
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />
```

### Drag and Drop

```svelte
<script>
  let dragging = $state(false)
  let files = $state([])

  function handleDragOver(e) {
    e.preventDefault()
    dragging = true
  }

  function handleDragLeave() {
    dragging = false
  }

  function handleDrop(e) {
    e.preventDefault()
    dragging = false
    files = [...e.dataTransfer.files]
  }
</script>

<div
  class="dropzone"
  class:dragging
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
>
  {#if files.length}
    {#each files as file}
      <p>{file.name}</p>
    {/each}
  {:else}
    <p>Arraste arquivos aqui</p>
  {/if}
</div>
```

---

## Resumo

| Conceito | Svelte 5 |
|----------|----------|
| Sintaxe | `onclick={handler}` |
| Evento inline | `onclick={() => ...}` |
| Com objeto event | `onclick={(e) => ...}` |
| preventDefault | `e.preventDefault()` no handler |
| Componente | Props callback (`onchange`) |
| Forwarding | Spread props `{...restProps}` |

### Vantagens da Nova Sintaxe

- ✅ Consistente com HTML/DOM
- ✅ Melhor suporte TypeScript
- ✅ Mais explícito
- ✅ Sem "magia" especial
- ✅ Mais fácil de entender

---

**Próxima aula:** [27.10 — Migração: Svelte 4 → 5](./27.10-migracao-svelte4-5.md)
