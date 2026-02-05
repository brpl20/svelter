/**
 * Exercício 1.3 - Estrutura de Projeto Vite
 *
 * Valide e analise a estrutura de projetos Vite.
 */

/**
 * Valida se a estrutura de arquivos é um projeto Vite válido.
 *
 * @param {string[]} arquivos - Lista de caminhos de arquivos
 * @returns {Object} { valido: boolean, faltando: string[] }
 *
 * @example
 * validarEstrutura(['package.json', 'vite.config.js', 'index.html'])
 * // { valido: true, faltando: [] }
 *
 * validarEstrutura(['package.json', 'src/main.js'])
 * // { valido: false, faltando: ['vite.config.js ou vite.config.ts', 'index.html'] }
 */
export function validarEstrutura(arquivos) {
  // TODO: Implemente a validação

  // Arquivos obrigatórios:
  // 1. package.json
  // 2. vite.config.js OU vite.config.ts
  // 3. index.html

  // Dicas:
  // - Use Array.some() para verificar se existe
  // - Construa array de faltando baseado no que não encontrar

  return {
    valido: false,
    faltando: []
  }
}

/**
 * Classifica um arquivo do projeto.
 *
 * @param {string} caminho - Caminho do arquivo
 * @returns {string} Categoria: 'config', 'source', 'style', 'asset', 'html', 'other'
 *
 * @example
 * classificarArquivo('vite.config.js') // 'config'
 * classificarArquivo('src/App.svelte') // 'source'
 * classificarArquivo('public/logo.png') // 'asset'
 */
export function classificarArquivo(caminho) {
  // TODO: Implemente a classificação

  // Mapeamento:
  // config: vite.config.*, tsconfig.*, .eslintrc.*, package.json, *.config.js
  // source: .js, .ts, .jsx, .tsx, .svelte, .vue
  // style: .css, .scss, .sass, .less
  // asset: .png, .jpg, .jpeg, .gif, .svg, .ico, .woff, .woff2, .ttf
  // html: .html
  // other: qualquer outro

  // Dica: Use endsWith() ou expressões regulares

  return 'other'
}
