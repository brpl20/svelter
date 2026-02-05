/**
 * Testes do Exercício 1.8 - Vite para Diferentes Frameworks
 */

import { describe, it, expect } from 'vitest'
import { detectarFramework, obterPluginNecessario, gerarComandoCriacao } from '../solucao.js'

describe('Exercício 1.8 - Vite para Diferentes Frameworks', () => {

  describe('detectarFramework()', () => {

    describe('Svelte', () => {

      it('deve detectar projeto Svelte', () => {
        const arquivos = ['src/App.svelte', 'src/main.js']
        expect(detectarFramework(arquivos)).toBe('svelte')
      })

      it('deve detectar Svelte mesmo com outros arquivos', () => {
        const arquivos = ['src/utils.ts', 'src/App.svelte', 'src/store.js']
        expect(detectarFramework(arquivos)).toBe('svelte')
      })

    })

    describe('Vue', () => {

      it('deve detectar projeto Vue', () => {
        const arquivos = ['src/App.vue', 'src/main.js']
        expect(detectarFramework(arquivos)).toBe('vue')
      })

      it('deve detectar Vue com múltiplos componentes', () => {
        const arquivos = ['src/App.vue', 'src/components/Header.vue']
        expect(detectarFramework(arquivos)).toBe('vue')
      })

    })

    describe('React', () => {

      it('deve detectar projeto React com JSX', () => {
        const arquivos = ['src/App.jsx', 'src/main.jsx']
        expect(detectarFramework(arquivos)).toBe('react')
      })

      it('deve detectar projeto React com TSX', () => {
        const arquivos = ['src/App.tsx', 'src/index.tsx']
        expect(detectarFramework(arquivos)).toBe('react')
      })

      it('deve detectar React misturando JSX e TSX', () => {
        const arquivos = ['src/App.tsx', 'src/legacy.jsx']
        expect(detectarFramework(arquivos)).toBe('react')
      })

    })

    describe('Vanilla', () => {

      it('deve retornar vanilla para projetos sem framework', () => {
        const arquivos = ['src/main.js', 'src/utils.js']
        expect(detectarFramework(arquivos)).toBe('vanilla')
      })

      it('deve retornar vanilla para projetos TypeScript puro', () => {
        const arquivos = ['src/main.ts', 'src/types.ts']
        expect(detectarFramework(arquivos)).toBe('vanilla')
      })

      it('deve retornar vanilla para array vazio', () => {
        expect(detectarFramework([])).toBe('vanilla')
      })

    })

    describe('Prioridade', () => {

      it('deve priorizar Svelte sobre outros', () => {
        const arquivos = ['src/App.svelte', 'src/Legacy.vue', 'src/Old.jsx']
        expect(detectarFramework(arquivos)).toBe('svelte')
      })

      it('deve priorizar Vue sobre React', () => {
        const arquivos = ['src/App.vue', 'src/Component.jsx']
        expect(detectarFramework(arquivos)).toBe('vue')
      })

    })

  })

  describe('obterPluginNecessario()', () => {

    it('deve retornar plugin Svelte', () => {
      expect(obterPluginNecessario('svelte')).toBe('@sveltejs/vite-plugin-svelte')
    })

    it('deve retornar plugin Vue', () => {
      expect(obterPluginNecessario('vue')).toBe('@vitejs/plugin-vue')
    })

    it('deve retornar plugin React', () => {
      expect(obterPluginNecessario('react')).toBe('@vitejs/plugin-react')
    })

    it('deve retornar null para vanilla', () => {
      expect(obterPluginNecessario('vanilla')).toBeNull()
    })

    it('deve retornar null para framework desconhecido', () => {
      expect(obterPluginNecessario('angular')).toBeNull()
    })

  })

  describe('gerarComandoCriacao()', () => {

    describe('Templates JavaScript', () => {

      it('deve gerar comando para Svelte', () => {
        const cmd = gerarComandoCriacao('svelte', 'meu-app')
        expect(cmd).toBe('npm create vite@latest meu-app -- --template svelte')
      })

      it('deve gerar comando para Vue', () => {
        const cmd = gerarComandoCriacao('vue', 'vue-app')
        expect(cmd).toBe('npm create vite@latest vue-app -- --template vue')
      })

      it('deve gerar comando para React', () => {
        const cmd = gerarComandoCriacao('react', 'react-app')
        expect(cmd).toBe('npm create vite@latest react-app -- --template react')
      })

      it('deve gerar comando para Vanilla', () => {
        const cmd = gerarComandoCriacao('vanilla', 'simple-app')
        expect(cmd).toBe('npm create vite@latest simple-app -- --template vanilla')
      })

    })

    describe('Templates TypeScript', () => {

      it('deve gerar comando Svelte com TypeScript', () => {
        const cmd = gerarComandoCriacao('svelte', 'app', true)
        expect(cmd).toBe('npm create vite@latest app -- --template svelte-ts')
      })

      it('deve gerar comando Vue com TypeScript', () => {
        const cmd = gerarComandoCriacao('vue', 'app', true)
        expect(cmd).toBe('npm create vite@latest app -- --template vue-ts')
      })

      it('deve gerar comando React com TypeScript', () => {
        const cmd = gerarComandoCriacao('react', 'app', true)
        expect(cmd).toBe('npm create vite@latest app -- --template react-ts')
      })

      it('deve gerar comando Vanilla com TypeScript', () => {
        const cmd = gerarComandoCriacao('vanilla', 'app', true)
        expect(cmd).toBe('npm create vite@latest app -- --template vanilla-ts')
      })

    })

    describe('Nomes de Projeto', () => {

      it('deve aceitar nomes com hífen', () => {
        const cmd = gerarComandoCriacao('svelte', 'meu-super-app')
        expect(cmd).toContain('meu-super-app')
      })

      it('deve aceitar nomes com underscore', () => {
        const cmd = gerarComandoCriacao('react', 'my_app')
        expect(cmd).toContain('my_app')
      })

    })

  })

  describe('🏆 Integração', () => {

    it('deve detectar e gerar comando correto', () => {
      const arquivos = [
        'src/App.svelte',
        'src/lib/Counter.svelte',
        'src/main.ts'
      ]

      const framework = detectarFramework(arquivos)
      const plugin = obterPluginNecessario(framework)
      const comando = gerarComandoCriacao(framework, 'novo-projeto', true)

      expect(framework).toBe('svelte')
      expect(plugin).toBe('@sveltejs/vite-plugin-svelte')
      expect(comando).toBe('npm create vite@latest novo-projeto -- --template svelte-ts')
    })

  })

})
