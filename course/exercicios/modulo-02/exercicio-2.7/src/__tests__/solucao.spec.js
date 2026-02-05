/**
 * Testes do Exercício 2.7 - Ecossistema e Mercado
 */

import { describe, it, expect } from 'vitest'
import { analisarBibliotecas, calcularCompatibilidade, gerarAnaliseEcossistema } from '../solucao.js'

describe('Exercício 2.7 - Ecossistema e Mercado', () => {

  describe('analisarBibliotecas()', () => {

    describe('Projeto Svelte', () => {

      it('deve identificar bibliotecas Svelte', () => {
        const pkg = {
          dependencies: {
            'svelte': '^4.0.0',
            '@sveltejs/kit': '^2.0.0'
          }
        }
        const result = analisarBibliotecas(pkg)
        expect(result.svelte).toContain('svelte')
        expect(result.svelte).toContain('@sveltejs/kit')
      })

    })

    describe('Projeto React', () => {

      it('deve identificar bibliotecas React', () => {
        const pkg = {
          dependencies: {
            'react': '^18.0.0',
            'react-dom': '^18.0.0',
            '@tanstack/react-query': '^5.0.0'
          }
        }
        const result = analisarBibliotecas(pkg)
        expect(result.react).toContain('react')
        expect(result.react).toContain('react-dom')
        expect(result.react).toContain('@tanstack/react-query')
      })

    })

    describe('Bibliotecas Neutras', () => {

      it('deve identificar bibliotecas neutras', () => {
        const pkg = {
          dependencies: {
            'axios': '^1.0.0',
            'lodash': '^4.0.0',
            'date-fns': '^2.0.0'
          }
        }
        const result = analisarBibliotecas(pkg)
        expect(result.neutro).toContain('axios')
        expect(result.neutro).toContain('lodash')
      })

    })

    describe('Projeto Misto', () => {

      it('deve classificar corretamente projeto misto', () => {
        const pkg = {
          dependencies: {
            'svelte': '^4.0.0',
            'axios': '^1.0.0'
          },
          devDependencies: {
            '@sveltejs/kit': '^2.0.0',
            'tailwindcss': '^3.0.0'
          }
        }
        const result = analisarBibliotecas(pkg)
        expect(result.svelte.length).toBe(2)
        expect(result.neutro.length).toBe(2)
        expect(result.react.length).toBe(0)
      })

    })

  })

  describe('calcularCompatibilidade()', () => {

    describe('Bibliotecas Neutras', () => {

      it('axios deve ser compatível com todos', () => {
        const result = calcularCompatibilidade('axios', ['svelte', 'react', 'vue'])
        expect(result.compativel).toEqual(['svelte', 'react', 'vue'])
        expect(result.incompativel).toEqual([])
      })

      it('lodash deve ser compatível com todos', () => {
        const result = calcularCompatibilidade('lodash', ['svelte', 'react'])
        expect(result.compativel.length).toBe(2)
      })

    })

    describe('Bibliotecas Específicas', () => {

      it('react-router deve ser incompatível com Svelte', () => {
        const result = calcularCompatibilidade('react-router', ['svelte', 'react'])
        expect(result.compativel).toContain('react')
        expect(result.incompativel).toContain('svelte')
      })

      it('svelte-routing deve ser incompatível com React', () => {
        const result = calcularCompatibilidade('svelte-routing', ['svelte', 'react'])
        expect(result.compativel).toContain('svelte')
        expect(result.incompativel).toContain('react')
      })

      it('@tanstack/react-query deve ser só React', () => {
        const result = calcularCompatibilidade('@tanstack/react-query', ['svelte', 'react'])
        expect(result.compativel).toEqual(['react'])
      })

    })

  })

  describe('gerarAnaliseEcossistema()', () => {

    describe('Estrutura do Resultado', () => {

      it('deve retornar objeto com todas as propriedades', () => {
        const projeto = {
          nome: 'test-app',
          packageJson: { dependencies: { svelte: '^4.0' } }
        }
        const result = gerarAnaliseEcossistema(projeto)

        expect(result).toHaveProperty('frameworkPrincipal')
        expect(result).toHaveProperty('bibliotecas')
        expect(result).toHaveProperty('maturidade')
        expect(result).toHaveProperty('alternativas')
        expect(result).toHaveProperty('recomendacoes')
      })

    })

    describe('Detecção de Framework', () => {

      it('deve detectar Svelte como principal', () => {
        const projeto = {
          nome: 'svelte-app',
          packageJson: {
            dependencies: { svelte: '^4.0', '@sveltejs/kit': '^2.0' }
          }
        }
        const result = gerarAnaliseEcossistema(projeto)
        expect(result.frameworkPrincipal).toBe('svelte')
      })

      it('deve detectar React como principal', () => {
        const projeto = {
          nome: 'react-app',
          packageJson: {
            dependencies: { react: '^18.0', 'react-dom': '^18.0', next: '^14.0' }
          }
        }
        const result = gerarAnaliseEcossistema(projeto)
        expect(result.frameworkPrincipal).toBe('react')
      })

    })

    describe('Análise de Maturidade', () => {

      it('deve classificar como alta com bibliotecas estabelecidas', () => {
        const projeto = {
          nome: 'mature-app',
          packageJson: {
            dependencies: {
              react: '^18.0',
              '@tanstack/react-query': '^5.0',
              axios: '^1.0',
              zod: '^3.0'
            }
          }
        }
        const result = gerarAnaliseEcossistema(projeto)
        expect(result.maturidade).toBe('alta')
      })

    })

    describe('Recomendações', () => {

      it('deve incluir recomendações relevantes', () => {
        const projeto = {
          nome: 'new-app',
          packageJson: { dependencies: { svelte: '^4.0' } }
        }
        const result = gerarAnaliseEcossistema(projeto)
        expect(result.recomendacoes.length).toBeGreaterThan(0)
      })

    })

  })

  describe('🏆 Integração', () => {

    it('deve analisar projeto real completo', () => {
      const projetoReal = {
        nome: 'ecommerce-svelte',
        packageJson: {
          dependencies: {
            'svelte': '^4.2.0',
            '@sveltejs/kit': '^2.0.0',
            'axios': '^1.6.0',
            'zod': '^3.22.0',
            'date-fns': '^3.0.0'
          },
          devDependencies: {
            '@sveltejs/adapter-auto': '^3.0.0',
            'tailwindcss': '^3.4.0',
            'vitest': '^1.0.0'
          }
        }
      }

      const analise = gerarAnaliseEcossistema(projetoReal)

      expect(analise.frameworkPrincipal).toBe('svelte')
      expect(analise.bibliotecas.svelte.length).toBeGreaterThan(0)
      expect(analise.bibliotecas.neutro.length).toBeGreaterThan(0)
      expect(analise.maturidade).toBeTruthy()

      // Verificar compatibilidade de uma biblioteca
      const compat = calcularCompatibilidade('axios', ['svelte', 'react'])
      expect(compat.compativel).toContain('svelte')
    })

  })

})
