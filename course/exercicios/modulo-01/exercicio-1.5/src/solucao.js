/**
 * Exercício 1.5 - Criando um Plugin Vite
 *
 * Crie um plugin que adiciona um banner de copyright
 * no topo de cada arquivo JavaScript.
 */

/**
 * Cria um plugin Vite que adiciona banner aos arquivos JS.
 *
 * @param {Object} options - Opções do plugin
 * @param {string} options.projectName - Nome do projeto para o banner
 * @returns {Object} Plugin Vite
 *
 * @example
 * const plugin = bannerPlugin({ projectName: 'Meu Projeto' })
 *
 * // O plugin transforma arquivos .js adicionando:
 * // /**
 * //  * Meu Projeto
 * //  * Build: 2024-01-15T10:30:00.000Z
 * //  *\/
 * // ... código original ...
 */
export function bannerPlugin(options = {}) {
  const { projectName = 'Unknown Project' } = options

  return {
    // TODO: Defina o nome do plugin
    // name: '...'

    // TODO: Implemente o hook transform
    // transform(code, id) {
    //   1. Verifique se id termina com '.js'
    //   2. Se não for .js, retorne null (não transforma)
    //   3. Se for .js, crie o banner com projectName e new Date().toISOString()
    //   4. Retorne { code: banner + code, map: null }
    // }

  }
}
