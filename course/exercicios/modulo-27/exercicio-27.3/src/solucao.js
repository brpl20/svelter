/**
 * Exercício 27.3 — $effect - Efeitos e Cleanup
 *
 * Implemente as funções abaixo para simular o comportamento do $effect
 */

/**
 * Cria um sistema de gerenciamento de efeitos
 * @returns {Object} Sistema com métodos registrarEfeito e executarEfeitos
 */
export function criarSistemaEfeitos() {
  // TODO: Implementar
  // O sistema deve:
  // - registrarEfeito(fn): registra um efeito, retorna função para removê-lo
  // - executarEfeitos(): executa todos os efeitos (cleanup primeiro, se houver)
  // - destruir(): executa cleanup de todos e limpa a lista
  //
  // Cada efeito pode retornar uma função de cleanup
  // O cleanup deve ser chamado:
  // 1. Antes de re-executar o efeito
  // 2. Quando o efeito é removido
  // 3. Quando o sistema é destruído
}

/**
 * Cria um efeito com debounce
 * @param {Function} callback - Função a ser executada
 * @param {number} delay - Delay em milissegundos
 * @returns {Object} Objeto com trigger, cancel e pending
 */
export function criarDebounceEffect(callback, delay) {
  // TODO: Implementar
  // Retorna:
  // - trigger(): agenda a execução (reseta timer se já existir)
  // - cancel(): cancela execução pendente
  // - pending(): retorna true se há execução pendente
}

/**
 * Cria um efeito que só executa quando dependências mudam
 * @param {Function} getDeps - Função que retorna array de dependências
 * @param {Function} callback - Callback chamado com os valores das deps
 * @returns {Object} Objeto com verificarEExecutar e getUltimasDeps
 */
export function criarEffectComDependencias(getDeps, callback) {
  // TODO: Implementar
  // Deve:
  // - Armazenar as últimas dependências
  // - Comparar novas deps com as anteriores
  // - Só executar callback se houver diferença
  // - Retornar objeto com:
  //   - verificarEExecutar(): verifica deps e executa se mudaram
  //   - getUltimasDeps(): retorna as últimas deps conhecidas
}
