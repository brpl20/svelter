/**
 * Testes do Exercício 2.6 - Performance e Bundle Size
 */

import { describe, it, expect } from 'vitest'
import { calcularTamanhoBundle, estimarRenderizacoes, gerarRelatorioPerformance } from '../solucao.js'

describe('Exercício 2.6 - Performance e Bundle Size', () => {

  describe('calcularTamanhoBundle()', () => {

    const componentesSimples = [
      { nome: 'App', linhas: 100 }
    ]

    const componentesMultiplos = [
      { nome: 'App', linhas: 100 },
      { nome: 'Header', linhas: 50 },
      { nome: 'Footer', linhas: 30 }
    ]

    describe('Svelte', () => {

      it('deve calcular tamanho sem runtime', () => {
        const result = calcularTamanhoBundle(componentesSimples, 'svelte')
        expect(result.runtime).toBe(0)
      })

      it('deve calcular ~30 bytes por linha', () => {
        const result = calcularTamanhoBundle(componentesSimples, 'svelte')
        expect(result.componentes).toBe(3000) // 100 * 30
        expect(result.total).toBe(3000)
      })

      it('deve somar múltiplos componentes', () => {
        const result = calcularTamanhoBundle(componentesMultiplos, 'svelte')
        expect(result.componentes).toBe(5400) // (100+50+30) * 30
      })

    })

    describe('React', () => {

      it('deve incluir runtime de 42KB', () => {
        const result = calcularTamanhoBundle(componentesSimples, 'react')
        expect(result.runtime).toBe(42000)
      })

      it('deve calcular ~40 bytes por linha', () => {
        const result = calcularTamanhoBundle(componentesSimples, 'react')
        expect(result.componentes).toBe(4000) // 100 * 40
      })

      it('deve somar runtime + componentes', () => {
        const result = calcularTamanhoBundle(componentesSimples, 'react')
        expect(result.total).toBe(46000) // 42000 + 4000
      })

    })

    describe('Comparação', () => {

      it('Svelte deve ser menor que React', () => {
        const svelte = calcularTamanhoBundle(componentesMultiplos, 'svelte')
        const react = calcularTamanhoBundle(componentesMultiplos, 'react')
        expect(svelte.total).toBeLessThan(react.total)
      })

      it('diferença deve diminuir com mais código', () => {
        const pequeno = [{ nome: 'App', linhas: 10 }]
        const grande = [{ nome: 'App', linhas: 1000 }]

        const sveltePequeno = calcularTamanhoBundle(pequeno, 'svelte')
        const reactPequeno = calcularTamanhoBundle(pequeno, 'react')
        const ratioPequeno = sveltePequeno.total / reactPequeno.total

        const svelteGrande = calcularTamanhoBundle(grande, 'svelte')
        const reactGrande = calcularTamanhoBundle(grande, 'react')
        const ratioGrande = svelteGrande.total / reactGrande.total

        expect(ratioGrande).toBeGreaterThan(ratioPequeno)
      })

    })

  })

  describe('estimarRenderizacoes()', () => {

    describe('Svelte', () => {

      it('deve contar elementos afetados', () => {
        const operacoes = [
          { tipo: 'atribuicao', elementos: 2 },
          { tipo: 'atribuicao', elementos: 3 }
        ]
        const result = estimarRenderizacoes(operacoes, 'svelte')
        expect(result.total).toBe(5)
      })

      it('deve retornar contagem por operação', () => {
        const operacoes = [
          { tipo: 'atribuicao', elementos: 1 },
          { tipo: 'atribuicao', elementos: 4 }
        ]
        const result = estimarRenderizacoes(operacoes, 'svelte')
        expect(result.porOperacao).toEqual([1, 4])
      })

    })

    describe('React', () => {

      it('deve contar componentes re-renderizados', () => {
        const operacoes = [
          { tipo: 'setState', componentes: 5 },
          { tipo: 'setState', componentes: 3 }
        ]
        const result = estimarRenderizacoes(operacoes, 'react')
        expect(result.total).toBe(8)
      })

      it('deve retornar contagem por operação', () => {
        const operacoes = [
          { tipo: 'setState', componentes: 10 },
          { tipo: 'setState', componentes: 2 }
        ]
        const result = estimarRenderizacoes(operacoes, 'react')
        expect(result.porOperacao).toEqual([10, 2])
      })

    })

    describe('Comparação', () => {

      it('React deve ter mais re-renders que Svelte tipicamente', () => {
        // Mesma atualização de estado
        const svelteOps = [{ tipo: 'atribuicao', elementos: 1 }]
        const reactOps = [{ tipo: 'setState', componentes: 5 }]

        const svelte = estimarRenderizacoes(svelteOps, 'svelte')
        const react = estimarRenderizacoes(reactOps, 'react')

        expect(svelte.total).toBeLessThan(react.total)
      })

    })

  })

  describe('gerarRelatorioPerformance()', () => {

    const metricas = {
      svelte: { bundle: 5000, renders: 10 },
      react: { bundle: 50000, renders: 50 }
    }

    it('deve incluir comparação de bundle', () => {
      const report = gerarRelatorioPerformance(metricas)
      expect(report.toLowerCase()).toContain('bundle')
      expect(report).toContain('5')
      expect(report).toContain('50')
    })

    it('deve incluir unidade KB', () => {
      const report = gerarRelatorioPerformance(metricas)
      expect(report.toLowerCase()).toMatch(/kb|kilobyte/)
    })

    it('deve incluir comparação de renders', () => {
      const report = gerarRelatorioPerformance(metricas)
      expect(report.toLowerCase()).toMatch(/render|atualiza/)
    })

    it('deve incluir diferença percentual', () => {
      const report = gerarRelatorioPerformance(metricas)
      expect(report).toMatch(/%/)
    })

    it('deve incluir recomendação', () => {
      const report = gerarRelatorioPerformance(metricas)
      expect(report.toLowerCase()).toMatch(/recomenda|melhor|vantagem/)
    })

  })

  describe('🏆 Integração', () => {

    it('deve analisar app completo e gerar relatório', () => {
      // App típico
      const componentes = [
        { nome: 'App', linhas: 50 },
        { nome: 'Header', linhas: 30 },
        { nome: 'Sidebar', linhas: 80 },
        { nome: 'Content', linhas: 100 },
        { nome: 'Footer', linhas: 20 }
      ]

      // Calcular bundles
      const bundleSvelte = calcularTamanhoBundle(componentes, 'svelte')
      const bundleReact = calcularTamanhoBundle(componentes, 'react')

      // Operações típicas de uma sessão
      const opsSvelte = [
        { tipo: 'atribuicao', elementos: 2 },
        { tipo: 'atribuicao', elementos: 1 },
        { tipo: 'atribuicao', elementos: 3 }
      ]
      const opsReact = [
        { tipo: 'setState', componentes: 5 },
        { tipo: 'setState', componentes: 3 },
        { tipo: 'setState', componentes: 8 }
      ]

      const rendersSvelte = estimarRenderizacoes(opsSvelte, 'svelte')
      const rendersReact = estimarRenderizacoes(opsReact, 'react')

      // Gerar relatório
      const relatorio = gerarRelatorioPerformance({
        svelte: { bundle: bundleSvelte.total, renders: rendersSvelte.total },
        react: { bundle: bundleReact.total, renders: rendersReact.total }
      })

      // Validações
      expect(bundleSvelte.total).toBeLessThan(bundleReact.total)
      expect(rendersSvelte.total).toBeLessThan(rendersReact.total)
      expect(relatorio.length).toBeGreaterThan(100)
    })

  })

})
