import { describe, it, expect } from 'vitest'
import {
  criarEstadoReativo,
  criarEstadoReativoObjeto,
  criarEstadoReativoArray
} from '../solucao.js'

describe('criarEstadoReativo', () => {
  it('deve inicializar com o valor inicial', () => {
    const estado = criarEstadoReativo(0)
    expect(estado.valor).toBe(0)
  })

  it('deve atualizar o valor', () => {
    const estado = criarEstadoReativo(10)
    estado.valor = 20
    expect(estado.valor).toBe(20)
  })

  it('deve manter histórico de mudanças', () => {
    const estado = criarEstadoReativo('a')
    estado.valor = 'b'
    estado.valor = 'c'
    expect(estado.historico).toEqual(['a', 'b', 'c'])
  })

  it('deve funcionar com diferentes tipos', () => {
    const bool = criarEstadoReativo(true)
    bool.valor = false
    expect(bool.historico).toEqual([true, false])

    const num = criarEstadoReativo(42)
    num.valor = 100
    expect(num.historico).toEqual([42, 100])
  })
})

describe('criarEstadoReativoObjeto', () => {
  it('deve inicializar com o objeto', () => {
    const estado = criarEstadoReativoObjeto({ name: 'Ana' })
    expect(estado.valor.name).toBe('Ana')
  })

  it('deve detectar mudanças em propriedades', () => {
    const estado = criarEstadoReativoObjeto({ name: 'Ana', age: 25 })
    estado.valor.name = 'Bruno'
    expect(estado.valor.name).toBe('Bruno')
  })

  it('deve registrar histórico de mudanças', () => {
    const estado = criarEstadoReativoObjeto({ count: 0 })
    estado.valor.count = 1
    estado.valor.count = 2

    expect(estado.historico.length).toBe(3)
    expect(estado.historico[0].count).toBe(0)
    expect(estado.historico[1].count).toBe(1)
    expect(estado.historico[2].count).toBe(2)
  })

  it('deve criar snapshots independentes', () => {
    const estado = criarEstadoReativoObjeto({ value: 'initial' })
    estado.valor.value = 'changed'

    // Modificar histórico não deve afetar outros snapshots
    expect(estado.historico[0].value).toBe('initial')
    expect(estado.historico[1].value).toBe('changed')
  })
})

describe('criarEstadoReativoArray', () => {
  it('deve inicializar com o array', () => {
    const estado = criarEstadoReativoArray([1, 2, 3])
    expect(estado.valor).toEqual([1, 2, 3])
  })

  it('deve detectar push', () => {
    const estado = criarEstadoReativoArray([1, 2])
    estado.valor.push(3)
    expect(estado.valor).toEqual([1, 2, 3])
    expect(estado.historico.length).toBe(2)
  })

  it('deve detectar pop', () => {
    const estado = criarEstadoReativoArray([1, 2, 3])
    estado.valor.pop()
    expect(estado.valor).toEqual([1, 2])
    expect(estado.historico.length).toBe(2)
  })

  it('deve detectar splice', () => {
    const estado = criarEstadoReativoArray(['a', 'b', 'c'])
    estado.valor.splice(1, 1, 'x', 'y')
    expect(estado.valor).toEqual(['a', 'x', 'y', 'c'])
  })

  it('deve manter histórico completo', () => {
    const estado = criarEstadoReativoArray([])
    estado.valor.push(1)
    estado.valor.push(2)
    estado.valor.pop()

    expect(estado.historico).toEqual([
      [],
      [1],
      [1, 2],
      [1]
    ])
  })
})
