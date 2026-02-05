/**
 * Exercício 2.7 - Ecossistema e Mercado de Trabalho
 *
 * Analise ecossistemas de Svelte e React.
 */

// Bibliotecas conhecidas por framework
const BIBLIOTECAS_SVELTE = [
  'svelte', '@sveltejs/kit', '@sveltejs/adapter-auto',
  'svelte-routing', 'svelte-forms-lib', 'svelte-motion'
]

const BIBLIOTECAS_REACT = [
  'react', 'react-dom', 'next', '@tanstack/react-query',
  'react-router', 'react-hook-form', 'framer-motion',
  'react-redux', '@reduxjs/toolkit'
]

const BIBLIOTECAS_NEUTRAS = [
  'axios', 'lodash', 'date-fns', 'zod', 'tailwindcss',
  'd3', 'chart.js', 'socket.io-client'
]

/**
 * Analisa dependências e classifica por framework.
 *
 * @param {Object} packageJson - Objeto com dependencies e devDependencies
 * @returns {Object} { svelte: [], react: [], neutro: [] }
 *
 * @example
 * analisarBibliotecas({
 *   dependencies: { 'svelte': '^4.0', 'axios': '^1.0' }
 * })
 * // { svelte: ['svelte'], react: [], neutro: ['axios'] }
 */
export function analisarBibliotecas(packageJson) {
  // TODO: Implemente a análise

  // 1. Extraia todas as dependências (dependencies + devDependencies)
  // 2. Classifique cada uma usando as listas acima
  // 3. Bibliotecas não conhecidas vão para 'neutro'

  // Dicas:
  // - Normalize nomes (@sveltejs/* → svelte)
  // - Use includes() ou startsWith() para matching

  return {
    svelte: [],
    react: [],
    neutro: []
  }
}

/**
 * Verifica compatibilidade de biblioteca com frameworks.
 *
 * @param {string} biblioteca - Nome da biblioteca
 * @param {string[]} frameworks - Frameworks para verificar
 * @returns {Object} { biblioteca, compativel: [], incompativel: [] }
 *
 * @example
 * calcularCompatibilidade('axios', ['svelte', 'react', 'vue'])
 * // { biblioteca: 'axios', compativel: ['svelte', 'react', 'vue'], incompativel: [] }
 *
 * calcularCompatibilidade('react-hook-form', ['svelte', 'react'])
 * // { biblioteca: 'react-hook-form', compativel: ['react'], incompativel: ['svelte'] }
 */
export function calcularCompatibilidade(biblioteca, frameworks) {
  // TODO: Implemente a verificação

  // Regras:
  // - Bibliotecas neutras são compatíveis com todos
  // - Bibliotecas específicas só são compatíveis com seu framework
  // - svelte-* só compatível com Svelte
  // - react-* ou @tanstack/react-* só compatível com React

  return {
    biblioteca,
    compativel: [],
    incompativel: []
  }
}

/**
 * Gera análise completa do ecossistema do projeto.
 *
 * @param {Object} projeto - { nome, packageJson }
 * @returns {Object} Análise do ecossistema
 *
 * @example
 * gerarAnaliseEcossistema({
 *   nome: 'meu-app',
 *   packageJson: { dependencies: { svelte: '^4.0' } }
 * })
 */
export function gerarAnaliseEcossistema(projeto) {
  // TODO: Implemente a análise

  // A análise deve incluir:
  // 1. frameworkPrincipal - baseado nas dependências
  // 2. bibliotecas - resultado de analisarBibliotecas()
  // 3. maturidade - 'alta' se usa bibliotecas estabelecidas
  // 4. alternativas - sugerir alternativas do outro framework
  // 5. recomendacoes - lista de recomendações

  return {
    frameworkPrincipal: '',
    bibliotecas: { svelte: [], react: [], neutro: [] },
    maturidade: '',
    alternativas: {},
    recomendacoes: []
  }
}

/**
 * BONUS: Mapeia equivalentes entre frameworks.
 *
 * @param {string} biblioteca - Biblioteca de origem
 * @param {string} paraFramework - Framework destino
 * @returns {string|null} Equivalente no outro framework
 */
export function encontrarEquivalente(biblioteca, paraFramework) {
  // TODO: Implemente o mapeamento (opcional)

  // Exemplos de equivalentes:
  // react-router ↔ svelte-routing
  // react-hook-form ↔ svelte-forms-lib
  // framer-motion ↔ svelte-motion
  // @tanstack/react-query ↔ @tanstack/svelte-query

  return null
}
