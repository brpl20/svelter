# Exercício 27.3 — $effect - Efeitos e Cleanup

## 🎯 Objetivo

Entender o ciclo de vida dos efeitos e a importância do cleanup.

## 📋 Contexto

O `$effect` executa código quando dependências mudam e permite limpar recursos com a função de cleanup. Vamos simular esse comportamento.

## 📝 Requisitos

### Função `criarSistemaEfeitos()`

Cria um sistema que gerencia efeitos com cleanup:

```javascript
const sistema = criarSistemaEfeitos()

const parar = sistema.registrarEfeito(() => {
  console.log('Efeito executou')
  return () => console.log('Cleanup!')
})

sistema.executarEfeitos() // "Efeito executou"
sistema.executarEfeitos() // "Cleanup!" então "Efeito executou"
parar() // "Cleanup!"
```

### Função `criarDebounceEffect(callback, delay)`

Cria um efeito com debounce que tem cleanup automático:

```javascript
const { trigger, cancel, pending } = criarDebounceEffect(() => {
  console.log('Executou após debounce')
}, 300)

trigger() // Agenda execução
trigger() // Reseta o timer
cancel()  // Cancela
pending() // false
```

### Função `criarEffectComDependencias(deps, callback)`

Simula um efeito que só executa quando dependências mudam:

```javascript
let count = 0
const effect = criarEffectComDependencias(
  () => [count],
  (valores) => console.log('Count:', valores[0])
)

effect.verificarEExecutar() // Executa (primeira vez)
effect.verificarEExecutar() // Não executa (deps não mudaram)
count = 5
effect.verificarEExecutar() // Executa (count mudou)
```

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Sistema de efeitos executa cleanup antes de re-executar
- [ ] Debounce funciona corretamente com cancelamento
- [ ] Efeito com dependências só executa quando necessário
