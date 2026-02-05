/**
 * Testes do Exercício 2.2 - Timer
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createTimer } from '../solucao.js'

describe('Exercício 2.2 - Timer', () => {

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Estado Inicial', () => {

    it('deve começar com 0 segundos', () => {
      const timer = createTimer()
      expect(timer.seconds).toBe(0)
      timer.destroy()
    })

    it('deve começar parado', () => {
      const timer = createTimer()
      expect(timer.isRunning).toBe(false)
      timer.destroy()
    })

    it('deve mostrar "00:00" inicialmente', () => {
      const timer = createTimer()
      expect(timer.formatted).toBe('00:00')
      timer.destroy()
    })

  })

  describe('start()', () => {

    it('deve mudar isRunning para true', () => {
      const timer = createTimer()
      timer.start()
      expect(timer.isRunning).toBe(true)
      timer.destroy()
    })

    it('deve incrementar seconds a cada segundo', () => {
      const timer = createTimer()
      timer.start()

      vi.advanceTimersByTime(1000)
      expect(timer.seconds).toBe(1)

      vi.advanceTimersByTime(1000)
      expect(timer.seconds).toBe(2)

      vi.advanceTimersByTime(3000)
      expect(timer.seconds).toBe(5)

      timer.destroy()
    })

    it('não deve criar múltiplos intervals se chamado várias vezes', () => {
      const timer = createTimer()

      timer.start()
      timer.start()
      timer.start()

      vi.advanceTimersByTime(1000)
      expect(timer.seconds).toBe(1) // Não deve ser 3

      timer.destroy()
    })

  })

  describe('pause()', () => {

    it('deve mudar isRunning para false', () => {
      const timer = createTimer()
      timer.start()
      timer.pause()
      expect(timer.isRunning).toBe(false)
      timer.destroy()
    })

    it('deve manter o valor de seconds', () => {
      const timer = createTimer()
      timer.start()

      vi.advanceTimersByTime(5000)
      timer.pause()

      expect(timer.seconds).toBe(5)

      vi.advanceTimersByTime(5000)
      expect(timer.seconds).toBe(5) // Não deve ter mudado

      timer.destroy()
    })

  })

  describe('reset()', () => {

    it('deve zerar seconds', () => {
      const timer = createTimer()
      timer.start()
      vi.advanceTimersByTime(5000)

      timer.reset()

      expect(timer.seconds).toBe(0)
      timer.destroy()
    })

    it('deve parar o timer', () => {
      const timer = createTimer()
      timer.start()
      vi.advanceTimersByTime(5000)

      timer.reset()

      expect(timer.isRunning).toBe(false)
      timer.destroy()
    })

    it('deve parar a contagem', () => {
      const timer = createTimer()
      timer.start()
      vi.advanceTimersByTime(5000)

      timer.reset()
      vi.advanceTimersByTime(5000)

      expect(timer.seconds).toBe(0) // Continua 0
      timer.destroy()
    })

  })

  describe('formatted', () => {

    it('deve formatar segundos corretamente', () => {
      const timer = createTimer()
      timer.start()

      vi.advanceTimersByTime(5000)
      expect(timer.formatted).toBe('00:05')

      vi.advanceTimersByTime(55000) // Total: 60s
      expect(timer.formatted).toBe('01:00')

      timer.destroy()
    })

    it('deve formatar minutos corretamente', () => {
      const timer = createTimer()
      timer.start()

      vi.advanceTimersByTime(90000) // 90 segundos = 1:30
      expect(timer.formatted).toBe('01:30')

      vi.advanceTimersByTime(510000) // +510s = 600s total = 10:00
      expect(timer.formatted).toBe('10:00')

      timer.destroy()
    })

    it('deve usar zero à esquerda', () => {
      const timer = createTimer()
      timer.start()

      vi.advanceTimersByTime(65000) // 1:05
      expect(timer.formatted).toBe('01:05')

      timer.destroy()
    })

  })

  describe('destroy()', () => {

    it('deve limpar o interval', () => {
      const timer = createTimer()
      timer.start()
      vi.advanceTimersByTime(3000)

      timer.destroy()
      vi.advanceTimersByTime(5000)

      expect(timer.seconds).toBe(3) // Parou em 3
    })

  })

  describe('🏆 Fluxo Completo', () => {

    it('deve funcionar em um cenário real', () => {
      const timer = createTimer()

      // Inicia
      timer.start()
      vi.advanceTimersByTime(5000)
      expect(timer.formatted).toBe('00:05')

      // Pausa
      timer.pause()
      vi.advanceTimersByTime(3000)
      expect(timer.formatted).toBe('00:05')

      // Continua
      timer.start()
      vi.advanceTimersByTime(55000)
      expect(timer.formatted).toBe('01:00')

      // Reset
      timer.reset()
      expect(timer.formatted).toBe('00:00')
      expect(timer.isRunning).toBe(false)

      // Cleanup
      timer.destroy()
    })

  })

})
