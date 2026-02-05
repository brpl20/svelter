/**
 * Testes do Exercício 2.1 - Compilador vs Runtime
 */

import { describe, it, expect } from 'vitest'
import { simularCompilacao, simularRuntime, compararAbordagens } from '../solucao.js'

describe('Exercício 2.1 - Compilador vs Runtime', () => {

  const componenteSimples = {
    nome: 'Counter',
    estado: { count: 0 },
    template: '<button>{count}</button>'
  }

  const componenteComplexo = {
    nome: 'Dashboard',
    estado: { user: null, items: [], loading: true },
    template: '<div>{loading ? "..." : items.map(i => i.name)}</div>'
  }

  describe('simularCompilacao()', () => {

    describe('Código Gerado', () => {

      it('deve gerar código não vazio', () => {
        const result = simularCompilacao(componenteSimples)
        expect(result.codigo).toBeTruthy()
        expect(result.codigo.length).toBeGreaterThan(0)
      })

      it('deve incluir nome do componente no código', () => {
        const result = simularCompilacao(componenteSimples)
        expect(result.codigo).toContain('Counter')
      })

      it('deve incluir variáveis de estado', () => {
        const result = simularCompilacao(componenteSimples)
        expect(result.codigo).toContain('count')
      })

    })

    describe('Tamanho', () => {

      it('deve calcular tamanho do código', () => {
        const result = simularCompilacao(componenteSimples)
        expect(typeof result.tamanho).toBe('number')
        expect(result.tamanho).toBeGreaterThan(0)
      })

      it('componente complexo deve ter tamanho maior', () => {
        const simples = simularCompilacao(componenteSimples)
        const complexo = simularCompilacao(componenteComplexo)
        expect(complexo.tamanho).toBeGreaterThan(simples.tamanho)
      })

    })

    describe('Dependências', () => {

      it('não deve ter dependências de runtime', () => {
        const result = simularCompilacao(componenteSimples)
        expect(result.dependencias).toEqual([])
      })

      it('não deve incluir react nas dependências', () => {
        const result = simularCompilacao(componenteComplexo)
        expect(result.dependencias).not.toContain('react')
      })

    })

  })

  describe('simularRuntime()', () => {

    describe('Código Gerado', () => {

      it('deve gerar código não vazio', () => {
        const result = simularRuntime(componenteSimples)
        expect(result.codigo).toBeTruthy()
      })

      it('deve incluir useState no código', () => {
        const result = simularRuntime(componenteSimples)
        expect(result.codigo).toContain('useState')
      })

      it('deve incluir nome do componente', () => {
        const result = simularRuntime(componenteSimples)
        expect(result.codigo).toContain('Counter')
      })

    })

    describe('Tamanho', () => {

      it('deve ser maior que versão compilada', () => {
        const compilado = simularCompilacao(componenteSimples)
        const runtime = simularRuntime(componenteSimples)
        expect(runtime.tamanho).toBeGreaterThan(compilado.tamanho)
      })

    })

    describe('Dependências', () => {

      it('deve incluir react', () => {
        const result = simularRuntime(componenteSimples)
        expect(result.dependencias).toContain('react')
      })

      it('deve incluir react-dom', () => {
        const result = simularRuntime(componenteSimples)
        expect(result.dependencias).toContain('react-dom')
      })

    })

  })

  describe('compararAbordagens()', () => {

    describe('Estrutura do Resultado', () => {

      it('deve retornar objeto com todas as propriedades', () => {
        const result = compararAbordagens(componenteSimples)

        expect(result).toHaveProperty('compilado')
        expect(result).toHaveProperty('runtime')
        expect(result).toHaveProperty('diferencaTamanho')
        expect(result).toHaveProperty('vantagens')
        expect(result).toHaveProperty('recomendacao')
      })

      it('deve ter vantagens para ambas abordagens', () => {
        const result = compararAbordagens(componenteSimples)

        expect(result.vantagens.compilador.length).toBeGreaterThan(0)
        expect(result.vantagens.runtime.length).toBeGreaterThan(0)
      })

    })

    describe('Diferença de Tamanho', () => {

      it('deve calcular diferença corretamente', () => {
        const result = compararAbordagens(componenteSimples)
        const diferencaEsperada = result.runtime.tamanho - result.compilado.tamanho
        expect(result.diferencaTamanho).toBe(diferencaEsperada)
      })

      it('diferença deve ser positiva (runtime maior)', () => {
        const result = compararAbordagens(componenteSimples)
        expect(result.diferencaTamanho).toBeGreaterThan(0)
      })

    })

    describe('Vantagens Listadas', () => {

      it('compilador deve mencionar bundle menor', () => {
        const result = compararAbordagens(componenteSimples)
        const vantagens = result.vantagens.compilador.join(' ').toLowerCase()
        expect(vantagens).toMatch(/menor|bundle|tamanho/)
      })

      it('runtime deve mencionar ecossistema', () => {
        const result = compararAbordagens(componenteSimples)
        const vantagens = result.vantagens.runtime.join(' ').toLowerCase()
        expect(vantagens).toMatch(/ecossistema|comunidade|maior/)
      })

    })

    describe('Recomendação', () => {

      it('deve retornar recomendação válida', () => {
        const result = compararAbordagens(componenteSimples)
        expect(['compilador', 'runtime', 'depende do caso']).toContain(result.recomendacao)
      })

      it('deve recomendar compilador para componentes simples', () => {
        const result = compararAbordagens(componenteSimples)
        expect(result.recomendacao).toBe('compilador')
      })

    })

  })

  describe('🏆 Integração', () => {

    it('deve demonstrar vantagem do compilador em app típico', () => {
      const app = {
        nome: 'TodoApp',
        estado: { todos: [], filter: 'all', newTodo: '' },
        template: '<main><input/><ul>{todos}</ul></main>'
      }

      const comparacao = compararAbordagens(app)

      // Compilador deve ser significativamente menor
      const reducaoPercentual = (comparacao.diferencaTamanho / comparacao.runtime.tamanho) * 100
      expect(reducaoPercentual).toBeGreaterThan(10)

      // Compilador não tem dependências
      expect(comparacao.compilado.dependencias).toEqual([])

      // Runtime precisa de React
      expect(comparacao.runtime.dependencias).toContain('react')
    })

  })

})
