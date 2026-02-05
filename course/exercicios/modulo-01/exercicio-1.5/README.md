# Exercício 1.5 — Criando um Plugin Vite

## 🎯 Objetivo

Criar um plugin Vite que adiciona um banner (comentário) no topo dos arquivos JavaScript.

## 📋 Instruções

1. Abra o arquivo `src/solucao.js`
2. Complete a função `bannerPlugin`
3. Rode `npm test` para validar

## 📝 Requisitos

### Função `bannerPlugin(options)`

O plugin deve:
- Ter a propriedade `name` com valor `'banner-plugin'`
- Ter um hook `transform(code, id)` que:
  - Só processa arquivos `.js` (verifique se `id` termina com `.js`)
  - Adiciona um comentário de banner no topo do código
  - O banner deve seguir o formato:
    ```javascript
    /**
     * {options.projectName}
     * Build: {data atual ISO}
     */
    ```
  - Retorna `{ code: novoConteudo, map: null }`

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Plugin tem nome `'banner-plugin'`
- [ ] Hook `transform` existe
- [ ] Só transforma arquivos `.js`
- [ ] Adiciona banner formatado corretamente
- [ ] Retorna objeto com `code` e `map`
