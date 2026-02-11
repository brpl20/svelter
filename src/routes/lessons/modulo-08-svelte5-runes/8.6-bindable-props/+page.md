---
title: "$bindable — Props Bindable"
module: 8
order: 6
---

# 8.6 — `$bindable` — Props Bindable

> Tornando explícito quais props aceitam two-way binding.

## Objetivos da Aula

- Entender por que `$bindable` existe
- Implementar props bindable corretamente
- Conhecer casos de uso comuns

---

## O Problema

No Svelte 4, qualquer prop podia receber binding:

```svelte
<!-- Child.svelte (Svelte 4) -->
<script>
  export let value = ''  // Não fica claro se suporta bind:
</script>

<!-- Parent.svelte -->
<Child bind:value={text} />  <!-- Funciona, mas é intencional? -->
```

Isso causava confusão: o componente foi projetado para suportar binding?

---

## A Solução: `$bindable`

No Svelte 5, você declara explicitamente quais props aceitam binding:

```svelte
<!-- Input.svelte -->
<script>
  let { value = $bindable('') } = $props()
</script>

<input bind:value />
```

```svelte
<!-- Parent.svelte -->
<Input bind:value={text} />  <!-- ✅ Explicitamente suportado -->
```

Se tentar bind em prop não-bindable:

```svelte
<!-- Child.svelte -->
<script>
  let { name } = $props()  // NÃO é $bindable
</script>

<!-- Parent.svelte -->
<Child bind:name={userName} />  <!-- ❌ Erro! -->
```

---

## Sintaxe

### Básico

```svelte
<script>
  let { value = $bindable() } = $props()
</script>
```

### Com Valor Padrão

```svelte
<script>
  let { value = $bindable('') } = $props()
  let { checked = $bindable(false) } = $props()
  let { selected = $bindable(null) } = $props()
</script>
```

### Múltiplas Props Bindable

```svelte
<script>
  let {
    value = $bindable(''),
    open = $bindable(false),
    selected = $bindable([])
  } = $props()
</script>
```

---

## Exemplo: Componente de Input

```svelte
<!-- TextInput.svelte -->
<script lang="ts">
  interface Props {
    value?: string
    placeholder?: string
    disabled?: boolean
  }

  let {
    value = $bindable(''),
    placeholder = '',
    disabled = false
  }: Props = $props()
</script>

<input
  type="text"
  bind:value
  {placeholder}
  {disabled}
/>
```

```svelte
<!-- Uso -->
<script>
  let name = $state('')
</script>

<TextInput bind:value={name} placeholder="Digite seu nome" />
<p>Olá, {name}!</p>
```

---

## Exemplo: Modal Controlado

```svelte
<!-- Modal.svelte -->
<script lang="ts">
  interface Props {
    open?: boolean
    title: string
    children: any
  }

  let {
    open = $bindable(false),
    title,
    children
  }: Props = $props()

  function close() {
    open = false
  }
</script>

{#if open}
  <div class="overlay" onclick={close}>
    <div class="modal" onclick={e => e.stopPropagation()}>
      <header>
        <h2>{title}</h2>
        <button onclick={close}>×</button>
      </header>
      <main>
        {@render children()}
      </main>
    </div>
  </div>
{/if}
```

```svelte
<!-- Uso -->
<script>
  let showModal = $state(false)
</script>

<button onclick={() => showModal = true}>Abrir Modal</button>

<Modal bind:open={showModal} title="Configurações">
  <p>Conteúdo do modal...</p>
</Modal>

<p>Modal está: {showModal ? 'aberto' : 'fechado'}</p>
```

---

## Exemplo: Select Customizado

```svelte
<!-- Select.svelte -->
<script lang="ts" generics="T">
  interface Props<T> {
    options: T[]
    value?: T | null
    getLabel?: (item: T) => string
    getValue?: (item: T) => string
    placeholder?: string
  }

  let {
    options,
    value = $bindable(null),
    getLabel = (item) => String(item),
    getValue = (item) => String(item),
    placeholder = 'Selecione...'
  }: Props<T> = $props()

  let open = $state(false)

  function select(option: T) {
    value = option
    open = false
  }
</script>

<div class="select">
  <button onclick={() => open = !open}>
    {value ? getLabel(value) : placeholder}
  </button>

  {#if open}
    <ul class="options">
      {#each options as option}
        <li>
          <button onclick={() => select(option)}>
            {getLabel(option)}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
```

```svelte
<!-- Uso -->
<script>
  let selectedCountry = $state(null)

  const countries = [
    { code: 'BR', name: 'Brasil' },
    { code: 'US', name: 'Estados Unidos' },
    { code: 'PT', name: 'Portugal' }
  ]
</script>

<Select
  options={countries}
  bind:value={selectedCountry}
  getLabel={c => c.name}
  placeholder="Escolha um país"
/>

{#if selectedCountry}
  <p>Você selecionou: {selectedCountry.name} ({selectedCountry.code})</p>
{/if}
```

---

## Quando Usar `$bindable`

### ✅ Use para:

- **Inputs e formulários**: value, checked, selected
- **Controles de UI**: open, expanded, active
- **Valores editáveis**: quantidade, texto, opções

### ❌ Não use para:

- **Dados somente-leitura**: user, items, config
- **Callbacks**: onClick, onSubmit, onChange
- **Estado interno**: loading, error

---

## Padrão: Controlled vs Uncontrolled

### Uncontrolled (estado interno)

```svelte
<!-- Toggle.svelte -->
<script>
  let { initialValue = false } = $props()
  let checked = $state(initialValue)
</script>

<button onclick={() => checked = !checked}>
  {checked ? 'ON' : 'OFF'}
</button>
```

### Controlled (estado externo)

```svelte
<!-- Toggle.svelte -->
<script>
  let { checked = $bindable(false) } = $props()
</script>

<button onclick={() => checked = !checked}>
  {checked ? 'ON' : 'OFF'}
</button>
```

### Ambos (flexível)

```svelte
<!-- Toggle.svelte -->
<script>
  let {
    checked = $bindable(false),
    onChange
  } = $props()

  function toggle() {
    checked = !checked
    onChange?.(checked)
  }
</script>

<button onclick={toggle}>
  {checked ? 'ON' : 'OFF'}
</button>
```

---

## Resumo

| Conceito | Descrição |
|----------|-----------|
| `$bindable()` | Declara prop que aceita two-way binding |
| `$bindable(default)` | Com valor padrão |
| Read-only vs Bindable | Props são read-only por padrão |
| Contrato explícito | Fica claro quais props suportam bind: |

---

**Próxima aula:** [8.7 — `$inspect` — Debug Reativo](../8.7-inspect-debug)
