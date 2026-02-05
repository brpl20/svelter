/**
 * Testes do Exercício 1.5 - Plugin Vite
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { bannerPlugin } from '../solucao.js'

describe('Exercício 1.5 - Plugin Vite', () => {

  let mockDate

  beforeEach(() => {
    // Mock da data para testes consistentes
    mockDate = new Date('2024-01-15T10:30:00.000Z')
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Estrutura do Plugin', () => {

    it('deve ter a propriedade name como "banner-plugin"', () => {
      const plugin = bannerPlugin({ projectName: 'Test' })
      expect(plugin.name).toBe('banner-plugin')
    })

    it('deve ter o hook transform', () => {
      const plugin = bannerPlugin({ projectName: 'Test' })
      expect(typeof plugin.transform).toBe('function')
    })

  })

  describe('Hook transform()', () => {

    it('deve retornar null para arquivos não-JS', () => {
      const plugin = bannerPlugin({ projectName: 'Test' })

      expect(plugin.transform('code', 'file.ts')).toBeNull()
      expect(plugin.transform('code', 'file.css')).toBeNull()
      expect(plugin.transform('code', 'file.html')).toBeNull()
      expect(plugin.transform('code', 'file.json')).toBeNull()
    })

    it('deve transformar arquivos .js', () => {
      const plugin = bannerPlugin({ projectName: 'Test' })
      const result = plugin.transform('const x = 1', 'file.js')

      expect(result).not.toBeNull()
      expect(result).toHaveProperty('code')
      expect(result).toHaveProperty('map')
    })

    it('deve adicionar banner com nome do projeto', () => {
      const plugin = bannerPlugin({ projectName: 'Meu Projeto' })
      const result = plugin.transform('const x = 1', 'file.js')

      expect(result.code).toContain('Meu Projeto')
    })

    it('deve adicionar data no formato ISO', () => {
      const plugin = bannerPlugin({ projectName: 'Test' })
      const result = plugin.transform('const x = 1', 'file.js')

      expect(result.code).toContain('2024-01-15T10:30:00.000Z')
    })

    it('deve manter o código original após o banner', () => {
      const plugin = bannerPlugin({ projectName: 'Test' })
      const originalCode = 'const x = 1;\nfunction foo() { return x; }'
      const result = plugin.transform(originalCode, 'file.js')

      expect(result.code).toContain(originalCode)
    })

    it('deve ter o banner no formato de comentário multilinha', () => {
      const plugin = bannerPlugin({ projectName: 'Test' })
      const result = plugin.transform('const x = 1', 'file.js')

      expect(result.code).toMatch(/^\/\*\*[\s\S]*\*\//)
    })

    it('deve retornar map como null', () => {
      const plugin = bannerPlugin({ projectName: 'Test' })
      const result = plugin.transform('const x = 1', 'file.js')

      expect(result.map).toBeNull()
    })

  })

  describe('🏆 Integração Completa', () => {

    it('deve gerar banner completo e formatado', () => {
      const plugin = bannerPlugin({ projectName: 'Dashboard Vite' })
      const result = plugin.transform('export default {}', 'main.js')

      // Verifica estrutura completa
      expect(result.code).toMatch(/\/\*\*\s*\n\s*\*\s*Dashboard Vite/)
      expect(result.code).toMatch(/Build:\s*2024-01-15T10:30:00\.000Z/)
      expect(result.code).toContain('export default {}')
    })

  })

})
