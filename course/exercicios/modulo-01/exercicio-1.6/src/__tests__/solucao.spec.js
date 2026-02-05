/**
 * Testes do Exercício 1.6 - Variáveis de Ambiente
 */

import { describe, it, expect } from 'vitest'
import { parsearEnv, filtrarViteEnv, detectarModo } from '../solucao.js'

describe('Exercício 1.6 - Variáveis de Ambiente', () => {

  describe('parsearEnv()', () => {

    describe('Parsing Básico', () => {

      it('deve parsear variável simples', () => {
        const result = parsearEnv('KEY=value')
        expect(result).toEqual({ KEY: 'value' })
      })

      it('deve parsear múltiplas variáveis', () => {
        const result = parsearEnv('KEY1=value1\nKEY2=value2')
        expect(result).toEqual({ KEY1: 'value1', KEY2: 'value2' })
      })

      it('deve ignorar linhas vazias', () => {
        const result = parsearEnv('KEY1=value1\n\nKEY2=value2')
        expect(result).toEqual({ KEY1: 'value1', KEY2: 'value2' })
      })

      it('deve ignorar comentários', () => {
        const result = parsearEnv('# Comentário\nKEY=value')
        expect(result).toEqual({ KEY: 'value' })
      })

    })

    describe('Valores Especiais', () => {

      it('deve preservar = no valor', () => {
        const result = parsearEnv('URL=http://api.com?foo=bar')
        expect(result.URL).toBe('http://api.com?foo=bar')
      })

      it('deve remover aspas duplas do valor', () => {
        const result = parsearEnv('KEY="valor com espaços"')
        expect(result.KEY).toBe('valor com espaços')
      })

      it('deve remover aspas simples do valor', () => {
        const result = parsearEnv("KEY='valor com espaços'")
        expect(result.KEY).toBe('valor com espaços')
      })

      it('deve lidar com valor vazio', () => {
        const result = parsearEnv('KEY=')
        expect(result.KEY).toBe('')
      })

      it('deve fazer trim de espaços', () => {
        const result = parsearEnv('  KEY  =  value  ')
        expect(result.KEY).toBe('value')
      })

    })

    describe('Variáveis Vite', () => {

      it('deve parsear variáveis VITE_', () => {
        const result = parsearEnv('VITE_API_URL=https://api.com\nVITE_DEBUG=true')
        expect(result).toEqual({
          VITE_API_URL: 'https://api.com',
          VITE_DEBUG: 'true'
        })
      })

    })

  })

  describe('filtrarViteEnv()', () => {

    it('deve filtrar apenas variáveis VITE_', () => {
      const result = filtrarViteEnv({
        VITE_API: 'url',
        SECRET: 'key',
        VITE_DEBUG: 'true'
      })

      expect(result).toEqual({
        API: 'url',
        DEBUG: 'true'
      })
    })

    it('deve remover prefixo VITE_ das chaves', () => {
      const result = filtrarViteEnv({ VITE_APP_TITLE: 'Meu App' })
      expect(result.APP_TITLE).toBe('Meu App')
      expect(result.VITE_APP_TITLE).toBeUndefined()
    })

    it('deve retornar objeto vazio se não houver VITE_', () => {
      const result = filtrarViteEnv({ SECRET: 'key', DATABASE_URL: 'url' })
      expect(result).toEqual({})
    })

    it('deve lidar com objeto vazio', () => {
      const result = filtrarViteEnv({})
      expect(result).toEqual({})
    })

    it('não deve incluir VITE no meio do nome', () => {
      const result = filtrarViteEnv({
        MY_VITE_VAR: 'nope',
        VITE_REAL: 'yes'
      })

      expect(result).toEqual({ REAL: 'yes' })
    })

  })

  describe('detectarModo()', () => {

    it('deve detectar .env como all', () => {
      expect(detectarModo('.env')).toBe('all')
    })

    it('deve detectar .env.local como local', () => {
      expect(detectarModo('.env.local')).toBe('local')
    })

    it('deve detectar .env.development como development', () => {
      expect(detectarModo('.env.development')).toBe('development')
    })

    it('deve detectar .env.production como production', () => {
      expect(detectarModo('.env.production')).toBe('production')
    })

    it('deve detectar .env.development.local como development', () => {
      expect(detectarModo('.env.development.local')).toBe('development')
    })

    it('deve detectar .env.production.local como production', () => {
      expect(detectarModo('.env.production.local')).toBe('production')
    })

  })

  describe('🏆 Integração', () => {

    it('deve processar arquivo .env completo', () => {
      const conteudo = `
# API Configuration
VITE_API_URL=https://api.example.com
VITE_API_KEY="abc123"

# Internal secrets (não exposto)
DATABASE_URL=postgres://localhost:5432/db
SECRET_KEY=super-secret

# Feature flags
VITE_ENABLE_ANALYTICS=true
      `.trim()

      const parsed = parsearEnv(conteudo)
      const viteVars = filtrarViteEnv(parsed)

      expect(Object.keys(viteVars)).toHaveLength(3)
      expect(viteVars.API_URL).toBe('https://api.example.com')
      expect(viteVars.API_KEY).toBe('abc123')
      expect(viteVars.ENABLE_ANALYTICS).toBe('true')

      // Secrets não devem estar no resultado
      expect(viteVars.DATABASE_URL).toBeUndefined()
      expect(viteVars.SECRET_KEY).toBeUndefined()
    })

  })

})
