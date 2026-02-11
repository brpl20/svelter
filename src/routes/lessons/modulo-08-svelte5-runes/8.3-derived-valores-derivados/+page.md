---
title: "$derived — Valores Derivados"
module: 8
order: 3
---

# 8.3 — `$derived` — Valores Derivados

> Valores computados que se atualizam automaticamente quando suas dependências mudam.

## Objetivos da Aula

- Entender `$derived` e quando usar
- Conhecer `$derived.by` para lógica complexa
- Entender auto-tracking de dependências
- Evitar armadilhas comuns

---

## Sintaxe Básica

```svelte
<script>
  let count = $state(0)

  // Derivado simples — expressão única
  let doubled = $derived(count * 2)
  let tripled = $derived(count * 3)
  let isEven = $derived(count % 2 === 0)
</script>

<p>
  {count} × 2 = {doubled}<br>
  {count} × 3 = {tripled}<br>
  {count} é {isEven ? 'par' : 'ímpar'}
</p>
```

---

## `$derived.by` — Lógica Complexa

Quando precisar de mais que uma expressão simples:

```svelte
<script>
  let items = $state([
    { name: 'Maçã', price: 3, qty: 2 },
    { name: 'Banana', price: 2, qty: 5 },
    { name: 'Laranja', price: 4, qty: 3 }
  ])

  // Simples — expressão única
  let count = $derived(items.length)

  // Complexo — usa $derived.by com função
  let total = $derived.by(() => {
    let sum = 0
    for (const item of items) {
      sum += item.price * item.qty
    }
    return sum
  })

  // Ou com reduce
  let totalAlternativo = $derived(
    items.reduce((sum, item) => sum + item.price * item.qty, 0)
  )

  // Filtragem complexa
  let expensiveItems = $derived.by(() => {
    return items
      .filter(item => item.price > 2)
      .sort((a, b) => b.price - a.price)
  })
</script>
```

### Quando Usar Cada Um?

```svelte
<script>
  let count = $state(0)

  // ✅ $derived — expressão simples
  let doubled = $derived(count * 2)
  let message = $derived(count > 10 ? 'Alto' : 'Baixo')
  let items = $derived(data.filter(d => d.active))

  // ✅ $derived.by — múltiplas linhas ou lógica complexa
  let analysis = $derived.by(() => {
    if (count === 0) return 'zero'
    if (count < 0) return 'negativo'
    if (count < 10) return 'pequeno'
    if (count < 100) return 'médio'
    return 'grande'
  })

  let processedData = $derived.by(() => {
    const filtered = data.filter(d => d.active)
    const sorted = filtered.sort((a, b) => b.score - a.score)
    const top10 = sorted.slice(0, 10)
    return top10.map(d => ({ ...d, rank: top10.indexOf(d) + 1 }))
  })
</script>
```

---

## Auto-Tracking de Dependências

O Svelte rastreia automaticamente quais `$state` você leu:

```svelte
<script>
  let firstName = $state('João')
  let lastName = $state('Silva')
  let showFull = $state(true)

  // Dependências: firstName, lastName, showFull
  let displayName = $derived(
    showFull ? `${firstName} ${lastName}` : firstName
  )

  // Se showFull = false, lastName NÃO é uma dependência!
  // O Svelte é inteligente: só recomputa quando dependências
  // REALMENTE USADAS mudam
</script>
```

### Exemplo: Conditional Dependencies

```svelte
<script>
  let mode = $state('simple')  // 'simple' ou 'advanced'
  let simpleValue = $state(10)
  let advancedConfig = $state({ multiplier: 2, offset: 5 })

  let result = $derived.by(() => {
    if (mode === 'simple') {
      // Só depende de simpleValue
      return simpleValue * 2
    } else {
      // Só depende de advancedConfig
      return simpleValue * advancedConfig.multiplier + advancedConfig.offset
    }
  })

  // Mudar advancedConfig quando mode='simple' NÃO recomputa result!
</script>
```

---

## Derivados de Derivados

Encadeamento funciona naturalmente:

```svelte
<script>
  let celsius = $state(20)

  let fahrenheit = $derived(celsius * 9/5 + 32)
  let kelvin = $derived(celsius + 273.15)

  // Derivado de derivado
  let tempSummary = $derived(
    `${celsius}°C = ${fahrenheit.toFixed(1)}°F = ${kelvin.toFixed(1)}K`
  )

  // Múltiplas dependências
  let average = $derived((celsius + fahrenheit + kelvin) / 3)
</script>
```

---

## Memoização Automática

`$derived` só recomputa quando dependências mudam:

```svelte
<script>
  let items = $state([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  let filter = $state('all')  // 'all', 'even', 'odd'

  let filtered = $derived.by(() => {
    console.log('Recomputando filtered...')  // Só quando necessário!

    switch (filter) {
      case 'even': return items.filter(n => n % 2 === 0)
      case 'odd': return items.filter(n => n % 2 !== 0)
      default: return items
    }
  })

  // Mudar algo NÃO relacionado não recomputa filtered
  let unrelated = $state('hello')
</script>

<button onclick={() => unrelated = 'world'}>
  Mudar unrelated (não recomputa filtered)
</button>
```

---

## Derivados Assíncronos?

`$derived` é **síncrono**. Para dados assíncronos, use `$effect`:

```svelte
<script>
  let userId = $state(1)
  let user = $state(null)
  let loading = $state(false)

  // ❌ NÃO FUNCIONA — $derived não suporta async
  // let user = $derived(await fetch(`/api/users/${userId}`))

  // ✅ Use $effect para async
  $effect(() => {
    loading = true
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => {
        user = data
        loading = false
      })
  })

  // Derivados síncronos do estado carregado
  let userName = $derived(user?.name ?? 'Carregando...')
  let userAge = $derived(user?.age ?? 0)
</script>
```

---

## Comparando com Svelte 4

### Svelte 4: `$:` para tudo

```svelte
<script>
  let count = 0

  // Derivado
  $: doubled = count * 2

  // Também derivado, mas confuso
  $: {
    console.log(count)  // É efeito!
  }

  // Derivado com condição
  $: message = count > 10 ? 'alto' : 'baixo'
</script>
```

### Svelte 5: Separação clara

```svelte
<script>
  let count = $state(0)

  // Derivado — claro!
  let doubled = $derived(count * 2)

  // Efeito — claro!
  $effect(() => {
    console.log(count)
  })

  // Derivado com condição
  let message = $derived(count > 10 ? 'alto' : 'baixo')
</script>
```

---

## ⚠️ Armadilhas Comuns

### 1. Usar `$effect` quando deveria usar `$derived`

```svelte
<script>
  let count = $state(0)

  // ❌ ERRADO — NÃO faça isso!
  let doubled
  $effect(() => {
    doubled = count * 2  // Isso causa problemas!
  })

  // ✅ CORRETO
  let doubled = $derived(count * 2)
</script>
```

**Por que é errado?**
- `$effect` roda DEPOIS da renderização
- O valor inicial de `doubled` será `undefined`
- Pode causar loops infinitos em casos complexos

### 2. Mutar estado dentro de `$derived`

```svelte
<script>
  let items = $state([1, 2, 3])
  let count = $state(0)

  // ❌ ERRADO — nunca mute estado em derived!
  let doubled = $derived.by(() => {
    count++  // NUNCA FAÇA ISSO!
    return items.length * 2
  })

  // ✅ Derived deve ser puro — só calcular e retornar
  let doubled = $derived(items.length * 2)
</script>
```

### 3. Esquecer `.by` para funções

```svelte
<script>
  let items = $state([1, 2, 3])

  // ❌ Isso executa a função IMEDIATAMENTE
  let total = $derived((() => {
    let sum = 0
    for (const i of items) sum += i
    return sum
  })())  // Note os () extras — IIFE

  // ✅ Use $derived.by
  let total = $derived.by(() => {
    let sum = 0
    for (const i of items) sum += i
    return sum
  })
</script>
```

---

## Padrões Úteis

### Filtro + Ordenação

```svelte
<script>
  let products = $state([
    { name: 'Laptop', price: 2500, category: 'tech' },
    { name: 'Cadeira', price: 800, category: 'furniture' },
    { name: 'Mouse', price: 150, category: 'tech' }
  ])

  let searchTerm = $state('')
  let categoryFilter = $state('all')
  let sortBy = $state('name')

  let filteredProducts = $derived.by(() => {
    let result = products

    // Filtrar por categoria
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter)
    }

    // Filtrar por busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(term))
    }

    // Ordenar
    result = [...result].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      return a.name.localeCompare(b.name)
    })

    return result
  })
</script>
```

### Paginação

```svelte
<script>
  let allItems = $state(/* muitos itens */)
  let currentPage = $state(1)
  let itemsPerPage = $state(10)

  let totalPages = $derived(Math.ceil(allItems.length / itemsPerPage))

  let paginatedItems = $derived.by(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return allItems.slice(start, end)
  })

  let canGoBack = $derived(currentPage > 1)
  let canGoForward = $derived(currentPage < totalPages)
</script>
```

---

## Resumo

| API | Uso |
|-----|-----|
| `$derived(expr)` | Expressão simples computada |
| `$derived.by(fn)` | Lógica complexa com múltiplas linhas |
| Auto-tracking | Dependências detectadas automaticamente |
| Memoização | Só recomputa quando dependências mudam |

---

## ✅ Desafio da Aula

### Objetivo
Criar um sistema de busca com filtros e estatísticas derivadas.

### Dados

```javascript
let products = $state([
  { name: 'iPhone', price: 5000, stock: 10, category: 'phones' },
  { name: 'Galaxy', price: 4000, stock: 15, category: 'phones' },
  { name: 'MacBook', price: 12000, stock: 5, category: 'laptops' },
  // ... mais produtos
])
```

### Derivados Necessários

1. `filteredProducts` — filtrado por categoria e busca
2. `totalValue` — soma de (price × stock) dos filtrados
3. `averagePrice` — média de preços
4. `lowStockCount` — quantidade com stock &lt; 10
5. `stats` — objeto com todas as estatísticas

---

**Próxima aula:** [8.4 — `$effect` — Efeitos Colaterais](../8.4-effect-efeitos-colaterais)
