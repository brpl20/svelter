# Exercício 2.5 — CSS com Escopo vs CSS-in-JS

## 🎯 Objetivo

Entender as diferenças entre CSS com escopo automático (Svelte) e CSS-in-JS (React).

## 📋 Contexto

Svelte automaticamente escopa CSS para o componente. React tradicionalmente usa CSS-in-JS (styled-components, emotion) ou CSS Modules.

## 📝 Requisitos

### Função `escoparCSS(css, componenteId)`

Simula o escopo automático do Svelte, adicionando um hash único:

```javascript
escoparCSS('.button { color: red }', 'abc123')
// '.button.svelte-abc123 { color: red }'
```

### Função `gerarCSSinJS(estilos)`

Gera código CSS-in-JS estilo styled-components:

```javascript
gerarCSSinJS({
  button: { color: 'red', padding: '10px' }
})
// 'const button = styled.button`color: red; padding: 10px;`'
```

### Função `extrairVariaveisCSS(css)`

Extrai variáveis CSS personalizadas:

```javascript
extrairVariaveisCSS(':root { --primary: blue; --spacing: 8px; }')
// { '--primary': 'blue', '--spacing': '8px' }
```

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Adicionar hash de escopo a seletores CSS
- [ ] Gerar código styled-components válido
- [ ] Extrair variáveis CSS corretamente
