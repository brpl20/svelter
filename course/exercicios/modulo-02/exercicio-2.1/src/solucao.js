/**
 * Exercício 2.1 - Compilador vs Runtime
 *
 * Compare as abordagens de compilador (Svelte) e runtime (React).
 */

/**
 * Simula compilação estilo Svelte.
 *
 * @param {Object} componente - Definição do componente
 * @param {string} componente.nome - Nome do componente
 * @param {Object} componente.estado - Estado inicial
 * @param {string} componente.template - Template do componente
 * @returns {Object} { codigo, tamanho, dependencias }
 *
 * @example
 * simularCompilacao({
 *   nome: 'Counter',
 *   estado: { count: 0 },
 *   template: '<button>{count}</button>'
 * })
 * // {
 * //   codigo: 'function Counter() { let count = 0; ... }',
 * //   tamanho: 150,
 * //   dependencias: []
 * // }
 */
export function simularCompilacao(componente) {
  // TODO: Implemente a simulação de compilação

  // O Svelte compila para JavaScript vanilla:
  // 1. Variáveis de estado viram variáveis locais
  // 2. Atualizações de DOM são cirúrgicas (sem diffing)
  // 3. Não precisa de runtime/biblioteca

  // Gere código que:
  // - Declara variáveis para cada propriedade do estado
  // - Cria elementos DOM diretamente
  // - Atualiza apenas o que mudou

  // Dica: Use JSON.stringify para calcular tamanho aproximado

  return {
    codigo: '',
    tamanho: 0,
    dependencias: []
  }
}

/**
 * Simula processamento estilo React (runtime).
 *
 * @param {Object} componente - Definição do componente
 * @returns {Object} { codigo, tamanho, dependencias }
 *
 * @example
 * simularRuntime({
 *   nome: 'Counter',
 *   estado: { count: 0 },
 *   template: '<button>{count}</button>'
 * })
 * // {
 * //   codigo: 'function Counter() { const [count, setCount] = useState(0); ... }',
 * //   tamanho: 200,
 * //   dependencias: ['react', 'react-dom']
 * // }
 */
export function simularRuntime(componente) {
  // TODO: Implemente a simulação de runtime

  // O React usa Virtual DOM:
  // 1. Estado via hooks (useState)
  // 2. Renderização cria árvore virtual
  // 3. Reconciliação compara árvores
  // 4. Requer react e react-dom

  // Gere código que:
  // - Usa useState para cada propriedade do estado
  // - Retorna JSX (representado como string)
  // - Adiciona dependências do React

  return {
    codigo: '',
    tamanho: 0,
    dependencias: []
  }
}

/**
 * Compara as duas abordagens.
 *
 * @param {Object} componente - Definição do componente
 * @returns {Object} Análise comparativa
 *
 * @example
 * compararAbordagens({ nome: 'Counter', estado: { count: 0 }, template: '...' })
 * // {
 * //   compilado: { tamanho: 150, dependencias: [] },
 * //   runtime: { tamanho: 200, dependencias: ['react', 'react-dom'] },
 * //   diferencaTamanho: 50,
 * //   vantagens: {
 * //     compilador: ['Menor bundle', 'Sem overhead de runtime'],
 * //     runtime: ['Ecossistema maior', 'Debugging mais familiar']
 * //   },
 * //   recomendacao: 'compilador'
 * // }
 */
export function compararAbordagens(componente) {
  // TODO: Implemente a comparação

  // 1. Execute ambas as simulações
  // 2. Calcule a diferença de tamanho
  // 3. Liste vantagens de cada abordagem
  // 4. Recomende baseado no tamanho do bundle

  // Regra de recomendação:
  // - Se diferença > 30%: recomende 'compilador'
  // - Se componente tem muitas dependências: recomende 'runtime'
  // - Caso contrário: 'depende do caso'

  return {
    compilado: { tamanho: 0, dependencias: [] },
    runtime: { tamanho: 0, dependencias: [] },
    diferencaTamanho: 0,
    vantagens: {
      compilador: [],
      runtime: []
    },
    recomendacao: ''
  }
}
