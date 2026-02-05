/**
 * Exercício 1.1 - Medindo Tempo de Carregamento
 *
 * Complete as funções abaixo seguindo as instruções.
 */

/**
 * Mede o tempo de execução de uma função.
 *
 * @param {Function} fn - Função a ser executada e medida
 * @returns {{ resultado: any, tempo: number }} Objeto com resultado e tempo em ms
 *
 * @example
 * const { resultado, tempo } = medirTempo(() => 1 + 1)
 * // resultado = 2
 * // tempo = 0.05 (exemplo)
 */
export function medirTempo(fn) {
  // TODO: Implemente esta função
  // Dica: Use performance.now() para medir o tempo
  // 1. Marque o tempo inicial
  // 2. Execute a função fn()
  // 3. Marque o tempo final
  // 4. Retorne { resultado, tempo }

}

/**
 * Formata um tempo em milissegundos para exibição.
 *
 * @param {number} ms - Tempo em milissegundos
 * @returns {string} Tempo formatado
 *
 * @example
 * formatarTempo(150)   // "150ms"
 * formatarTempo(1500)  // "1.50s"
 * formatarTempo(2345)  // "2.35s"
 */
export function formatarTempo(ms) {
  // TODO: Implemente esta função
  // Se ms < 1000: retorne "{ms}ms"
  // Se ms >= 1000: retorne "{segundos}s" com 2 casas decimais

}
