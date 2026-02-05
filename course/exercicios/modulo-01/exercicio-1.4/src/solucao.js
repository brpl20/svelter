/**
 * Exercício 1.4 - Configuração do Vite
 *
 * Crie e valide configurações do Vite.
 */

/**
 * Cria um objeto de configuração do Vite.
 *
 * @param {Object} opcoes - Opções de configuração
 * @param {number} opcoes.porta - Porta do servidor (default: 5173)
 * @param {string} opcoes.base - Base URL para deploy
 * @param {Object} opcoes.aliases - Mapa de aliases
 * @param {string} opcoes.outDir - Diretório de output
 * @returns {Object} Configuração do Vite
 *
 * @example
 * criarConfig({ porta: 3000 })
 * // { server: { port: 3000 } }
 *
 * criarConfig({ base: '/app/', aliases: { '@': './src' } })
 * // { base: '/app/', resolve: { alias: { '@': './src' } } }
 */
export function criarConfig(opcoes = {}) {
  // TODO: Implemente a criação da config

  // Estrutura esperada do Vite:
  // {
  //   server: { port: number },
  //   base: string,
  //   resolve: { alias: { [key]: path } },
  //   build: { outDir: string }
  // }

  // Dicas:
  // - Só inclua propriedades que foram passadas nas opções
  // - Use valores default quando apropriado (porta: 5173)

  const config = {}

  // TODO: Se opcoes.porta existir, adicione server.port

  // TODO: Se opcoes.base existir, adicione base

  // TODO: Se opcoes.aliases existir, adicione resolve.alias

  // TODO: Se opcoes.outDir existir, adicione build.outDir

  return config
}

/**
 * Valida uma configuração do Vite.
 *
 * @param {Object} config - Configuração a validar
 * @returns {Object} { valido: boolean, erros: string[] }
 *
 * @example
 * validarConfig({ server: { port: 3000 } })
 * // { valido: true, erros: [] }
 *
 * validarConfig({ server: { port: 99999 } })
 * // { valido: false, erros: ['Porta deve estar entre 1 e 65535'] }
 */
export function validarConfig(config) {
  // TODO: Implemente a validação

  const erros = []

  // TODO: Validar server.port (se existir)
  // - Deve ser número
  // - Deve estar entre 1 e 65535

  // TODO: Validar base (se existir)
  // - Deve começar com /
  // - Deve terminar com /

  // TODO: Validar build.outDir (se existir)
  // - Não pode ser string vazia

  return {
    valido: erros.length === 0,
    erros
  }
}
