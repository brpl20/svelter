# 🧪 Exercícios Interativos do Curso

> Complete os desafios e valide seu aprendizado com testes automatizados!

## Como Funciona

Cada exercício contém:

```
exercicio-X.Y/
├── package.json        # Dependências e scripts
├── README.md           # Instruções do desafio
├── src/
│   └── solucao.js      # 👈 VOCÊ EDITA AQUI
└── src/__tests__/
    └── solucao.spec.js # Testes de validação
```

## Fluxo de Trabalho

```bash
# 1. Entre na pasta do exercício
cd exercicios/modulo-01/exercicio-1.1

# 2. Instale as dependências
npm install

# 3. Leia o README.md para entender o desafio

# 4. Edite o arquivo em src/ para completar o desafio

# 5. Rode os testes
npm test

# 6. Se todos passarem (verde) ✅ → Exercício concluído!
#    Se algum falhar (vermelho) ❌ → Revise sua solução
```

## Dicas

- **Leia os testes!** Eles mostram exatamente o que é esperado
- Os testes rodam em modo watch: `npm run test:watch`
- Use `npm run test:ui` para interface visual (se disponível)

## Estrutura dos Módulos

### Módulo 1 — Fundamentos do Vite

| # | Exercício | Descrição |
|---|-----------|-----------|
| 1.1 | Tempo de Carregamento | Medir e formatar tempo de execução |
| 1.2 | ESModules | Analisar tipos de importação |
| 1.3 | Estrutura de Projeto | Validar e classificar arquivos |
| 1.4 | Configuração | Criar e validar vite.config |
| 1.5 | Plugins | Criar um plugin Vite |
| 1.6 | Variáveis de Ambiente | Parsear e filtrar env vars |
| 1.7 | Build e Otimização | Analisar bundle e sugerir otimizações |
| 1.8 | Frameworks | Detectar e configurar frameworks |

### Módulo 2 — Svelte vs React

| # | Exercício | Descrição |
|---|-----------|-----------|
| 2.1 | Compilador vs Runtime | Simular e comparar abordagens |
| 2.2 | Reatividade | Converter timer de React para Svelte |
| 2.3 | Templates vs JSX | Converter sintaxe entre frameworks |
| 2.4 | State Management | Implementar store de tema |
| 2.5 | CSS Escopo | Escopar CSS e gerar CSS-in-JS |
| 2.6 | Performance | Analisar bundle e renderizações |
| 2.7 | Ecossistema | Analisar bibliotecas e compatibilidade |
| 2.8 | SvelteKit vs Next.js | Converter rotas e data fetching |

### Módulo 27 — Svelte 5 Runes

| # | Exercício | Descrição |
|---|-----------|-----------|
| 27.1 | $state | Simular estado reativo com histórico |
| 27.2 | $derived | Criar valores derivados com dependências |
| 27.3 | $effect | Implementar sistema de efeitos com cleanup |
| 27.4 | $props | Sistema de props com validação e bindable |
| 27.5 | Migração | Converter código Svelte 4 para Svelte 5 |

---

**Bons estudos! 🚀**
