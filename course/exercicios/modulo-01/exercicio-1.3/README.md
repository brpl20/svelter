# Exercício 1.3 — Estrutura de Projeto Vite

## 🎯 Objetivo

Criar funções que validam e analisam a estrutura de um projeto Vite.

## 📋 Contexto

Todo projeto Vite tem uma estrutura básica. Entender essa estrutura ajuda a navegar e configurar projetos corretamente.

## 📝 Requisitos

### Função `validarEstrutura(arquivos)`

Recebe um array de caminhos de arquivo e valida se é um projeto Vite válido:

- Deve ter `package.json`
- Deve ter `vite.config.js` ou `vite.config.ts`
- Deve ter `index.html` na raiz

Retorna: `{ valido: boolean, faltando: string[] }`

### Função `classificarArquivo(caminho)`

Classifica um arquivo do projeto:

- `config` - Arquivos de configuração (vite.config.*, tsconfig.*, etc.)
- `source` - Código fonte (.js, .ts, .svelte, .vue, .jsx, .tsx)
- `style` - Estilos (.css, .scss, .less)
- `asset` - Assets (.png, .jpg, .svg, .ico, .woff)
- `html` - Arquivos HTML
- `other` - Outros

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Validar presença de arquivos obrigatórios
- [ ] Retornar lista de arquivos faltando
- [ ] Classificar corretamente cada tipo de arquivo
