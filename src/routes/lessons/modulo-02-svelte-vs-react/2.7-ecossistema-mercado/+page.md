---
title: "Ecossistema e Mercado de Trabalho"
module: 2
order: 7
---

# 2.7 — Ecossistema e Mercado de Trabalho

> Uma análise honesta de quando escolher cada framework.

## Objetivos da Aula

- Comparar ecossistemas de bibliotecas
- Analisar mercado de trabalho
- Entender quando escolher Svelte vs React

---

## Tamanho dos Ecossistemas

<div class="not-prose my-6">
  <div class="card bg-base-200 border border-base-content/10 shadow-md overflow-hidden">
    <div class="bg-info text-info-content px-4 py-2 font-bold text-sm tracking-wide">PACOTES NO NPM (aproximado, 2024)</div>
    <div class="card-body gap-3 p-4">
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">React</span>
        <div class="h-6 rounded bg-info" style="width:100%"></div>
        <span class="text-sm text-base-content/70 shrink-0">~120.000</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Vue</span>
        <div class="h-6 rounded bg-success" style="width:42%"></div>
        <span class="text-sm text-base-content/70 shrink-0">~50.000</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Svelte</span>
        <div class="h-6 rounded bg-warning" style="width:7%"></div>
        <span class="text-sm text-base-content/70 shrink-0">~8.000</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Angular</span>
        <div class="h-6 rounded bg-error" style="width:29%"></div>
        <span class="text-sm text-base-content/70 shrink-0">~35.000</span>
      </div>
    </div>
  </div>
</div>

### Mas Quantidade ≠ Qualidade

O ecossistema Svelte é menor, porém:
- **Mais curado** — menos bibliotecas abandonadas
- **Svelte geralmente não precisa** de muitas bibliotecas
- **Bibliotecas JS vanilla funcionam** facilmente

---

## Bibliotecas Essenciais: Equivalências

### UI Components

| React | Svelte |
|-------|--------|
| shadcn/ui | shadcn-svelte |
| Radix UI | Melt UI, Bits UI |
| Chakra UI | Skeleton UI |
| Material UI | Smelte (abandonado) |
| Ant Design | — |
| Headless UI | Headless Svelte |

### Forms

| React | Svelte |
|-------|--------|
| React Hook Form | Superforms |
| Formik | felte |
| Zod + RHF | Zod + Superforms |

### Estado

| React | Svelte |
|-------|--------|
| Redux | Stores nativos |
| Zustand | Stores nativos |
| Jotai | Stores nativos |
| TanStack Query | TanStack Query (funciona!) |

### Tabelas

| React | Svelte |
|-------|--------|
| TanStack Table | TanStack Table (funciona!) |
| AG Grid | AG Grid (funciona!) |
| React Table | svelte-headless-table |

### Animação

| React | Svelte |
|-------|--------|
| Framer Motion | Transições nativas + Motion One |
| React Spring | svelte/motion (spring/tweened) |
| GSAP | GSAP (funciona!) |

### Ícones

| React | Svelte |
|-------|--------|
| React Icons | svelte-icons, lucide-svelte |
| Heroicons React | Heroicons (direto) |
| Phosphor React | Phosphor Svelte |

---

## O Que Svelte Tem Nativamente

```svelte
<!-- Coisas que React precisa de biblioteca, Svelte tem built-in -->

<!-- Transições e Animações -->
{#if visible}
  <div transition:fade>Aparece suavemente</div>
{/if}

<!-- Motion (spring/tweened) -->
<script>
  import { spring } from 'svelte/motion'
  const coords = spring({ x: 0, y: 0 })
</script>

<!-- Stores (estado global) -->
<script>
  import { writable, derived } from 'svelte/store'
</script>

<!-- CSS com escopo -->
<style>
  /* Escopo automático */
</style>

<!-- Two-way binding -->
<input bind:value={name} />

<!-- Tratamento de promessas -->
{#await fetchData()}
  <Spinner />
{:then data}
  <Data {data} />
{:catch error}
  <Error {error} />
{/await}
```

---

## Mercado de Trabalho

### Vagas (dados aproximados 2024)

<div class="not-prose my-6">
  <div class="card bg-base-200 border border-base-content/10 shadow-md overflow-hidden">
    <div class="bg-error text-error-content px-4 py-2 font-bold text-sm tracking-wide">VAGAS - Plataformas de emprego (Global)</div>
    <div class="card-body gap-3 p-4">
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">React</span>
        <div class="h-6 rounded bg-info" style="width:100%"></div>
        <span class="text-sm text-base-content/70 shrink-0">~85.000</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Vue</span>
        <div class="h-6 rounded bg-success" style="width:29%"></div>
        <span class="text-sm text-base-content/70 shrink-0">~25.000</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Angular</span>
        <div class="h-6 rounded bg-error" style="width:35%"></div>
        <span class="text-sm text-base-content/70 shrink-0">~30.000</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Svelte</span>
        <div class="h-6 rounded bg-warning" style="width:4%"></div>
        <span class="text-sm text-base-content/70 shrink-0">~3.000</span>
      </div>
    </div>
  </div>
</div>

### Realidade do Mercado Svelte

**Menos vagas, mas:**
- Menos concorrência por vaga
- Empresas que usam Svelte são mais modernas
- Salários competitivos (às vezes maiores)
- Projetos geralmente mais interessantes

**Empresas usando Svelte:**
- The New York Times
- Apple (algumas ferramentas)
- Spotify (alguns projetos)
- IKEA
- Rakuten
- Square
- IBM
- GoDaddy
- Philips Hue
- 1Password

---

## Satisfação dos Desenvolvedores

### State of JS Survey 2023

<div class="not-prose my-6">
  <div class="card bg-base-200 border border-base-content/10 shadow-md overflow-hidden">
    <div class="bg-success text-success-content px-4 py-2 font-bold text-sm tracking-wide">SATISFACAO (% que usaria novamente)</div>
    <div class="card-body gap-3 p-4">
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Svelte</span>
        <div class="h-6 rounded bg-warning" style="width:89%"></div>
        <span class="text-sm text-base-content/70 shrink-0">89%</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Solid</span>
        <div class="h-6 rounded bg-accent" style="width:88%"></div>
        <span class="text-sm text-base-content/70 shrink-0">88%</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Qwik</span>
        <div class="h-6 rounded bg-secondary" style="width:84%"></div>
        <span class="text-sm text-base-content/70 shrink-0">84%</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">React</span>
        <div class="h-6 rounded bg-info" style="width:71%"></div>
        <span class="text-sm text-base-content/70 shrink-0">71%</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Vue</span>
        <div class="h-6 rounded bg-success" style="width:70%"></div>
        <span class="text-sm text-base-content/70 shrink-0">70%</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Angular</span>
        <div class="h-6 rounded bg-error" style="width:53%"></div>
        <span class="text-sm text-base-content/70 shrink-0">53%</span>
      </div>
    </div>
  </div>
</div>

### Interesse em Aprender

<div class="not-prose my-6">
  <div class="card bg-base-200 border border-base-content/10 shadow-md overflow-hidden">
    <div class="bg-accent text-accent-content px-4 py-2 font-bold text-sm tracking-wide">INTERESSE (% que quer aprender)</div>
    <div class="card-body gap-3 p-4">
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Svelte</span>
        <div class="h-6 rounded bg-warning" style="width:73%"></div>
        <span class="text-sm text-base-content/70 shrink-0">73%</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Solid</span>
        <div class="h-6 rounded bg-accent" style="width:71%"></div>
        <span class="text-sm text-base-content/70 shrink-0">71%</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">Qwik</span>
        <div class="h-6 rounded bg-secondary" style="width:65%"></div>
        <span class="text-sm text-base-content/70 shrink-0">65%</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm font-semibold text-base-content shrink-0">React</span>
        <div class="h-6 rounded bg-info" style="width:47%"></div>
        <span class="text-sm text-base-content/70 shrink-0">47%</span>
      </div>
    </div>
  </div>
</div>

---

## Quando Escolher React

### ✅ Escolha React quando:

1. **Ecossistema é crítico**
   - Precisa de componentes muito específicos
   - Integração com ferramentas enterprise (Salesforce, etc)

2. **Time grande com rotatividade**
   - Mais fácil encontrar devs
   - Mais recursos de aprendizado

3. **Requisitos corporativos**
   - Empresa exige "frameworks estabelecidos"
   - Compliance/auditoria prefere maior adoção

4. **Projeto existente em React**
   - Migração raramente vale a pena

5. **React Native necessário**
   - Svelte Native existe mas é menos maduro

---

## Quando Escolher Svelte

### ✅ Escolha Svelte quando:

1. **Performance importa**
   - Landing pages (conversão!)
   - E-commerce
   - Mobile web
   - Mercados emergentes (conexões lentas)

2. **Bundle size importa**
   - Widgets embeddable
   - Micro-frontends
   - Progressive Web Apps

3. **DX é prioridade**
   - Projeto greenfield
   - Time pequeno/médio
   - Prototipação rápida

4. **Menos boilerplate desejado**
   - Startups movendo rápido
   - MVPs
   - Projetos pessoais

5. **Projeto fullstack**
   - SvelteKit é excelente para SSR
   - Mais simples que Next.js

---

## Migração: É Possível?

### React → Svelte

<div class="not-prose my-6">
  <div class="card bg-base-200 border border-base-content/10 shadow-md overflow-hidden">
    <div class="bg-warning text-warning-content px-4 py-2 font-bold text-sm tracking-wide">ESTRATEGIAS DE MIGRACAO</div>
    <div class="card-body gap-4 p-4">
      <div class="rounded-lg border border-base-content/10 bg-base-100 p-3">
        <p class="font-bold text-base-content mb-1">1. Big Bang (Reescrever tudo)</p>
        <ul class="text-sm text-base-content/70 list-disc list-inside space-y-0.5">
          <li>Risco alto</li>
          <li>Funciona para projetos pequenos</li>
        </ul>
      </div>
      <div class="rounded-lg border border-base-content/10 bg-base-100 p-3">
        <p class="font-bold text-base-content mb-1">2. Strangler Pattern</p>
        <ul class="text-sm text-base-content/70 list-disc list-inside space-y-0.5">
          <li>Novas features em Svelte</li>
          <li>Gradualmente substitui partes React</li>
          <li>Micro-frontends podem ajudar</li>
        </ul>
      </div>
      <div class="rounded-lg border border-base-content/10 bg-base-100 p-3">
        <p class="font-bold text-base-content mb-1">3. Hibrido</p>
        <ul class="text-sm text-base-content/70 list-disc list-inside space-y-0.5">
          <li>svelte-adapter-react permite usar Svelte em React</li>
          <li>Ou React em Svelte via Web Components</li>
        </ul>
      </div>
    </div>
  </div>
</div>

### Curva de Aprendizado

<div class="not-prose my-6">
  <div class="card bg-base-200 border border-base-content/10 shadow-md overflow-hidden">
    <div class="bg-secondary text-secondary-content px-4 py-2 font-bold text-sm tracking-wide">TEMPO PARA PRODUTIVIDADE</div>
    <div class="card-body gap-4 p-4">
      <div>
        <p class="text-sm font-semibold text-base-content mb-1">Dev React aprendendo Svelte</p>
        <div class="flex items-center gap-3">
          <div class="h-6 rounded bg-success" style="width:17%"></div>
          <span class="text-sm text-base-content/70 shrink-0">~1-2 semanas</span>
        </div>
        <p class="text-xs text-base-content/50 mt-1">(conceitos similares, sintaxe mais simples)</p>
      </div>
      <div>
        <p class="text-sm font-semibold text-base-content mb-1">Dev Svelte aprendendo React</p>
        <div class="flex items-center gap-3">
          <div class="h-6 rounded bg-info" style="width:42%"></div>
          <span class="text-sm text-base-content/70 shrink-0">~3-4 semanas</span>
        </div>
        <p class="text-xs text-base-content/50 mt-1">(hooks, Virtual DOM, mais conceitos)</p>
      </div>
      <div>
        <p class="text-sm font-semibold text-base-content mb-1">Dev iniciante aprendendo Svelte</p>
        <div class="flex items-center gap-3">
          <div class="h-6 rounded bg-warning" style="width:29%"></div>
          <span class="text-sm text-base-content/70 shrink-0">~2-3 semanas</span>
        </div>
      </div>
      <div>
        <p class="text-sm font-semibold text-base-content mb-1">Dev iniciante aprendendo React</p>
        <div class="flex items-center gap-3">
          <div class="h-6 rounded bg-error" style="width:58%"></div>
          <span class="text-sm text-base-content/70 shrink-0">~4-6 semanas</span>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Investimento de Carreira

### Se você só conhece React:

Aprender Svelte vai:
- ✅ Expandir sua visão de frameworks
- ✅ Tornar você melhor dev React (entende alternativas)
- ✅ Abrir portas para projetos interessantes
- ✅ Ser relativamente rápido (~2 semanas)

### Se você está começando:

Recomendação:
1. **Aprenda Svelte primeiro** — conceitos mais fáceis
2. **Depois aprenda React** — mais vagas, mais recursos
3. **Resultado** — você entende ambas abordagens

---

## ✅ Desafio da Aula

### Reflexão

Responda mentalmente (ou escreva):

1. **Seu contexto atual:**
   - Trabalha com qual framework?
   - Está buscando emprego ou mantendo projeto?
   - Time pequeno ou grande?

2. **Seu próximo projeto:**
   - Requisitos de performance?
   - Precisa de biblioteca específica?
   - Prazo apertado?

3. **Sua decisão:**
   - Svelte, React, ou ambos fazem sentido?
   - O que você precisa aprender?

### Para Pesquisar

- Verifique vagas de Svelte na sua região
- Veja se as bibliotecas que você usa têm versão Svelte
- Experimente converter um componente React pequeno para Svelte

---

## 📚 Recursos

- [State of JS Survey](https://stateofjs.com)
- [Svelte Society](https://sveltesociety.dev)
- [Made with Svelte](https://madewithsvelte.com)
- [Svelte Jobs](https://sveltejobs.com)

---

**Próxima aula:** [2.8 — SvelteKit vs Next.js](./2.8-sveltekit-vs-nextjs.md)
