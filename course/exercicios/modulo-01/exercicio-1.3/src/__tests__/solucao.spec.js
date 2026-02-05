/**
 * Testes do Exercício 1.3 - Estrutura de Projeto Vite
 */

import { describe, it, expect } from 'vitest'
import { validarEstrutura, classificarArquivo } from '../solucao.js'

describe('Exercício 1.3 - Estrutura de Projeto Vite', () => {

  describe('validarEstrutura()', () => {

    describe('Projeto Válido', () => {

      it('deve validar projeto com todos os arquivos obrigatórios', () => {
        const arquivos = ['package.json', 'vite.config.js', 'index.html']
        const result = validarEstrutura(arquivos)

        expect(result.valido).toBe(true)
        expect(result.faltando).toEqual([])
      })

      it('deve aceitar vite.config.ts como alternativa', () => {
        const arquivos = ['package.json', 'vite.config.ts', 'index.html']
        const result = validarEstrutura(arquivos)

        expect(result.valido).toBe(true)
      })

      it('deve validar projeto com arquivos extras', () => {
        const arquivos = [
          'package.json',
          'vite.config.js',
          'index.html',
          'src/main.js',
          'src/App.svelte',
          'tsconfig.json'
        ]
        const result = validarEstrutura(arquivos)

        expect(result.valido).toBe(true)
      })

    })

    describe('Projeto Inválido', () => {

      it('deve detectar falta de package.json', () => {
        const arquivos = ['vite.config.js', 'index.html']
        const result = validarEstrutura(arquivos)

        expect(result.valido).toBe(false)
        expect(result.faltando).toContain('package.json')
      })

      it('deve detectar falta de vite.config', () => {
        const arquivos = ['package.json', 'index.html']
        const result = validarEstrutura(arquivos)

        expect(result.valido).toBe(false)
        expect(result.faltando).toContain('vite.config.js ou vite.config.ts')
      })

      it('deve detectar falta de index.html', () => {
        const arquivos = ['package.json', 'vite.config.js']
        const result = validarEstrutura(arquivos)

        expect(result.valido).toBe(false)
        expect(result.faltando).toContain('index.html')
      })

      it('deve listar múltiplos arquivos faltando', () => {
        const arquivos = ['src/main.js']
        const result = validarEstrutura(arquivos)

        expect(result.valido).toBe(false)
        expect(result.faltando.length).toBe(3)
      })

    })

  })

  describe('classificarArquivo()', () => {

    describe('Arquivos de Configuração', () => {

      it('deve classificar vite.config.js como config', () => {
        expect(classificarArquivo('vite.config.js')).toBe('config')
      })

      it('deve classificar vite.config.ts como config', () => {
        expect(classificarArquivo('vite.config.ts')).toBe('config')
      })

      it('deve classificar tsconfig.json como config', () => {
        expect(classificarArquivo('tsconfig.json')).toBe('config')
      })

      it('deve classificar package.json como config', () => {
        expect(classificarArquivo('package.json')).toBe('config')
      })

      it('deve classificar .eslintrc.js como config', () => {
        expect(classificarArquivo('.eslintrc.js')).toBe('config')
      })

    })

    describe('Arquivos de Código Fonte', () => {

      it('deve classificar .js como source', () => {
        expect(classificarArquivo('src/main.js')).toBe('source')
      })

      it('deve classificar .ts como source', () => {
        expect(classificarArquivo('src/utils.ts')).toBe('source')
      })

      it('deve classificar .svelte como source', () => {
        expect(classificarArquivo('src/App.svelte')).toBe('source')
      })

      it('deve classificar .vue como source', () => {
        expect(classificarArquivo('src/App.vue')).toBe('source')
      })

      it('deve classificar .jsx como source', () => {
        expect(classificarArquivo('src/Button.jsx')).toBe('source')
      })

      it('deve classificar .tsx como source', () => {
        expect(classificarArquivo('src/Button.tsx')).toBe('source')
      })

    })

    describe('Arquivos de Estilo', () => {

      it('deve classificar .css como style', () => {
        expect(classificarArquivo('src/styles/global.css')).toBe('style')
      })

      it('deve classificar .scss como style', () => {
        expect(classificarArquivo('src/styles/main.scss')).toBe('style')
      })

      it('deve classificar .less como style', () => {
        expect(classificarArquivo('src/styles/theme.less')).toBe('style')
      })

    })

    describe('Assets', () => {

      it('deve classificar .png como asset', () => {
        expect(classificarArquivo('public/logo.png')).toBe('asset')
      })

      it('deve classificar .svg como asset', () => {
        expect(classificarArquivo('src/icons/arrow.svg')).toBe('asset')
      })

      it('deve classificar .jpg como asset', () => {
        expect(classificarArquivo('public/hero.jpg')).toBe('asset')
      })

      it('deve classificar .woff2 como asset', () => {
        expect(classificarArquivo('public/fonts/inter.woff2')).toBe('asset')
      })

    })

    describe('HTML', () => {

      it('deve classificar .html como html', () => {
        expect(classificarArquivo('index.html')).toBe('html')
      })

    })

    describe('Outros', () => {

      it('deve classificar .md como other', () => {
        expect(classificarArquivo('README.md')).toBe('other')
      })

      it('deve classificar .txt como other', () => {
        expect(classificarArquivo('notes.txt')).toBe('other')
      })

    })

  })

})
