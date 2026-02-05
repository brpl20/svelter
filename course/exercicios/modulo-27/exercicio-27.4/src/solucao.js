/**
 * Exercício 27.4 — $props - Sistema de Props
 *
 * Implemente as funções abaixo para simular o sistema de props do Svelte 5
 */

/**
 * Cria um sistema de props com schema e validação
 * @param {Object} schema - Schema das props { propName: { required?, default? } }
 * @param {Object} propsRecebidas - Props passadas ao componente
 * @returns {Object} Props processadas com defaults aplicados
 * @throws {Error} Se prop required não for fornecida
 */
export function criarSistemaProps(schema, propsRecebidas) {
  // TODO: Implementar
  // 1. Para cada prop no schema:
  //    - Se required e não fornecida, throw Error
  //    - Se não fornecida, usar default (se existir)
  //    - Se fornecida, usar o valor
  // 2. Retornar objeto com todas as props processadas
}

/**
 * Separa props conhecidas das rest props (spread)
 * @param {Object} todasProps - Todas as props recebidas
 * @param {Array<string>} conhecidas - Nomes das props conhecidas
 * @returns {Object} { conhecidas: {...}, rest: {...} }
 */
export function separarRestProps(todasProps, conhecidas) {
  // TODO: Implementar
  // Separar o objeto em dois:
  // - conhecidas: apenas as props listadas no array
  // - rest: todas as outras (para spread no elemento)
}

/**
 * Cria uma prop que suporta two-way binding
 * @param {any} valorInicial - Valor inicial da prop
 * @param {Function} onChange - Callback chamado quando valor muda
 * @returns {Object} Objeto com getter/setter para 'valor'
 */
export function criarPropBindable(valorInicial, onChange) {
  // TODO: Implementar
  // Retornar objeto com:
  // - get valor(): retorna valor atual
  // - set valor(v): atualiza valor E chama onChange(v)
}

/**
 * BONUS: Valida tipos de props
 * @param {Object} schema - Schema com tipos { propName: { type: 'string'|'number'|'boolean'|'array'|'object' } }
 * @param {Object} props - Props a validar
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export function validarTiposProps(schema, props) {
  // TODO: Implementar (opcional)
  // Verificar se cada prop corresponde ao tipo esperado
}
