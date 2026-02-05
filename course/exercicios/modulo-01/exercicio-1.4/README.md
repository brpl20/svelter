# Exercício 1.4 — Configuração do Vite

## 🎯 Objetivo

Criar funções para gerar e validar configurações do Vite.

## 📋 Contexto

O arquivo `vite.config.js` é o coração da configuração. Entender suas opções é essencial para projetos reais.

## 📝 Requisitos

### Função `criarConfig(opcoes)`

Cria um objeto de configuração do Vite baseado nas opções:

```javascript
criarConfig({
  porta: 3000,
  base: '/app/',
  aliases: { '@': './src' }
})
```

Deve retornar objeto com estrutura válida do Vite:
- `server.port` - Porta do servidor dev
- `base` - Base URL para deploy
- `resolve.alias` - Aliases de importação

### Função `validarConfig(config)`

Valida uma configuração do Vite:

- `server.port` deve ser número entre 1 e 65535
- `base` deve começar e terminar com `/` (se definido)
- `build.outDir` não pode ser vazio (se definido)

Retorna: `{ valido: boolean, erros: string[] }`

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Gerar config com porta personalizada
- [ ] Gerar config com base URL
- [ ] Gerar config com aliases
- [ ] Validar porta no range correto
- [ ] Validar formato do base URL
