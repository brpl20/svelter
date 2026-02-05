/**
 * Exercício 2.8 - SvelteKit vs Next.js
 *
 * Compare os meta-frameworks SvelteKit e Next.js.
 */

/**
 * Converte rota Next.js para SvelteKit.
 *
 * @param {string} rota - Caminho de arquivo Next.js
 * @returns {string} Caminho equivalente em SvelteKit
 *
 * @example
 * converterRotaNextParaSvelteKit('pages/index.tsx')
 * // 'src/routes/+page.svelte'
 *
 * converterRotaNextParaSvelteKit('pages/blog/[slug].tsx')
 * // 'src/routes/blog/[slug]/+page.svelte'
 *
 * converterRotaNextParaSvelteKit('pages/api/users.ts')
 * // 'src/routes/api/users/+server.js'
 */
export function converterRotaNextParaSvelteKit(rota) {
  // TODO: Implemente a conversão

  // Regras de conversão:
  // Next.js                    →  SvelteKit
  // pages/                     →  src/routes/
  // index.tsx                  →  +page.svelte
  // [param].tsx                →  [param]/+page.svelte
  // [...slug].tsx              →  [...slug]/+page.svelte
  // api/*.ts                   →  api/*/+server.js
  // _app.tsx                   →  +layout.svelte
  // _error.tsx                 →  +error.svelte

  // Dicas:
  // - Use replace() para substituir padrões
  // - Trate casos especiais primeiro (api, index, _app)

  return rota
}

/**
 * Converte SvelteKit para Next.js.
 *
 * @param {string} rota - Caminho de arquivo SvelteKit
 * @returns {string} Caminho equivalente em Next.js
 */
export function converterRotaSvelteKitParaNext(rota) {
  // TODO: Implemente a conversão inversa

  // Regras inversas:
  // src/routes/              →  pages/
  // +page.svelte             →  index.tsx ou page.tsx
  // [param]/+page.svelte     →  [param].tsx
  // +server.js               →  api route
  // +layout.svelte           →  _app.tsx
  // +error.svelte            →  _error.tsx

  return rota
}

/**
 * Converte padrões de data fetching.
 *
 * @param {string} codigo - Código fonte
 * @param {string} de - Framework de origem ('next' ou 'sveltekit')
 * @param {string} para - Framework destino ('next' ou 'sveltekit')
 * @returns {string} Código convertido
 *
 * @example
 * // Next.js → SvelteKit
 * converterDataFetching(`
 *   export async function getServerSideProps() {
 *     const data = await fetch('/api/data')
 *     return { props: { data } }
 *   }
 * `, 'next', 'sveltekit')
 * // 'export async function load({ fetch }) { ... }'
 */
export function converterDataFetching(codigo, de, para) {
  // TODO: Implemente a conversão

  // Next.js patterns:
  // - getServerSideProps → SSR
  // - getStaticProps → SSG
  // - getStaticPaths → generateStaticParams

  // SvelteKit patterns:
  // - load em +page.server.js → SSR
  // - load em +page.js → Universal
  // - entries em +page.server.js → Prerender

  // Dicas:
  // - Use regex para encontrar funções
  // - Mapeie retornos { props: {} } → return {}

  return codigo
}

/**
 * Analisa estrutura e detecta framework.
 *
 * @param {string[]} arquivos - Lista de arquivos do projeto
 * @returns {Object} { framework, estrutura, confianca }
 *
 * @example
 * analisarEstruturaProjeto([
 *   'src/routes/+page.svelte',
 *   'src/routes/+layout.svelte',
 *   'svelte.config.js'
 * ])
 * // { framework: 'sveltekit', estrutura: { paginas: 1, layouts: 1 }, confianca: 'alta' }
 */
export function analisarEstruturaProjeto(arquivos) {
  // TODO: Implemente a análise

  // Indicadores SvelteKit:
  // - src/routes/
  // - +page.svelte, +layout.svelte, +server.js
  // - svelte.config.js

  // Indicadores Next.js:
  // - pages/ ou app/
  // - next.config.js
  // - _app.tsx, _document.tsx

  // Confiança:
  // - 'alta': múltiplos indicadores claros
  // - 'media': alguns indicadores
  // - 'baixa': poucos ou conflitantes

  return {
    framework: '',
    estrutura: {
      paginas: 0,
      layouts: 0,
      apiRoutes: 0
    },
    confianca: 'baixa'
  }
}
