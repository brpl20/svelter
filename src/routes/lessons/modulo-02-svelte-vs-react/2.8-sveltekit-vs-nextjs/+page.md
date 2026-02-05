---
title: "SvelteKit vs Next.js"
module: 2
order: 8
---

# 2.8 — SvelteKit vs Next.js

> Comparando os meta-frameworks fullstack.

## Objetivos da Aula

- Comparar arquiteturas do SvelteKit e Next.js
- Entender diferenças em roteamento, data loading e APIs
- Ver equivalências de features

---

## O Que São Meta-Frameworks?

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
  <div class="px-5 py-3 bg-base-300 border-b border-base-content/10 font-bold text-base-content text-lg tracking-wide">
    FRAMEWORK vs META-FRAMEWORK
  </div>
  <div class="p-5 space-y-5 text-base-content">
    <div>
      <div class="font-semibold mb-1">Framework (Svelte, React):</div>
      <ul class="list-none pl-4 space-y-0.5 text-sm">
        <li>→ Biblioteca para criar componentes UI</li>
        <li>→ Não opinado sobre roteamento, fetching, etc</li>
      </ul>
    </div>
    <div>
      <div class="font-semibold mb-1">Meta-Framework (SvelteKit, Next.js):</div>
      <ul class="list-none pl-4 space-y-0.5 text-sm">
        <li>→ Framework completo para apps fullstack</li>
        <li>→ Roteamento, SSR, API routes, deploy</li>
        <li>→ Opinado (convenções sobre configuração)</li>
      </ul>
    </div>
    <div class="border-t border-base-content/10 pt-4">
      <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm font-mono">
        <span class="font-semibold">Svelte</span><span>→ SvelteKit</span>
        <span class="font-semibold">React</span><span>→ Next.js, Remix</span>
        <span class="font-semibold">Vue</span><span>→ Nuxt</span>
      </div>
    </div>
  </div>
</div>

---

## Roteamento

### Next.js (App Router)

<div class="not-prose my-4 rounded-lg border border-base-content/10 bg-base-200 p-4 text-sm font-mono text-base-content overflow-x-auto">
  <div class="font-semibold mb-2 text-base-content/80">app/</div>
  <div class="grid grid-cols-[1fr_auto] gap-x-6 gap-y-0.5 pl-4">
    <span>page.tsx</span><span class="text-base-content/50">→ /</span>
    <span>about/page.tsx</span><span class="text-base-content/50">→ /about</span>
    <span>blog/page.tsx</span><span class="text-base-content/50">→ /blog</span>
    <span>blog/[slug]/page.tsx</span><span class="text-base-content/50">→ /blog/:slug</span>
    <span>api/users/route.ts</span><span class="text-base-content/50">→ /api/users</span>
    <span>layout.tsx</span><span class="text-base-content/50">→ Layout raiz</span>
  </div>
</div>

### SvelteKit

<div class="not-prose my-4 rounded-lg border border-base-content/10 bg-base-200 p-4 text-sm font-mono text-base-content overflow-x-auto">
  <div class="font-semibold mb-2 text-base-content/80">src/routes/</div>
  <div class="grid grid-cols-[1fr_auto] gap-x-6 gap-y-0.5 pl-4">
    <span>+page.svelte</span><span class="text-base-content/50">→ /</span>
    <span>about/+page.svelte</span><span class="text-base-content/50">→ /about</span>
    <span>blog/+page.svelte</span><span class="text-base-content/50">→ /blog</span>
    <span>blog/[slug]/+page.svelte</span><span class="text-base-content/50">→ /blog/:slug</span>
    <span>api/users/+server.js</span><span class="text-base-content/50">→ /api/users</span>
    <span>+layout.svelte</span><span class="text-base-content/50">→ Layout raiz</span>
  </div>
</div>

### Diferenças Principais

| Aspecto | Next.js | SvelteKit |
|---------|---------|-----------|
| Arquivo de página | `page.tsx` | `+page.svelte` |
| Layout | `layout.tsx` | `+layout.svelte` |
| API route | `route.ts` | `+server.js` |
| Loading state | `loading.tsx` | Manual ou streaming |
| Error | `error.tsx` | `+error.svelte` |
| Prefixo | Nenhum | `+` (distingue de componentes) |

---

## Data Loading

### Next.js (Server Components)

```tsx
// app/users/page.tsx

// Componente é async por padrão (Server Component)
export default async function UsersPage() {
  // Fetch acontece no servidor
  const users = await fetch('https://api.example.com/users')
    .then(r => r.json())

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

// Metadata
export const metadata = {
  title: 'Usuários'
}
```

### SvelteKit

```svelte
<!-- src/routes/users/+page.svelte -->
<script>
  export let data  // Vem da função load
</script>

<ul>
  {#each data.users as user (user.id)}
    <li>{user.name}</li>
  {/each}
</ul>
```

```javascript
// src/routes/users/+page.server.js
export async function load({ fetch }) {
  const users = await fetch('https://api.example.com/users')
    .then(r => r.json())

  return { users }
}
```

```javascript
// src/routes/users/+page.js (metadata)
export const load = async () => {
  return {
    title: 'Usuários'  // Disponível em +layout.svelte
  }
}
```

### Diferenças

| Aspecto | Next.js | SvelteKit |
|---------|---------|-----------|
| Modelo | Server Components | load functions |
| Onde definir | No próprio componente | Arquivo separado (`+page.server.js`) |
| Dados no cliente | `'use client'` + hooks | `+page.js` (universal) |
| Invalidação | `revalidatePath()` | `invalidate()` |

---

## API Routes

### Next.js

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const users = await db.users.findMany()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const user = await db.users.create({ data: body })
  return NextResponse.json(user, { status: 201 })
}

// Parâmetros dinâmicos: app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.users.findUnique({
    where: { id: params.id }
  })
  return NextResponse.json(user)
}
```

### SvelteKit

```javascript
// src/routes/api/users/+server.js
import { json } from '@sveltejs/kit'

export async function GET({ url }) {
  const users = await db.users.findMany()
  return json(users)
}

export async function POST({ request }) {
  const body = await request.json()
  const user = await db.users.create({ data: body })
  return json(user, { status: 201 })
}

// Parâmetros dinâmicos: src/routes/api/users/[id]/+server.js
export async function GET({ params }) {
  const user = await db.users.findUnique({
    where: { id: params.id }
  })
  return json(user)
}
```

---

## Form Handling

### Next.js (Server Actions)

```tsx
// app/contact/page.tsx
async function submitForm(formData: FormData) {
  'use server'

  const name = formData.get('name')
  const email = formData.get('email')

  await db.contacts.create({ data: { name, email } })

  revalidatePath('/contacts')
}

export default function ContactPage() {
  return (
    <form action={submitForm}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

### SvelteKit (Form Actions)

```svelte
<!-- src/routes/contact/+page.svelte -->
<script>
  import { enhance } from '$app/forms'
</script>

<form method="POST" use:enhance>
  <input name="name" required />
  <input name="email" type="email" required />
  <button type="submit">Enviar</button>
</form>
```

```javascript
// src/routes/contact/+page.server.js
import { fail, redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const name = data.get('name')
    const email = data.get('email')

    // Validação
    if (!name) {
      return fail(400, { name, missing: true })
    }

    await db.contacts.create({ data: { name, email } })

    throw redirect(303, '/contacts')
  }
}
```

---

## Layouts

### Next.js

```tsx
// app/layout.tsx (root)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

// app/dashboard/layout.tsx (nested)
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
```

### SvelteKit

```svelte
<!-- src/routes/+layout.svelte (root) -->
<script>
  import Header from '$lib/Header.svelte'
  import Footer from '$lib/Footer.svelte'
</script>

<Header />
<slot />
<Footer />

<!-- src/routes/dashboard/+layout.svelte (nested) -->
<script>
  import Sidebar from '$lib/Sidebar.svelte'
</script>

<div class="dashboard">
  <Sidebar />
  <main>
    <slot />
  </main>
</div>
```

---

## Middleware / Hooks

### Next.js (middleware.ts)

```typescript
// middleware.ts (na raiz)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verificar autenticação
  const token = request.cookies.get('token')

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*'
}
```

### SvelteKit (hooks.server.js)

```javascript
// src/hooks.server.js
import { redirect } from '@sveltejs/kit'

export async function handle({ event, resolve }) {
  // Disponível em toda request
  const session = await getSession(event.cookies)
  event.locals.user = session?.user

  // Proteger rotas
  if (event.url.pathname.startsWith('/dashboard')) {
    if (!event.locals.user) {
      throw redirect(303, '/login')
    }
  }

  return resolve(event)
}
```

---

## Renderização

### Opções Disponíveis

| Estratégia | Next.js | SvelteKit |
|------------|---------|-----------|
| SSR | Padrão (Server Components) | Padrão |
| SSG | `generateStaticParams` | `prerender = true` |
| ISR | `revalidate` | Adapter-specific |
| CSR | `'use client'` | `ssr = false` |
| Streaming | Suspense | Promises no load |

### Next.js

```tsx
// SSG
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({ slug: post.slug }))
}

// ISR
export const revalidate = 60 // Revalida a cada 60s

// CSR
'use client'
export default function ClientComponent() {
  const [data, setData] = useState(null)
  useEffect(() => { /* fetch */ }, [])
}
```

### SvelteKit

```javascript
// src/routes/blog/[slug]/+page.js

// SSG
export const prerender = true

// ou dinâmico
export const prerender = false

// CSR only
export const ssr = false

// Geração de rotas estáticas
export async function entries() {
  const posts = await getPosts()
  return posts.map(post => ({ slug: post.slug }))
}
```

---

## Tabela Comparativa Completa

| Feature | Next.js 14+ | SvelteKit |
|---------|-------------|-----------|
| **Roteamento** | File-based (app/) | File-based (routes/) |
| **Data Fetching** | Server Components | load functions |
| **Forms** | Server Actions | Form Actions |
| **API** | route.ts | +server.js |
| **SSR** | ✅ Padrão | ✅ Padrão |
| **SSG** | ✅ | ✅ |
| **ISR** | ✅ Nativo | Via adapter |
| **Streaming** | ✅ Suspense | ✅ Promises |
| **Middleware** | middleware.ts | hooks.server.js |
| **TypeScript** | ✅ Nativo | ✅ Nativo |
| **CSS** | CSS Modules, Tailwind | Scoped nativo, Tailwind |
| **Deploy** | Vercel (otimizado) | Qualquer (adapters) |
| **Bundle Size** | Maior | Menor |
| **Learning Curve** | Médio-Alto | Baixo-Médio |

---

## Quando Escolher Cada Um

### Next.js

✅ **Escolha quando:**
- Time já conhece React
- Precisa do ecossistema React
- Deploy na Vercel (DX incrível)
- Precisa de ISR robusto
- Projeto muito grande com muitos devs

### SvelteKit

✅ **Escolha quando:**
- Performance é prioridade
- Bundle size importa
- Time pequeno/médio
- Quer DX mais simples
- Deploy flexível (qualquer lugar)
- Projeto novo (greenfield)

---

## ✅ Desafio da Aula

### Objetivo
Criar uma tabela mental de "tradução" entre os dois frameworks.

### Exercício

Complete a tabela (mentalmente ou no papel):

| Conceito | Next.js | SvelteKit |
|----------|---------|-----------|
| Página | `page.tsx` | ? |
| Layout | `layout.tsx` | ? |
| Fetch no server | Server Component | ? |
| Fetch universal | `'use client'` + useState | ? |
| Form submit | Server Action | ? |
| Redirecionar | `redirect()` | ? |
| Erro 404 | `notFound()` | ? |
| Variável de ambiente pública | `NEXT_PUBLIC_*` | ? |
| Variável privada | Normal | ? |

### Respostas

<details>
<summary>🔍 Clique para ver</summary>

| Conceito | Next.js | SvelteKit |
|----------|---------|-----------|
| Página | `page.tsx` | `+page.svelte` |
| Layout | `layout.tsx` | `+layout.svelte` |
| Fetch no server | Server Component | `+page.server.js` load |
| Fetch universal | `'use client'` + useState | `+page.js` load |
| Form submit | Server Action | Form Action |
| Redirecionar | `redirect()` | `throw redirect()` |
| Erro 404 | `notFound()` | `throw error(404)` |
| Env pública | `NEXT_PUBLIC_*` | `PUBLIC_*` |
| Env privada | Normal | Normal (sem PUBLIC_) |

</details>

---

## 🎉 Conclusão do Módulo 2

Você completou a comparação entre Svelte e React!

### Resumo

- **Filosofia**: Svelte compila, React usa runtime
- **Reatividade**: Atribuição vs Hooks
- **Templates**: Blocos declarativos vs JSX
- **Estado**: Stores nativos vs Context/Redux
- **CSS**: Escopo automático vs CSS-in-JS
- **Performance**: Svelte geralmente mais rápido
- **Ecossistema**: React maior, Svelte mais curado
- **Meta-frameworks**: Ambos excelentes, SvelteKit mais simples

### Próximo Passo

Agora que você entende as diferenças, vamos mergulhar profundamente no **Svelte** a partir do Módulo 3!

---

**Próximo módulo:** [Módulo 3 — Introdução ao Svelte](../modulo-03-introducao-svelte/)
