/**
 * Exercício 1.8 - Vite para Diferentes Frameworks
 *
 * Identifique e configure Vite para diferentes frameworks.
 */

/**
 * Detecta o framework baseado nos arquivos.
 *
 * @param {string[]} arquivos - Lista de caminhos de arquivo
 * @returns {string} Framework: 'svelte', 'vue', 'react', 'vanilla'
 *
 * @example
 * detectarFramework(['src/App.svelte', 'src/main.js'])
 * // 'svelte'
 *
 * detectarFramework(['src/App.tsx', 'src/index.tsx'])
 * // 'react'
 */
export function detectarFramework(arquivos) {
  // TODO: Implemente a detecção

  // Prioridade (primeira extensão encontrada):
  // 1. .svelte → 'svelte'
  // 2. .vue → 'vue'
  // 3. .jsx ou .tsx → 'react'
  // 4. Nenhum dos acima → 'vanilla'

  // Dicas:
  // - Use some() para verificar se algum arquivo tem a extensão
  // - Use endsWith() para checar extensões

  return 'vanilla'
}

/**
 * Retorna o plugin oficial para o framework.
 *
 * @param {string} framework - Nome do framework
 * @returns {string|null} Nome do pacote do plugin ou null
 *
 * @example
 * obterPluginNecessario('svelte')
 * // '@sveltejs/vite-plugin-svelte'
 *
 * obterPluginNecessario('vanilla')
 * // null
 */
export function obterPluginNecessario(framework) {
  // TODO: Implemente o mapeamento

  // Mapa de plugins:
  // svelte → '@sveltejs/vite-plugin-svelte'
  // vue → '@vitejs/plugin-vue'
  // react → '@vitejs/plugin-react'
  // vanilla → null

  return null
}

/**
 * Gera comando npm create para o template.
 *
 * @param {string} framework - Nome do framework
 * @param {string} nomeProjeto - Nome do projeto
 * @returns {string} Comando npm create
 *
 * @example
 * gerarComandoCriacao('svelte', 'meu-app')
 * // 'npm create vite@latest meu-app -- --template svelte'
 *
 * gerarComandoCriacao('react', 'minha-spa', true)
 * // 'npm create vite@latest minha-spa -- --template react-ts'
 */
export function gerarComandoCriacao(framework, nomeProjeto, typescript = false) {
  // TODO: Implemente a geração

  // Formato: npm create vite@latest NOME -- --template TEMPLATE
  //
  // Templates disponíveis:
  // - vanilla, vanilla-ts
  // - svelte, svelte-ts
  // - vue, vue-ts
  // - react, react-ts
  //
  // Se typescript=true, adicione '-ts' ao template

  return ''
}
