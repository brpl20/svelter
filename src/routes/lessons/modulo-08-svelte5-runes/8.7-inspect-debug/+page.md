---
title: "$inspect — Debug Reativo"
module: 8
order: 7
---

# 8.7 — `$inspect` — Debug Reativo

> Console.log que reage automaticamente a mudanças de estado.

## Objetivos da Aula

- Usar `$inspect` para debugging
- Entender como funciona internamente
- Conhecer `$inspect.trace()`

---

## O Problema com console.log

```svelte
<script>
  let count = $state(0)
  let items = $state([1, 2, 3])

  // ❌ Isso só mostra o valor INICIAL
  console.log('count:', count)
  console.log('items:', items)

  // Para ver mudanças, você precisaria de um $effect
  $effect(() => {
    console.log('count mudou:', count)
  })
</script>
```

---

## A Solução: `$inspect`

```svelte
<script>
  let count = $state(0)
  let items = $state([1, 2, 3])

  // ✅ Automaticamente loga quando valores mudam
  $inspect(count)
  $inspect(items)

  // Com label
  $inspect('Count:', count)
  $inspect('Items:', items)
</script>

<button onclick={() => count++}>Incrementar</button>
<button onclick={() => items.push(items.length + 1)}>Adicionar</button>
```

**Output no console:**
```text
Count: 0
Items: [1, 2, 3]
Count: 1          ← Quando clica incrementar
Count: 2          ← Quando clica incrementar de novo
Items: [1, 2, 3, 4]  ← Quando adiciona item
```

---

## Múltiplos Valores

```svelte
<script>
  let firstName = $state('João')
  let lastName = $state('Silva')
  let age = $state(25)

  // Inspecionar múltiplos valores juntos
  $inspect('User:', { firstName, lastName, age })
</script>
```

**Output:**
```text
User: { firstName: 'João', lastName: 'Silva', age: 25 }
User: { firstName: 'Maria', lastName: 'Silva', age: 25 }  ← Mudou firstName
```

---

## `$inspect` com Callback

Para processamento customizado:

```svelte
<script>
  let count = $state(0)

  $inspect(count).with((type, value) => {
    // type: 'init' na primeira vez, 'update' nas próximas
    console.log(`[${type}] count = ${value}`)

    if (type === 'update' && value > 10) {
      console.warn('⚠️ Count está muito alto!')
    }
  })
</script>
```

**Output:**
```text
[init] count = 0
[update] count = 1
[update] count = 2
...
[update] count = 11
⚠️ Count está muito alto!
```

---

## `$inspect.trace()`

Mostra o stack trace de onde a mudança originou:

```svelte
<script>
  let count = $state(0)

  $inspect.trace('count mudou')

  function increment() {
    count++
  }

  function double() {
    count *= 2
  }
</script>

<button onclick={increment}>+1</button>
<button onclick={double}>×2</button>
```

Quando clica em "+1", o console mostra:
```text
count mudou
    at increment (App.svelte:7)
    at HTMLButtonElement.onclick (App.svelte:13)
```

---

## Inspecionando Objetos Complexos

```svelte
<script>
  let user = $state({
    name: 'Ana',
    settings: {
      theme: 'dark',
      notifications: true
    }
  })

  // Inspeciona o objeto inteiro
  $inspect('User:', user)

  // Ou só uma parte
  $inspect('Theme:', user.settings.theme)
</script>

<button onclick={() => user.settings.theme = 'light'}>
  Mudar tema
</button>
```

---

## Removido em Produção

**Importante:** `$inspect` é automaticamente removido no build de produção!

```svelte
<script>
  let count = $state(0)

  // Isso NÃO aparece no bundle de produção
  $inspect(count)
</script>
```

Isso significa que você pode deixar os `$inspect` no código durante desenvolvimento sem se preocupar com performance em produção.

---

## Casos de Uso

### Debugging de Formulários

```svelte
<script>
  let form = $state({
    email: '',
    password: '',
    remember: false
  })

  $inspect('Form state:', form)
</script>

<form>
  <input bind:value={form.email} placeholder="Email" />
  <input bind:value={form.password} type="password" />
  <label>
    <input type="checkbox" bind:checked={form.remember} />
    Lembrar-me
  </label>
</form>
```

### Debugging de Filtros

```svelte
<script>
  let items = $state([...])
  let searchTerm = $state('')
  let category = $state('all')

  let filtered = $derived.by(() => {
    // Lógica de filtro...
  })

  $inspect('Filters:', { searchTerm, category })
  $inspect('Filtered count:', filtered.length)
</script>
```

### Debugging de Fetch

```svelte
<script>
  let loading = $state(false)
  let error = $state(null)
  let data = $state(null)

  $inspect('Fetch state:', { loading, error, data })
</script>
```

---

## Comparação: Métodos de Debug

| Método | Reativo | Em Produção | Uso |
|--------|---------|-------------|-----|
| `console.log()` | ❌ | ✅ Fica | Valores estáticos |
| `$effect` + console | ✅ | ✅ Fica | Side effects reais |
| `$inspect` | ✅ | ❌ Removido | Debug durante dev |
| DevTools | ✅ | ✅ | Inspeção visual |

---

## Resumo

| API | Descrição |
|-----|-----------|
| `$inspect(value)` | Loga valor quando muda |
| `$inspect(label, value)` | Com label customizado |
| `$inspect(...).with(fn)` | Callback customizado |
| `$inspect.trace()` | Stack trace de mudanças |

### Características

- ✅ Reativo automaticamente
- ✅ Removido em produção
- ✅ Suporta múltiplos valores
- ✅ Funciona com objetos aninhados

---

**Próxima aula:** [8.8 — Snippets — Nova Composição](../8.8-snippets-composicao)
