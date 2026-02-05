/**
 * Exercício 2.5 - CSS com Escopo vs CSS-in-JS
 *
 * Compare abordagens de estilização em Svelte e React.
 */

/**
 * Simula escopo automático de CSS do Svelte.
 *
 * @param {string} css - CSS original
 * @param {string} componenteId - ID único do componente
 * @returns {string} CSS com seletores escopados
 *
 * @example
 * escoparCSS('.button { color: red }', 'abc123')
 * // '.button.svelte-abc123 { color: red }'
 *
 * escoparCSS('h1 { font-size: 2em }', 'xyz789')
 * // 'h1.svelte-xyz789 { font-size: 2em }'
 */
export function escoparCSS(css, componenteId) {
  // TODO: Implemente o escopo

  // Regras:
  // 1. Adicione .svelte-{id} a cada seletor
  // 2. Seletores compostos: .foo .bar → .foo.svelte-id .bar.svelte-id
  // 3. Pseudo-classes: .btn:hover → .btn.svelte-id:hover
  // 4. Elementos: div → div.svelte-id

  // Dicas:
  // - Use regex para encontrar seletores antes de {
  // - Cuidado com seletores compostos (vírgula)
  // - Preserve pseudo-classes (:hover, :focus, etc)

  return css
}

/**
 * Gera código CSS-in-JS estilo styled-components.
 *
 * @param {Object} estilos - Objeto com estilos por componente
 * @returns {string} Código styled-components
 *
 * @example
 * gerarCSSinJS({
 *   Button: { color: 'red', padding: '10px' }
 * })
 * // "const Button = styled.button`\n  color: red;\n  padding: 10px;\n`"
 */
export function gerarCSSinJS(estilos) {
  // TODO: Implemente a geração

  // Formato esperado:
  // const NomeComponente = styled.elemento`
  //   propriedade: valor;
  // `

  // Regras:
  // 1. Nome começa com maiúscula → styled.div
  // 2. Nome em minúscula (button, input) → styled.{nome}
  // 3. Converta camelCase para kebab-case (backgroundColor → background-color)
  // 4. Adicione ; após cada propriedade

  return ''
}

/**
 * Extrai variáveis CSS personalizadas.
 *
 * @param {string} css - CSS contendo variáveis
 * @returns {Object} Mapa de variáveis e valores
 *
 * @example
 * extrairVariaveisCSS(':root { --primary: #007bff; --spacing: 8px; }')
 * // { '--primary': '#007bff', '--spacing': '8px' }
 */
export function extrairVariaveisCSS(css) {
  // TODO: Implemente a extração

  // Variáveis CSS começam com --
  // Formato: --nome: valor;

  // Dicas:
  // - Use regex para encontrar padrão --nome: valor
  // - Normalize espaços nos valores
  // - Funciona em qualquer seletor, não só :root

  return {}
}

/**
 * BONUS: Converte CSS-in-JS para CSS tradicional.
 *
 * @param {string} codigo - Código styled-components
 * @returns {string} CSS tradicional
 */
export function cssInJSParaCSS(codigo) {
  // TODO: Implemente a conversão (opcional)

  // Extraia os estilos dos template literals
  // Gere classes CSS tradicionais

  return ''
}
