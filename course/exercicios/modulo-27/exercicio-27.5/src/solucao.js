/**
 * Exercício 27.5 — Migração Svelte 4 → 5
 *
 * Implemente as funções para converter código Svelte 4 para Svelte 5
 */

/**
 * Converte declarações export let para $props()
 * @param {string} codigo - Código com export let
 * @returns {string} Código convertido para $props()
 */
export function converterPropsExportLet(codigo) {
  // TODO: Implementar
  // 1. Encontrar todas as declarações "export let nome" e "export let nome = valor"
  // 2. Extrair nomes e valores default
  // 3. Gerar: let { nome1, nome2 = default2 } = $props()
  //
  // Dicas:
  // - Use regex para encontrar padrões
  // - Mantenha os valores default
  // - Agrupe tudo em uma única destructuring
}

/**
 * Converte declarações reativas $: para $derived ou $effect
 * @param {string} codigo - Código com $: reativo
 * @returns {string} Código convertido para runes
 */
export function converterReativoParaRunes(codigo) {
  // TODO: Implementar
  // 1. Identificar se é uma atribuição (derivado) ou statement (efeito)
  //    - "$: variavel = expressao" → derivado
  //    - "$: { ... }" ou "$: funcao(...)" → efeito
  // 2. Converter:
  //    - Derivado: "let variavel = $derived(expressao)"
  //    - Efeito: "$effect(() => { ... })"
}

/**
 * Converte sintaxe de eventos on: para on
 * @param {string} codigo - Código com on:evento
 * @returns {string} Código com onevent
 */
export function converterEventos(codigo) {
  // TODO: Implementar
  // Converter "on:click" para "onclick", "on:input" para "oninput", etc.
  // Manter o handler intacto: on:click={fn} → onclick={fn}
}

/**
 * Analisa código Svelte 4 e gera relatório de migração
 * @param {string} codigo - Código Svelte 4 completo
 * @returns {Object} Relatório com props, derivados, efeitos, eventos, slots
 */
export function analisarMigracao(codigo) {
  // TODO: Implementar
  // Retornar objeto com:
  // - props: array de nomes de props (export let)
  // - derivados: array de declarações $: que são atribuições
  // - efeitos: array de declarações $: que são side effects
  // - eventos: array de eventos usados (on:click, on:input, etc.)
  // - slots: array de slots encontrados (<slot>, <slot name="x">)
  // - complexidade: 'baixa' | 'média' | 'alta' baseado na quantidade
}

/**
 * BONUS: Converte slots para snippets
 * @param {string} codigo - Código com slots
 * @returns {string} Código com snippets
 */
export function converterSlotsParaSnippets(codigo) {
  // TODO: Implementar (opcional)
  // Converter <slot name="header" /> para {@render header?.()}
  // Adicionar props para snippets na declaração de $props()
}
