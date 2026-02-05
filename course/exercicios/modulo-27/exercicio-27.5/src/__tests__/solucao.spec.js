import { describe, it, expect } from 'vitest'
import {
  converterPropsExportLet,
  converterReativoParaRunes,
  converterEventos,
  analisarMigracao,
  converterSlotsParaSnippets
} from '../solucao.js'

describe('converterPropsExportLet', () => {
  it('deve converter prop simples', () => {
    const resultado = converterPropsExportLet('export let name')
    expect(resultado).toContain('$props()')
    expect(resultado).toContain('name')
  })

  it('deve converter prop com default', () => {
    const resultado = converterPropsExportLet('export let count = 0')
    expect(resultado).toContain('count = 0')
    expect(resultado).toContain('$props()')
  })

  it('deve converter múltiplas props', () => {
    const codigo = `
      export let name
      export let age = 25
      export let active = true
    `
    const resultado = converterPropsExportLet(codigo)

    expect(resultado).toContain('$props()')
    expect(resultado).toContain('name')
    expect(resultado).toContain('age = 25')
    expect(resultado).toContain('active = true')
  })

  it('deve gerar destructuring válido', () => {
    const resultado = converterPropsExportLet(`
      export let title
      export let count = 0
    `)

    // Deve ser algo como: let { title, count = 0 } = $props()
    expect(resultado).toMatch(/let\s*\{.*\}\s*=\s*\$props\(\)/)
  })
})

describe('converterReativoParaRunes', () => {
  it('deve converter atribuição simples para $derived', () => {
    const resultado = converterReativoParaRunes('$: doubled = count * 2')

    expect(resultado).toContain('$derived')
    expect(resultado).toContain('doubled')
    expect(resultado).toContain('count * 2')
  })

  it('deve converter expressão complexa para $derived', () => {
    const resultado = converterReativoParaRunes(
      '$: filtered = items.filter(i => i.active)'
    )

    expect(resultado).toContain('$derived')
    expect(resultado).toContain('filtered')
  })

  it('deve converter console.log para $effect', () => {
    const resultado = converterReativoParaRunes('$: console.log(count)')

    expect(resultado).toContain('$effect')
    expect(resultado).toContain('console.log(count)')
  })

  it('deve converter bloco para $effect', () => {
    const resultado = converterReativoParaRunes(`$: {
      console.log('valor:', count)
      doSomething()
    }`)

    expect(resultado).toContain('$effect')
  })

  it('deve converter chamada de função para $effect', () => {
    const resultado = converterReativoParaRunes('$: fetchData(userId)')

    expect(resultado).toContain('$effect')
    expect(resultado).toContain('fetchData(userId)')
  })
})

describe('converterEventos', () => {
  it('deve converter on:click para onclick', () => {
    const resultado = converterEventos('<button on:click={handleClick}>')
    expect(resultado).toBe('<button onclick={handleClick}>')
  })

  it('deve converter on:input para oninput', () => {
    const resultado = converterEventos('<input on:input={handleInput}>')
    expect(resultado).toBe('<input oninput={handleInput}>')
  })

  it('deve converter handler inline', () => {
    const resultado = converterEventos(
      '<button on:click={() => count++}>'
    )
    expect(resultado).toBe('<button onclick={() => count++}>')
  })

  it('deve converter múltiplos eventos', () => {
    const resultado = converterEventos(
      '<input on:input={handleInput} on:focus={handleFocus} on:blur={handleBlur}>'
    )

    expect(resultado).toContain('oninput={handleInput}')
    expect(resultado).toContain('onfocus={handleFocus}')
    expect(resultado).toContain('onblur={handleBlur}')
    expect(resultado).not.toContain('on:')
  })

  it('deve converter eventos com handler complexo', () => {
    const resultado = converterEventos(
      '<button on:click={(e) => { e.preventDefault(); submit() }}>'
    )
    expect(resultado).toContain('onclick={(e) => { e.preventDefault(); submit() }}')
  })
})

describe('analisarMigracao', () => {
  it('deve identificar props', () => {
    const codigo = `
      <script>
        export let name
        export let count = 0
      </script>
    `
    const analise = analisarMigracao(codigo)

    expect(analise.props).toContain('name')
    expect(analise.props).toContain('count')
  })

  it('deve identificar derivados', () => {
    const codigo = `
      <script>
        $: doubled = count * 2
        $: total = items.reduce((a, b) => a + b, 0)
      </script>
    `
    const analise = analisarMigracao(codigo)

    expect(analise.derivados.length).toBe(2)
  })

  it('deve identificar efeitos', () => {
    const codigo = `
      <script>
        $: console.log(count)
        $: fetchData(id)
      </script>
    `
    const analise = analisarMigracao(codigo)

    expect(analise.efeitos.length).toBe(2)
  })

  it('deve identificar eventos', () => {
    const codigo = `
      <button on:click={handle}>Click</button>
      <input on:input={update} on:focus={focus}>
    `
    const analise = analisarMigracao(codigo)

    expect(analise.eventos).toContain('click')
    expect(analise.eventos).toContain('input')
    expect(analise.eventos).toContain('focus')
  })

  it('deve identificar slots', () => {
    const codigo = `
      <div>
        <slot name="header" />
        <slot />
        <slot name="footer" />
      </div>
    `
    const analise = analisarMigracao(codigo)

    expect(analise.slots).toContain('header')
    expect(analise.slots).toContain('default')
    expect(analise.slots).toContain('footer')
  })

  it('deve calcular complexidade baixa', () => {
    const codigo = `
      <script>
        export let name
      </script>
      <p>{name}</p>
    `
    const analise = analisarMigracao(codigo)
    expect(analise.complexidade).toBe('baixa')
  })

  it('deve calcular complexidade alta', () => {
    const codigo = `
      <script>
        export let items
        export let filter
        export let page = 1

        $: filtered = items.filter(i => i.name.includes(filter))
        $: paginated = filtered.slice((page - 1) * 10, page * 10)
        $: total = filtered.length

        $: console.log('Items:', filtered.length)
        $: localStorage.setItem('page', page)
      </script>

      <slot name="header" />
      <div on:click={select} on:keydown={handleKey}>
        {#each paginated as item}
          <slot {item} />
        {/each}
      </div>
      <slot name="footer" />
    `
    const analise = analisarMigracao(codigo)
    expect(analise.complexidade).toBe('alta')
  })
})

describe('converterSlotsParaSnippets (BONUS)', () => {
  it('deve converter slot default', () => {
    const resultado = converterSlotsParaSnippets('<slot />')
    expect(resultado).toContain('{@render children?.()}')
  })

  it('deve converter slot nomeado', () => {
    const resultado = converterSlotsParaSnippets('<slot name="header" />')
    expect(resultado).toContain('{@render header?.()}')
  })

  it('deve converter múltiplos slots', () => {
    const codigo = `
      <div>
        <slot name="header" />
        <slot />
        <slot name="footer" />
      </div>
    `
    const resultado = converterSlotsParaSnippets(codigo)

    expect(resultado).toContain('{@render header?.()}')
    expect(resultado).toContain('{@render children?.()}')
    expect(resultado).toContain('{@render footer?.()}')
  })
})
