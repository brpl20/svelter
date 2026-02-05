import { describe, it, expect } from 'vitest'
import {
  criarDerivado,
  criarDerivadoEncadeado,
  detectarDependencias
} from '../solucao.js'

describe('criarDerivado', () => {
  it('deve calcular valor inicial', () => {
    const derivado = criarDerivado(
      [() => 5],
      ([x]) => x * 2
    )
    expect(derivado.valor).toBe(10)
  })

  it('deve recalcular quando chamado', () => {
    let fonte = 3
    const derivado = criarDerivado(
      [() => fonte],
      ([x]) => x * 10
    )

    expect(derivado.valor).toBe(30)

    fonte = 7
    derivado.recalcular()

    expect(derivado.valor).toBe(70)
  })

  it('deve funcionar com múltiplas fontes', () => {
    let a = 2
    let b = 3
    const derivado = criarDerivado(
      [() => a, () => b],
      ([x, y]) => x + y
    )

    expect(derivado.valor).toBe(5)

    a = 10
    b = 20
    derivado.recalcular()

    expect(derivado.valor).toBe(30)
  })

  it('deve funcionar com objetos', () => {
    const estado = { items: [1, 2, 3] }
    const derivado = criarDerivado(
      [() => estado.items],
      ([items]) => items.reduce((a, b) => a + b, 0)
    )

    expect(derivado.valor).toBe(6)

    estado.items = [10, 20]
    derivado.recalcular()

    expect(derivado.valor).toBe(30)
  })
})

describe('criarDerivadoEncadeado', () => {
  it('deve criar valores base', () => {
    const cadeia = criarDerivadoEncadeado([
      { nome: 'x', valor: 10 },
      { nome: 'y', valor: 20 }
    ])

    expect(cadeia.obter('x')).toBe(10)
    expect(cadeia.obter('y')).toBe(20)
  })

  it('deve criar derivado simples', () => {
    const cadeia = criarDerivadoEncadeado([
      { nome: 'base', valor: 5 },
      { nome: 'dobro', depende: ['base'], calc: (base) => base * 2 }
    ])

    expect(cadeia.obter('dobro')).toBe(10)
  })

  it('deve atualizar derivados quando base muda', () => {
    const cadeia = criarDerivadoEncadeado([
      { nome: 'num', valor: 3 },
      { nome: 'quadrado', depende: ['num'], calc: (num) => num * num }
    ])

    expect(cadeia.obter('quadrado')).toBe(9)

    cadeia.atualizar('num', 5)

    expect(cadeia.obter('quadrado')).toBe(25)
  })

  it('deve propagar mudanças em cadeia', () => {
    const cadeia = criarDerivadoEncadeado([
      { nome: 'a', valor: 1 },
      { nome: 'b', depende: ['a'], calc: (a) => a * 2 },
      { nome: 'c', depende: ['b'], calc: (b) => b + 10 }
    ])

    expect(cadeia.obter('a')).toBe(1)
    expect(cadeia.obter('b')).toBe(2)
    expect(cadeia.obter('c')).toBe(12)

    cadeia.atualizar('a', 5)

    expect(cadeia.obter('b')).toBe(10)
    expect(cadeia.obter('c')).toBe(20)
  })

  it('deve funcionar com múltiplas dependências', () => {
    const cadeia = criarDerivadoEncadeado([
      { nome: 'x', valor: 2 },
      { nome: 'y', valor: 3 },
      { nome: 'soma', depende: ['x', 'y'], calc: (x, y) => x + y }
    ])

    expect(cadeia.obter('soma')).toBe(5)

    cadeia.atualizar('x', 10)
    expect(cadeia.obter('soma')).toBe(13)

    cadeia.atualizar('y', 20)
    expect(cadeia.obter('soma')).toBe(30)
  })
})

describe('detectarDependencias', () => {
  it('deve detectar acesso simples a propriedade', () => {
    const deps = detectarDependencias('(state) => state.count')
    expect(deps).toContain('state.count')
  })

  it('deve detectar acesso aninhado', () => {
    const deps = detectarDependencias('(s) => s.user.profile.name')
    expect(deps).toContain('s.user.profile.name')
  })

  it('deve detectar múltiplas dependências', () => {
    const deps = detectarDependencias('(s) => s.firstName + " " + s.lastName')
    expect(deps).toContain('s.firstName')
    expect(deps).toContain('s.lastName')
  })

  it('deve detectar dependências em expressões complexas', () => {
    const deps = detectarDependencias(
      '(data) => data.items.filter(i => i.active).length'
    )
    expect(deps).toContain('data.items')
  })

  it('deve ignorar métodos de array', () => {
    const deps = detectarDependencias('(s) => s.items.map(x => x * 2)')
    expect(deps).toContain('s.items')
    expect(deps).not.toContain('s.items.map')
  })
})
