/**
 * Exercício 2.4 - Store de Tema
 *
 * Implemente um sistema de stores similar ao Svelte.
 */

/**
 * Cria um store de tema.
 *
 * @param {string} initial - Tema inicial ('light' ou 'dark')
 * @returns {Object} Store com subscribe, set e toggle
 *
 * @example
 * const theme = createThemeStore('light')
 *
 * const unsubscribe = theme.subscribe(value => {
 *   console.log('Tema:', value)
 * })
 * // Logs: "Tema: light" (imediatamente)
 *
 * theme.set('dark')
 * // Logs: "Tema: dark"
 *
 * theme.toggle()
 * // Logs: "Tema: light"
 *
 * unsubscribe() // Para de receber atualizações
 */
export function createThemeStore(initial = 'light') {
  // TODO: Implemente o store

  // Estado interno
  let value = initial
  const subscribers = new Set()

  // TODO: Implemente subscribe(callback)
  // 1. Adiciona callback ao Set de subscribers
  // 2. Chama callback(value) imediatamente
  // 3. Retorna função que remove o callback do Set
  function subscribe(callback) {

  }

  // TODO: Implemente set(newValue)
  // 1. Atualiza value
  // 2. Notifica todos os subscribers
  function set(newValue) {

  }

  // TODO: Implemente toggle()
  // Alterna entre 'light' e 'dark'
  function toggle() {

  }

  return {
    subscribe,
    set,
    toggle
  }
}

/**
 * Cria um store derivado de outro store.
 *
 * @param {Object} store - Store original
 * @param {Function} fn - Função de transformação
 * @returns {Object} Novo store (somente leitura)
 *
 * @example
 * const theme = createThemeStore('dark')
 * const isDark = derived(theme, t => t === 'dark')
 *
 * isDark.subscribe(value => {
 *   console.log('Is dark:', value)
 * })
 * // Logs: "Is dark: true"
 *
 * theme.set('light')
 * // Logs: "Is dark: false"
 */
export function derived(store, fn) {
  // TODO: Implemente o store derivado
  // 1. Crie subscribers Set
  // 2. Inscreva-se no store original
  // 3. Quando o original mudar, notifique os seus subscribers com fn(value)
  // 4. Retorne objeto com apenas subscribe (sem set - é read-only)

}
