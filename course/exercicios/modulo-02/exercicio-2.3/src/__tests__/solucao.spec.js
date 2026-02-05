/**
 * Testes do Exercício 2.3 - Templates vs JSX
 */

import { describe, it, expect } from 'vitest'
import { converterParaSvelte, converterParaJSX, identificarSintaxe } from '../solucao.js'

describe('Exercício 2.3 - Templates vs JSX', () => {

  describe('converterParaSvelte()', () => {

    describe('Condicionais com &&', () => {

      it('deve converter && simples', () => {
        const jsx = '{show && <Modal />}'
        const result = converterParaSvelte(jsx)
        expect(result).toBe('{#if show}<Modal />{/if}')
      })

      it('deve converter && com expressão', () => {
        const jsx = '{items.length > 0 && <List />}'
        const result = converterParaSvelte(jsx)
        expect(result).toBe('{#if items.length > 0}<List />{/if}')
      })

    })

    describe('Condicionais Ternárias', () => {

      it('deve converter ternário simples', () => {
        const jsx = '{loading ? <Spinner /> : <Content />}'
        const result = converterParaSvelte(jsx)
        expect(result).toBe('{#if loading}<Spinner />{:else}<Content />{/if}')
      })

      it('deve converter ternário com texto', () => {
        const jsx = '{isAdmin ? "Admin" : "User"}'
        const result = converterParaSvelte(jsx)
        expect(result).toBe('{#if isAdmin}Admin{:else}User{/if}')
      })

    })

    describe('Loops com map', () => {

      it('deve converter map simples', () => {
        const jsx = '{items.map(item => <li>{item}</li>)}'
        const result = converterParaSvelte(jsx)
        expect(result).toBe('{#each items as item}<li>{item}</li>{/each}')
      })

      it('deve converter map com index', () => {
        const jsx = '{items.map((item, index) => <li key={index}>{item}</li>)}'
        const result = converterParaSvelte(jsx)
        expect(result).toContain('{#each items as item, index}')
      })

      it('deve converter map com key', () => {
        const jsx = '{users.map(user => <Card key={user.id} />)}'
        const result = converterParaSvelte(jsx)
        expect(result).toContain('(user.id)')
      })

    })

  })

  describe('converterParaJSX()', () => {

    describe('Condicionais {#if}', () => {

      it('deve converter if simples para &&', () => {
        const svelte = '{#if show}<Modal />{/if}'
        const result = converterParaJSX(svelte)
        expect(result).toBe('{show && <Modal />}')
      })

      it('deve converter if/else para ternário', () => {
        const svelte = '{#if loading}<Spinner />{:else}<Content />{/if}'
        const result = converterParaJSX(svelte)
        expect(result).toBe('{loading ? <Spinner /> : <Content />}')
      })

    })

    describe('Loops {#each}', () => {

      it('deve converter each simples para map', () => {
        const svelte = '{#each items as item}<li>{item}</li>{/each}'
        const result = converterParaJSX(svelte)
        expect(result).toBe('{items.map(item => <li>{item}</li>)}')
      })

      it('deve converter each com index', () => {
        const svelte = '{#each items as item, i}<li>{item}</li>{/each}'
        const result = converterParaJSX(svelte)
        expect(result).toContain('(item, i) =>')
      })

      it('deve converter each com key', () => {
        const svelte = '{#each users as user (user.id)}<Card />{/each}'
        const result = converterParaJSX(svelte)
        expect(result).toContain('key={user.id}')
      })

    })

  })

  describe('identificarSintaxe()', () => {

    describe('Identificar Svelte', () => {

      it('deve identificar {#if}', () => {
        expect(identificarSintaxe('{#if condition}...')).toBe('svelte')
      })

      it('deve identificar {#each}', () => {
        expect(identificarSintaxe('{#each items as item}...')).toBe('svelte')
      })

      it('deve identificar {:else}', () => {
        expect(identificarSintaxe('...{:else}...')).toBe('svelte')
      })

      it('deve identificar {/if}', () => {
        expect(identificarSintaxe('...{/if}')).toBe('svelte')
      })

      it('deve identificar on:click', () => {
        expect(identificarSintaxe('<button on:click={...}>')).toBe('svelte')
      })

      it('deve identificar bind:value', () => {
        expect(identificarSintaxe('<input bind:value={...}>')).toBe('svelte')
      })

    })

    describe('Identificar JSX', () => {

      it('deve identificar .map(', () => {
        expect(identificarSintaxe('{items.map(x => ...)}')).toBe('jsx')
      })

      it('deve identificar &&', () => {
        expect(identificarSintaxe('{condition && <Component />}')).toBe('jsx')
      })

      it('deve identificar ternário', () => {
        expect(identificarSintaxe('{x ? <A /> : <B />}')).toBe('jsx')
      })

      it('deve identificar className', () => {
        expect(identificarSintaxe('<div className="...">')).toBe('jsx')
      })

      it('deve identificar onClick', () => {
        expect(identificarSintaxe('<button onClick={...}>')).toBe('jsx')
      })

    })

    describe('Casos Ambíguos', () => {

      it('deve retornar ambiguo para HTML simples', () => {
        expect(identificarSintaxe('<div>Hello</div>')).toBe('ambiguo')
      })

      it('deve retornar ambiguo para interpolação simples', () => {
        expect(identificarSintaxe('<p>{name}</p>')).toBe('ambiguo')
      })

    })

  })

  describe('🏆 Integração', () => {

    it('deve converter componente JSX completo para Svelte', () => {
      const jsx = `
        {loading && <Spinner />}
        {!loading && users.map(user => (
          <Card key={user.id} name={user.name} />
        ))}
      `.trim()

      const result = converterParaSvelte(jsx)

      expect(result).toContain('{#if loading}')
      expect(result).toContain('{#each users as user')
      expect(identificarSintaxe(result)).toBe('svelte')
    })

    it('deve converter componente Svelte completo para JSX', () => {
      const svelte = `
        {#if loading}
          <Spinner />
        {:else}
          {#each users as user (user.id)}
            <Card name={user.name} />
          {/each}
        {/if}
      `.trim()

      const result = converterParaJSX(svelte)

      expect(result).toContain('? <Spinner />')
      expect(result).toContain('.map(')
      expect(identificarSintaxe(result)).toBe('jsx')
    })

  })

})
