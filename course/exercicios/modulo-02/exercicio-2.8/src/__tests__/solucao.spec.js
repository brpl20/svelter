/**
 * Testes do Exercício 2.8 - SvelteKit vs Next.js
 */

import { describe, it, expect } from 'vitest'
import {
  converterRotaNextParaSvelteKit,
  converterRotaSvelteKitParaNext,
  converterDataFetching,
  analisarEstruturaProjeto
} from '../solucao.js'

describe('Exercício 2.8 - SvelteKit vs Next.js', () => {

  describe('converterRotaNextParaSvelteKit()', () => {

    describe('Páginas Básicas', () => {

      it('deve converter index', () => {
        const result = converterRotaNextParaSvelteKit('pages/index.tsx')
        expect(result).toBe('src/routes/+page.svelte')
      })

      it('deve converter página simples', () => {
        const result = converterRotaNextParaSvelteKit('pages/about.tsx')
        expect(result).toBe('src/routes/about/+page.svelte')
      })

      it('deve converter página aninhada', () => {
        const result = converterRotaNextParaSvelteKit('pages/blog/posts.tsx')
        expect(result).toBe('src/routes/blog/posts/+page.svelte')
      })

    })

    describe('Rotas Dinâmicas', () => {

      it('deve converter [param]', () => {
        const result = converterRotaNextParaSvelteKit('pages/blog/[slug].tsx')
        expect(result).toBe('src/routes/blog/[slug]/+page.svelte')
      })

      it('deve converter [...slug] (catch-all)', () => {
        const result = converterRotaNextParaSvelteKit('pages/docs/[...slug].tsx')
        expect(result).toBe('src/routes/docs/[...slug]/+page.svelte')
      })

      it('deve converter múltiplos params', () => {
        const result = converterRotaNextParaSvelteKit('pages/[category]/[id].tsx')
        expect(result).toBe('src/routes/[category]/[id]/+page.svelte')
      })

    })

    describe('API Routes', () => {

      it('deve converter API route simples', () => {
        const result = converterRotaNextParaSvelteKit('pages/api/users.ts')
        expect(result).toBe('src/routes/api/users/+server.js')
      })

      it('deve converter API route dinâmica', () => {
        const result = converterRotaNextParaSvelteKit('pages/api/users/[id].ts')
        expect(result).toBe('src/routes/api/users/[id]/+server.js')
      })

    })

    describe('Arquivos Especiais', () => {

      it('deve converter _app', () => {
        const result = converterRotaNextParaSvelteKit('pages/_app.tsx')
        expect(result).toBe('src/routes/+layout.svelte')
      })

      it('deve converter _error', () => {
        const result = converterRotaNextParaSvelteKit('pages/_error.tsx')
        expect(result).toBe('src/routes/+error.svelte')
      })

    })

  })

  describe('converterRotaSvelteKitParaNext()', () => {

    it('deve converter +page.svelte para index', () => {
      const result = converterRotaSvelteKitParaNext('src/routes/+page.svelte')
      expect(result).toBe('pages/index.tsx')
    })

    it('deve converter rota aninhada', () => {
      const result = converterRotaSvelteKitParaNext('src/routes/blog/[slug]/+page.svelte')
      expect(result).toBe('pages/blog/[slug].tsx')
    })

    it('deve converter +server.js para API', () => {
      const result = converterRotaSvelteKitParaNext('src/routes/api/users/+server.js')
      expect(result).toBe('pages/api/users.ts')
    })

    it('deve converter +layout.svelte para _app', () => {
      const result = converterRotaSvelteKitParaNext('src/routes/+layout.svelte')
      expect(result).toBe('pages/_app.tsx')
    })

  })

  describe('converterDataFetching()', () => {

    describe('Next.js → SvelteKit', () => {

      it('deve converter getServerSideProps básico', () => {
        const next = `
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  return { props: { data } }
}
        `.trim()

        const result = converterDataFetching(next, 'next', 'sveltekit')

        expect(result).toContain('export async function load')
        expect(result).toContain('fetch')
        expect(result).toContain('return')
      })

      it('deve converter getStaticProps', () => {
        const next = `
export async function getStaticProps() {
  return { props: { title: 'Hello' } }
}
        `.trim()

        const result = converterDataFetching(next, 'next', 'sveltekit')

        expect(result).toContain('load')
      })

    })

    describe('SvelteKit → Next.js', () => {

      it('deve converter load function', () => {
        const sveltekit = `
export async function load({ fetch }) {
  const res = await fetch('/api/data')
  return { data: await res.json() }
}
        `.trim()

        const result = converterDataFetching(sveltekit, 'sveltekit', 'next')

        expect(result).toContain('getServerSideProps')
        expect(result).toContain('props')
      })

    })

  })

  describe('analisarEstruturaProjeto()', () => {

    describe('Detectar SvelteKit', () => {

      it('deve detectar projeto SvelteKit', () => {
        const arquivos = [
          'src/routes/+page.svelte',
          'src/routes/+layout.svelte',
          'src/routes/api/users/+server.js',
          'svelte.config.js',
          'vite.config.js'
        ]

        const result = analisarEstruturaProjeto(arquivos)

        expect(result.framework).toBe('sveltekit')
        expect(result.confianca).toBe('alta')
      })

      it('deve contar estrutura corretamente', () => {
        const arquivos = [
          'src/routes/+page.svelte',
          'src/routes/about/+page.svelte',
          'src/routes/+layout.svelte',
          'src/routes/api/+server.js'
        ]

        const result = analisarEstruturaProjeto(arquivos)

        expect(result.estrutura.paginas).toBe(2)
        expect(result.estrutura.layouts).toBe(1)
        expect(result.estrutura.apiRoutes).toBe(1)
      })

    })

    describe('Detectar Next.js', () => {

      it('deve detectar projeto Next.js (pages)', () => {
        const arquivos = [
          'pages/index.tsx',
          'pages/_app.tsx',
          'pages/api/users.ts',
          'next.config.js'
        ]

        const result = analisarEstruturaProjeto(arquivos)

        expect(result.framework).toBe('nextjs')
        expect(result.confianca).toBe('alta')
      })

      it('deve detectar projeto Next.js (app router)', () => {
        const arquivos = [
          'app/page.tsx',
          'app/layout.tsx',
          'app/api/users/route.ts',
          'next.config.js'
        ]

        const result = analisarEstruturaProjeto(arquivos)

        expect(result.framework).toBe('nextjs')
      })

    })

    describe('Casos Ambíguos', () => {

      it('deve ter confiança baixa sem indicadores claros', () => {
        const arquivos = [
          'src/index.js',
          'package.json'
        ]

        const result = analisarEstruturaProjeto(arquivos)

        expect(result.confianca).toBe('baixa')
      })

    })

  })

  describe('🏆 Integração', () => {

    it('deve converter projeto Next.js completo para SvelteKit', () => {
      const arquivosNext = [
        'pages/index.tsx',
        'pages/blog/[slug].tsx',
        'pages/api/posts.ts',
        'pages/_app.tsx'
      ]

      // Analisar estrutura original
      const analiseOriginal = analisarEstruturaProjeto(arquivosNext)
      expect(analiseOriginal.framework).toBe('nextjs')

      // Converter cada arquivo
      const arquivosSvelteKit = arquivosNext.map(converterRotaNextParaSvelteKit)

      // Analisar estrutura convertida
      const analiseConvertida = analisarEstruturaProjeto(arquivosSvelteKit)
      expect(analiseConvertida.framework).toBe('sveltekit')

      // Verificar correspondências
      expect(arquivosSvelteKit).toContain('src/routes/+page.svelte')
      expect(arquivosSvelteKit).toContain('src/routes/blog/[slug]/+page.svelte')
      expect(arquivosSvelteKit).toContain('src/routes/api/posts/+server.js')
      expect(arquivosSvelteKit).toContain('src/routes/+layout.svelte')
    })

  })

})
