/**
 * Testes do Exercício 1.4 - Configuração do Vite
 */

import { describe, it, expect } from 'vitest'
import { criarConfig, validarConfig } from '../solucao.js'

describe('Exercício 1.4 - Configuração do Vite', () => {

  describe('criarConfig()', () => {

    describe('Configuração do Servidor', () => {

      it('deve criar config com porta personalizada', () => {
        const config = criarConfig({ porta: 3000 })
        expect(config.server.port).toBe(3000)
      })

      it('deve usar porta padrão 5173 se não especificada', () => {
        const config = criarConfig({})
        expect(config.server?.port).toBe(5173)
      })

    })

    describe('Base URL', () => {

      it('deve criar config com base URL', () => {
        const config = criarConfig({ base: '/app/' })
        expect(config.base).toBe('/app/')
      })

      it('não deve incluir base se não especificada', () => {
        const config = criarConfig({ porta: 3000 })
        expect(config.base).toBeUndefined()
      })

    })

    describe('Aliases', () => {

      it('deve criar config com aliases', () => {
        const config = criarConfig({
          aliases: { '@': './src', '~': './lib' }
        })
        expect(config.resolve.alias).toEqual({
          '@': './src',
          '~': './lib'
        })
      })

      it('não deve incluir resolve se não houver aliases', () => {
        const config = criarConfig({ porta: 3000 })
        expect(config.resolve).toBeUndefined()
      })

    })

    describe('Build Output', () => {

      it('deve criar config com outDir', () => {
        const config = criarConfig({ outDir: 'build' })
        expect(config.build.outDir).toBe('build')
      })

    })

    describe('Configuração Completa', () => {

      it('deve criar config completa com todas as opções', () => {
        const config = criarConfig({
          porta: 8080,
          base: '/my-app/',
          aliases: { '@': './src' },
          outDir: 'dist'
        })

        expect(config.server.port).toBe(8080)
        expect(config.base).toBe('/my-app/')
        expect(config.resolve.alias['@']).toBe('./src')
        expect(config.build.outDir).toBe('dist')
      })

    })

  })

  describe('validarConfig()', () => {

    describe('Configuração Válida', () => {

      it('deve validar config vazia', () => {
        const result = validarConfig({})
        expect(result.valido).toBe(true)
        expect(result.erros).toEqual([])
      })

      it('deve validar config com porta válida', () => {
        const result = validarConfig({ server: { port: 3000 } })
        expect(result.valido).toBe(true)
      })

      it('deve validar config com base URL válida', () => {
        const result = validarConfig({ base: '/app/' })
        expect(result.valido).toBe(true)
      })

    })

    describe('Validação de Porta', () => {

      it('deve rejeitar porta menor que 1', () => {
        const result = validarConfig({ server: { port: 0 } })
        expect(result.valido).toBe(false)
        expect(result.erros).toContain('Porta deve estar entre 1 e 65535')
      })

      it('deve rejeitar porta maior que 65535', () => {
        const result = validarConfig({ server: { port: 70000 } })
        expect(result.valido).toBe(false)
        expect(result.erros).toContain('Porta deve estar entre 1 e 65535')
      })

      it('deve rejeitar porta não numérica', () => {
        const result = validarConfig({ server: { port: 'abc' } })
        expect(result.valido).toBe(false)
        expect(result.erros).toContain('Porta deve ser um número')
      })

      it('deve aceitar porta limite inferior (1)', () => {
        const result = validarConfig({ server: { port: 1 } })
        expect(result.valido).toBe(true)
      })

      it('deve aceitar porta limite superior (65535)', () => {
        const result = validarConfig({ server: { port: 65535 } })
        expect(result.valido).toBe(true)
      })

    })

    describe('Validação de Base URL', () => {

      it('deve rejeitar base que não começa com /', () => {
        const result = validarConfig({ base: 'app/' })
        expect(result.valido).toBe(false)
        expect(result.erros).toContain('Base deve começar com /')
      })

      it('deve rejeitar base que não termina com /', () => {
        const result = validarConfig({ base: '/app' })
        expect(result.valido).toBe(false)
        expect(result.erros).toContain('Base deve terminar com /')
      })

      it('deve aceitar base raiz /', () => {
        const result = validarConfig({ base: '/' })
        expect(result.valido).toBe(true)
      })

    })

    describe('Validação de Build', () => {

      it('deve rejeitar outDir vazio', () => {
        const result = validarConfig({ build: { outDir: '' } })
        expect(result.valido).toBe(false)
        expect(result.erros).toContain('outDir não pode ser vazio')
      })

      it('deve aceitar outDir válido', () => {
        const result = validarConfig({ build: { outDir: 'dist' } })
        expect(result.valido).toBe(true)
      })

    })

    describe('Múltiplos Erros', () => {

      it('deve retornar todos os erros encontrados', () => {
        const result = validarConfig({
          server: { port: -1 },
          base: 'invalid',
          build: { outDir: '' }
        })

        expect(result.valido).toBe(false)
        expect(result.erros.length).toBeGreaterThanOrEqual(3)
      })

    })

  })

})
