---
title: "Snippets — Nova Composição"
module: 27
order: 8
---

# 27.8 — Snippets — Nova Composição

> Substituindo slots por uma forma mais poderosa e flexível de composição.

## Objetivos da Aula

- Entender por que snippets substituem slots
- Dominar a sintaxe `{#snippet}` e `{@render}`
- Criar componentes altamente reutilizáveis

---

## O Problema com Slots

No Svelte 4, slots tinham limitações:

```svelte
<!-- Svelte 4 - List.svelte -->
<ul>
  {#each items as item}
    <li>
      <slot {item} />  <!-- Como passar dados para o slot? -->
    </li>
  {/each}
</ul>

<!-- Uso -->
<List {items} let:item>
  <span>{item.name}</span>
</List>
```

Problemas:
- Sintaxe `let:` confusa
- Slots nomeados são verbosos
- Dificuldade em tipar com TypeScript

---

## A Solução: Snippets

Snippets são blocos de template reutilizáveis:

```svelte
<script>
  let items = $state([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ])
</script>

<!-- Definir um snippet -->
{#snippet itemRenderer(item)}
  <span class="item">{item.name}</span>
{/snippet}

<!-- Usar o snippet -->
<ul>
  {#each items as item}
    <li>
      {@render itemRenderer(item)}
    </li>
  {/each}
</ul>
```

---

## Sintaxe Básica

### Definindo Snippets

```svelte
<!-- Snippet sem parâmetros -->
{#snippet greeting()}
  <h1>Olá, mundo!</h1>
{/snippet}

<!-- Snippet com parâmetros -->
{#snippet userCard(user, showEmail = false)}
  <div class="card">
    <h2>{user.name}</h2>
    {#if showEmail}
      <p>{user.email}</p>
    {/if}
  </div>
{/snippet}

<!-- Snippet com destructuring -->
{#snippet productItem({ name, price, inStock })}
  <div class="product">
    <span>{name}</span>
    <span>R$ {price.toFixed(2)}</span>
    {#if !inStock}
      <span class="badge">Esgotado</span>
    {/if}
  </div>
{/snippet}
```

### Renderizando Snippets

```svelte
<!-- Renderizar snippet -->
{@render greeting()}

<!-- Com argumentos -->
{@render userCard(currentUser, true)}

<!-- Condicional -->
{#if showCard}
  {@render userCard(user)}
{/if}

<!-- Em loop -->
{#each users as user}
  {@render userCard(user)}
{/each}
```

---

## Snippets como Props

A grande revolução: snippets podem ser passados como props!

### Componente que Recebe Snippet

```svelte
<!-- List.svelte -->
<script>
  let { items, children, empty } = $props()
</script>

{#if items.length === 0}
  {#if empty}
    {@render empty()}
  {:else}
    <p>Nenhum item</p>
  {/if}
{:else}
  <ul>
    {#each items as item, index}
      <li>
        {@render children(item, index)}
      </li>
    {/each}
  </ul>
{/if}
```

### Usando o Componente

```svelte
<script>
  import List from './List.svelte'

  let users = $state([
    { id: 1, name: 'Ana', role: 'admin' },
    { id: 2, name: 'Bruno', role: 'user' }
  ])
</script>

<List items={users}>
  <!-- Snippet "children" é passado automaticamente -->
  {#snippet children(user, index)}
    <span>#{index + 1}</span>
    <strong>{user.name}</strong>
    <em>({user.role})</em>
  {/snippet}

  <!-- Snippet nomeado para estado vazio -->
  {#snippet empty()}
    <div class="empty-state">
      <p>Nenhum usuário encontrado</p>
      <button>Criar usuário</button>
    </div>
  {/snippet}
</List>
```

---

## Comparação: Slots vs Snippets

### Svelte 4 (Slots)

```svelte
<!-- Card.svelte -->
<div class="card">
  <div class="header">
    <slot name="header" />
  </div>
  <div class="body">
    <slot />
  </div>
  <div class="footer">
    <slot name="footer" />
  </div>
</div>

<!-- Uso -->
<Card>
  <h2 slot="header">Título</h2>
  <p>Conteúdo principal</p>
  <button slot="footer">Ação</button>
</Card>
```

### Svelte 5 (Snippets)

```svelte
<!-- Card.svelte -->
<script>
  let { header, children, footer } = $props()
</script>

<div class="card">
  <div class="header">
    {#if header}
      {@render header()}
    {/if}
  </div>
  <div class="body">
    {@render children()}
  </div>
  <div class="footer">
    {#if footer}
      {@render footer()}
    {/if}
  </div>
</div>

<!-- Uso -->
<Card>
  {#snippet header()}
    <h2>Título</h2>
  {/snippet}

  {#snippet children()}
    <p>Conteúdo principal</p>
  {/snippet}

  {#snippet footer()}
    <button>Ação</button>
  {/snippet}
</Card>
```

---

## Snippets com TypeScript

Snippets têm excelente suporte a TypeScript:

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte'

  interface User {
    id: number
    name: string
    email: string
  }

  interface Props {
    items: User[]
    children: Snippet<[User, number]>  // (user, index)
    header?: Snippet                    // Opcional, sem args
    empty?: Snippet                     // Opcional, sem args
  }

  let { items, children, header, empty }: Props = $props()
</script>

{#if header}
  {@render header()}
{/if}

{#if items.length === 0}
  {#if empty}
    {@render empty()}
  {:else}
    <p>Lista vazia</p>
  {/if}
{:else}
  {#each items as item, i}
    {@render children(item, i)}
  {/each}
{/if}
```

---

## Padrão: Componente de Tabela

Um caso de uso poderoso:

```svelte
<!-- Table.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props<T> {
    data: T[]
    columns: Array<{
      key: string
      label: string
      cell?: Snippet<[T]>
    }>
    header?: Snippet<[{ key: string; label: string }]>
  }

  let { data, columns, header }: Props<any> = $props()
</script>

<table>
  <thead>
    <tr>
      {#each columns as column}
        <th>
          {#if header}
            {@render header(column)}
          {:else}
            {column.label}
          {/if}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as row}
      <tr>
        {#each columns as column}
          <td>
            {#if column.cell}
              {@render column.cell(row)}
            {:else}
              {row[column.key]}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
```

### Usando a Tabela

```svelte
<script>
  import Table from './Table.svelte'

  let users = $state([
    { id: 1, name: 'Ana', status: 'active', avatar: '/ana.jpg' },
    { id: 2, name: 'Bruno', status: 'inactive', avatar: '/bruno.jpg' }
  ])

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nome' },
    { key: 'status', label: 'Status' }
  ]
</script>

<Table {data} {columns}>
  <!-- Customizar célula de status -->
  {#snippet statusCell(user)}
    <span class="badge" class:active={user.status === 'active'}>
      {user.status}
    </span>
  {/snippet}

  <!-- Customizar célula de nome com avatar -->
  {#snippet nameCell(user)}
    <div class="user-info">
      <img src={user.avatar} alt="" />
      <span>{user.name}</span>
    </div>
  {/snippet}
</Table>
```

---

## Snippets Recursivos

Snippets podem chamar a si mesmos:

```svelte
<script>
  let tree = $state({
    name: 'root',
    children: [
      {
        name: 'folder1',
        children: [
          { name: 'file1.txt', children: [] },
          { name: 'file2.txt', children: [] }
        ]
      },
      { name: 'folder2', children: [] }
    ]
  })
</script>

{#snippet treeNode(node, depth = 0)}
  <div style="padding-left: {depth * 20}px">
    {#if node.children.length > 0}
      📁
    {:else}
      📄
    {/if}
    {node.name}
  </div>

  {#each node.children as child}
    {@render treeNode(child, depth + 1)}
  {/each}
{/snippet}

{@render treeNode(tree)}
```

---

## Padrão: Render Props

Snippets permitem o padrão "render props" de forma elegante:

```svelte
<!-- MouseTracker.svelte -->
<script>
  let { children } = $props()

  let position = $state({ x: 0, y: 0 })

  function handleMouseMove(e) {
    position = { x: e.clientX, y: e.clientY }
  }
</script>

<div onmousemove={handleMouseMove} class="tracker">
  {@render children(position)}
</div>
```

### Uso

```svelte
<MouseTracker>
  {#snippet children(pos)}
    <p>Mouse está em: {pos.x}, {pos.y}</p>
    <div
      class="cursor"
      style="left: {pos.x}px; top: {pos.y}px"
    />
  {/snippet}
</MouseTracker>
```

---

## Snippets vs Componentes

Quando usar cada um?

| Cenário | Snippet | Componente |
|---------|---------|------------|
| Template reutilizável local | ✅ | ❌ |
| Lógica complexa própria | ❌ | ✅ |
| Precisa ser importado | ❌ | ✅ |
| Customização de filho | ✅ | ❌ |
| Tem estado próprio | ❌ | ✅ |
| Estilo encapsulado | ❌ | ✅ |

---

## ⚠️ Armadilhas Comuns

### 1. Esquecer de Checar Snippets Opcionais

```svelte
<script>
  let { header, children } = $props()
</script>

<!-- ❌ Erro se header não for passado -->
{@render header()}

<!-- ✅ Sempre verifique snippets opcionais -->
{#if header}
  {@render header()}
{/if}
```

### 2. Confundir children com Snippet Nomeado

```svelte
<!-- ❌ Errado - children é reservado para conteúdo direto -->
<Card>
  <p>Isso vai para children automaticamente</p>
</Card>

<!-- ✅ Use snippets explícitos para clareza -->
<Card>
  {#snippet children()}
    <p>Conteúdo explícito</p>
  {/snippet}
</Card>
```

### 3. Não Tipar Parâmetros

```svelte
<!-- ❌ Sem tipos, fácil passar argumentos errados -->
{#snippet item(data)}
  {data.nome}  <!-- Typo: deveria ser name -->
{/snippet}

<!-- ✅ Com TypeScript -->
{#snippet item(data: { name: string; id: number })}
  {data.name}
{/snippet}
```

---

## Resumo

| Sintaxe | Uso |
|---------|-----|
| `{#snippet nome(params)}...{/snippet}` | Define um snippet |
| `{@render nome(args)}` | Renderiza um snippet |
| `children: Snippet<[T]>` | Tipo TypeScript |
| `{#if snippet}{@render snippet()}{/if}` | Snippet opcional |

### Vantagens sobre Slots

- ✅ Parâmetros tipados
- ✅ Sintaxe mais clara
- ✅ Melhor composição
- ✅ Mais flexível
- ✅ Melhor DX com TypeScript

---

## ✅ Desafio da Aula

### Objetivo

Criar um componente `DataGrid` com snippets para:
1. Header customizável
2. Célula customizável por coluna
3. Footer com totais
4. Estado vazio

### Estrutura

```svelte
<DataGrid {data} {columns}>
  {#snippet headerCell(column)}
    <!-- Header customizado -->
  {/snippet}

  {#snippet cell(row, column)}
    <!-- Célula customizada -->
  {/snippet}

  {#snippet footer(data)}
    <!-- Footer com totais -->
  {/snippet}

  {#snippet empty()}
    <!-- Estado vazio -->
  {/snippet}
</DataGrid>
```

### Spec de Verificação

- [ ] Renderiza tabela com dados
- [ ] Permite customizar header
- [ ] Permite customizar células específicas
- [ ] Mostra estado vazio quando sem dados
- [ ] TypeScript valida snippets

---

**Próxima aula:** [27.9 — Event Handlers no Svelte 5](./27.9-event-handlers.md)
