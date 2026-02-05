/**
 * Exercício 2.2 - Timer (Conversão de Hooks para Svelte)
 *
 * Implemente um timer sem usar hooks React.
 * Use apenas funções JavaScript simples.
 */

/**
 * Cria uma instância de timer controlável.
 *
 * @returns {Object} Timer com métodos de controle
 *
 * @example
 * const timer = createTimer()
 * timer.start()
 * // ... após alguns segundos
 * console.log(timer.seconds)    // 5
 * console.log(timer.formatted)  // "00:05"
 * timer.pause()
 * timer.reset()
 * timer.destroy() // Limpa o interval
 */
export function createTimer() {
  // TODO: Implemente o timer

  // Estado interno
  let seconds = 0
  let isRunning = false
  let intervalId = null

  // TODO: Implemente a função que formata segundos para "MM:SS"
  function getFormatted() {
    // Dica: Use padStart(2, '0') para adicionar zeros à esquerda

  }

  // TODO: Implemente start()
  function start() {
    // Se já estiver rodando, não faz nada
    // Senão, cria um setInterval que incrementa seconds a cada 1000ms

  }

  // TODO: Implemente pause()
  function pause() {
    // Para o interval mas mantém seconds

  }

  // TODO: Implemente reset()
  function reset() {
    // Para o interval E zera seconds

  }

  // TODO: Implemente destroy()
  function destroy() {
    // Limpa o interval (cleanup)

  }

  // Retorna o objeto timer
  // Use getters para seconds, isRunning e formatted
  return {
    get seconds() { return seconds },
    get isRunning() { return isRunning },
    get formatted() { return getFormatted() },
    start,
    pause,
    reset,
    destroy
  }
}
