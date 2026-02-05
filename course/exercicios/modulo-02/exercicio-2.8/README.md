# Exercício 2.8 — SvelteKit vs Next.js

## 🎯 Objetivo

Comparar os meta-frameworks SvelteKit e Next.js em termos de roteamento, data fetching e convenções.

## 📋 Contexto

SvelteKit e Next.js são meta-frameworks full-stack. Ambos oferecem roteamento baseado em arquivos, SSR, SSG e API routes, mas com convenções diferentes.

## 📝 Requisitos

### Função `converterRotaNextParaSvelteKit(rota)`

Converte estrutura de rota Next.js para SvelteKit:

```javascript
converterRotaNextParaSvelteKit('pages/blog/[slug].tsx')
// 'src/routes/blog/[slug]/+page.svelte'

converterRotaNextParaSvelteKit('pages/api/users.ts')
// 'src/routes/api/users/+server.js'
```

### Função `converterDataFetching(codigo, de, para)`

Converte padrões de data fetching:

- Next.js: getServerSideProps, getStaticProps
- SvelteKit: load functions em +page.server.js

### Função `analisarEstruturaProjeto(arquivos)`

Analisa estrutura e identifica o framework:
- Detecta padrões de roteamento
- Identifica convenções de arquivos
- Retorna framework detectado e estrutura

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Converter rotas entre frameworks
- [ ] Converter padrões de data fetching
- [ ] Detectar framework pela estrutura
