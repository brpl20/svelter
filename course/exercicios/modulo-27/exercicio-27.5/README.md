# Exercício 27.5 — Migração Svelte 4 → 5

## 🎯 Objetivo

Praticar a conversão de padrões Svelte 4 para Svelte 5.

## 📋 Contexto

A migração de Svelte 4 para Svelte 5 envolve converter várias sintaxes: `export let` → `$props()`, `$:` → `$derived`/`$effect`, `on:` → `on`, slots → snippets. Este exercício treina a identificação e conversão desses padrões.

## 📝 Requisitos

### Função `converterPropsExportLet(codigo)`

Converte declarações `export let` para `$props()`:

```javascript
converterPropsExportLet(`
  export let name
  export let count = 0
`)
// `let { name, count = 0 } = $props()`
```

### Função `converterReactivoParaRunes(codigo)`

Converte declarações reativas `$:` para `$derived` ou `$effect`:

```javascript
converterReativoPararRunes('$: doubled = count * 2')
// 'let doubled = $derived(count * 2)'

converterReativoPararRunes('$: console.log(count)')
// '$effect(() => { console.log(count) })'
```

### Função `converterEventos(codigo)`

Converte sintaxe de eventos `on:` para `on`:

```javascript
converterEventos('<button on:click={handleClick}>')
// '<button onclick={handleClick}>'

converterEventos('<input on:input={(e) => value = e.target.value}>')
// '<input oninput={(e) => value = e.target.value}>'
```

### Função `analisarMigracao(codigo)`

Analisa código Svelte 4 e retorna relatório de migração:

```javascript
analisarMigracao(codigoSvelte4)
// {
//   props: ['name', 'count'],
//   derivados: ['doubled', 'filtered'],
//   efeitos: ['console.log(...)'],
//   eventos: ['click', 'input'],
//   slots: ['header', 'default'],
//   complexidade: 'média'
// }
```

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Converte props corretamente
- [ ] Diferencia derivados de efeitos
- [ ] Converte eventos mantendo handlers
- [ ] Análise identifica todos os padrões
