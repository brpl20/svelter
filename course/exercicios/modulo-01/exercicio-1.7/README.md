# Exercício 1.7 — Build e Otimização

## 🎯 Objetivo

Criar funções para analisar e otimizar builds do Vite.

## 📋 Contexto

O Vite usa Rollup para builds de produção. Entender chunks, tamanhos e otimizações é crucial para performance.

## 📝 Requisitos

### Função `analisarBundle(arquivos)`

Analisa um array de arquivos do bundle e retorna estatísticas:

```javascript
[
  { nome: 'index-abc123.js', tamanho: 50000 },
  { nome: 'vendor-def456.js', tamanho: 150000 },
  { nome: 'style-ghi789.css', tamanho: 5000 }
]
```

Retorna:
- `totalJS`: tamanho total de arquivos .js
- `totalCSS`: tamanho total de arquivos .css
- `maiorArquivo`: nome do maior arquivo
- `quantidadeChunks`: número de chunks JS

### Função `sugerirOtimizacoes(analise)`

Baseado na análise, sugere otimizações:

- Se totalJS > 500KB → sugerir code splitting
- Se maiorArquivo > 250KB → sugerir lazy loading
- Se quantidadeChunks > 20 → sugerir bundle manual

### Função `formatarTamanho(bytes)`

Formata bytes para formato legível: 1024 → '1.00 KB'

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Calcular totais por tipo de arquivo
- [ ] Identificar maior arquivo
- [ ] Sugerir otimizações apropriadas
- [ ] Formatar tamanhos corretamente
