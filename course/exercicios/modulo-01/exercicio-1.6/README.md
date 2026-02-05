# Exercício 1.6 — Variáveis de Ambiente

## 🎯 Objetivo

Criar funções para trabalhar com variáveis de ambiente no padrão do Vite.

## 📋 Contexto

O Vite expõe variáveis de ambiente através de `import.meta.env`. Apenas variáveis com prefixo `VITE_` são expostas ao cliente.

## 📝 Requisitos

### Função `parsearEnv(conteudo)`

Parseia o conteúdo de um arquivo `.env`:

```
VITE_API_URL=https://api.example.com
VITE_DEBUG=true
SECRET_KEY=abc123
```

Retorna objeto com chave/valor.

### Função `filtrarViteEnv(env)`

Filtra apenas variáveis com prefixo `VITE_`:

- Retorna novo objeto só com variáveis `VITE_*`
- Remove o prefixo das chaves no resultado

### Função `detectarModo(arquivo)`

Detecta o modo baseado no nome do arquivo:

- `.env` → 'all'
- `.env.local` → 'local'
- `.env.development` → 'development'
- `.env.production` → 'production'

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Parsear arquivo .env corretamente
- [ ] Filtrar apenas variáveis VITE_
- [ ] Detectar modo pelo nome do arquivo
- [ ] Lidar com valores com espaços e caracteres especiais
