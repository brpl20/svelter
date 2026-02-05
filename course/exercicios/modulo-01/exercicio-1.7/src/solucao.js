/**
 * Exercício 1.7 - Build e Otimização
 *
 * Analise e otimize builds do Vite.
 */

/**
 * Analisa arquivos do bundle.
 *
 * @param {Array} arquivos - Lista de arquivos com nome e tamanho
 * @returns {Object} Estatísticas do bundle
 *
 * @example
 * analisarBundle([
 *   { nome: 'index.js', tamanho: 50000 },
 *   { nome: 'vendor.js', tamanho: 150000 },
 *   { nome: 'style.css', tamanho: 5000 }
 * ])
 * // {
 * //   totalJS: 200000,
 * //   totalCSS: 5000,
 * //   maiorArquivo: 'vendor.js',
 * //   quantidadeChunks: 2
 * // }
 */
export function analisarBundle(arquivos) {
  // TODO: Implemente a análise

  // Dicas:
  // 1. Filtre arquivos por extensão (.js, .css)
  // 2. Use reduce() para somar tamanhos
  // 3. Use sort() ou reduce() para encontrar o maior
  // 4. Conte apenas arquivos .js como chunks

  return {
    totalJS: 0,
    totalCSS: 0,
    maiorArquivo: '',
    quantidadeChunks: 0
  }
}

/**
 * Sugere otimizações baseado na análise.
 *
 * @param {Object} analise - Resultado de analisarBundle
 * @returns {string[]} Lista de sugestões
 *
 * @example
 * sugerirOtimizacoes({ totalJS: 600000, maiorArquivo: 'vendor.js', quantidadeChunks: 5 })
 * // ['Considere code splitting - JS total > 500KB']
 */
export function sugerirOtimizacoes(analise) {
  // TODO: Implemente as sugestões

  const sugestoes = []

  // Regras:
  // 1. Se totalJS > 500000 (500KB) → 'Considere code splitting - JS total > 500KB'
  // 2. Se arquivo maior > 250000 (250KB) → 'Considere lazy loading para chunks grandes'
  // 3. Se quantidadeChunks > 20 → 'Considere agrupar chunks manualmente'

  // Dica: Você precisa saber o tamanho do maior arquivo
  // Isso requer que a análise inclua essa informação ou recalcule

  return sugestoes
}

/**
 * Formata bytes para formato legível.
 *
 * @param {number} bytes - Tamanho em bytes
 * @returns {string} Tamanho formatado
 *
 * @example
 * formatarTamanho(1024) // '1.00 KB'
 * formatarTamanho(1048576) // '1.00 MB'
 * formatarTamanho(500) // '500 B'
 */
export function formatarTamanho(bytes) {
  // TODO: Implemente a formatação

  // Regras:
  // - < 1024: 'X B'
  // - < 1048576 (1MB): 'X.XX KB'
  // - >= 1048576: 'X.XX MB'

  // Dica: Use toFixed(2) para 2 casas decimais

  return '0 B'
}
