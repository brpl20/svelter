/**
 * Testes do Exercício 1.1 - Medindo Tempo de Carregamento
 *
 * Rode com: npm test
 */

import { describe, it, expect, vi } from 'vitest'
import { medirTempo, formatarTempo } from '../solucao.js'

describe('Exercício 1.1 - Tempo de Carregamento', () => {

  describe('medirTempo()', () => {

    it('deve executar a função e retornar seu resultado', () => {
      const { resultado } = medirTempo(() => 42)
      expect(resultado).toBe(42)
    })

    it('deve retornar o resultado de funções que retornam objetos', () => {
      const { resultado } = medirTempo(() => ({ nome: 'teste' }))
      expect(resultado).toEqual({ nome: 'teste' })
    })

    it('deve retornar o resultado de funções que retornam arrays', () => {
      const { resultado } = medirTempo(() => [1, 2, 3])
      expect(resultado).toEqual([1, 2, 3])
    })

    it('deve retornar o tempo de execução como número', () => {
      const { tempo } = medirTempo(() => {
        // Operação simples
        return 1 + 1
      })
      expect(typeof tempo).toBe('number')
      expect(tempo).toBeGreaterThanOrEqual(0)
    })

    it('deve medir tempo de funções lentas', () => {
      // Mock do performance.now para simular tempo
      const mockNow = vi.spyOn(performance, 'now')
      mockNow
        .mockReturnValueOnce(0)    // Início
        .mockReturnValueOnce(100)  // Fim

      const { tempo } = medirTempo(() => 'resultado')

      expect(tempo).toBe(100)

      mockNow.mockRestore()
    })

  })

  describe('formatarTempo()', () => {

    it('deve formatar milissegundos menores que 1000', () => {
      expect(formatarTempo(150)).toBe('150ms')
      expect(formatarTempo(0)).toBe('0ms')
      expect(formatarTempo(999)).toBe('999ms')
    })

    it('deve formatar tempos de 1 segundo ou mais', () => {
      expect(formatarTempo(1000)).toBe('1.00s')
      expect(formatarTempo(1500)).toBe('1.50s')
      expect(formatarTempo(2345)).toBe('2.35s')
    })

    it('deve arredondar para 2 casas decimais', () => {
      expect(formatarTempo(1234)).toBe('1.23s')
      expect(formatarTempo(1999)).toBe('2.00s')
      expect(formatarTempo(10500)).toBe('10.50s')
    })

    it('deve lidar com valores decimais de ms', () => {
      expect(formatarTempo(150.5)).toBe('150.5ms')
      expect(formatarTempo(1500.75)).toBe('1.50s')
    })

  })

})

describe('🏆 Desafio Completo', () => {

  it('deve integrar medirTempo e formatarTempo', () => {
    const { resultado, tempo } = medirTempo(() => {
      let sum = 0
      for (let i = 0; i < 1000; i++) sum += i
      return sum
    })

    expect(resultado).toBe(499500)
    expect(typeof tempo).toBe('number')

    const formatted = formatarTempo(tempo)
    expect(formatted).toMatch(/^\d+(\.\d+)?(ms|s)$/)
  })

})
