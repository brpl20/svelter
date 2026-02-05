---
title: "Sintaxe de Templates vs JSX"
module: 2
order: 3
---

# 2.3 — Sintaxe de Templates vs JSX

> Duas filosofias de como escrever markup em JavaScript.

## Objetivos da Aula

- Entender as diferenças entre JSX e templates Svelte
- Comparar condicionais, loops e slots/children
- Analisar prós e contras de cada abordagem

---

## Filosofias Diferentes

<div class="not-prose my-8 rounded-xl border border-base-content/10 bg-base-200 p-6 space-y-4">
  <h3 class="text-center text-lg font-bold text-base-content tracking-wide uppercase">Duas Abordagens</h3>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- JSX -->
    <div class="rounded-lg border border-blue-400/30 bg-blue-950/20 p-5 space-y-3">
      <p class="font-semibold text-blue-400 text-sm uppercase tracking-wider">JSX (React)</p>
      <p class="text-blue-200 italic text-sm">"JavaScript com HTML dentro"</p>
      <ul class="text-sm text-blue-200/80 space-y-1 list-none pl-0">
        <li>&rarr; Tudo e JavaScript, HTML e apenas sintaxe especial</li>
        <li>&rarr; Condicionais: operadores ternarios, &amp;&amp;</li>
        <li>&rarr; Loops: .map(), .filter()</li>
      </ul>
    </div>

    <!-- Templates -->
    <div class="rounded-lg border border-orange-400/30 bg-orange-950/20 p-5 space-y-3">
      <p class="font-semibold text-orange-400 text-sm uppercase tracking-wider">Templates (Svelte)</p>
      <p class="text-orange-200 italic text-sm">"HTML com JavaScript dentro"</p>
      <ul class="text-sm text-orange-200/80 space-y-1 list-none pl-0">
        <li>&rarr; HTML e a linguagem principal</li>
        <li>&rarr; Condicionais: &#123;#if&#125;, &#123;:else&#125;</li>
        <li>&rarr; Loops: &#123;#each&#125;</li>
      </ul>
    </div>
  </div>
</div>

---

## Interpolação Básica

### React (JSX)

```jsx
function Greeting({ name, age }) {
  const isAdult = age >= 18

  return (
    <div>
      <h1>Olá, {name}!</h1>
      <p>Você tem {age} anos.</p>
      <p>Status: {isAdult ? 'Adulto' : 'Menor'}</p>
      <p>Ano de nascimento: {new Date().getFullYear() - age}</p>
    </div>
  )
}
```

### Svelte

```svelte
<script>
  export let name
  export let age

  $: isAdult = age >= 18
</script>

<div>
  <h1>Olá, {name}!</h1>
  <p>Você tem {age} anos.</p>
  <p>Status: {isAdult ? 'Adulto' : 'Menor'}</p>
  <p>Ano de nascimento: {new Date().getFullYear() - age}</p>
</div>
```

**Similaridade:** Interpolação com `{}` é igual!

---

## Condicionais

### React: Ternários e &&

```jsx
function UserStatus({ user, isLoading, error }) {
  // Condicional simples com &&
  return (
    <div>
      {isLoading && <Spinner />}

      {error && <p className="error">{error}</p>}

      {/* Ternário para if/else */}
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>Faça login para continuar</p>
      )}

      {/* Múltiplas condições: ternários aninhados (feio!) */}
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Error message={error} />
      ) : user ? (
        <Profile user={user} />
      ) : (
        <LoginForm />
      )}
    </div>
  )
}
```

### Svelte: Blocos Declarativos

```svelte
<script>
  export let user
  export let isLoading
  export let error
</script>

<div>
  {#if isLoading}
    <Spinner />
  {/if}

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if user}
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  {:else}
    <p>Faça login para continuar</p>
  {/if}

  <!-- Múltiplas condições: limpo e legível! -->
  {#if isLoading}
    <Spinner />
  {:else if error}
    <Error message={error} />
  {:else if user}
    <Profile {user} />
  {:else}
    <LoginForm />
  {/if}
</div>
```

**Vantagem Svelte:**
- Sem ternários aninhados confusos
- Sintaxe clara `{#if}`, `{:else if}`, `{:else}`, `{/if}`
- Mais legível em condições complexas

---

## Loops (Iteração)

### React: .map()

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={todo.id}>
          <span>{index + 1}.</span>
          <span>{todo.text}</span>
          {todo.done && <span>✓</span>}
        </li>
      ))}
    </ul>
  )
}

// Lista vazia
function EmptyAware({ items }) {
  return (
    <div>
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum item encontrado</p>
      )}
    </div>
  )
}
```

### Svelte: `{#each}`

```svelte
<script>
  export let todos
</script>

<ul>
  {#each todos as todo, index (todo.id)}
    <li>
      <span>{index + 1}.</span>
      <span>{todo.text}</span>
      {#if todo.done}
        <span>✓</span>
      {/if}
    </li>
  {/each}
</ul>

<!-- Lista vazia com {:else} -->
<div>
  {#each items as item (item.id)}
    <li>{item.name}</li>
  {:else}
    <p>Nenhum item encontrado</p>
  {/each}
</div>
```

**Diferenças:**
| Aspecto | React | Svelte |
|---------|-------|--------|
| Sintaxe | `.map()` | `{#each}...{/each}` |
| Chave | `key={id}` prop | `(id)` após variável |
| Índice | Segundo param do map | `as item, index` |
| Lista vazia | Ternário manual | `{:else}` built-in |

---

## Desestruturação no Loop

### React

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(({ id, name, email, role }) => (
        <li key={id}>
          <strong>{name}</strong>
          <span>{email}</span>
          <span>({role})</span>
        </li>
      ))}
    </ul>
  )
}
```

### Svelte

```svelte
<ul>
  {#each users as { id, name, email, role } (id)}
    <li>
      <strong>{name}</strong>
      <span>{email}</span>
      <span>({role})</span>
    </li>
  {/each}
</ul>
```

---

## Promises e Estados Async

### React: Estado Manual

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`/api/users/${userId}`)
      .then(r => {
        if (!r.ok) throw new Error('Erro ao carregar')
        return r.json()
      })
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) return <Spinner />
  if (error) return <p>Erro: {error.message}</p>
  return <Profile user={user} />
}
```

### Svelte: `{#await}`

```svelte
<script>
  export let userId

  // Promise reativa
  $: userPromise = fetch(`/api/users/${userId}`).then(r => {
    if (!r.ok) throw new Error('Erro ao carregar')
    return r.json()
  })
</script>

{#await userPromise}
  <Spinner />
{:then user}
  <Profile {user} />
{:catch error}
  <p>Erro: {error.message}</p>
{/await}

<!-- Versão curta se não precisar de loading state -->
{#await userPromise then user}
  <Profile {user} />
{/await}
```

**Vantagem Svelte:** `{#await}` elimina todo o boilerplate de estados async!

---

## Children vs Slots

### React: children prop

```jsx
// Card.jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

// Uso
function App() {
  return (
    <Card title="Meu Card">
      <p>Conteúdo do card</p>
      <button>Ação</button>
    </Card>
  )
}
```

### Svelte: slot

```svelte
<!-- Card.svelte -->
<script>
  export let title
</script>

<div class="card">
  <h2>{title}</h2>
  <div class="card-body">
    <slot />
  </div>
</div>

<!-- Uso -->
<Card title="Meu Card">
  <p>Conteúdo do card</p>
  <button>Ação</button>
</Card>
```

### Slots Nomeados

```jsx
// React: props para diferentes "slots"
function Layout({ header, sidebar, children, footer }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  )
}

// Uso
<Layout
  header={<Nav />}
  sidebar={<Menu />}
  footer={<Copyright />}
>
  <p>Conteúdo principal</p>
</Layout>
```

```svelte
<!-- Layout.svelte -->
<div class="layout">
  <header>
    <slot name="header" />
  </header>
  <aside>
    <slot name="sidebar" />
  </aside>
  <main>
    <slot />
  </main>
  <footer>
    <slot name="footer" />
  </footer>
</div>

<!-- Uso -->
<Layout>
  <Nav slot="header" />
  <Menu slot="sidebar" />
  <p>Conteúdo principal</p>
  <Copyright slot="footer" />
</Layout>
```

### Slot Fallback (Conteúdo Padrão)

```svelte
<!-- Button.svelte -->
<button>
  <slot>Clique aqui</slot>  <!-- Fallback -->
</button>

<!-- Uso -->
<Button />              <!-- Mostra: "Clique aqui" -->
<Button>Enviar</Button> <!-- Mostra: "Enviar" -->
```

---

## Atributos e Props

### React

```jsx
function Button({ variant, disabled, onClick, className, ...rest }) {
  return (
    <button
      className={`btn btn-${variant} ${className || ''}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}  // Spread de props restantes
    >
      Click
    </button>
  )
}

// Uso
<Button
  variant="primary"
  disabled={false}
  onClick={handleClick}
  data-testid="submit-btn"
/>
```

### Svelte

```svelte
<script>
  export let variant = 'default'
  export let disabled = false
</script>

<button
  class="btn btn-{variant}"
  {disabled}
  on:click
  {...$$restProps}
>
  <slot>Click</slot>
</button>

<!-- Uso -->
<Button
  variant="primary"
  disabled={false}
  on:click={handleClick}
  data-testid="submit-btn"
/>
```

**Shorthands do Svelte:**
- `{disabled}` = `disabled={disabled}`
- `on:click` = encaminha evento para cima
- `{...$$restProps}` = props não declaradas

---

## Classes Condicionais

### React

```jsx
// Concatenação manual
<div className={`card ${isActive ? 'active' : ''} ${isHighlighted ? 'highlighted' : ''}`}>

// Com biblioteca (clsx ou classnames)
import clsx from 'clsx'
<div className={clsx('card', { active: isActive, highlighted: isHighlighted })}>
```

### Svelte

```svelte
<!-- Diretiva class: nativa -->
<div
  class="card"
  class:active={isActive}
  class:highlighted={isHighlighted}
>

<!-- Shorthand quando nome é igual à variável -->
<div class="card" class:active class:highlighted>

<!-- Também funciona concatenação -->
<div class="card {isActive ? 'active' : ''}">
```

---

## Estilos Inline

### React

```jsx
// Objeto de estilos (camelCase!)
<div style={{
  backgroundColor: color,
  fontSize: `${size}px`,
  marginTop: '20px'
}}>
```

### Svelte

```svelte
<!-- String (como HTML normal) -->
<div style="background-color: {color}; font-size: {size}px; margin-top: 20px">

<!-- Ou diretiva style: (Svelte 3.46+) -->
<div
  style:background-color={color}
  style:font-size="{size}px"
  style:margin-top="20px"
>
```

---

## HTML Dinâmico (Perigoso!)

### React

```jsx
// dangerouslySetInnerHTML (nome assustador de propósito!)
<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
```

### Svelte

```svelte
<!-- @html (mais curto, igualmente perigoso) -->
<div>{@html htmlContent}</div>
```

⚠️ **Aviso:** Ambos são vulneráveis a XSS! Sempre sanitize o HTML!

---

## Tabela Comparativa

| Funcionalidade | React JSX | Svelte Template |
|----------------|-----------|-----------------|
| Interpolação | `{value}` | `{value}` |
| If simples | `{condition && <El />}` | `{#if condition}<El />{/if}` |
| If/else | `{cond ? <A /> : <B />}` | `{#if cond}<A />{:else}<B />{/if}` |
| Loop | `{arr.map(x => <El key={x.id} />)}` | `{#each arr as x (x.id)}<El />{/each}` |
| Loop vazio | Ternário manual | `{#each}...{:else}...{/each}` |
| Async | useState + useEffect | `{#await promise}...{/await}` |
| Children | `{children}` | `<slot />` |
| Named slots | Props separadas | `<slot name="x" />` |
| Class condicional | `className={cond ? 'x' : ''}` | `class:x={cond}` |
| Style dinâmico | `style={{ prop: val }}` | `style:prop={val}` |
| HTML raw | `dangerouslySetInnerHTML` | `{@html content}` |
| Spread props | `{...props}` | `{...$$restProps}` |

---

## ✅ Desafio da Aula

### Objetivo
Converter um componente React complexo com múltiplas features de template para Svelte.

### Componente React

```jsx
function ProductList({ products, loading, error, onAddToCart }) {
  if (loading) return <div className="spinner">Carregando...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="product-list">
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li
              key={product.id}
              className={`product ${product.inStock ? '' : 'out-of-stock'}`}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">R$ {product.price.toFixed(2)}</p>
              {product.discount > 0 && (
                <span className="discount">-{product.discount}%</span>
              )}
              <button
                disabled={!product.inStock}
                onClick={() => onAddToCart(product)}
              >
                {product.inStock ? 'Adicionar' : 'Indisponível'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">Nenhum produto encontrado</p>
      )}
    </div>
  )
}
```

### Spec de Verificação

- [ ] Mostra loading state
- [ ] Mostra erro se houver
- [ ] Lista produtos com loop
- [ ] Mostra mensagem se lista vazia
- [ ] Classes condicionais funcionam
- [ ] Desconto aparece só quando > 0
- [ ] Botão desabilitado quando sem estoque

### Solução

<details>
<summary>🔍 Clique para ver a solução</summary>

```svelte
<script>
  import { createEventDispatcher } from 'svelte'

  export let products = []
  export let loading = false
  export let error = null

  const dispatch = createEventDispatcher()

  function addToCart(product) {
    dispatch('addToCart', product)
  }
</script>

{#if loading}
  <div class="spinner">Carregando...</div>
{:else if error}
  <div class="error">{error}</div>
{:else}
  <div class="product-list">
    {#each products as product (product.id)}
      <li class="product" class:out-of-stock={!product.inStock}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p class="price">R$ {product.price.toFixed(2)}</p>

        {#if product.discount > 0}
          <span class="discount">-{product.discount}%</span>
        {/if}

        <button
          disabled={!product.inStock}
          on:click={() => addToCart(product)}
        >
          {product.inStock ? 'Adicionar' : 'Indisponível'}
        </button>
      </li>
    {:else}
      <p class="empty">Nenhum produto encontrado</p>
    {/each}
  </div>
{/if}

<style>
  .out-of-stock { opacity: 0.5; }
  .discount { color: red; }
</style>
```

</details>

---

**Próxima aula:** [2.4 — Gerenciamento de Estado: Stores vs Context/Redux](./2.4-estado-stores-vs-context.md)
