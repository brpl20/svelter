# Módulo 27 — Svelte 5: Runes (Novo Paradigma de Reatividade)

> O futuro do Svelte: signals explícitos, melhor TypeScript e mais controle.

## Visão Geral

O Svelte 5 introduz **Runes** — uma nova forma de declarar reatividade usando funções especiais prefixadas com `$`. Esta mudança traz:

- **Reatividade explícita**: Você declara O QUE é reativo
- **Melhor TypeScript**: Inferência de tipos muito mais precisa
- **Deep reactivity**: Arrays e objetos são reativos automaticamente
- **Composabilidade**: Runes funcionam em arquivos `.js` e `.ts`

```
┌─────────────────────────────────────────────────────────────────────┐
│  SVELTE 4                        SVELTE 5                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  let count = 0                   let count = $state(0)              │
│  $: doubled = count * 2          let doubled = $derived(count * 2)  │
│  $: console.log(count)           $effect(() => console.log(count))  │
│  export let name                 let { name } = $props()            │
│                                                                     │
│  Compilador detecta              Você declara explicitamente        │
│  reatividade magicamente         o que é reativo                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Aulas do Módulo

| # | Aula | Descrição |
|---|------|-----------|
| 27.1 | Introdução ao Svelte 5 e Runes | Por que Runes? Motivação e compatibilidade |
| 27.2 | `$state` — Estado Reativo | Deep reactivity, classes, fine-grained updates |
| 27.3 | `$derived` — Valores Derivados | Computados automáticos, memoização |
| 27.4 | `$effect` — Efeitos Colaterais | Side effects, cleanup, ⚠️ armadilhas |
| 27.5 | `$props` — Props com Runes | Desestruturação, defaults, rest props |
| 27.6 | `$bindable` — Props Bindable | Two-way binding explícito |
| 27.7 | `$inspect` — Debug Reativo | Console.log que reage a mudanças |
| 27.8 | Snippets — Nova Composição | Substituindo slots com mais poder |
| 27.9 | Event Handlers no Svelte 5 | `onclick` ao invés de `on:click` |
| 27.10 | Migração: Svelte 4 → 5 | Guia prático e script automático |

## Pré-requisitos

- Completar Módulos 3-6 (Svelte básico)
- Entendimento de stores (Módulo 4.4-4.5)
- Familiaridade com ciclo de vida (Módulo 6.10)

## Projeto do Módulo

Ao longo deste módulo, vamos refatorar uma aplicação Svelte 4 completa para Svelte 5, aplicando cada rune em cenários reais.

---

**Início:** [27.1 — Introdução ao Svelte 5 e Runes](./aulas/27.1-introducao-svelte5-runes.md)
