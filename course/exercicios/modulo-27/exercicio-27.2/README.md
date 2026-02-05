# Exercício 27.2 — $derived - Valores Derivados

## 🎯 Objetivo

Entender como valores derivados funcionam simulando o comportamento do `$derived`.

## 📋 Contexto

O `$derived` cria valores que são automaticamente recalculados quando suas dependências mudam. Vamos simular esse comportamento para entender a mecânica.

## 📝 Requisitos

### Função `criarDerivado(fontes, calculadora)`

Cria um valor derivado que recalcula automaticamente:

```javascript
const estado = { count: 0 }
const dobro = criarDerivado([() => estado.count], ([count]) => count * 2)

dobro.valor // 0
estado.count = 5
dobro.recalcular()
dobro.valor // 10
```

### Função `criarDerivadoEncadeado(derivados)`

Cria uma cadeia de derivados onde um depende do outro:

```javascript
const cadeia = criarDerivadoEncadeado([
  { nome: 'a', valor: 1 },
  { nome: 'b', depende: ['a'], calc: (a) => a * 2 },
  { nome: 'c', depende: ['b'], calc: (b) => b + 10 }
])

cadeia.obter('c') // 12 (1 * 2 + 10)
cadeia.atualizar('a', 5)
cadeia.obter('c') // 20 (5 * 2 + 10)
```

### Função `detectarDependencias(funcao)`

Analisa uma função e detecta quais variáveis ela acessa:

```javascript
const deps = detectarDependencias('(state) => state.user.name + state.count')
// ['state.user.name', 'state.count']
```

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Derivado simples recalcula corretamente
- [ ] Derivados encadeados propagam mudanças
- [ ] Detecção de dependências funciona com paths
