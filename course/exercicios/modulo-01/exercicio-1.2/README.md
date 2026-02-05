# Exercício 1.2 — ESModules e Resolução

## 🎯 Objetivo

Entender como ESModules funcionam e como o Vite resolve importações.

## 📋 Contexto

O Vite usa ESModules nativos durante o desenvolvimento. Entender a diferença entre tipos de importação é fundamental para aproveitar o poder do Vite.

## 📝 Requisitos

### Função `analisarImport(importPath)`

Crie uma função que analisa um caminho de importação e retorna:

- `tipo`: 'relativo', 'absoluto', 'bare' ou 'alias'
- `extensao`: extensão do arquivo (se houver)
- `isNodeModule`: se é um módulo do node_modules

Regras:
- Importações que começam com `.` ou `..` são **relativas**
- Importações que começam com `/` são **absolutas**
- Importações que começam com `@/` ou `~/` são **alias**
- Outras importações são **bare** (módulos npm)

### Função `resolverOrdemExtensoes(arquivo, extensoes)`

Simula como o Vite tenta resolver um arquivo sem extensão:

- Recebe um nome de arquivo e lista de extensões para tentar
- Retorna array com todas as tentativas em ordem

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Identificar importações relativas (./foo, ../bar)
- [ ] Identificar importações absolutas (/src/foo)
- [ ] Identificar imports bare (lodash, svelte)
- [ ] Identificar aliases (@/components, ~/utils)
- [ ] Gerar ordem correta de resolução de extensões
