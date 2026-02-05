# SvelteKit Remote Functions

## Overview

Remote functions are a SvelteKit feature (introduced in v2.27) that allows you to call server-side functions directly from client-side code, with full type safety and zero boilerplate.

- On the server: work like regular functions (can access env vars, databases, etc.)
- On the client: transparently become fetch-based RPC calls

## Setup

Add to `svelte.config.js`:

```js
kit: {
    adapter: adapter({...}),
    remoteFunctions: true,  // Enable remote functions
    alias: {...}
}
```

## Basic Usage

### 1. Create a `.remote.ts` file

```ts
// src/lib/api.remote.ts
import { query, command } from '$app/server';

// Read operations (GET-like)
export const getCustomers = query(async (filters: CustomerFilters) => {
    const response = await fetch('http://localhost:3000/api/v1/customers', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
});

// Write operations (POST/PUT/DELETE-like)
export const createCustomer = command(async (data: CustomerInput) => {
    const response = await fetch('http://localhost:3000/api/v1/customers', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return response.json();
});
```

### 2. Import and use in components

```svelte
<script>
import { getCustomers, createCustomer } from '$lib/api.remote';

const customers = getCustomers({ page: 1 });
</script>

{#await customers}
    <p>Loading...</p>
{:then data}
    {#each data as customer}
        <p>{customer.name}</p>
    {/each}
{/await}
```

## Advantages

### 1. Type Safety End-to-End

```ts
// The return type flows automatically to the client
export const getCustomer = query(async (id: string): Promise<Customer> => {
    // TypeScript knows the exact shape on both ends
});
```

No need to manually define types twice (service + component).

### 2. Simpler Code / Less Boilerplate

| Current Approach | Remote Functions |
|------------------|------------------|
| Service file + store + component wiring | Just import and call |
| Manual loading states | Built-in with `query()` |
| Manual error handling everywhere | Centralized |

### 3. Secrets Stay on Server

```ts
// api.remote.ts - NEVER sent to browser
const API_KEY = process.env.RAILS_API_KEY;

export const fetchData = query(async () => {
    return fetch(url, { headers: { 'X-API-Key': API_KEY } });
});
```

Your API credentials, internal URLs, etc. stay server-side.

### 4. SSR + Hydration Built-in

- Queries run on server during SSR (fast initial load)
- Results automatically hydrate on client
- No flash of loading states

### 5. Automatic Request Batching

```ts
// Multiple calls in same tick = single HTTP request
const [customers, offices] = await Promise.all([
    getCustomers(),
    getOffices()
]);
```

### 6. Caching & Invalidation

```ts
// Built-in cache management
query.refresh();  // Invalidate and refetch
query.set(data);  // Optimistic updates
```

### 7. Smaller Client Bundle

Server-only code (database clients, heavy libraries, API logic) is tree-shaken from the client bundle.

## When to Use Remote Functions

| Good fit | Less relevant |
|----------|---------------|
| New features with complex data fetching | Simple one-off API calls |
| Pages needing SSR with auth | Already working service layer |
| Sensitive API operations | External APIs (CEP service, etc.) |

## Rails API Integration Example

```ts
// src/lib/rails-api.remote.ts
import { query, command } from '$app/server';

const RAILS_API = 'http://localhost:3000/api/v1';

// Helper to get auth headers (server-side only)
function getAuthHeaders(cookies: Cookies) {
    const token = cookies.get('auth_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

export const getCustomers = query(async (page: number = 1) => {
    const response = await fetch(`${RAILS_API}/customers?page=${page}`, {
        headers: getAuthHeaders(cookies)
    });
    return response.json();
});

export const createCustomer = command(async (data: CustomerInput) => {
    const response = await fetch(`${RAILS_API}/customers`, {
        method: 'POST',
        headers: getAuthHeaders(cookies),
        body: JSON.stringify({ customer: data })
    });
    return response.json();
});
```

## Resources

- [Remote functions - SvelteKit Docs](https://svelte.dev/docs/kit/remote-functions)
- [$app/server - SvelteKit Docs](https://svelte.dev/docs/kit/$app-server)
- [Remote Functions Discussion #13897](https://github.com/sveltejs/kit/discussions/13897)
- [SvelteKit Remote Functions vs tRPC](https://gornostay25.dev/post/sveltekit-remote-functions-vs-trpc)
