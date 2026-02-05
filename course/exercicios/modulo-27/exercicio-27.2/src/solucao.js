/**
 * Exercício 27.2 — $derived - Valores Derivados
 *
 * Implemente as funções abaixo para simular o comportamento do $derived
 */

/**
 * Cria um valor derivado de fontes
 * @param {Array<Function>} fontes - Array de funções que retornam valores fonte
 * @param {Function} calculadora - Função que recebe os valores e retorna o derivado
 * @returns {Object} Objeto com 'valor' e método 'recalcular()'
 */
export function criarDerivado(fontes, calculadora) {
  // TODO: Implementar
  // O objeto retornado deve ter:
  // - valor: resultado atual da calculadora
  // - recalcular(): reexecuta as fontes e a calculadora
}

/**
 * Cria uma cadeia de valores derivados
 * @param {Array<Object>} definicoes - Array de definições de valores
 *   - { nome: string, valor: any } para valores base
 *   - { nome: string, depende: string[], calc: Function } para derivados
 * @returns {Object} Objeto com métodos obter(nome) e atualizar(nome, valor)
 */
export function criarDerivadoEncadeado(definicoes) {
  // TODO: Implementar
  // Deve manter um grafo de dependências
  // Quando um valor base muda, todos os derivados dependentes devem ser recalculados
  // A ordem de recálculo deve respeitar as dependências
}

/**
 * Detecta dependências em uma função (análise simples de string)
 * @param {string} funcaoString - String da função arrow
 * @returns {Array<string>} Array de paths de dependência encontrados
 */
export function detectarDependencias(funcaoString) {
  // TODO: Implementar
  // Analise a string da função e encontre acessos a propriedades
  // Ex: "(state) => state.user.name" deve retornar ["state.user.name"]
  // Dica: Use regex para encontrar padrões como "variavel.prop.subprop"
}
