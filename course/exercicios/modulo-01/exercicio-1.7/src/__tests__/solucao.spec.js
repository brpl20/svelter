/**
 * Testes do Exercício 1.7 - Build e Otimização
 */

import { describe, it, expect } from 'vitest'
import { analisarBundle, sugerirOtimizacoes, formatarTamanho } from '../solucao.js'

describe('Exercício 1.7 - Build e Otimização', () => {

  describe('analisarBundle()', () => {

    const bundleExemplo = [
      { nome: 'index-abc123.js', tamanho: 50000 },
      { nome: 'vendor-def456.js', tamanho: 150000 },
      { nome: 'utils-ghi789.js', tamanho: 25000 },
      { nome: 'style-jkl012.css', tamanho: 8000 },
      { nome: 'components-mno345.css', tamanho: 12000 }
    ]

    describe('Totais', () => {

      it('deve calcular total de JS', () => {
        const result = analisarBundle(bundleExemplo)
        expect(result.totalJS).toBe(225000) // 50k + 150k + 25k
      })

      it('deve calcular total de CSS', () => {
        const result = analisarBundle(bundleExemplo)
        expect(result.totalCSS).toBe(20000) // 8k + 12k
      })

    })

    describe('Maior Arquivo', () => {

      it('deve identificar o maior arquivo', () => {
        const result = analisarBundle(bundleExemplo)
        expect(result.maiorArquivo).toBe('vendor-def456.js')
      })

      it('deve identificar maior arquivo quando é CSS', () => {
        const bundle = [
          { nome: 'index.js', tamanho: 1000 },
          { nome: 'huge-styles.css', tamanho: 50000 }
        ]
        const result = analisarBundle(bundle)
        expect(result.maiorArquivo).toBe('huge-styles.css')
      })

    })

    describe('Contagem de Chunks', () => {

      it('deve contar apenas arquivos JS como chunks', () => {
        const result = analisarBundle(bundleExemplo)
        expect(result.quantidadeChunks).toBe(3)
      })

      it('deve retornar 0 se não houver JS', () => {
        const bundle = [{ nome: 'style.css', tamanho: 5000 }]
        const result = analisarBundle(bundle)
        expect(result.quantidadeChunks).toBe(0)
      })

    })

    describe('Bundle Vazio', () => {

      it('deve lidar com array vazio', () => {
        const result = analisarBundle([])
        expect(result.totalJS).toBe(0)
        expect(result.totalCSS).toBe(0)
        expect(result.quantidadeChunks).toBe(0)
      })

    })

  })

  describe('sugerirOtimizacoes()', () => {

    it('deve sugerir code splitting para JS > 500KB', () => {
      const analise = {
        totalJS: 600000,
        totalCSS: 10000,
        maiorArquivo: 'vendor.js',
        quantidadeChunks: 5
      }

      const sugestoes = sugerirOtimizacoes(analise)
      expect(sugestoes).toContain('Considere code splitting - JS total > 500KB')
    })

    it('não deve sugerir code splitting para JS < 500KB', () => {
      const analise = {
        totalJS: 400000,
        totalCSS: 10000,
        maiorArquivo: 'index.js',
        quantidadeChunks: 3
      }

      const sugestoes = sugerirOtimizacoes(analise)
      expect(sugestoes).not.toContain('Considere code splitting - JS total > 500KB')
    })

    it('deve sugerir lazy loading para chunks > 250KB', () => {
      const analise = {
        totalJS: 300000,
        totalCSS: 5000,
        maiorArquivo: 'huge-chunk.js',
        maiorTamanho: 280000,
        quantidadeChunks: 2
      }

      const sugestoes = sugerirOtimizacoes(analise)
      expect(sugestoes).toContain('Considere lazy loading para chunks grandes')
    })

    it('deve sugerir agrupamento para > 20 chunks', () => {
      const analise = {
        totalJS: 200000,
        totalCSS: 5000,
        maiorArquivo: 'index.js',
        quantidadeChunks: 25
      }

      const sugestoes = sugerirOtimizacoes(analise)
      expect(sugestoes).toContain('Considere agrupar chunks manualmente')
    })

    it('deve retornar múltiplas sugestões quando aplicável', () => {
      const analise = {
        totalJS: 800000,
        totalCSS: 5000,
        maiorArquivo: 'vendor.js',
        maiorTamanho: 400000,
        quantidadeChunks: 25
      }

      const sugestoes = sugerirOtimizacoes(analise)
      expect(sugestoes.length).toBeGreaterThanOrEqual(2)
    })

    it('deve retornar array vazio para bundle otimizado', () => {
      const analise = {
        totalJS: 200000,
        totalCSS: 10000,
        maiorArquivo: 'index.js',
        maiorTamanho: 100000,
        quantidadeChunks: 5
      }

      const sugestoes = sugerirOtimizacoes(analise)
      expect(sugestoes).toEqual([])
    })

  })

  describe('formatarTamanho()', () => {

    describe('Bytes', () => {

      it('deve formatar valores pequenos como bytes', () => {
        expect(formatarTamanho(500)).toBe('500 B')
      })

      it('deve formatar 0 bytes', () => {
        expect(formatarTamanho(0)).toBe('0 B')
      })

      it('deve formatar 1023 bytes', () => {
        expect(formatarTamanho(1023)).toBe('1023 B')
      })

    })

    describe('Kilobytes', () => {

      it('deve formatar 1024 bytes como 1 KB', () => {
        expect(formatarTamanho(1024)).toBe('1.00 KB')
      })

      it('deve formatar KB com decimais', () => {
        expect(formatarTamanho(1536)).toBe('1.50 KB')
      })

      it('deve formatar valores próximos de 1MB', () => {
        expect(formatarTamanho(500000)).toBe('488.28 KB')
      })

    })

    describe('Megabytes', () => {

      it('deve formatar 1MB', () => {
        expect(formatarTamanho(1048576)).toBe('1.00 MB')
      })

      it('deve formatar MB com decimais', () => {
        expect(formatarTamanho(1572864)).toBe('1.50 MB')
      })

      it('deve formatar valores grandes', () => {
        expect(formatarTamanho(5242880)).toBe('5.00 MB')
      })

    })

  })

  describe('🏆 Integração', () => {

    it('deve analisar e sugerir para bundle real', () => {
      const bundle = [
        { nome: 'index-a1b2c3.js', tamanho: 45000 },
        { nome: 'vendor-d4e5f6.js', tamanho: 520000 },
        { nome: 'dashboard-g7h8i9.js', tamanho: 180000 },
        { nome: 'admin-j0k1l2.js', tamanho: 150000 },
        { nome: 'styles-m3n4o5.css', tamanho: 25000 }
      ]

      const analise = analisarBundle(bundle)

      expect(analise.totalJS).toBe(895000)
      expect(analise.maiorArquivo).toBe('vendor-d4e5f6.js')
      expect(formatarTamanho(analise.totalJS)).toBe('873.83 KB')

      // Com analise.maiorTamanho adicionado para sugestões
      const analiseCompleta = { ...analise, maiorTamanho: 520000 }
      const sugestoes = sugerirOtimizacoes(analiseCompleta)

      expect(sugestoes).toContain('Considere code splitting - JS total > 500KB')
      expect(sugestoes).toContain('Considere lazy loading para chunks grandes')
    })

  })

})
