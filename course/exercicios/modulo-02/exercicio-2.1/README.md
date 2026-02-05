# Exercício 2.1 — Compilador vs Runtime

## 🎯 Objetivo

Entender a diferença fundamental entre abordagens de compilador (Svelte) e runtime (React).

## 📋 Contexto

Svelte compila componentes em tempo de build, gerando código JavaScript otimizado. React usa um runtime (Virtual DOM) que executa no navegador.

## 📝 Requisitos

### Função `simularCompilacao(componente)`

Simula como um compilador transformaria um componente simples:

```javascript
simularCompilacao({
  nome: 'Counter',
  estado: { count: 0 },
  template: '<button>{count}</button>'
})
```

Retorna objeto com:
- `codigo`: string do JavaScript gerado
- `tamanho`: tamanho em bytes
- `dependencias`: array de dependências necessárias

### Função `simularRuntime(componente)`

Simula como um runtime processaria o mesmo componente:

- Inclui Virtual DOM como dependência
- Gera código que usa reconciliação
- Tamanho maior devido ao runtime

### Função `compararAbordagens(componente)`

Compara as duas abordagens e retorna análise:

- Diferença de tamanho
- Vantagens de cada um
- Recomendação baseada no caso de uso

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Gerar código compilado sem dependências de runtime
- [ ] Gerar código runtime com Virtual DOM
- [ ] Calcular diferença de tamanho corretamente
- [ ] Fornecer recomendações apropriadas
