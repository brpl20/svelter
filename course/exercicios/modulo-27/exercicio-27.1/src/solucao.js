/**
 * Exercício 27.1 — $state - Estado Reativo
 *
 * Implemente as funções abaixo para simular o comportamento do $state
 */

/**
 * Cria um estado reativo para valores primitivos
 * @param {any} valorInicial - Valor inicial do estado
 * @returns {Object} Objeto com getter/setter para 'valor' e array 'historico'
 */
export function criarEstadoReativo(valorInicial) {
  // TODO: Implementar
  // Dica: Use closure para armazenar o valor atual
  // O objeto retornado deve ter:
  // - get valor() - retorna o valor atual
  // - set valor(v) - atualiza o valor e adiciona ao histórico
  // - historico - array com todos os valores (incluindo inicial)
}

/**
 * Cria um estado reativo para objetos
 * @param {Object} objetoInicial - Objeto inicial
 * @returns {Object} Objeto com 'valor' (Proxy) e 'historico'
 */
export function criarEstadoReativoObjeto(objetoInicial) {
  // TODO: Implementar
  // Dica: Use Proxy para interceptar mudanças nas propriedades
  // Cada mudança deve criar um snapshot no histórico
}

/**
 * Cria um estado reativo para arrays
 * @param {Array} arrayInicial - Array inicial
 * @returns {Object} Objeto com 'valor' (Proxy) e 'historico'
 */
export function criarEstadoReativoArray(arrayInicial) {
  // TODO: Implementar
  // Dica: Intercepte métodos mutáveis: push, pop, shift, unshift, splice
  // Cada mutação deve criar um snapshot no histórico
}
