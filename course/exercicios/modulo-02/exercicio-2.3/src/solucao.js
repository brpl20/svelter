/**
 * Exercício 2.3 - Templates vs JSX
 *
 * Compare e converta entre sintaxe de templates e JSX.
 */

/**
 * Converte código JSX para sintaxe Svelte.
 *
 * @param {string} jsx - Código JSX
 * @returns {string} Código Svelte equivalente
 *
 * @example
 * converterParaSvelte('{condition && <Component />}')
 * // '{#if condition}<Component />{/if}'
 *
 * converterParaSvelte('{items.map(item => <li>{item}</li>)}')
 * // '{#each items as item}<li>{item}</li>{/each}'
 */
export function converterParaSvelte(jsx) {
  // TODO: Implemente a conversão

  // Conversões principais:
  // 1. {condition && <X />} → {#if condition}<X />{/if}
  // 2. {cond ? <A /> : <B />} → {#if cond}<A />{:else}<B />{/if}
  // 3. {arr.map(x => <Y />)} → {#each arr as x}<Y />{/each}
  // 4. {arr.map((x, i) => <Y />)} → {#each arr as x, i}<Y />{/each}

  // Dicas:
  // - Use expressões regulares para detectar padrões
  // - Trate um caso por vez

  return jsx
}

/**
 * Converte código Svelte para JSX.
 *
 * @param {string} svelte - Código Svelte
 * @returns {string} Código JSX equivalente
 *
 * @example
 * converterParaJSX('{#if show}<Modal />{/if}')
 * // '{show && <Modal />}'
 *
 * converterParaJSX('{#each users as user}<Card />{/each}')
 * // '{users.map(user => <Card />)}'
 */
export function converterParaJSX(svelte) {
  // TODO: Implemente a conversão

  // Conversões principais:
  // 1. {#if cond}<X />{/if} → {cond && <X />}
  // 2. {#if cond}<A />{:else}<B />{/if} → {cond ? <A /> : <B />}
  // 3. {#each arr as x}<Y />{/each} → {arr.map(x => <Y />)}
  // 4. {#each arr as x, i}<Y />{/each} → {arr.map((x, i) => <Y />)}

  return svelte
}

/**
 * Identifica se o código é Svelte ou JSX.
 *
 * @param {string} codigo - Código a analisar
 * @returns {string} 'svelte', 'jsx', ou 'ambiguo'
 *
 * @example
 * identificarSintaxe('{#if x}...{/if}') // 'svelte'
 * identificarSintaxe('{x && <Y />}') // 'jsx'
 * identificarSintaxe('<div>Hello</div>') // 'ambiguo'
 */
export function identificarSintaxe(codigo) {
  // TODO: Implemente a identificação

  // Marcadores Svelte:
  // - {#if, {#each, {#await
  // - {:else}, {:then}, {:catch}
  // - {/if}, {/each}, {/await}
  // - on:click, bind:value

  // Marcadores JSX:
  // - .map(
  // - .filter(
  // - condition &&
  // - condition ? x : y
  // - className= (ao invés de class=)
  // - onClick= (ao invés de on:click)

  return 'ambiguo'
}
