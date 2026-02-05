# Exercício 1.8 — Vite para Diferentes Frameworks

## 🎯 Objetivo

Criar funções que identificam e configuram Vite para diferentes frameworks.

## 📋 Contexto

O Vite suporta múltiplos frameworks através de plugins oficiais. Cada framework tem suas convenções e requisitos.

## 📝 Requisitos

### Função `detectarFramework(arquivos)`

Detecta o framework baseado nos arquivos do projeto:

- `.svelte` → 'svelte'
- `.vue` → 'vue'
- `.jsx`/`.tsx` → 'react'
- Apenas `.js`/`.ts` → 'vanilla'

### Função `obterPluginNecessario(framework)`

Retorna o nome do plugin oficial para o framework:

- 'svelte' → '@sveltejs/vite-plugin-svelte'
- 'vue' → '@vitejs/plugin-vue'
- 'react' → '@vitejs/plugin-react'
- 'vanilla' → null

### Função `gerarComandoCriacao(framework, nomeProjeto)`

Gera o comando npm create para o template:

```javascript
gerarComandoCriacao('svelte', 'meu-app')
// 'npm create vite@latest meu-app -- --template svelte'
```

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Detectar framework pela extensão dos arquivos
- [ ] Retornar plugin correto para cada framework
- [ ] Gerar comando de criação válido
