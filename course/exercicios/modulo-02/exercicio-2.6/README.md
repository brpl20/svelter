# Exercício 2.6 — Performance e Tamanho do Bundle

## 🎯 Objetivo

Entender e medir diferenças de performance e tamanho de bundle entre Svelte e React.

## 📋 Contexto

Svelte produz bundles menores por não incluir runtime. React inclui ~40KB de runtime (minificado + gzip). A performance também difere na reconciliação vs atualizações diretas.

## 📝 Requisitos

### Função `calcularTamanhoBundle(componentes, framework)`

Calcula tamanho estimado do bundle:

```javascript
calcularTamanhoBundle(
  [{ nome: 'App', linhas: 50 }, { nome: 'Button', linhas: 20 }],
  'svelte'
)
// { total: 2100, runtime: 0, componentes: 2100 }
```

Regras:
- Svelte: ~30 bytes/linha, sem runtime
- React: ~40 bytes/linha + 42KB runtime

### Função `estimarRenderizacoes(operacoes, framework)`

Estima número de re-renderizações:

- Svelte: atualiza apenas elementos afetados
- React: pode re-renderizar árvore inteira (sem memo)

### Função `gerarRelatorioPerformance(metricas)`

Gera relatório comparativo formatado.

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Calcular tamanho de bundle corretamente
- [ ] Considerar runtime do React
- [ ] Estimar re-renderizações por framework
- [ ] Gerar relatório comparativo
