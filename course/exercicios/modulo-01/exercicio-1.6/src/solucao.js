/**
 * Exercício 1.6 - Variáveis de Ambiente
 *
 * Trabalhe com variáveis de ambiente no padrão Vite.
 */

/**
 * Parseia o conteúdo de um arquivo .env
 *
 * @param {string} conteudo - Conteúdo do arquivo .env
 * @returns {Object} Objeto com as variáveis
 *
 * @example
 * parsearEnv('VITE_API=http://api.com\nDEBUG=true')
 * // { VITE_API: 'http://api.com', DEBUG: 'true' }
 *
 * parsearEnv('# Comentário\nKEY=value')
 * // { KEY: 'value' }
 */
export function parsearEnv(conteudo) {
  // TODO: Implemente o parser

  // Regras:
  // 1. Cada linha é uma variável (CHAVE=valor)
  // 2. Linhas vazias são ignoradas
  // 3. Linhas que começam com # são comentários (ignorar)
  // 4. O valor pode conter = (ex: URL=http://a.com?foo=bar)
  // 5. Aspas ao redor do valor devem ser removidas

  // Dicas:
  // - Use split('\n') para separar linhas
  // - Use indexOf('=') para encontrar o separador
  // - Use trim() para remover espaços

  return {}
}

/**
 * Filtra apenas variáveis com prefixo VITE_
 *
 * @param {Object} env - Objeto com todas as variáveis
 * @returns {Object} Objeto só com variáveis VITE_ (sem o prefixo)
 *
 * @example
 * filtrarViteEnv({ VITE_API: 'url', SECRET: 'key', VITE_DEBUG: 'true' })
 * // { API: 'url', DEBUG: 'true' }
 */
export function filtrarViteEnv(env) {
  // TODO: Implemente o filtro

  // Regras:
  // 1. Apenas chaves que começam com VITE_ são incluídas
  // 2. O prefixo VITE_ é removido da chave no resultado

  // Dicas:
  // - Use Object.entries() para iterar
  // - Use startsWith() para verificar prefixo
  // - Use slice(5) para remover 'VITE_'

  return {}
}

/**
 * Detecta o modo baseado no nome do arquivo .env
 *
 * @param {string} arquivo - Nome do arquivo
 * @returns {string} Modo: 'all', 'local', 'development', 'production'
 *
 * @example
 * detectarModo('.env') // 'all'
 * detectarModo('.env.local') // 'local'
 * detectarModo('.env.development') // 'development'
 * detectarModo('.env.production') // 'production'
 */
export function detectarModo(arquivo) {
  // TODO: Implemente a detecção

  // Mapeamento:
  // .env → 'all'
  // .env.local → 'local'
  // .env.development ou .env.development.local → 'development'
  // .env.production ou .env.production.local → 'production'

  return 'all'
}
