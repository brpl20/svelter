---
title: "TypeScript ou JavaScript: o que escolher"
module: 1
order: 5
---

<script>
import Tip from '$lib/components/Tip.svelte';
import Question from '$lib/components/Question.svelte';
</script>

# 1.5 — TypeScript ou JavaScript: o que escolher

> Entenda as opcoes de tipagem no ecossistema Svelte, o que o proprio criador do Svelte pensa sobre TypeScript e qual caminho seguir neste curso.

## Objetivos da Aula

- Entender o que e TypeScript e por que ele existe
- Conhecer JSDoc como alternativa ao TypeScript
- Saber a posicao do time Svelte sobre tipagem
- Entender as opcoes do wizard ("TypeScript syntax" vs "JSDoc" vs "No")
- Decidir com confianca qual opcao escolher

---

## O que e TypeScript?

TypeScript e um **superset do JavaScript** criado pela Microsoft. Ele adiciona **tipos estaticos** ao JavaScript — ou seja, voce declara que uma variavel e uma string, um numero, um array, etc., e o editor te avisa se voce cometer um erro.

```typescript
// TypeScript
let nome: string = 'Svelte'
let versao: number = 5

// Erro! TypeScript avisa antes de rodar
versao = 'cinco'
// ❌ Type 'string' is not assignable to type 'number'
```

Sem TypeScript, esse erro so apareceria em tempo de execucao (quando o usuario esta usando o app). Com TypeScript, o editor mostra o problema **antes** de voce salvar o arquivo.

---

## E o JSDoc?

JSDoc e uma forma de adicionar tipos **dentro de comentarios** no JavaScript puro. Voce nao precisa de um compilador extra — o TypeScript Language Server (que roda dentro do VS Code) le esses comentarios e te da o mesmo IntelliSense.

```javascript
// JSDoc — o arquivo continua sendo .js
/** @type {string} */
let nome = 'Svelte'

/** @type {number} */
let versao = 5
```

O resultado pratico e o mesmo: autocompletar, deteccao de erros, documentacao ao passar o mouse. A diferenca e que o codigo continua sendo JavaScript valido — nao precisa de compilacao.

---

## O que o time Svelte pensa sobre isso?

Essa e uma das discussoes mais interessantes do ecossistema JavaScript. O proprio **codigo-fonte do SvelteKit e escrito em JavaScript com JSDoc**, nao em TypeScript.

Rich Harris, criador do Svelte, explicou a decisao:

<div class="not-prose my-6 rounded-xl border border-warning/30 bg-warning/5 p-5">
  <div class="font-bold text-warning mb-2">A posicao do time Svelte</div>
  <div class="text-sm text-base-content/90 space-y-3">
    <p><em>"SvelteKit e construido com JavaScript com checagem de tipos. Isso nos permite publicar o SvelteKit sem um passo de build. O pacote npm literalmente contem o diretorio source, e seus projetos usam isso diretamente."</em></p>
    <p><em>"Esse padrao se provou otimo para nos — e o proximo Svelte major provavelmente vai seguir a mesma abordagem. Voce nao precisa de source maps. Nao ter que lidar com o compilador TypeScript pode ser libertador."</em></p>
    <p class="text-base-content/60">— Rich Harris, via discussao no Svelte Radio / Discord</p>
  </div>
</div>

Em resumo: para **bibliotecas e ferramentas** (como o proprio Svelte), JSDoc e atraente porque o codigo publicado no npm e o mesmo codigo-fonte, sem passo de build intermediario.

<Question question="Mas entao o Svelte abandonou o TypeScript?">
Nao. Essa e uma confusao comum. O time Svelte usa JSDoc no <strong>codigo-fonte do framework</strong>. Mas o Svelte <strong>suporta totalmente TypeScript</strong> nos projetos dos usuarios. Na verdade, o Svelte 5 melhorou significativamente a integracao com TypeScript — agora voce pode usar tipos diretamente no markup dos componentes <code>.svelte</code>, algo que antes nao era possivel.
</Question>

---

## A evolucao no Svelte 5

Simon Holthausen, membro do core team do Svelte, explicou na Svienna 2024 que uma das motivacoes dos **Runes** (novo sistema de reatividade do Svelte 5) foi justamente melhorar a compatibilidade com TypeScript:

<div class="not-prose my-6 rounded-xl border border-info/30 bg-info/5 p-5">
  <div class="font-bold text-info mb-2">Runes e TypeScript</div>
  <div class="text-sm text-base-content/90 space-y-3">
    <p>No Svelte 3/4, a sintaxe <code>$: double = count * 2</code> nao era entendida nativamente pelo TypeScript. O tooling precisava de hacks para fazer a checagem funcionar.</p>
    <p>Com os Runes do Svelte 5, o TypeScript entende tudo nativamente. <code>$state()</code>, <code>$derived()</code> e <code>$props()</code> sao funcoes globais que o TypeScript reconhece sem nenhum hack.</p>
  </div>
</div>

Alem disso, o SvelteKit gera tipos automaticamente para cada rota do seu projeto. Voce nao precisa importar tipos manualmente — o editor ja sabe o formato dos seus dados de pagina, das form actions e de tudo mais.

---

## Comparacao pratica

<div class="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div class="rounded-xl border border-info/30 bg-base-200 overflow-hidden">
    <div class="bg-info/20 px-4 py-2 text-center font-bold text-info text-sm">TypeScript</div>
    <div class="p-4 text-sm text-base-content space-y-2">
      <div>Arquivos usam extensao <code>.ts</code></div>
      <div>Componentes usam <code>lang="ts"</code></div>
      <div>Tipos declarados inline no codigo</div>
      <div>Requer compilacao (TS → JS)</div>
      <div class="pt-2 border-t border-base-content/10 text-base-content/60">Ideal para: apps, projetos em equipe</div>
    </div>
  </div>
  <div class="rounded-xl border border-success/30 bg-base-200 overflow-hidden">
    <div class="bg-success/20 px-4 py-2 text-center font-bold text-success text-sm">JSDoc</div>
    <div class="p-4 text-sm text-base-content space-y-2">
      <div>Arquivos continuam <code>.js</code></div>
      <div>Tipos ficam em comentarios</div>
      <div>Mesmo IntelliSense do TypeScript</div>
      <div>Nao requer compilacao</div>
      <div class="pt-2 border-t border-base-content/10 text-base-content/60">Ideal para: bibliotecas, projetos solo</div>
    </div>
  </div>
</div>

### No Svelte, a diferenca fica assim:

**Com TypeScript:**

```svelte
<script lang="ts">
  let nome: string = 'mundo'
  let contador: number = 0

  function incrementar(): void {
    contador++
  }
</script>
```

**Com JSDoc:**

```svelte
<script>
  /** @type {string} */
  let nome = 'mundo'

  /** @type {number} */
  let contador = 0

  /** @returns {void} */
  function incrementar() {
    contador++
  }
</script>
```

**Sem tipagem:**

```svelte
<script>
  let nome = 'mundo'
  let contador = 0

  function incrementar() {
    contador++
  }
</script>
```

Os tres funcionam. A diferenca esta no nivel de seguranca e ajuda que o editor oferece.

---

## Voce pode combinar os dois

Uma abordagem poderosa e criar um arquivo `types.d.ts` dentro de `src/lib/` com seus tipos em TypeScript puro e usa-los via JSDoc no resto do projeto:

```typescript
// src/lib/types.d.ts
export interface Pessoa {
  nome: string
  idade: number
}
```

```javascript
// qualquer arquivo .js do projeto
/** @type {import('$lib/types').Pessoa} */
const aluno = {
  nome: 'Ana',
  idade: 25
}
```

Isso te da o melhor dos dois mundos: tipos robustos onde importa, JavaScript puro onde voce quer simplicidade.

<Tip>
O SvelteKit ja faz algo parecido por voce. Para cada rota, ele gera automaticamente um arquivo <code>$types</code> com os tipos corretos. Voce nao precisa importar tipos para <code>load</code>, <code>actions</code> ou <code>PageData</code> — o editor ja sabe tudo.
</Tip>

---

## E neste curso, o que vamos usar?

Neste curso, escolhemos **TypeScript syntax** no wizard do `sv create`. Os motivos:

<div class="not-prose my-6 space-y-3">
  <div class="rounded-xl border border-base-content/10 bg-base-200 p-4 flex flex-col sm:flex-row gap-3 items-start">
    <div class="badge badge-success font-bold shrink-0">1</div>
    <div>
      <div class="font-bold text-base-content">O editor te ajuda mais</div>
      <div class="text-sm text-base-content/70">Autocompletar, deteccao de erros e documentacao ao passar o mouse funcionam de forma mais natural com TypeScript.</div>
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 p-4 flex flex-col sm:flex-row gap-3 items-start">
    <div class="badge badge-success font-bold shrink-0">2</div>
    <div>
      <div class="font-bold text-base-content">Svelte 5 tem suporte nativo</div>
      <div class="text-sm text-base-content/70">Os Runes foram projetados para funcionar perfeitamente com TypeScript. Nao ha mais hacks ou workarounds.</div>
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 p-4 flex flex-col sm:flex-row gap-3 items-start">
    <div class="badge badge-success font-bold shrink-0">3</div>
    <div>
      <div class="font-bold text-base-content">Mercado de trabalho</div>
      <div class="text-sm text-base-content/70">A maioria das vagas de frontend pede TypeScript. Aprender junto com Svelte e uma forma eficiente de dominar os dois.</div>
    </div>
  </div>

  <div class="rounded-xl border border-base-content/10 bg-base-200 p-4 flex flex-col sm:flex-row gap-3 items-start">
    <div class="badge badge-success font-bold shrink-0">4</div>
    <div>
      <div class="font-bold text-base-content">Tipos basicos sao simples</div>
      <div class="text-sm text-base-content/70">Voce nao precisa ser expert em TypeScript. Saber usar <code>string</code>, <code>number</code>, <code>boolean</code> e interfaces basicas ja cobre 90% do uso diario.</div>
    </div>
  </div>
</div>

<Question question="E se eu nao sei TypeScript, vou me perder?">
Nao. Os tipos que usaremos neste curso sao simples: <code>string</code>, <code>number</code>, <code>boolean</code>, arrays e objetos com interfaces. Quando algo mais avancado aparecer, explicaremos no momento. Alem disso, o TypeScript e <strong>gradual</strong> — voce pode usar <code>any</code> temporariamente em qualquer lugar e ir adicionando tipos conforme se sentir confortavel.
</Question>

---

## Resumo

| Opcao | O que e | Quando usar |
|-------|---------|-------------|
| **TypeScript syntax** | Tipos no codigo, arquivos `.ts` | Apps, equipes, projetos de longo prazo |
| **JSDoc comments** | Tipos em comentarios, arquivos `.js` | Bibliotecas, prototipacao, projetos solo |
| **Sem tipagem** | JavaScript puro | Aprendizado inicial, scripts rapidos |
| **Combinar TS + JSDoc** | `.d.ts` para tipos, `.js` para codigo | Melhor dos dois mundos |

---

## Conclusao do Modulo 1

Parabens! Voce completou o **Modulo 1 — Primeiros Passos**.

### O que voce aprendeu

- O que e Svelte e como ele se diferencia de outros frameworks
- Como criar um projeto SvelteKit com `pnpm dlx sv create`
- As opcoes do wizard: templates, TypeScript e add-ons
- A estrutura completa de arquivos e pastas
- Como o roteamento baseado em arquivos funciona
- Os arquivos especiais do SvelteKit (`+page`, `+layout`, `+server`)
- Por que usamos pnpm e como ele funciona
- A relacao entre TypeScript, JSDoc e o ecossistema Svelte

### Proximos passos

No proximo modulo, vamos mergulhar no **Vite** — o bundler que roda por baixo do SvelteKit. Entender o Vite vai te ajudar a compreender porque tudo e tao rapido e como otimizar seu ambiente de desenvolvimento.

---

**Proximo modulo:** [Configurações e Vite](/lessons/modulo-02-configuracoes-vite/2.1-o-que-e-vite)
