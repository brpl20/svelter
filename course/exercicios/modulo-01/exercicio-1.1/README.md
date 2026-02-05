# Exercício 1.1 — Medindo Tempo de Carregamento

## 🎯 Objetivo

Criar funções para medir e formatar tempos de performance.

## 📋 Instruções

1. Abra o arquivo `src/solucao.js`
2. Complete as funções marcadas com `// TODO`
3. Rode `npm test` para validar

## 📝 Requisitos

### Função `medirTempo(fn)`

- Recebe uma função como parâmetro
- Executa a função
- Retorna um objeto com:
  - `resultado`: o retorno da função executada
  - `tempo`: tempo de execução em milissegundos (número)

### Função `formatarTempo(ms)`

- Recebe um número (milissegundos)
- Retorna uma string formatada:
  - Se < 1000ms: `"XXXms"` (ex: `"150ms"`)
  - Se >= 1000ms: `"X.XXs"` (ex: `"1.50s"`)

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

Todos os testes devem passar (verde):

- [ ] `medirTempo` executa a função e retorna resultado
- [ ] `medirTempo` retorna o tempo de execução
- [ ] `formatarTempo` formata milissegundos corretamente
- [ ] `formatarTempo` formata segundos corretamente
