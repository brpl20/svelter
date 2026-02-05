/**
 * Exercício 1.2 - ESModules e Resolução
 *
 * Entenda como o Vite resolve diferentes tipos de importações.
 */

/**
 * Analisa um caminho de importação.
 *
 * @param {string} importPath - Caminho de importação (ex: './foo', 'lodash', '@/utils')
 * @returns {Object} Objeto com tipo, extensao e isNodeModule
 *
 * @example
 * analisarImport('./components/Button')
 * // { tipo: 'relativo', extensao: null, isNodeModule: false }
 *
 * analisarImport('lodash')
 * // { tipo: 'bare', extensao: null, isNodeModule: true }
 *
 * analisarImport('@/utils/helpers.js')
 * // { tipo: 'alias', extensao: '.js', isNodeModule: false }
 */
export function analisarImport(importPath) {
  // TODO: Implemente a análise do import

  // Dicas:
  // 1. Verifique como o path começa para determinar o tipo
  // 2. Use lastIndexOf('.') para encontrar a extensão
  // 3. Bare imports (sem ./ ou /) são módulos do node_modules

  return {
    tipo: '', // 'relativo', 'absoluto', 'bare' ou 'alias'
    extensao: null, // '.js', '.ts', '.svelte' ou null
    isNodeModule: false // true para bare imports
  }
}

/**
 * Simula a resolução de extensões do Vite.
 *
 * @param {string} arquivo - Nome do arquivo sem extensão
 * @param {string[]} extensoes - Lista de extensões para tentar
 * @returns {string[]} Array com tentativas em ordem
 *
 * @example
 * resolverOrdemExtensoes('Button', ['.ts', '.js', '.svelte'])
 * // ['Button.ts', 'Button.js', 'Button.svelte']
 *
 * resolverOrdemExtensoes('index', ['.ts', '.tsx', '.js', '.jsx'])
 * // ['index.ts', 'index.tsx', 'index.js', 'index.jsx']
 */
export function resolverOrdemExtensoes(arquivo, extensoes) {
  // TODO: Implemente a geração de tentativas

  // Dica: Para cada extensão, concatene com o nome do arquivo

  return []
}
