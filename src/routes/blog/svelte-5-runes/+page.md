---
title: "Svelte 5 Runes: A Nova Era da Reatividade"
date: "2026-03-11"
summary: "Descubra como os Runes transformam a forma de escrever codigo reativo no Svelte 5."
tags: ["svelte 5", "runes", "reatividade"]
---

# Svelte 5 Runes: A Nova Era da Reatividade

O Svelte 5 introduziu os **Runes** — uma nova forma de declarar e gerenciar estado reativo. Se voce vem do Svelte 4, essa e a maior mudanca que vai encontrar.

## O que sao Runes?

Runes sao funcoes especiais prefixadas com `$` que o compilador do Svelte entende. Elas substituem as declaracoes reativas do Svelte 4 (`$:`, `export let`, etc.) por uma API mais explicita e poderosa.

## As Principais Runes

### `$state` — Estado Reativo

No Svelte 4, qualquer `let` era reativo. Agora, voce declara explicitamente:

```svelte
<script>
// Svelte 4
let count = 0;

// Svelte 5
let count = $state(0);
</script>
```

### `$derived` — Valores Derivados

Substitui as declaracoes `$:` para valores computados:

```svelte
<script>
let count = $state(0);

// Svelte 4
// $: doubled = count * 2;

// Svelte 5
let doubled = $derived(count * 2);
</script>
```

### `$effect` — Efeitos Colaterais

Para reagir a mudancas de estado:

```svelte
<script>
let count = $state(0);

$effect(() => {
  console.log('count mudou:', count);
});
</script>
```

### `$props` — Propriedades do Componente

Substitui `export let` para receber props:

```svelte
<script>
// Svelte 4
// export let name;
// export let age = 25;

// Svelte 5
let { name, age = 25 } = $props();
</script>
```

## Por que Runes?

- **Explicito** — fica claro o que e reativo e o que nao e
- **Composavel** — funciona dentro e fora de componentes
- **Previsivel** — sem "magica" escondida do compilador
- **TypeScript** — inferencia de tipos muito melhor

## Migrando do Svelte 4

A migracao e gradual. O Svelte 5 ainda suporta a sintaxe antiga no "legacy mode", entao voce pode migrar componente por componente.

O comando `npx sv migrate svelte-5` ajuda a converter automaticamente a maioria dos casos.

---

Quer aprender mais? Confira o [Modulo 8](/lessons/modulo-08-state-runes/8.1-o-que-sao-runes) do nosso curso para um mergulho completo nos Runes!
