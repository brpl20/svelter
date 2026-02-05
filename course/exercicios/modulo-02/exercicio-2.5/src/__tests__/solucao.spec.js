/**
 * Testes do Exercício 2.5 - CSS com Escopo vs CSS-in-JS
 */

import { describe, it, expect } from 'vitest'
import { escoparCSS, gerarCSSinJS, extrairVariaveisCSS } from '../solucao.js'

describe('Exercício 2.5 - CSS com Escopo vs CSS-in-JS', () => {

  describe('escoparCSS()', () => {

    describe('Seletores Simples', () => {

      it('deve escopar classe simples', () => {
        const result = escoparCSS('.button { color: red }', 'abc123')
        expect(result).toBe('.button.svelte-abc123 { color: red }')
      })

      it('deve escopar elemento', () => {
        const result = escoparCSS('h1 { font-size: 2em }', 'xyz789')
        expect(result).toBe('h1.svelte-xyz789 { font-size: 2em }')
      })

      it('deve escopar ID', () => {
        const result = escoparCSS('#main { width: 100% }', 'id123')
        expect(result).toBe('#main.svelte-id123 { width: 100% }')
      })

    })

    describe('Seletores Compostos', () => {

      it('deve escopar seletor descendente', () => {
        const result = escoparCSS('.card .title { color: blue }', 'comp1')
        expect(result).toBe('.card.svelte-comp1 .title.svelte-comp1 { color: blue }')
      })

      it('deve escopar múltiplos seletores (vírgula)', () => {
        const result = escoparCSS('.btn, .link { cursor: pointer }', 'multi')
        expect(result).toBe('.btn.svelte-multi, .link.svelte-multi { cursor: pointer }')
      })

    })

    describe('Pseudo-classes e Pseudo-elementos', () => {

      it('deve preservar :hover', () => {
        const result = escoparCSS('.btn:hover { opacity: 0.8 }', 'pseudo')
        expect(result).toBe('.btn.svelte-pseudo:hover { opacity: 0.8 }')
      })

      it('deve preservar ::before', () => {
        const result = escoparCSS('.icon::before { content: "" }', 'before')
        expect(result).toBe('.icon.svelte-before::before { content: "" }')
      })

      it('deve preservar :focus', () => {
        const result = escoparCSS('input:focus { outline: none }', 'focus')
        expect(result).toBe('input.svelte-focus:focus { outline: none }')
      })

    })

    describe('Múltiplas Regras', () => {

      it('deve escopar várias regras', () => {
        const css = '.a { color: red } .b { color: blue }'
        const result = escoparCSS(css, 'multi')
        expect(result).toContain('.a.svelte-multi')
        expect(result).toContain('.b.svelte-multi')
      })

    })

  })

  describe('gerarCSSinJS()', () => {

    describe('Componentes Básicos', () => {

      it('deve gerar styled component simples', () => {
        const result = gerarCSSinJS({
          Button: { color: 'red' }
        })
        expect(result).toContain('const Button = styled')
        expect(result).toContain('color: red')
      })

      it('deve gerar múltiplas propriedades', () => {
        const result = gerarCSSinJS({
          Card: { padding: '20px', margin: '10px', borderRadius: '8px' }
        })
        expect(result).toContain('padding: 20px')
        expect(result).toContain('margin: 10px')
        expect(result).toContain('border-radius: 8px')
      })

    })

    describe('Conversão de Propriedades', () => {

      it('deve converter camelCase para kebab-case', () => {
        const result = gerarCSSinJS({
          Box: { backgroundColor: 'white', fontSize: '16px' }
        })
        expect(result).toContain('background-color: white')
        expect(result).toContain('font-size: 16px')
      })

    })

    describe('Elementos HTML', () => {

      it('deve usar elemento correto para button', () => {
        const result = gerarCSSinJS({
          button: { cursor: 'pointer' }
        })
        expect(result).toContain('styled.button')
      })

      it('deve usar div como padrão para componentes', () => {
        const result = gerarCSSinJS({
          Container: { display: 'flex' }
        })
        expect(result).toContain('styled.div')
      })

    })

  })

  describe('extrairVariaveisCSS()', () => {

    describe('Extração Básica', () => {

      it('deve extrair variável simples', () => {
        const result = extrairVariaveisCSS(':root { --primary: blue; }')
        expect(result['--primary']).toBe('blue')
      })

      it('deve extrair múltiplas variáveis', () => {
        const result = extrairVariaveisCSS(':root { --color: red; --size: 16px; }')
        expect(result['--color']).toBe('red')
        expect(result['--size']).toBe('16px')
      })

    })

    describe('Valores Complexos', () => {

      it('deve extrair cores hex', () => {
        const result = extrairVariaveisCSS(':root { --brand: #007bff; }')
        expect(result['--brand']).toBe('#007bff')
      })

      it('deve extrair valores com espaços', () => {
        const result = extrairVariaveisCSS(':root { --shadow: 0 2px 4px rgba(0,0,0,0.1); }')
        expect(result['--shadow']).toBe('0 2px 4px rgba(0,0,0,0.1)')
      })

      it('deve extrair valores calc()', () => {
        const result = extrairVariaveisCSS(':root { --width: calc(100% - 20px); }')
        expect(result['--width']).toBe('calc(100% - 20px)')
      })

    })

    describe('Diferentes Seletores', () => {

      it('deve extrair de qualquer seletor', () => {
        const result = extrairVariaveisCSS('.dark-theme { --bg: #1a1a1a; }')
        expect(result['--bg']).toBe('#1a1a1a')
      })

    })

    describe('CSS sem Variáveis', () => {

      it('deve retornar objeto vazio', () => {
        const result = extrairVariaveisCSS('.btn { color: red; }')
        expect(result).toEqual({})
      })

    })

  })

  describe('🏆 Integração', () => {

    it('deve demonstrar fluxo completo de estilização', () => {
      // CSS original
      const cssOriginal = `
        :root {
          --primary: #007bff;
          --spacing: 8px;
        }
        .button {
          background: var(--primary);
          padding: var(--spacing);
        }
        .button:hover {
          opacity: 0.9;
        }
      `

      // Extrair variáveis
      const variaveis = extrairVariaveisCSS(cssOriginal)
      expect(variaveis['--primary']).toBe('#007bff')

      // Escopar CSS
      const cssEscopado = escoparCSS('.button { color: white }', 'cmp1')
      expect(cssEscopado).toContain('.svelte-cmp1')

      // Gerar CSS-in-JS equivalente
      const cssInJS = gerarCSSinJS({
        Button: { background: '#007bff', padding: '8px' }
      })
      expect(cssInJS).toContain('styled')
    })

  })

})
