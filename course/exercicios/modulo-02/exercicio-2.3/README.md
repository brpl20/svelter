# Exercício 2.3 — Templates vs JSX

## 🎯 Objetivo

Entender as diferenças entre sintaxe de templates (Svelte) e JSX (React).

## 📋 Contexto

Svelte usa uma sintaxe de template HTML-like com diretivas especiais. React usa JSX, que mistura JavaScript com XML-like syntax.

## 📝 Requisitos

### Função `converterParaSvelte(jsx)`

Converte código JSX para sintaxe Svelte:

```javascript
// JSX
'{items.map(item => <li key={item.id}>{item.name}</li>)}'

// Svelte
'{#each items as item (item.id)}<li>{item.name}</li>{/each}'
```

### Função `converterParaJSX(svelte)`

Converte sintaxe Svelte para JSX:

```javascript
// Svelte
'{#if loading}<Spinner />{:else}<Content />{/if}'

// JSX
'{loading ? <Spinner /> : <Content />}'
```

### Função `identificarSintaxe(codigo)`

Identifica se o código é Svelte ou JSX:

- Retorna 'svelte' se contém `{#if}`, `{#each}`, `{:else}`, etc.
- Retorna 'jsx' se contém `.map(`, `? :`, `&&`
- Retorna 'ambiguo' se não for possível determinar

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Converter condicionais JSX → Svelte {#if}
- [ ] Converter loops JSX .map() → Svelte {#each}
- [ ] Converter {#if} Svelte → ternário JSX
- [ ] Identificar sintaxe corretamente
