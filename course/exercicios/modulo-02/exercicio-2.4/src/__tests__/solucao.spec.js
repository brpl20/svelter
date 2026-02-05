/**
 * Testes do Exercício 2.4 - Store de Tema
 */

import { describe, it, expect, vi } from 'vitest'
import { createThemeStore, derived } from '../solucao.js'

describe('Exercício 2.4 - Store de Tema', () => {

  describe('createThemeStore()', () => {

    describe('Valor Inicial', () => {

      it('deve começar com o valor inicial fornecido', () => {
        const store = createThemeStore('dark')
        let value
        const unsub = store.subscribe(v => value = v)
        expect(value).toBe('dark')
        unsub()
      })

      it('deve usar "light" como padrão se não fornecido', () => {
        const store = createThemeStore()
        let value
        const unsub = store.subscribe(v => value = v)
        expect(value).toBe('light')
        unsub()
      })

    })

    describe('subscribe()', () => {

      it('deve chamar o callback imediatamente com o valor atual', () => {
        const store = createThemeStore('light')
        const callback = vi.fn()

        const unsub = store.subscribe(callback)

        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledWith('light')
        unsub()
      })

      it('deve retornar uma função de unsubscribe', () => {
        const store = createThemeStore('light')
        const callback = vi.fn()

        const unsub = store.subscribe(callback)

        expect(typeof unsub).toBe('function')
        unsub()
      })

      it('deve parar de notificar após unsubscribe', () => {
        const store = createThemeStore('light')
        const callback = vi.fn()

        const unsub = store.subscribe(callback)
        unsub()

        store.set('dark')

        expect(callback).toHaveBeenCalledTimes(1) // Só a chamada inicial
      })

      it('deve suportar múltiplos subscribers', () => {
        const store = createThemeStore('light')
        const callback1 = vi.fn()
        const callback2 = vi.fn()

        const unsub1 = store.subscribe(callback1)
        const unsub2 = store.subscribe(callback2)

        store.set('dark')

        expect(callback1).toHaveBeenCalledWith('dark')
        expect(callback2).toHaveBeenCalledWith('dark')

        unsub1()
        unsub2()
      })

    })

    describe('set()', () => {

      it('deve atualizar o valor', () => {
        const store = createThemeStore('light')
        let value
        const unsub = store.subscribe(v => value = v)

        store.set('dark')

        expect(value).toBe('dark')
        unsub()
      })

      it('deve notificar todos os subscribers', () => {
        const store = createThemeStore('light')
        const callback1 = vi.fn()
        const callback2 = vi.fn()

        const unsub1 = store.subscribe(callback1)
        const unsub2 = store.subscribe(callback2)

        store.set('dark')

        // 2 chamadas cada: inicial + set
        expect(callback1).toHaveBeenCalledTimes(2)
        expect(callback2).toHaveBeenCalledTimes(2)

        unsub1()
        unsub2()
      })

    })

    describe('toggle()', () => {

      it('deve alternar de light para dark', () => {
        const store = createThemeStore('light')
        let value
        const unsub = store.subscribe(v => value = v)

        store.toggle()

        expect(value).toBe('dark')
        unsub()
      })

      it('deve alternar de dark para light', () => {
        const store = createThemeStore('dark')
        let value
        const unsub = store.subscribe(v => value = v)

        store.toggle()

        expect(value).toBe('light')
        unsub()
      })

      it('deve alternar múltiplas vezes', () => {
        const store = createThemeStore('light')
        let value
        const unsub = store.subscribe(v => value = v)

        store.toggle()
        expect(value).toBe('dark')

        store.toggle()
        expect(value).toBe('light')

        store.toggle()
        expect(value).toBe('dark')

        unsub()
      })

    })

  })

  describe('derived()', () => {

    it('deve criar um store derivado', () => {
      const theme = createThemeStore('dark')
      const isDark = derived(theme, t => t === 'dark')

      expect(isDark).toHaveProperty('subscribe')
    })

    it('deve refletir o valor transformado', () => {
      const theme = createThemeStore('dark')
      const isDark = derived(theme, t => t === 'dark')

      let value
      const unsub = isDark.subscribe(v => value = v)

      expect(value).toBe(true)
      unsub()
    })

    it('deve atualizar quando o store original muda', () => {
      const theme = createThemeStore('dark')
      const isDark = derived(theme, t => t === 'dark')

      let value
      const unsub = isDark.subscribe(v => value = v)

      expect(value).toBe(true)

      theme.set('light')
      expect(value).toBe(false)

      theme.toggle()
      expect(value).toBe(true)

      unsub()
    })

    it('deve funcionar com transformações complexas', () => {
      const theme = createThemeStore('dark')
      const themeEmoji = derived(theme, t => t === 'dark' ? '🌙' : '☀️')

      let value
      const unsub = themeEmoji.subscribe(v => value = v)

      expect(value).toBe('🌙')

      theme.set('light')
      expect(value).toBe('☀️')

      unsub()
    })

  })

  describe('🏆 Integração', () => {

    it('deve funcionar em cenário real de toggle de tema', () => {
      const theme = createThemeStore('light')
      const isDark = derived(theme, t => t === 'dark')
      const buttonText = derived(theme, t => t === 'dark' ? 'Modo Claro' : 'Modo Escuro')

      let currentTheme, darkMode, text
      const unsub1 = theme.subscribe(v => currentTheme = v)
      const unsub2 = isDark.subscribe(v => darkMode = v)
      const unsub3 = buttonText.subscribe(v => text = v)

      expect(currentTheme).toBe('light')
      expect(darkMode).toBe(false)
      expect(text).toBe('Modo Escuro')

      theme.toggle()

      expect(currentTheme).toBe('dark')
      expect(darkMode).toBe(true)
      expect(text).toBe('Modo Claro')

      unsub1()
      unsub2()
      unsub3()
    })

  })

})
