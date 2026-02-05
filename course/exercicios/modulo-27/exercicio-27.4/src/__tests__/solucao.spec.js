import { describe, it, expect, vi } from 'vitest'
import {
  criarSistemaProps,
  separarRestProps,
  criarPropBindable,
  validarTiposProps
} from '../solucao.js'

describe('criarSistemaProps', () => {
  it('deve retornar props fornecidas', () => {
    const schema = {
      name: {},
      age: {}
    }
    const props = criarSistemaProps(schema, { name: 'Ana', age: 25 })

    expect(props.name).toBe('Ana')
    expect(props.age).toBe(25)
  })

  it('deve aplicar valores default', () => {
    const schema = {
      name: { default: 'Anônimo' },
      count: { default: 0 },
      active: { default: true }
    }
    const props = criarSistemaProps(schema, {})

    expect(props.name).toBe('Anônimo')
    expect(props.count).toBe(0)
    expect(props.active).toBe(true)
  })

  it('deve preferir valor fornecido sobre default', () => {
    const schema = {
      count: { default: 0 }
    }
    const props = criarSistemaProps(schema, { count: 100 })

    expect(props.count).toBe(100)
  })

  it('deve lançar erro para prop required não fornecida', () => {
    const schema = {
      id: { required: true },
      name: { required: true }
    }

    expect(() => {
      criarSistemaProps(schema, { id: 1 })
    }).toThrow()
  })

  it('deve aceitar prop required quando fornecida', () => {
    const schema = {
      id: { required: true }
    }

    expect(() => {
      criarSistemaProps(schema, { id: 123 })
    }).not.toThrow()
  })

  it('deve funcionar com schema complexo', () => {
    const schema = {
      id: { required: true },
      title: { required: true },
      count: { default: 0 },
      disabled: { default: false },
      items: { default: [] }
    }

    const props = criarSistemaProps(schema, {
      id: 1,
      title: 'Test',
      count: 5
    })

    expect(props).toEqual({
      id: 1,
      title: 'Test',
      count: 5,
      disabled: false,
      items: []
    })
  })
})

describe('separarRestProps', () => {
  it('deve separar props conhecidas', () => {
    const todas = { name: 'Ana', age: 25, class: 'card' }
    const { conhecidas, rest } = separarRestProps(todas, ['name', 'age'])

    expect(conhecidas).toEqual({ name: 'Ana', age: 25 })
    expect(rest).toEqual({ class: 'card' })
  })

  it('deve funcionar com props de eventos', () => {
    const fn = () => {}
    const todas = { name: 'Test', onclick: fn, onmouseenter: fn }
    const { conhecidas, rest } = separarRestProps(todas, ['name'])

    expect(conhecidas).toEqual({ name: 'Test' })
    expect(rest).toEqual({ onclick: fn, onmouseenter: fn })
  })

  it('deve retornar objetos vazios quando apropriado', () => {
    const { conhecidas, rest } = separarRestProps({}, ['name'])
    expect(conhecidas).toEqual({})
    expect(rest).toEqual({})
  })

  it('deve manter todas como rest se nenhuma conhecida', () => {
    const todas = { a: 1, b: 2, c: 3 }
    const { conhecidas, rest } = separarRestProps(todas, [])

    expect(conhecidas).toEqual({})
    expect(rest).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('deve lidar com props inexistentes na lista de conhecidas', () => {
    const todas = { name: 'Ana' }
    const { conhecidas, rest } = separarRestProps(todas, ['name', 'age', 'email'])

    expect(conhecidas).toEqual({ name: 'Ana' })
    expect(rest).toEqual({})
  })
})

describe('criarPropBindable', () => {
  it('deve inicializar com valor inicial', () => {
    const prop = criarPropBindable('teste', () => {})
    expect(prop.valor).toBe('teste')
  })

  it('deve atualizar valor', () => {
    const prop = criarPropBindable(0, () => {})
    prop.valor = 10
    expect(prop.valor).toBe(10)
  })

  it('deve chamar onChange quando valor muda', () => {
    const onChange = vi.fn()
    const prop = criarPropBindable('inicial', onChange)

    prop.valor = 'novo'

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('novo')
  })

  it('deve chamar onChange em cada mudança', () => {
    const onChange = vi.fn()
    const prop = criarPropBindable(0, onChange)

    prop.valor = 1
    prop.valor = 2
    prop.valor = 3

    expect(onChange).toHaveBeenCalledTimes(3)
    expect(onChange).toHaveBeenNthCalledWith(1, 1)
    expect(onChange).toHaveBeenNthCalledWith(2, 2)
    expect(onChange).toHaveBeenNthCalledWith(3, 3)
  })

  it('deve funcionar com objetos', () => {
    const onChange = vi.fn()
    const prop = criarPropBindable({ count: 0 }, onChange)

    const novoValor = { count: 5 }
    prop.valor = novoValor

    expect(prop.valor).toBe(novoValor)
    expect(onChange).toHaveBeenCalledWith(novoValor)
  })
})

describe('validarTiposProps (BONUS)', () => {
  it('deve validar tipos corretos', () => {
    const schema = {
      name: { type: 'string' },
      age: { type: 'number' },
      active: { type: 'boolean' }
    }

    const result = validarTiposProps(schema, {
      name: 'Ana',
      age: 25,
      active: true
    })

    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it('deve detectar tipos incorretos', () => {
    const schema = {
      count: { type: 'number' }
    }

    const result = validarTiposProps(schema, { count: 'não é número' })

    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  it('deve validar arrays', () => {
    const schema = {
      items: { type: 'array' }
    }

    expect(validarTiposProps(schema, { items: [1, 2, 3] }).valid).toBe(true)
    expect(validarTiposProps(schema, { items: 'não array' }).valid).toBe(false)
  })

  it('deve validar objetos', () => {
    const schema = {
      config: { type: 'object' }
    }

    expect(validarTiposProps(schema, { config: { a: 1 } }).valid).toBe(true)
    expect(validarTiposProps(schema, { config: [1, 2] }).valid).toBe(false) // array não é object
  })
})
