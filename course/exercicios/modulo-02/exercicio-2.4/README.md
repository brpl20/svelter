# Exercício 2.4 — Store de Tema

## 🎯 Objetivo

Implementar um store de tema (dark/light) similar aos Svelte stores, mas usando JavaScript puro para entender o padrão.

## 📋 Contexto

Svelte stores seguem um padrão simples:
- Um método `subscribe(callback)` que registra listeners
- O subscribe retorna uma função `unsubscribe`
- Quando o valor muda, todos os listeners são notificados

## 📝 Requisitos

### Função `createThemeStore(initial)`

Crie um store que:

- Começa com o tema inicial (default: `'light'`)
- Tem método `subscribe(callback)` que:
  - Chama o callback imediatamente com o valor atual
  - Retorna função para cancelar a inscrição
- Tem método `set(value)` para definir o tema
- Tem método `toggle()` que alterna entre 'light' e 'dark'

### Função `derived(store, fn)`

Crie uma função que deriva um novo store:

- Recebe um store e uma função de transformação
- Retorna um novo store cujo valor é `fn(valorDoStoreOriginal)`
- Atualiza automaticamente quando o store original muda

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] `subscribe` chama callback imediatamente
- [ ] `subscribe` retorna função unsubscribe
- [ ] `set` atualiza e notifica subscribers
- [ ] `toggle` alterna light/dark
- [ ] `derived` cria store derivado que atualiza automaticamente
