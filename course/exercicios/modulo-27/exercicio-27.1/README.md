# Exercício 27.1 — $state - Estado Reativo

## 🎯 Objetivo

Entender o conceito de reatividade do `$state` simulando seu comportamento.

## 📋 Contexto

O `$state` do Svelte 5 cria valores reativos que notificam automaticamente quando mudam. Neste exercício, vamos simular esse comportamento para entender como funciona internamente.

## 📝 Requisitos

### Função `criarEstadoReativo(valorInicial)`

Cria um objeto que simula o comportamento do `$state`:

```javascript
const estado = criarEstadoReativo(0)
estado.valor // 0
estado.valor = 5
estado.valor // 5
estado.historico // [0, 5] - todos os valores que o estado teve
```

### Função `criarEstadoReativoObjeto(objetoInicial)`

Cria estado reativo para objetos com proxy para detectar mudanças:

```javascript
const user = criarEstadoReativoObjeto({ name: 'Ana', age: 25 })
user.valor.name = 'Bruno'
user.historico // [{ name: 'Ana', age: 25 }, { name: 'Bruno', age: 25 }]
```

### Função `criarEstadoReativoArray(arrayInicial)`

Cria estado reativo para arrays que detecta métodos mutáveis:

```javascript
const items = criarEstadoReativoArray([1, 2, 3])
items.valor.push(4)
items.historico // [[1,2,3], [1,2,3,4]]
```

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Estado primitivo funciona com getter/setter
- [ ] Estado de objeto detecta mudanças em propriedades
- [ ] Estado de array detecta push, pop, splice
- [ ] Histórico de mudanças é mantido corretamente
