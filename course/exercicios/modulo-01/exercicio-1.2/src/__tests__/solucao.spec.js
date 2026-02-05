/**
 * Testes do Exercício 1.2 - ESModules e Resolução
 */

import { describe, it, expect } from 'vitest'
import { analisarImport, resolverOrdemExtensoes } from '../solucao.js'

describe('Exercício 1.2 - ESModules e Resolução', () => {

  describe('analisarImport()', () => {

    describe('Importações Relativas', () => {

      it('deve identificar import com ./', () => {
        const result = analisarImport('./components/Button')
        expect(result.tipo).toBe('relativo')
        expect(result.isNodeModule).toBe(false)
      })

      it('deve identificar import com ../', () => {
        const result = analisarImport('../utils/helpers')
        expect(result.tipo).toBe('relativo')
        expect(result.isNodeModule).toBe(false)
      })

      it('deve identificar import relativo com extensão', () => {
        const result = analisarImport('./Button.svelte')
        expect(result.tipo).toBe('relativo')
        expect(result.extensao).toBe('.svelte')
      })

    })

    describe('Importações Absolutas', () => {

      it('deve identificar import que começa com /', () => {
        const result = analisarImport('/src/components/Button')
        expect(result.tipo).toBe('absoluto')
        expect(result.isNodeModule).toBe(false)
      })

      it('deve identificar import absoluto com extensão', () => {
        const result = analisarImport('/lib/utils.ts')
        expect(result.tipo).toBe('absoluto')
        expect(result.extensao).toBe('.ts')
      })

    })

    describe('Importações Bare (node_modules)', () => {

      it('deve identificar import de módulo npm', () => {
        const result = analisarImport('lodash')
        expect(result.tipo).toBe('bare')
        expect(result.isNodeModule).toBe(true)
      })

      it('deve identificar import com subpath', () => {
        const result = analisarImport('lodash/debounce')
        expect(result.tipo).toBe('bare')
        expect(result.isNodeModule).toBe(true)
      })

      it('deve identificar pacotes com escopo @org/', () => {
        const result = analisarImport('@sveltejs/kit')
        expect(result.tipo).toBe('bare')
        expect(result.isNodeModule).toBe(true)
      })

      it('deve identificar svelte como bare import', () => {
        const result = analisarImport('svelte')
        expect(result.tipo).toBe('bare')
        expect(result.isNodeModule).toBe(true)
      })

    })

    describe('Importações com Alias', () => {

      it('deve identificar alias @/', () => {
        const result = analisarImport('@/components/Button')
        expect(result.tipo).toBe('alias')
        expect(result.isNodeModule).toBe(false)
      })

      it('deve identificar alias ~/', () => {
        const result = analisarImport('~/utils/helpers')
        expect(result.tipo).toBe('alias')
        expect(result.isNodeModule).toBe(false)
      })

      it('deve identificar alias com extensão', () => {
        const result = analisarImport('@/styles/global.css')
        expect(result.tipo).toBe('alias')
        expect(result.extensao).toBe('.css')
      })

    })

    describe('Detecção de Extensão', () => {

      it('deve detectar extensão .js', () => {
        const result = analisarImport('./utils.js')
        expect(result.extensao).toBe('.js')
      })

      it('deve detectar extensão .ts', () => {
        const result = analisarImport('./utils.ts')
        expect(result.extensao).toBe('.ts')
      })

      it('deve detectar extensão .svelte', () => {
        const result = analisarImport('./Button.svelte')
        expect(result.extensao).toBe('.svelte')
      })

      it('deve retornar null quando não há extensão', () => {
        const result = analisarImport('./components/Button')
        expect(result.extensao).toBeNull()
      })

    })

  })

  describe('resolverOrdemExtensoes()', () => {

    it('deve gerar array de tentativas na ordem correta', () => {
      const result = resolverOrdemExtensoes('Button', ['.ts', '.js'])
      expect(result).toEqual(['Button.ts', 'Button.js'])
    })

    it('deve funcionar com múltiplas extensões', () => {
      const result = resolverOrdemExtensoes('index', ['.ts', '.tsx', '.js', '.jsx'])
      expect(result).toEqual(['index.ts', 'index.tsx', 'index.js', 'index.jsx'])
    })

    it('deve funcionar com extensões Svelte', () => {
      const result = resolverOrdemExtensoes('App', ['.svelte', '.ts', '.js'])
      expect(result).toEqual(['App.svelte', 'App.ts', 'App.js'])
    })

    it('deve funcionar com array vazio', () => {
      const result = resolverOrdemExtensoes('file', [])
      expect(result).toEqual([])
    })

  })

  describe('🏆 Integração', () => {

    it('deve diferenciar @org/package de @/alias', () => {
      const orgPackage = analisarImport('@sveltejs/kit')
      const aliasPath = analisarImport('@/components/Button')

      expect(orgPackage.tipo).toBe('bare')
      expect(orgPackage.isNodeModule).toBe(true)

      expect(aliasPath.tipo).toBe('alias')
      expect(aliasPath.isNodeModule).toBe(false)
    })

  })

})
