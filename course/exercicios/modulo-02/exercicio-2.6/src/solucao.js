/**
 * Exercício 2.6 - Performance e Tamanho do Bundle
 *
 * Compare performance e bundle size entre Svelte e React.
 */

// Constantes de referência
const RUNTIME_REACT = 42000 // ~42KB gzipped
const BYTES_POR_LINHA_SVELTE = 30
const BYTES_POR_LINHA_REACT = 40

/**
 * Calcula tamanho estimado do bundle.
 *
 * @param {Array} componentes - Lista de componentes com nome e linhas
 * @param {string} framework - 'svelte' ou 'react'
 * @returns {Object} { total, runtime, componentes }
 *
 * @example
 * calcularTamanhoBundle([{ nome: 'App', linhas: 100 }], 'svelte')
 * // { total: 3000, runtime: 0, componentes: 3000 }
 *
 * calcularTamanhoBundle([{ nome: 'App', linhas: 100 }], 'react')
 * // { total: 46000, runtime: 42000, componentes: 4000 }
 */
export function calcularTamanhoBundle(componentes, framework) {
  // TODO: Implemente o cálculo

  // Regras:
  // Svelte:
  //   - ~30 bytes por linha de componente
  //   - Sem runtime (0 bytes)
  //
  // React:
  //   - ~40 bytes por linha de componente
  //   - Runtime fixo de 42KB

  // Dicas:
  // - Some as linhas de todos os componentes
  // - Multiplique pelo fator do framework
  // - Adicione runtime se for React

  return {
    total: 0,
    runtime: 0,
    componentes: 0
  }
}

/**
 * Estima número de re-renderizações.
 *
 * @param {Array} operacoes - Lista de operações de estado
 * @param {string} framework - 'svelte' ou 'react'
 * @returns {Object} { total, porOperacao }
 *
 * @example
 * estimarRenderizacoes([
 *   { tipo: 'setState', componentes: 5 },
 *   { tipo: 'setState', componentes: 3 }
 * ], 'react')
 * // { total: 8, porOperacao: [5, 3] }
 *
 * estimarRenderizacoes([
 *   { tipo: 'atribuicao', elementos: 2 },
 *   { tipo: 'atribuicao', elementos: 1 }
 * ], 'svelte')
 * // { total: 3, porOperacao: [2, 1] }
 */
export function estimarRenderizacoes(operacoes, framework) {
  // TODO: Implemente a estimativa

  // Svelte:
  //   - Atualiza apenas elementos DOM afetados
  //   - Conta 'elementos' de cada operação
  //
  // React (sem otimização):
  //   - Re-renderiza componente e filhos
  //   - Conta 'componentes' de cada operação

  return {
    total: 0,
    porOperacao: []
  }
}

/**
 * Gera relatório comparativo de performance.
 *
 * @param {Object} metricas - Métricas coletadas
 * @returns {string} Relatório formatado
 *
 * @example
 * gerarRelatorioPerformance({
 *   svelte: { bundle: 5000, renders: 10 },
 *   react: { bundle: 50000, renders: 50 }
 * })
 * // Retorna string formatada com comparação
 */
export function gerarRelatorioPerformance(metricas) {
  // TODO: Implemente a geração do relatório

  // O relatório deve incluir:
  // 1. Comparação de tamanho de bundle
  // 2. Diferença percentual
  // 3. Comparação de re-renderizações
  // 4. Recomendação baseada nas métricas

  // Formato sugerido:
  // === Relatório de Performance ===
  // Bundle Size:
  //   Svelte: X KB
  //   React: Y KB
  //   Diferença: Z% menor
  // ...

  return ''
}

/**
 * BONUS: Calcula economia de transferência.
 *
 * @param {number} bundleSvelte - Tamanho bundle Svelte em bytes
 * @param {number} bundleReact - Tamanho bundle React em bytes
 * @param {number} visitasMensais - Número de visitas mensais
 * @returns {Object} Economia de banda
 */
export function calcularEconomia(bundleSvelte, bundleReact, visitasMensais) {
  // TODO: Implemente o cálculo (opcional)

  // Calcule:
  // - Diferença por visita
  // - Economia mensal total
  // - Economia em GB

  return {
    porVisita: 0,
    mensal: 0,
    mensalGB: 0
  }
}
