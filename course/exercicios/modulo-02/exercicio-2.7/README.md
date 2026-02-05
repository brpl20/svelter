# Exercício 2.7 — Ecossistema e Mercado de Trabalho

## 🎯 Objetivo

Analisar e comparar ecossistemas e oportunidades de mercado entre Svelte e React.

## 📋 Contexto

React domina o mercado com maior ecossistema e vagas. Svelte cresce rapidamente em satisfação de desenvolvedores e casos de uso específicos.

## 📝 Requisitos

### Função `analisarBibliotecas(dependencias)`

Analisa um package.json e identifica bibliotecas por framework:

```javascript
analisarBibliotecas({
  dependencies: {
    'svelte': '^4.0.0',
    'react': '^18.0.0',
    '@tanstack/react-query': '^5.0.0'
  }
})
// { svelte: ['svelte'], react: ['react', '@tanstack/react-query'], neutro: [] }
```

### Função `calcularCompatibilidade(biblioteca, frameworks)`

Verifica em quais frameworks uma biblioteca pode ser usada.

### Função `gerarAnaliseEcossistema(projeto)`

Gera análise do ecossistema do projeto:
- Bibliotecas usadas
- Maturidade do ecossistema
- Alternativas disponíveis

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Identificar bibliotecas por framework
- [ ] Calcular compatibilidade de bibliotecas
- [ ] Gerar análise de ecossistema completa
