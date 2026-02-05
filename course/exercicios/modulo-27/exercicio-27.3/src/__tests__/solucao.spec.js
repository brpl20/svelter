import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  criarSistemaEfeitos,
  criarDebounceEffect,
  criarEffectComDependencias
} from '../solucao.js'

describe('criarSistemaEfeitos', () => {
  it('deve registrar e executar efeitos', () => {
    const sistema = criarSistemaEfeitos()
    const fn = vi.fn()

    sistema.registrarEfeito(fn)
    sistema.executarEfeitos()

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('deve executar cleanup antes de re-executar', () => {
    const sistema = criarSistemaEfeitos()
    const ordem = []

    sistema.registrarEfeito(() => {
      ordem.push('efeito')
      return () => ordem.push('cleanup')
    })

    sistema.executarEfeitos()
    sistema.executarEfeitos()

    expect(ordem).toEqual(['efeito', 'cleanup', 'efeito'])
  })

  it('deve executar cleanup quando efeito é removido', () => {
    const sistema = criarSistemaEfeitos()
    const cleanup = vi.fn()

    const parar = sistema.registrarEfeito(() => cleanup)
    sistema.executarEfeitos()

    expect(cleanup).not.toHaveBeenCalled()

    parar()

    expect(cleanup).toHaveBeenCalledTimes(1)
  })

  it('deve executar cleanup de todos quando destruído', () => {
    const sistema = criarSistemaEfeitos()
    const cleanups = [vi.fn(), vi.fn(), vi.fn()]

    cleanups.forEach((cleanup, i) => {
      sistema.registrarEfeito(() => cleanup)
    })

    sistema.executarEfeitos()
    sistema.destruir()

    cleanups.forEach(cleanup => {
      expect(cleanup).toHaveBeenCalledTimes(1)
    })
  })

  it('deve suportar múltiplos efeitos', () => {
    const sistema = criarSistemaEfeitos()
    const fns = [vi.fn(), vi.fn(), vi.fn()]

    fns.forEach(fn => sistema.registrarEfeito(fn))
    sistema.executarEfeitos()

    fns.forEach(fn => {
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })
})

describe('criarDebounceEffect', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('deve executar após delay', () => {
    const callback = vi.fn()
    const { trigger } = criarDebounceEffect(callback, 300)

    trigger()
    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('deve resetar timer em triggers consecutivos', () => {
    const callback = vi.fn()
    const { trigger } = criarDebounceEffect(callback, 300)

    trigger()
    vi.advanceTimersByTime(200)
    trigger()
    vi.advanceTimersByTime(200)
    trigger()
    vi.advanceTimersByTime(299)

    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('deve cancelar execução pendente', () => {
    const callback = vi.fn()
    const { trigger, cancel } = criarDebounceEffect(callback, 300)

    trigger()
    vi.advanceTimersByTime(100)
    cancel()
    vi.advanceTimersByTime(300)

    expect(callback).not.toHaveBeenCalled()
  })

  it('deve indicar se há execução pendente', () => {
    const callback = vi.fn()
    const { trigger, cancel, pending } = criarDebounceEffect(callback, 300)

    expect(pending()).toBe(false)

    trigger()
    expect(pending()).toBe(true)

    cancel()
    expect(pending()).toBe(false)

    trigger()
    vi.advanceTimersByTime(300)
    expect(pending()).toBe(false)
  })
})

describe('criarEffectComDependencias', () => {
  it('deve executar na primeira verificação', () => {
    const callback = vi.fn()
    const effect = criarEffectComDependencias(
      () => [1, 2, 3],
      callback
    )

    effect.verificarEExecutar()

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith([1, 2, 3])
  })

  it('não deve executar se deps não mudaram', () => {
    let valor = 10
    const callback = vi.fn()
    const effect = criarEffectComDependencias(
      () => [valor],
      callback
    )

    effect.verificarEExecutar()
    effect.verificarEExecutar()
    effect.verificarEExecutar()

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('deve executar quando deps mudam', () => {
    let contador = 0
    const callback = vi.fn()
    const effect = criarEffectComDependencias(
      () => [contador],
      callback
    )

    effect.verificarEExecutar()
    expect(callback).toHaveBeenCalledTimes(1)

    contador = 1
    effect.verificarEExecutar()
    expect(callback).toHaveBeenCalledTimes(2)

    contador = 2
    effect.verificarEExecutar()
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('deve detectar mudanças em múltiplas deps', () => {
    let a = 1, b = 2
    const callback = vi.fn()
    const effect = criarEffectComDependencias(
      () => [a, b],
      callback
    )

    effect.verificarEExecutar()
    expect(callback).toHaveBeenCalledTimes(1)

    a = 10  // só a mudou
    effect.verificarEExecutar()
    expect(callback).toHaveBeenCalledTimes(2)

    b = 20  // só b mudou
    effect.verificarEExecutar()
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('deve retornar últimas deps conhecidas', () => {
    let x = 5
    const effect = criarEffectComDependencias(
      () => [x],
      () => {}
    )

    expect(effect.getUltimasDeps()).toBeUndefined()

    effect.verificarEExecutar()
    expect(effect.getUltimasDeps()).toEqual([5])

    x = 10
    effect.verificarEExecutar()
    expect(effect.getUltimasDeps()).toEqual([10])
  })
})
