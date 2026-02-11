---
title: "$state — Estado Reativo"
module: 8
order: 2
---

# 8.2 — `$state` — Estado Reativo

> O fundamento de tudo: declarando estado que o Svelte rastreia automaticamente.

## Objetivos da Aula

- Entender como `$state` funciona
- Dominar deep reactivity com arrays e objetos
- Usar `$state` em classes
- Conhecer `$state.raw` e `$state.snapshot`

---

## Sintaxe Básica

```svelte
<script>
  // Primitivos
  let count = $state(0)
  let name = $state('João')
  let active = $state(true)

  // Arrays
  let items = $state([1, 2, 3])

  // Objetos
  let user = $state({
    name: 'Maria',
    age: 25,
    address: {
      city: 'São Paulo',
      country: 'Brasil'
    }
  })
</script>
```

---

## Deep Reactivity

A grande diferença do Svelte 4: **objetos e arrays são reativos em profundidade**.

### Arrays: Métodos Mutáveis Funcionam!

```svelte
<script>
  let todos = $state([
    { id: 1, text: 'Aprender Svelte 5', done: false },
    { id: 2, text: 'Usar $state', done: false }
  ])

  function addTodo() {
    // ✅ Todos esses funcionam e atualizam o DOM!
    todos.push({ id: 3, text: 'Novo todo', done: false })
  }

  function removeLast() {
    todos.pop()  // ✅ Funciona!
  }

  function toggleFirst() {
    todos[0].done = !todos[0].done  // ✅ Funciona!
  }

  function sortByText() {
    todos.sort((a, b) => a.text.localeCompare(b.text))  // ✅ Funciona!
  }
</script>

<ul>
  {#each todos as todo (todo.id)}
    <li class:done={todo.done}>{todo.text}</li>
  {/each}
</ul>
```

### Objetos: Propriedades Aninhadas

```svelte
<script>
  let user = $state({
    profile: {
      name: 'Ana',
      settings: {
        theme: 'dark',
        notifications: true
      }
    }
  })

  function toggleTheme() {
    // ✅ Atualiza DOM mesmo sendo propriedade aninhada
    user.profile.settings.theme =
      user.profile.settings.theme === 'dark' ? 'light' : 'dark'
  }

  function updateName(newName) {
    user.profile.name = newName  // ✅ Funciona!
  }
</script>
```

---

## Como Funciona: Proxies

O `$state` envolve seu valor em um **Proxy** do JavaScript:

```javascript
let items = $state([1, 2, 3])

// items é um Proxy que:
// 1. Intercepta leituras → registra dependências
// 2. Intercepta escritas → notifica o Svelte
// 3. Faz isso recursivamente para objetos aninhados
```

### Implicação: Comparação por Referência

```svelte
<script>
  let items = $state([1, 2, 3])

  // ❌ Isso é false (proxy vs array)
  console.log(items === [1, 2, 3])

  // ✅ Use $state.snapshot para comparação
  const raw = $state.snapshot(items)
  console.log(JSON.stringify(raw))  // "[1,2,3]"
</script>
```

---

## `$state.raw` — Sem Deep Reactivity

Quando você NÃO quer que propriedades internas sejam rastreadas:

```svelte
<script>
  // Com deep reactivity (padrão)
  let deepUser = $state({
    name: 'João',
    hugeProp: { /* objeto enorme */ }
  })

  // Sem deep reactivity — só a referência é rastreada
  let rawUser = $state.raw({
    name: 'João',
    hugeProp: { /* objeto enorme */ }
  })

  function updateName() {
    // Com $state — funciona
    deepUser.name = 'Maria'  // ✅ DOM atualiza

    // Com $state.raw — NÃO funciona para props
    rawUser.name = 'Maria'   // ❌ DOM NÃO atualiza

    // Com $state.raw — precisa reatribuir o objeto
    rawUser = { ...rawUser, name: 'Maria' }  // ✅ Agora funciona
  }
</script>
```

### Quando Usar `$state.raw`?

- Objetos **muito grandes** que não mudam internamente
- Dados de **bibliotecas externas** (Three.js, D3, etc.)
- **Performance**: evitar overhead do proxy

---

## `$state.snapshot` — Extrair Valor Bruto

Obtém uma cópia não-reativa do estado:

```svelte
<script>
  let items = $state([1, 2, 3])

  function saveToLocalStorage() {
    // ❌ Isso pode não funcionar (é um proxy)
    // localStorage.setItem('items', JSON.stringify(items))

    // ✅ Use snapshot para serialização
    const raw = $state.snapshot(items)
    localStorage.setItem('items', JSON.stringify(raw))
  }

  function sendToAPI() {
    // ✅ Para enviar em requisições
    fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify($state.snapshot(items))
    })
  }
</script>
```

---

## `$state` em Classes

Uma das features mais poderosas: criar classes reativas!

```javascript
// todo.svelte.js
export class Todo {
  id = crypto.randomUUID()
  text = $state('')
  done = $state(false)

  constructor(text) {
    this.text = text
  }

  toggle() {
    this.done = !this.done
  }
}
```

```javascript
// todoList.svelte.js
import { Todo } from './todo.svelte.js'

export class TodoList {
  items = $state([])

  // Getter derivado
  get remaining() {
    return this.items.filter(t => !t.done).length
  }

  get completed() {
    return this.items.filter(t => t.done).length
  }

  add(text) {
    this.items.push(new Todo(text))
  }

  remove(id) {
    const index = this.items.findIndex(t => t.id === id)
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }

  clearCompleted() {
    this.items = this.items.filter(t => !t.done)
  }
}
```

```svelte
<!-- App.svelte -->
<script>
  import { TodoList } from './todoList.svelte.js'

  const todos = new TodoList()
  let newTodo = $state('')

  function addTodo() {
    if (newTodo.trim()) {
      todos.add(newTodo)
      newTodo = ''
    }
  }
</script>

<form onsubmit={e => { e.preventDefault(); addTodo() }}>
  <input bind:value={newTodo} placeholder="Nova tarefa..." />
  <button>Adicionar</button>
</form>

<p>{todos.remaining} restantes, {todos.completed} completas</p>

<ul>
  {#each todos.items as todo (todo.id)}
    <li>
      <input type="checkbox" checked={todo.done} onchange={todo.toggle} />
      <span class:done={todo.done}>{todo.text}</span>
      <button onclick={() => todos.remove(todo.id)}>×</button>
    </li>
  {/each}
</ul>

{#if todos.completed > 0}
  <button onclick={todos.clearCompleted}>Limpar completas</button>
{/if}

<style>
  .done { text-decoration: line-through; opacity: 0.5; }
</style>
```

---

## Estado Global com Classes

```javascript
// stores/cart.svelte.js
class CartStore {
  items = $state([])

  get total() {
    return this.items.reduce((sum, item) =>
      sum + item.price * item.quantity, 0
    )
  }

  get count() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0)
  }

  add(product) {
    const existing = this.items.find(i => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      this.items.push({ ...product, quantity: 1 })
    }
  }

  remove(id) {
    this.items = this.items.filter(i => i.id !== id)
  }

  clear() {
    this.items = []
  }
}

// Singleton exportado
export const cart = new CartStore()
```

```svelte
<!-- Qualquer componente -->
<script>
  import { cart } from './stores/cart.svelte.js'
</script>

<span>🛒 {cart.count} itens (R$ {cart.total.toFixed(2)})</span>
```

---

## ⚠️ Armadilhas Comuns

### 1. Esquecer de usar `$state` em classe

```javascript
// ❌ ERRADO
class Counter {
  count = 0  // NÃO é reativo!

  increment() {
    this.count++  // DOM não atualiza
  }
}

// ✅ CORRETO
class Counter {
  count = $state(0)

  increment() {
    this.count++  // DOM atualiza!
  }
}
```

### 2. Reatribuir quando não precisa

```svelte
<script>
  let items = $state([1, 2, 3])

  // ❌ Desnecessário no Svelte 5
  function addItem() {
    items = [...items, 4]  // Funciona, mas cria array novo
  }

  // ✅ Melhor
  function addItem() {
    items.push(4)  // Mais eficiente
  }
</script>
```

### 3. Comparar proxies diretamente

```svelte
<script>
  let a = $state({ x: 1 })
  let b = $state({ x: 1 })

  // ❌ Sempre false (proxies diferentes)
  if (a === b) { }

  // ✅ Compare valores
  if (a.x === b.x) { }

  // ✅ Ou use snapshot
  if (JSON.stringify($state.snapshot(a)) === JSON.stringify($state.snapshot(b))) { }
</script>
```

---

## Resumo

| API | Uso |
|-----|-----|
| `$state(valor)` | Estado reativo com deep reactivity |
| `$state.raw(valor)` | Estado sem deep reactivity |
| `$state.snapshot(state)` | Extrai valor bruto (não-reativo) |
| `$state` em classes | Propriedades reativas em classes JS |

---

## ✅ Desafio da Aula

### Objetivo
Criar uma classe `ShoppingList` reativa com itens, quantidades e total.

### Requisitos

1. Propriedade `items` como `$state([])`
2. Cada item tem: `name`, `price`, `quantity`
3. Getter `total` que calcula o valor
4. Métodos: `add()`, `remove()`, `updateQuantity()`

### Spec de Verificação

- [ ] `items.push()` atualiza o DOM
- [ ] Alterar `item.quantity` atualiza o DOM
- [ ] `total` recalcula automaticamente
- [ ] `remove()` funciona corretamente

---

**Próxima aula:** [8.3 — `$derived` — Valores Derivados](../8.3-derived-valores-derivados)
