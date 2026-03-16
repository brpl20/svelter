---
title: "Remote Functions no SvelteKit: Guia Completo para Comunicação Type-Safe"
date: "2026-03-16"
summary: "Aprenda a usar Remote Functions no SvelteKit para comunicação type-safe entre cliente e servidor, substituindo APIs REST tradicionais."
tags: ["sveltekit", "remote functions", "type-safe", "tutorial"]
---

# Remote Functions no SvelteKit: Guia Completo para Comunicação Type-Safe

## TL;DR

Remote Functions são o novo mecanismo do SvelteKit para comunicação cliente-servidor com tipagem ponta a ponta. Você escreve funções normais no servidor e as chama no cliente como se fossem locais. Sem rotas de API manuais, sem esquemas de validação duplicados, sem boilerplate. Quatro tipos cobrem todos os cenários: `query` para leitura, `form` para formulários progressivos, `command` para mutações, e `prerender` para conteúdo estático.

---

## O Problema: A Fadiga das APIs REST

Todo desenvolvedor fullstack conhece o ciclo:

1. Criar uma rota de API (`+server.ts`)
2. Definir o schema de request e response
3. Escrever o handler com validação
4. No cliente, fazer fetch com a URL certa
5. Tipar manualmente a resposta
6. Tratar erros em dois lugares
7. Repetir para cada endpoint

Em projetos grandes, esse boilerplate vira metade do código. E o pior: **a tipagem entre cliente e servidor é uma mentira**. Você define um tipo no server, outro no client, e reza para que estejam sincronizados.

Bibliotecas como tRPC resolveram parte disso, mas adicionam uma camada inteira de abstração. Server Actions do Next.js simplificaram mutações, mas têm limitações sérias para leitura de dados e não oferecem batching nativo.

O SvelteKit atacou esse problema de forma mais integrada.

---

## A Solução: Remote Functions

Remote Functions são funções que vivem no servidor mas podem ser chamadas diretamente pelo cliente. O SvelteKit cuida de todo o transporte: serialização, requisições HTTP, tipagem e tratamento de erros.

Existem quatro tipos, cada um para um cenário específico:

| Tipo | Uso | Transporte | Progressive Enhancement |
|------|-----|------------|------------------------|
| `query` | Leitura de dados | GET (cacheable) | Não |
| `form` | Formulários | POST (FormData) | Sim |
| `command` | Mutações programáticas | POST (JSON) | Não |
| `prerender` | Conteúdo estático | Build time | N/A |

### Onde ficam as Remote Functions?

As funções são definidas em arquivos dentro de `src/lib/server/` (ou qualquer módulo server-only). O compilador do SvelteKit detecta automaticamente os exports marcados e gera o código de transporte.

---

## Passo a Passo: Implementando Cada Tipo

### 1. Query: Leitura de Dados Type-Safe

`query` é para buscar dados. Pense nele como um GET endpoint tipado que o cliente chama como função.

**Servidor** (`src/lib/server/todos.ts`):

```typescript
import { query } from '@sveltejs/kit/remote';
import { db } from '$lib/server/database';

export const getTodos = query(
  async (event, { filter }: { filter?: string }) => {
    const userId = event.locals.user?.id;
    if (!userId) {
      throw new Error('Não autenticado');
    }
    const todos = await db.todo.findMany({
      where: {
        userId,
        ...(filter ? { status: filter } : {})
      }
    });
    // tipo inferido automaticamente
    return todos;
  }
);
```

**Cliente** (`src/routes/todos/+page.svelte`):

```svelte
<script lang="ts">
  import { getTodos } from '$lib/server/todos';
  let filter = $state('all');
  // Reativo: quando filter muda, refaz a query
  const todos = $derived.by(
    () => getTodos({ filter })
  );
</script>

<select bind:value={filter}>
  <option value="all">Todos</option>
  <option value="pending">Pendentes</option>
  <option value="done">Concluídos</option>
</select>

{#await todos}
  <p>Carregando...</p>
{:then items}
  <ul>
    {#each items as todo}
      <li>{todo.title}</li>
    {/each}
  </ul>
{:catch error}
  <p>Erro: {error.message}</p>
{/await}
```

O SvelteKit gera uma requisição GET para um endpoint interno. A resposta é cacheável pelo navegador e CDNs. O tipo de retorno flui do servidor para o cliente sem anotação manual.

### 2. Form: Formulários com Progressive Enhancement

`form` é o substituto das form actions, mas com tipagem bidirecional. Funciona sem JavaScript no cliente.

**Servidor** (`src/lib/server/todos.ts`):

```typescript
import { form } from '@sveltejs/kit/remote';
import { z } from 'zod';

const CreateTodoSchema = z.object({
  title: z.string()
    .min(1, 'Título obrigatório')
    .max(100),
  priority: z.enum(['low', 'medium', 'high'])
    .default('medium')
});

export const createTodo = form(
  async (event, data) => {
    const parsed = CreateTodoSchema
      .safeParse(data);
    if (!parsed.success) {
      return {
        success: false as const,
        errors: parsed.error
          .flatten().fieldErrors
      };
    }
    const todo = await db.todo.create({
      data: {
        ...parsed.data,
        userId: event.locals.user!.id
      }
    });
    return { success: true as const, todo };
  }
);
```

**Cliente** (`src/routes/todos/new/+page.svelte`):

```svelte
<script lang="ts">
  import { createTodo } from '$lib/server/todos';
  import { enhance } from '$app/forms';
</script>

<form
  method="POST"
  action={createTodo.action}
  use:enhance={createTodo.enhance}
>
  <label>
    Título
    <input name="title" required />
  </label>
  <label>
    Prioridade
    <select name="priority">
      <option value="low">Baixa</option>
      <option value="medium">Média</option>
      <option value="high">Alta</option>
    </select>
  </label>
  <button type="submit">Criar</button>
</form>
```

O formulário funciona mesmo com JavaScript desabilitado. Com JS habilitado, a submissão é interceptada via fetch.

### 3. Command: Mutações Programáticas

`command` é para mutações que não vêm de formulários: cliques em botões, drag-and-drop, ações em lote.

```typescript
// src/lib/server/todos.ts
import { command } from '@sveltejs/kit/remote';

export const toggleTodo = command(
  async (event, { id }: { id: string }) => {
    const todo = await db.todo
      .findUnique({ where: { id } });
    if (!todo) {
      throw new Error('Todo não encontrado');
    }
    return db.todo.update({
      where: { id },
      data: { done: !todo.done }
    });
  }
);
```

```svelte
<script lang="ts">
  import { toggleTodo } from '$lib/server/todos';

  async function handleToggle(id: string) {
    // updated é tipado automaticamente
    const updated = await toggleTodo({ id });
  }
</script>
```

### 4. Prerender: Conteúdo Estático em Build Time

`prerender` executa no momento do build e gera dados estáticos. Zero requests em runtime.

```typescript
import { prerender } from '@sveltejs/kit/remote';

export const getBlogPosts = prerender(
  async () => {
    const posts = import.meta.glob(
      '/src/content/blog/*.md',
      { eager: true }
    );
    return Object.entries(posts)
      .map(([path, mod]) => ({
        slug: path.split('/')
          .pop()?.replace('.md', ''),
        title: mod.metadata.title,
        date: mod.metadata.date
      }));
  }
);
```

---

## Batching: O Superpoder Silencioso

Quando o cliente dispara múltiplas queries no mesmo tick, o SvelteKit as agrupa em uma única requisição HTTP. Isso acontece automaticamente.

```svelte
<script lang="ts">
  import { getUser } from '$lib/server/auth';
  import { getTodos } from '$lib/server/todos';
  import { getNotifications }
    from '$lib/server/notifications';

  // Três chamadas viram UMA requisição HTTP
  const user = $derived.by(() => getUser());
  const todos = $derived.by(
    () => getTodos({ filter: 'pending' })
  );
  const notifications = $derived.by(
    () => getNotifications({ unread: true })
  );
</script>
```

No React com Server Actions, cada chamada é uma requisição separada. Com tRPC, você precisa configurar batching explicitamente. No SvelteKit, é o comportamento padrão.

---

## Comparativo: Remote Functions vs Next.js Server Actions

| Aspecto | SvelteKit | Next.js |
|---------|-----------|---------|
| **Leitura** | `query` (GET, cacheable) | RSC (diferente) |
| **Formulários** | `form` (progressive) | `useActionState` |
| **Mutações** | `command` (POST) | Server Actions |
| **Estático** | `prerender` | `generateStaticParams` |
| **Batching** | Automático | Não nativo |
| **Tipagem** | Inferida ponta a ponta | Inferida (caveats) |
| **Sem JS** | `form` funciona | Config extra |
| **Bundle** | ~1.6KB runtime | ~44KB runtime |

A principal diferença filosófica: no Next.js, Server Actions são apenas para mutações. Para leitura, você usa Server Components (RSC). No SvelteKit, Remote Functions cobrem leitura e escrita com a mesma API.

---

## Quando Usar Cada Tipo

- **Precisa buscar dados reativamente?** -> `query`
- **É um formulário que deve funcionar sem JS?** -> `form`
- **É uma mutação disparada por código?** -> `command`
- **Os dados são estáticos e conhecidos no build?** -> `prerender`
- **Precisa de WebSocket ou streaming?** -> `+server.ts`
- **É uma API pública para terceiros?** -> `+server.ts`

Remote Functions são para comunicação interna entre o frontend e o backend do seu SvelteKit app.

---

## Migração Gradual

Remote Functions coexistem com form actions, rotas de API e load functions.

1. **Novos features**: use Remote Functions desde o início
2. **Forms existentes**: migre quando precisar mexer neles
3. **Endpoints internos**: substitua por `query` ou `command`
4. **APIs públicas**: mantenha como `+server.ts`

---

## Recursos

- [Documentação oficial Remote Functions](https://svelte.dev/docs/kit/remote-functions)
- [RFC original](https://github.com/sveltejs/kit/discussions/13968)
- [Documentação SvelteKit](https://svelte.dev/docs/kit)
- [Svelte 5 + Runes: Guia Completo (Svelter)](https://svelter.com.br)
