---
title: "O que é Svelte e por que aprender"
module: 1
order: 1
---

<script>
import Tip from '$lib/components/Tip.svelte';
import Question from '$lib/components/Question.svelte';
</script>

# 1.1 — O que é Svelte e por que aprender

> Conheça o framework que mais cresce no ecossistema JavaScript e entenda por que ele é diferente de tudo que você já viu.

## Objetivos da Aula

- Entender o que é o Svelte e sua proposta
- Conhecer a diferença entre compilador e runtime
- Saber a relação entre Svelte e SvelteKit
- Entender por que Svelte é ideal para quem está começando

---

## O que é Svelte?

Svelte é um **framework JavaScript para construir interfaces de usuário**. Mas com uma diferença fundamental: enquanto frameworks como React e Vue fazem a maior parte do trabalho **no navegador do usuário**, o Svelte faz esse trabalho **antes**, no momento em que você gera o build do projeto.

Na prática, isso significa que o Svelte é um **compilador**. Ele transforma seus componentes em JavaScript puro e otimizado, sem carregar nenhuma biblioteca extra no navegador.

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 overflow-hidden">
  <div class="bg-warning text-warning-content px-4 py-2 font-bold text-center text-sm sm:text-base tracking-wide">SVELTE: COMPILADOR, NAO RUNTIME</div>
  <div class="p-4 sm:p-6">
    <div class="flex flex-col items-center gap-3">
      <div class="bg-base-100 rounded-lg border border-base-content/10 px-4 py-3 text-base-content text-sm text-center w-full sm:w-auto">
        <span class="font-bold">Voce escreve:</span> componentes <code>.svelte</code>
      </div>
      <div class="text-2xl text-warning font-bold">&#9660;</div>
      <div class="bg-base-100 rounded-lg border border-warning/30 px-4 py-3 text-base-content text-sm text-center w-full sm:w-auto">
        <span class="font-bold">Compilador Svelte</span><br>
        <span class="text-base-content/70">transforma no momento do build</span>
      </div>
      <div class="text-2xl text-warning font-bold">&#9660;</div>
      <div class="bg-base-100 rounded-lg border border-success/30 px-4 py-3 text-base-content text-sm text-center w-full sm:w-auto">
        <span class="font-bold text-success">JavaScript puro e otimizado</span><br>
        <span class="text-base-content/70">sem framework no navegador</span>
      </div>
    </div>
  </div>
</div>

### O resultado?

Aplicações Svelte são **menores**, **mais rápidas** e **mais simples** de escrever.

---

## Svelte vs Outros Frameworks

Se você já ouviu falar de React ou Vue, a comparação vai ajudar a entender a proposta do Svelte.

<div class="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
  <div class="rounded-xl border border-info/30 bg-base-200 overflow-hidden">
    <div class="bg-info/20 px-4 py-2 text-center font-bold text-info text-sm">React</div>
    <div class="p-4 text-sm text-base-content space-y-2">
      <div>Carrega o <strong>runtime do React</strong> no navegador</div>
      <div>Usa Virtual DOM para detectar mudancas</div>
      <div class="pt-2 border-t border-base-content/10 text-base-content/60">Bundle minimo: ~40 KB</div>
    </div>
  </div>
  <div class="rounded-xl border border-success/30 bg-base-200 overflow-hidden">
    <div class="bg-success/20 px-4 py-2 text-center font-bold text-success text-sm">Vue</div>
    <div class="p-4 text-sm text-base-content space-y-2">
      <div>Carrega o <strong>runtime do Vue</strong> no navegador</div>
      <div>Usa sistema de reatividade com proxies</div>
      <div class="pt-2 border-t border-base-content/10 text-base-content/60">Bundle minimo: ~33 KB</div>
    </div>
  </div>
  <div class="rounded-xl border border-warning/30 bg-base-200 overflow-hidden">
    <div class="bg-warning/20 px-4 py-2 text-center font-bold text-warning text-sm">Svelte</div>
    <div class="p-4 text-sm text-base-content space-y-2">
      <div><strong>Nenhum runtime</strong> no navegador</div>
      <div>Compilador gera codigo otimizado no build</div>
      <div class="pt-2 border-t border-base-content/10 text-base-content/60">Bundle minimo: ~2 KB</div>
    </div>
  </div>
</div>

<Question question="Se Svelte nao tem runtime, como ele funciona?">
O compilador do Svelte analisa seus componentes e gera JavaScript que manipula o DOM diretamente. Em vez de comparar um DOM virtual com o DOM real (como o React faz), o Svelte ja sabe exatamente o que precisa mudar e quando. Ele gera instrucoes precisas no build, eliminando a necessidade de fazer esse trabalho no navegador.
</Question>

---

## Svelte vs SvelteKit

Essa e uma duvida muito comum entre iniciantes. Vamos esclarecer:

**Svelte** e o **compilador de componentes**. Com ele voce cria botoes, formularios, cards, listas — tudo que e visual e interativo.

**SvelteKit** e o **framework fullstack** construido em cima do Svelte. Ele adiciona:

- Roteamento baseado em arquivos (cada arquivo vira uma pagina)
- Renderizacao no servidor (SSR)
- Carregamento de dados
- API routes
- Build e deploy otimizados

<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 p-5">
  <div class="mb-4 rounded-lg bg-warning/20 px-4 py-2 text-center font-bold text-base-content">RELACAO SVELTE x SVELTEKIT</div>
  <div class="flex flex-col items-center gap-4">
    <div class="w-full max-w-md rounded-xl border-2 border-warning/40 bg-warning/5 p-4">
      <div class="text-center font-bold text-warning mb-2">SvelteKit</div>
      <div class="text-sm text-base-content/80 text-center mb-3">Framework fullstack (rotas, SSR, APIs, deploy)</div>
      <div class="rounded-lg border-2 border-warning/60 bg-warning/10 p-3">
        <div class="text-center font-bold text-warning">Svelte</div>
        <div class="text-sm text-base-content/80 text-center">Compilador de componentes (UI)</div>
      </div>
    </div>
    <div class="text-sm text-base-content/60 text-center max-w-sm">
      SvelteKit <strong>usa</strong> o Svelte por dentro.<br>
      Voce aprende Svelte automaticamente ao usar SvelteKit.
    </div>
  </div>
</div>

<Tip>
Neste curso, vamos usar o SvelteKit desde o inicio. Isso significa que voce vai aprender Svelte (componentes, reatividade, estilizacao) dentro do contexto do SvelteKit (rotas, paginas, dados). E a forma recomendada pela equipe do Svelte.
</Tip>

---

## Por que aprender Svelte?

### Para iniciantes

Se voce esta comecando no mundo do desenvolvimento web, Svelte tem uma vantagem enorme: **a sintaxe e quase identica a HTML, CSS e JavaScript puros**. Nao precisa aprender JSX, hooks, ou conceitos complexos antes de construir algo funcional.

```svelte
<!-- Isso e um componente Svelte completo -->
<script>
  let nome = 'mundo'
</script>

<h1>Ola, {nome}!</h1>

<style>
  h1 {
    color: #ff3e00;
  }
</style>
```

Olhe o codigo acima. Se voce conhece o basico de HTML, CSS e JavaScript, voce ja entende quase tudo. Isso e Svelte.

### Para desenvolvedores experientes

Se voce ja trabalha com React ou Vue, o Svelte vai parecer um alivio:

- Menos boilerplate
- Reatividade por atribuicao simples (sem `useState` ou `ref()`)
- CSS com escopo automatico (sem CSS Modules ou styled-components)
- Bundles significativamente menores
- Performance excepcional sem esforco extra

### O ecossistema

Svelte tem um ecossistema maduro e em crescimento rapido:

- **SvelteKit** — framework fullstack oficial
- **Svelte 5** — versao mais recente com Runes (novo modelo de reatividade)
- **`sv` CLI** — ferramenta unificada para criar e gerenciar projetos
- Comunidade ativa e acolhedora

<Question question="Svelte e usado em producao?">
Sim. Empresas como The New York Times, Apple, Spotify, Square, Ikea e muitas outras usam Svelte em producao. O criador do Svelte, Rich Harris, trabalha na Vercel (mesma empresa por tras do Next.js), garantindo investimento continuo no ecossistema.
</Question>

---

## O que vamos construir neste curso?

Ao longo do curso, voce vai aprender Svelte e SvelteKit construindo projetos praticos. Mas primeiro, precisamos configurar nosso ambiente. Na proxima aula, voce vai criar seu primeiro projeto Svelte usando a ferramenta oficial `sv`.

---

## Resumo

| Conceito | Descricao |
|----------|-----------|
| **Svelte** | Compilador de componentes — transforma `.svelte` em JS otimizado |
| **SvelteKit** | Framework fullstack construido sobre o Svelte |
| **Compilador vs Runtime** | Svelte faz o trabalho no build, nao no navegador |
| **`sv` CLI** | Ferramenta oficial para criar e gerenciar projetos |

---

## Pre-requisitos para a proxima aula

Antes de continuar, certifique-se de que voce tem instalado:

```bash
# Verifique o Node.js (versao 18 ou superior)
node --version

# Verifique o npm
npm --version
```

<Tip title="Node.js">
Se voce ainda nao tem o Node.js instalado, baixe em <a href="https://nodejs.org" target="_blank">nodejs.org</a>. Recomendamos a versao LTS. O npm ja vem incluso com o Node.js.
</Tip>

---

**Proxima aula:** [1.2 — Criando seu Projeto com `sv create`](../1.2-criando-projeto-sv-create)
