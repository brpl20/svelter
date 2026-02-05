---
title: "Teste de Code Blocks e Syntax Highlighting"
module: 88
order: 1
---

<script>
import CodeSwitch from '$lib/components/CodeSwitch.svelte';
import Tip from '$lib/components/Tip.svelte';
import Question from '$lib/components/Question.svelte';
</script>

# 88.1 — Teste de Code Blocks

> Página de teste para verificar syntax highlighting e o componente CodeSwitch.

---

## JavaScript / TypeScript

<CodeSwitch>
<div data-lang="js">

```javascript
// Funções e variáveis
const API_URL = 'https://api.example.com';

async function fetchUsers() {
  const response = await fetch(API_URL + '/users');
  const data = await response.json();
  return data.filter(user => user.active);
}

// Classes
class UserService {
  #cache = new Map();

  async getUser(id) {
    if (this.#cache.has(id)) return this.#cache.get(id);
    const user = await fetchUsers().then(u => u.find(x => x.id === id));
    this.#cache.set(id, user);
    return user;
  }
}
```

</div>
<div data-lang="ts">

```typescript
// Interfaces e tipos
interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

type UserFilter = (user: User) => boolean;

// Funções tipadas
const API_URL: string = 'https://api.example.com';

async function fetchUsers(): Promise<User[]> {
  const response = await fetch(API_URL + '/users');
  const data: User[] = await response.json();
  return data.filter((user: User) => user.active);
}

// Classes tipadas
class UserService {
  #cache = new Map<number, User>();

  async getUser(id: number): Promise<User | undefined> {
    if (this.#cache.has(id)) return this.#cache.get(id);
    const user = await fetchUsers().then(u => u.find(x => x.id === id));
    if (user) this.#cache.set(id, user);
    return user;
  }
}
```

</div>
</CodeSwitch>

## Svelte

```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);

  function increment() {
    count++;
  }
</script>

<button onclick={increment}>
  Clicks: {count} (dobro: {doubled})
</button>

<style>
  button {
    background: var(--color-svelte);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }
</style>
```

## CSS

```css
/* Variáveis e seletores */
:root {
  --primary: #ff3e00;
  --bg: oklch(18% 0.02 260);
}

.card {
  background: var(--bg);
  border: 1px solid oklch(25% 0.02 260);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

@media (max-width: 640px) {
  .card { padding: 1rem; }
}
```

## HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu App Svelte</title>
  <script type="module" src="/src/main.js"></script>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

## JSON

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build"
  },
  "dependencies": {
    "svelte": "^5.0.0"
  }
}
```

## Bash

```bash
# Criando projeto e instalando dependências
npm create vite@latest meu-app -- --template svelte
cd meu-app
npm install
npm run dev
```

## Texto simples (diagramas)

```text
src/
├── lib/
│   ├── components/
│   │   ├── Header.svelte
│   │   └── Footer.svelte
│   └── utils/
│       └── helpers.js
├── routes/
│   ├── +page.svelte
│   └── +layout.svelte
└── app.html
```

---

## CodeSwitch — JS / TS Toggle

Exemplo do componente `CodeSwitch` que permite alternar entre JavaScript e TypeScript:

<CodeSwitch>
<div data-lang="js">

```javascript
// JavaScript — sem tipos
const API_URL = 'https://api.example.com';

async function fetchUsers() {
  const response = await fetch(API_URL + '/users');
  const data = await response.json();
  return data.filter(user => user.active);
}

function greet(name) {
  return `Olá, ${name}!`;
}

export { fetchUsers, greet };
```

</div>
<div data-lang="ts">

```typescript
// TypeScript — com tipos
const API_URL: string = 'https://api.example.com';

interface User {
  id: number;
  name: string;
  active: boolean;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch(API_URL + '/users');
  const data: User[] = await response.json();
  return data.filter((user: User) => user.active);
}

function greet(name: string): string {
  return `Olá, ${name}!`;
}

export { fetchUsers, greet };
```

</div>
</CodeSwitch>

### Segundo exemplo — Classes

<CodeSwitch>
<div data-lang="js">

```javascript
class Counter {
  #count = 0;

  increment() {
    this.#count++;
  }

  get value() {
    return this.#count;
  }
}
```

</div>
<div data-lang="ts">

```typescript
class Counter {
  #count: number = 0;

  increment(): void {
    this.#count++;
  }

  get value(): number {
    return this.#count;
  }
}
```

</div>
</CodeSwitch>

---

## Tip e Question

Componentes de destaque para dicas e perguntas frequentes.

### Tip — título padrão

<Tip>
Você pode usar `npm init` como atalho para `npm init -y` quando quiser aceitar todos os valores padrão do `package.json`.
</Tip>

### Tip — título customizado

<Tip title="Atenção">
Nunca commite seu arquivo `.env` no repositório. Adicione-o ao `.gitignore` antes do primeiro commit.
</Tip>

<Tip title="Performance">
O Svelte compila seus componentes em JavaScript puro — sem Virtual DOM. Isso significa menos overhead em runtime e melhor performance.
</Tip>

### Question — simples

<Question question="O que é NPM?">
NPM (Node Package Manager) é o gerenciador de pacotes padrão do Node.js. Ele permite instalar, compartilhar e gerenciar dependências de bibliotecas externas no seu projeto.
</Question>

### Question — com código inline

<Question question="Qual a diferença entre let e const?">
`let` permite reatribuição da variável, enquanto `const` cria uma referência que não pode ser reatribuída. Ambos têm escopo de bloco. Use `const` por padrão e `let` apenas quando precisar reatribuir.
</Question>

### Question — explicação mais longa

<Question question="Como funciona a reatividade no Svelte 5?">
No Svelte 5, a reatividade é baseada em **runes**. O `$state()` cria variáveis reativas, `$derived()` calcula valores derivados automaticamente, e `$effect()` executa side effects quando dependências mudam. Diferente do Svelte 4, as runes funcionam em qualquer arquivo `.svelte.js` ou `.svelte.ts`, não apenas dentro de componentes.
</Question>
