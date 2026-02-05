# Exercício 2.2 — Timer (Conversão de Hooks)

## 🎯 Objetivo

Implementar a lógica de um timer similar ao que seria feito em React com hooks, mas usando a abordagem Svelte (funções simples).

## 📋 Contexto

Em React, este timer usaria:
- `useState` para `seconds` e `isRunning`
- `useEffect` para o interval
- `useMemo` para formatar o tempo

Em Svelte, você vai usar apenas:
- Variáveis `let`
- Funções simples
- Declarações reativas `$:`

## 📝 Requisitos

### Objeto `createTimer()`

Crie uma função que retorna um objeto timer com:

- `seconds`: número de segundos (começa em 0)
- `isRunning`: boolean indicando se está rodando
- `formatted`: string no formato "MM:SS"
- `start()`: inicia o timer
- `pause()`: pausa o timer
- `reset()`: zera e para o timer
- `destroy()`: limpa o interval (cleanup)

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Timer começa parado em 0
- [ ] `start()` inicia a contagem
- [ ] `pause()` para sem zerar
- [ ] `reset()` zera e para
- [ ] `formatted` mostra "00:00", "01:30", etc.
- [ ] `destroy()` limpa recursos
