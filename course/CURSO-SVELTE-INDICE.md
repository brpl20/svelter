# Curso Completo de Svelte, SvelteKit & Vite

> Do zero ao deploy — construa aplicações web modernas, reativas e performáticas.

---

## Módulo 0 — Fundamentos e Ferramentas

### 0.1 O ecossistema JavaScript moderno
Visão geral do cenário atual: Node.js, navegadores modernos, transpiladores, bundlers e como tudo se conecta. Por que precisamos de tantas ferramentas e o que cada uma resolve.

### 0.2 Node.js e runtime JavaScript
O que é o Node.js, diferença entre Node.js e JavaScript no navegador, instalação e versionamento com nvm/fnm, verificação da instalação e conceitos básicos de execução.

### 0.3 npm — o gerenciador de pacotes padrão
Como funciona o npm, estrutura do `package.json`, `node_modules`, `package-lock.json`, comandos essenciais (`npm install`, `npm run`, `npm update`), scripts e lifecycle hooks.

### 0.4 pnpm — gerenciamento eficiente de pacotes
Por que o pnpm existe, vantagens sobre npm (economia de espaço com hard links, velocidade, segurança com node_modules não-flat), instalação e comandos básicos.

### 0.5 Yarn, Bun e outros gerenciadores
Visão geral do Yarn (clássico e berry), Bun como runtime e gerenciador, comparação de performance entre npm/pnpm/yarn/bun, tabela de equivalência de comandos e como escolher para seus projetos.

### 0.6 Dependências e versionamento semântico
`dependencies` vs `devDependencies`, versionamento semântico (semver), significado de `^` e `~`, lockfiles e sua importância, e resolvendo conflitos de versão.

### 0.7 Configuração do ambiente de desenvolvimento
Instalação do VS Code, extensões essenciais (Svelte for VS Code, ESLint, Prettier, EditorConfig), configuração de terminal e Git básico para versionamento de projetos.

### 0.8 Troubleshooting: problemas comuns de setup
Permissões do npm/pnpm, conflitos de versão do Node, limpeza de cache, problemas com node_modules e como resetar o ambiente.

---

## Módulo 1 — Fundamentos do Vite

### 1.1 O que é o Vite e por que ele existe
Contextualização histórica: os problemas de performance dos bundlers tradicionais (Webpack, Parcel) e como o Vite resolve isso com ESModules nativos e Hot Module Replacement ultrarrápido.

### 1.2 Arquitetura do Vite
Como o Vite funciona internamente: o servidor de desenvolvimento baseado em ESM, o papel do esbuild na pré-compilação de dependências e o uso do Rollup para o build de produção.

### 1.3 Criando e explorando um projeto Vite
Criação de um projeto do zero com `npm create vite@latest`, análise da estrutura de pastas, arquivos de entrada e o fluxo de execução desde o `index.html` até o navegador.

### 1.4 Configuração do `vite.config.js`
Exploração detalhada do arquivo de configuração: aliases de importação, definição de variáveis de ambiente, configuração de servidor (porta, proxy, HTTPS) e opções de build.

### 1.5 Plugins do Vite
Como o sistema de plugins funciona, anatomia de um plugin, plugins oficiais mais usados e como criar um plugin simples customizado para transformar arquivos.

### 1.6 Variáveis de ambiente e modos
Uso de arquivos `.env`, `.env.development`, `.env.production`, acesso via `import.meta.env`, variáveis públicas vs. privadas e criação de modos personalizados.

### 1.7 Build de produção e otimização
Processo de build com Rollup, code splitting automático, tree-shaking, minificação, análise do bundle com `rollup-plugin-visualizer` e estratégias para reduzir o tamanho final.

### 1.8 Vite para diferentes frameworks
Visão geral de como o Vite se integra com React, Vue e Svelte, destacando o `vite-plugin-svelte` e preparando o terreno para o restante do curso.

---

## Módulo 2 — Introdução ao Svelte

### 2.1 O que é Svelte e por que aprender
O que é o Svelte, sua história (criado por Rich Harris), a filosofia de "compilador, não runtime", por que gera JavaScript vanilla otimizado sem Virtual DOM, e o estado atual do ecossistema.

### 2.2 Svelte como compilador: como funciona por baixo dos panos
Explicação visual de como o Svelte transforma componentes `.svelte` em JavaScript imperativo no momento do build, diferença fundamental para frameworks baseados em runtime (React, Vue).

### 2.3 O Svelte REPL e playground
Uso do REPL oficial (svelte.dev/repl) para experimentação rápida, como funciona o compilador em tempo real, explorando exemplos oficiais e salvando/compartilhando código.

### 2.4 Criando o primeiro projeto Svelte com Vite
Criação de um projeto Svelte standalone com `npm create vite@latest` (template Svelte), análise da estrutura gerada, entendendo `App.svelte`, `main.js` e o fluxo de execução.

### 2.5 Anatomia de um componente `.svelte`
Estrutura de um arquivo `.svelte` com seus três blocos: `<script>`, `<style>` e markup HTML. Como o compilador processa cada bloco e gera o código final.

### 2.6 Primeiro componente: Hello World interativo
Criação de um componente simples com uma variável reativa, um botão que altera o estado e exibição dinâmica no template, entendendo o fluxo completo de reatividade.

### 2.7 Svelte standalone vs SvelteKit: quando usar cada um
Diferença entre usar Svelte puro com Vite (para widgets, SPAs simples, micro-frontends) e SvelteKit como framework fullstack. Guia de decisão para o aluno saber o que esperar no resto do curso.

---

## Módulo 3 — Svelte vs React: Entendendo as Diferenças

### 3.1 Filosofia: compilador vs runtime
Comparação fundamental entre o Svelte (que compila componentes em JavaScript otimizado no build) e o React (que carrega um runtime com Virtual DOM no navegador). Impacto no tamanho do bundle e na performance.

### 3.2 Reatividade: atribuição vs hooks
Como o Svelte torna qualquer variável reativa por atribuição simples enquanto o React exige `useState`, `useEffect` e regras de hooks. Exemplos lado a lado do mesmo componente nos dois frameworks.

### 3.3 Sintaxe de templates vs JSX
Comparação entre o sistema de templates do Svelte (`{#if}`, `{#each}`, `{#await}`) e o JSX do React. Vantagens e desvantagens de cada abordagem, legibilidade e curva de aprendizado.

### 3.4 Gerenciamento de estado: stores vs Context/Redux
Stores nativos do Svelte (`writable`, `derived`) comparados ao Context API, Redux, Zustand e Jotai do ecossistema React. Simplicidade vs flexibilidade e boilerplate envolvido.

### 3.5 Estilização: CSS com escopo vs CSS-in-JS
CSS nativo com escopo automático no Svelte vs soluções do React como styled-components, CSS Modules e Tailwind. Impacto na DX e na performance de renderização.

### 3.6 Performance e tamanho do bundle
Benchmarks reais comparando aplicações equivalentes em Svelte e React: tamanho do bundle, tempo de parse, métricas de interatividade (TTI, FCP) e uso de memória.

### 3.7 Ecossistema e mercado de trabalho
Comparação honesta do ecossistema: quantidade de bibliotecas, suporte corporativo, comunidade, vagas de emprego, maturidade e quando escolher cada framework para um projeto novo.

### 3.8 SvelteKit vs Next.js
Comparação dos meta-frameworks: roteamento, data loading, API routes, rendering strategies, middleware, deploy e DX geral. Equivalências e diferenças fundamentais.

---

## Módulo 4 — Reatividade no Svelte

### 4.1 Variáveis reativas e atribuições
Como o Svelte detecta mudanças de estado através de atribuições simples (`count = count + 1`), sem necessidade de `setState` ou `ref`. A "mágica" por trás da compilação.

### 4.2 Declarações reativas com `$:`
Uso do label reativo `$:` para criar valores derivados e efeitos colaterais que reagem automaticamente a mudanças em suas dependências.

### 4.3 Reatividade com objetos e arrays
Armadilhas comuns ao trabalhar com estruturas mutáveis: por que `array.push()` não dispara reatividade e como resolver com reatribuição ou spread operator.

### 4.4 Stores: estado global reativo
Introdução aos stores do Svelte — `writable`, `readable` e `derived`. Criação, subscrição manual com `.subscribe()` e uso da sintaxe automática `$store`.

### 4.5 Custom stores
Como encapsular lógica de negócio dentro de stores customizados, expondo apenas métodos específicos e criando uma API limpa para gerenciamento de estado complexo.

---

## Módulo 5 — Templates e Renderização

### 5.1 Expressões e interpolação no markup
Uso de chaves `{}` para inserir expressões JavaScript no HTML, incluindo chamadas de função, operadores ternários e acesso a propriedades de objetos.

### 5.2 Blocos condicionais: `{#if}`, `{:else if}`, `{:else}`
Renderização condicional de elementos no template, boas práticas para evitar duplicação e como o compilador otimiza essas estruturas.

### 5.3 Blocos de iteração: `{#each}`
Renderização de listas com `{#each}`, desestruturação no loop, uso do índice, importância da `key` para performance e o bloco `{:else}` para listas vazias.

### 5.4 Blocos de promessa: `{#await}`
Tratamento de dados assíncronos diretamente no template com `{#await}`, exibindo estados de loading, sucesso e erro sem necessidade de variáveis auxiliares.

### 5.5 HTML dinâmico com `{@html}`
Renderização de HTML bruto no template, casos de uso legítimos (conteúdo de CMS, markdown renderizado) e os riscos de XSS que exigem sanitização prévia.

### 5.6 Renderização de debug com `{@debug}`
Uso do bloco `{@debug}` para inspecionar variáveis diretamente no template durante o desenvolvimento, pausando a execução no DevTools do navegador.

---

## Módulo 6 — Componentes em Profundidade

### 6.1 Props: passando dados para componentes
Declaração de props com `export let`, valores padrão, tipagem implícita e o fluxo unidirecional de dados de pai para filho.

### 6.2 Spread de props e `$$props` / `$$restProps`
Passagem de múltiplas props de uma vez com spread operator, acesso a todas as props recebidas e encaminhamento de props desconhecidas para elementos internos.

### 6.3 Eventos de componente com `createEventDispatcher`
Criação de eventos customizados em componentes filhos, dispatch com payload, escuta no componente pai com `on:evento` e encaminhamento de eventos.

### 6.4 Binding bidirecional com `bind:`
Sincronização de estado entre pai e filho com `bind:value`, `bind:checked`, `bind:group` e `bind:this`. Quando usar e quando evitar binding bidirecional.

### 6.5 Slots: composição de componentes
Uso de `<slot>` para criar componentes que aceitam conteúdo filho, slots nomeados para múltiplas áreas de inserção e slot fallback para conteúdo padrão.

### 6.6 Slot props e o pattern render prop
Passagem de dados do componente filho para o conteúdo do slot usando `let:variavel`, permitindo que o pai acesse dados internos do filho — equivalente ao render prop do React.

### 6.7 `<svelte:component>` e componentes dinâmicos
Renderização dinâmica de componentes baseada em variáveis, útil para sistemas de tabs, wizards e qualquer cenário onde o componente exibido depende de estado.

### 6.8 `<svelte:element>` e elementos dinâmicos
Renderização de elementos HTML dinâmicos baseados em uma variável string, útil para componentes genéricos como tipografia (`h1`–`h6`) ou wrappers semânticos.

### 6.9 Contexto com `setContext` e `getContext`
Compartilhamento de dados entre componentes sem prop drilling, criação de contextos tipados e quando preferir contexto sobre stores.

### 6.10 Ciclo de vida: `onMount`, `onDestroy`, `beforeUpdate`, `afterUpdate`
As quatro funções de ciclo de vida do Svelte, seus casos de uso (fetch de dados, timers, integrações com libs externas) e como se comportam no servidor vs. cliente.

---

## Módulo 7 — Estilização: CSS no Svelte

### 7.1 CSS com escopo automático
Como o Svelte aplica escopo automaticamente aos estilos definidos dentro do componente, gerando classes únicas e evitando conflitos globais.

### 7.2 Estilos globais e `:global()`
Quando e como escapar do escopo local com o modificador `:global()`, estilização de elementos filhos de bibliotecas externas e boas práticas.

### 7.3 Classes dinâmicas e a diretiva `class:`
Aplicação condicional de classes CSS com a sintaxe abreviada `class:nome={condicao}`, múltiplas classes dinâmicas e uso conjunto com classes estáticas.

### 7.4 Estilos inline dinâmicos e a diretiva `style:`
Aplicação de estilos inline reativos com `style:propriedade={valor}`, suporte a unidades e comparação com a abordagem tradicional de `style=""`.

### 7.5 CSS variables dinâmicas com `--style-props`
Passagem de custom properties CSS como props de componente usando a sintaxe `--cor="red"`, criando componentes visuais altamente configuráveis.

### 7.6 CSS moderno: custom properties, funções e container queries
CSS Variables para temas dinâmicos, funções CSS (`calc`, `clamp`, `min`, `max`), container queries, nesting nativo e outras features modernas relevantes para componentização.

### 7.7 Pré-processadores CSS: Sass e PostCSS
Configuração de pré-processadores via `svelte-preprocess`, setup do Sass/SCSS, PostCSS com autoprefixer, e quando ainda faz sentido usar pré-processadores com CSS moderno.

### 7.8 Arquitetura de estilos e design tokens
Organização de CSS em projetos Svelte: variáveis globais de design (cores, espaçamento, tipografia), temas com custom properties, separação de estilos utilitários e de componentes.

---

## Módulo 8 — Tailwind CSS e Frameworks de UI

### 8.1 Introdução ao Tailwind CSS: filosofia utility-first
O que é Tailwind, vantagens e desvantagens do approach utility-first, quando usar Tailwind vs CSS tradicional, e visão geral do sistema de design.

### 8.2 Setup do Tailwind CSS com Svelte e Vite
Instalação passo a passo: `@tailwindcss/vite` ou PostCSS, configuração do `tailwind.config.js`, importação no CSS global, e diferenças entre Tailwind v3 e v4 (CSS-first config).

### 8.3 Sistema de design do Tailwind: cores, espaçamento e tipografia
Escala de cores padrão e customização, sistema de espaçamento, tipografia, e como estender/sobrescrever o tema no arquivo de configuração.

### 8.4 Layout com Tailwind: Flexbox, Grid e responsividade
Utilitários de flexbox e grid, sistema de breakpoints responsivos (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`), mobile-first approach e containers.

### 8.5 Estados, variantes e dark mode
Pseudo-classes (`hover:`, `focus:`, `active:`), estados de formulário, dark mode com `dark:`, group e peer variants, e composição de variantes.

### 8.6 Componentizando estilos: `@apply`, classes utilitárias e boas práticas
Quando usar `@apply` para criar abstrações de estilo, criação de classes customizadas, equilíbrio entre utilities e componentes, e patterns recomendados com Svelte.

### 8.7 Plugins do Tailwind: Typography, Forms e Container Queries
Instalação e uso dos plugins oficiais: `@tailwindcss/typography` para rich text, `@tailwindcss/forms` para inputs, `@tailwindcss/container-queries` e criação de plugins customizados.

### 8.8 DaisyUI: componentes prontos sobre Tailwind
Instalação como plugin do Tailwind, sistema de componentes (button, card, modal, navbar, etc.), temas built-in (30+), customização de temas, e quando escolher DaisyUI.

### 8.9 Skeleton UI: design system nativo para Svelte
Instalação e setup, componentes específicos para Svelte, sistema de temas e tokens de design, utilities e actions, e comparação com DaisyUI.

### 8.10 shadcn-svelte: componentes copiáveis e customizáveis
Filosofia do shadcn (copiar vs instalar como dependência), CLI de instalação, adição de componentes individuais ao projeto, customização total do código-fonte, e Bits UI como base.

### 8.11 Outras bibliotecas: Flowbite Svelte, Melt UI e Bits UI
Visão geral do Flowbite Svelte (componentes Tailwind), Melt UI (headless/unstyled builders), Bits UI (acessibilidade-first), quando usar cada uma e como combiná-las.

### 8.12 Guia de decisão: qual framework de UI escolher
Fluxograma prático para escolher entre CSS puro, Tailwind sem framework, DaisyUI, Skeleton, shadcn-svelte ou headless (Melt/Bits) baseado no tipo de projeto, necessidade de customização e experiência do time.

---

## Módulo 9 — Diretivas e Ações

### 9.1 Diretivas de evento: `on:` com modificadores
Escuta de eventos DOM com `on:click`, `on:submit` e modificadores como `|preventDefault`, `|stopPropagation`, `|once`, `|self` e `|capture`.

### 9.2 Diretivas de binding: `bind:` em formulários
Binding completo em elementos de formulário: inputs de texto, número, textarea, checkbox, radio, select, select múltiplo e range, com exemplos práticos.

### 9.3 Diretivas de binding: `bind:` em elementos e componentes
Bindings especiais: `bind:this` para referência ao elemento DOM, `bind:clientWidth`, `bind:scrollY`, `bind:innerHTML` e bindings de mídia (`bind:currentTime`, `bind:paused`).

### 9.4 Ações com `use:`
Criação de ações reutilizáveis que adicionam comportamento a elementos DOM: o que é uma action, como receber parâmetros, como fazer cleanup e exemplos práticos (tooltip, click outside, lazy load).

### 9.5 Ações avançadas: parâmetros reativos e TypeScript
Atualização de parâmetros de ações reativamente com a função `update`, tipagem de ações com TypeScript e criação de uma biblioteca de ações utilitárias.

---

## Módulo 10 — Transições e Animações

### 10.1 Transições com `transition:`
Aplicação de transições de entrada e saída com a diretiva `transition:fade`, `transition:slide`, `transition:fly`, `transition:scale` e seus parâmetros configuráveis.

### 10.2 Transições separadas: `in:` e `out:`
Aplicação de transições diferentes para entrada e saída de elementos, controle independente de duração, delay e easing.

### 10.3 Transições customizadas
Criação de transições personalizadas retornando objetos com `duration`, `css` e `tick`, entendendo como o Svelte aplica as transformações frame a frame.

### 10.4 Animações de lista com `animate:flip`
Uso da diretiva `animate:flip` em blocos `{#each}` com key para animar a reorganização suave de itens em listas ao adicionar, remover ou reordenar.

### 10.5 Motion: `tweened` e `spring`
Uso dos stores de movimento `tweened` para interpolações suaves e `spring` para animações com física realista, aplicados a valores numéricos, cores e coordenadas.

### 10.6 Transições e acessibilidade
Respeito à preferência `prefers-reduced-motion` do usuário, estratégias para manter transições acessíveis e como desabilitá-las condicionalmente.

---

## Módulo 11 — Elementos Especiais do Svelte

### 11.1 `<svelte:window>` e `<svelte:document>`
Escuta de eventos globais do window e document diretamente no componente, incluindo `resize`, `scroll`, `keydown` e bindings reativos como `bind:innerWidth`.

### 11.2 `<svelte:body>` e `<svelte:head>`
Adição de event listeners ao body e inserção dinâmica de elementos no `<head>` do documento (meta tags, títulos, links para fontes e stylesheets).

### 11.3 `<svelte:self>`
Renderização recursiva de um componente dentro de si mesmo, útil para árvores de comentários, menus aninhados, estruturas de pastas e qualquer dado recursivo.

### 11.4 `<svelte:fragment>`
Agrupamento de múltiplos elementos para inserção em slots nomeados sem adicionar um elemento wrapper desnecessário ao DOM.

---

## Módulo 12 — Introdução ao SvelteKit

### 12.1 O que é SvelteKit e sua arquitetura
Visão geral do SvelteKit como framework fullstack: roteamento baseado em sistema de arquivos, renderização híbrida (SSR/SSG/SPA), integração com Vite e o papel dos adapters.

### 12.2 Criando um projeto SvelteKit: o wizard `sv create` em detalhes
Comando `npx sv create` passo a passo: cada pergunta do wizard explicada — escolha de template (minimal, demo, library), linguagem (TypeScript vs JavaScript vs JSDoc), e o que cada opção implica.

### 12.3 Escolhendo o gerenciador de pacotes: npm, pnpm, yarn ou bun
Como usar cada gerenciador com SvelteKit (`npm create svelte`, `pnpm create svelte`, `bunx sv create`), diferenças práticas no lockfile e em scripts, e qual escolher para cada cenário.

### 12.4 Add-ons e ferramentas no setup: ESLint, Prettier, Vitest, Playwright
As opções de add-ons oferecidas pelo wizard: o que cada uma faz, quais selecionar para diferentes tipos de projeto e como a configuração gerada se integra.

### 12.5 Primeiro `dev` e entendendo o que acontece
Executando `npm run dev` (ou equivalente), entendendo o output do terminal, acessando a aplicação no navegador, Hot Module Replacement e o ciclo de desenvolvimento.

### 12.6 Estrutura do projeto em detalhes
Papel de cada arquivo e pasta: `src/routes`, `src/lib`, `src/app.html`, `static/`, `svelte.config.js`, `vite.config.js`, `tsconfig.json` e como tudo se conecta.

### 12.7 Arquivos especiais do SvelteKit: `+page`, `+layout`, `+server`, `+error`
O sistema de convenções de arquivos: o que cada prefixo `+` significa, a diferença entre `.js` e `.server.js`, hierarquia de resolução e como o SvelteKit os processa.

### 12.8 `$lib`, aliases e organização do código
O que é a pasta `$lib`, como usá-la para imports limpos, organização de componentes/utils/stores/server e configuração de aliases customizados no `svelte.config.js`.

### 12.9 Configuração do `svelte.config.js`
Opções de configuração do SvelteKit: adapters, aliases, paths, prerender, CSP, service workers e outras opções que definem o comportamento da aplicação.

### 12.10 Escolhendo o adapter: visão geral e impacto na arquitetura
O que são adapters, como influenciam o build e o deploy, visão geral dos adapters oficiais (auto, node, static, vercel, netlify, cloudflare) e quando escolher cada um — preparando o terreno para o módulo de deploy.

---

## Módulo 13 — Roteamento no SvelteKit

### 13.1 Rotas baseadas em sistema de arquivos
Criação de rotas pelo diretório `src/routes`, convenção de nomenclatura, mapeamento de pastas para URLs e a diferença entre `+page.svelte` e `+page.js`.

### 13.2 Rotas dinâmicas com `[param]`
Criação de rotas com segmentos dinâmicos, acesso aos parâmetros via `$page.params` e `load`, e uso de múltiplos parâmetros em uma mesma rota.

### 13.3 Rotas opcionais `[[param]]` e rest params `[...rest]`
Segmentos opcionais para rotas com ou sem parâmetro, rotas catch-all para caminhos de profundidade variável e implementação de páginas 404 customizadas.

### 13.4 Agrupamento de rotas com `(group)`
Organização de rotas em grupos lógicos sem afetar a URL usando parênteses, permitindo layouts compartilhados entre rotas que não são hierarquicamente relacionadas.

### 13.5 Navegação com `<a>`, `goto()` e `$app/navigation`
Navegação declarativa com links HTML, navegação programática com `goto()`, `invalidate()`, `invalidateAll()`, `beforeNavigate` e `afterNavigate`.

### 13.6 Matchers de parâmetros
Validação de parâmetros de rota com matchers customizados em `src/params/`, garantindo que apenas valores válidos ativem a rota (ex: apenas números, slugs, UUIDs).

---

## Módulo 14 — Carregamento de Dados

### 14.1 Função `load` em `+page.js`
Carregamento de dados universal (server + client) com a função `load`, recebendo `params`, `url`, `fetch` e retornando dados acessíveis via `export let data`.

### 14.2 Função `load` em `+page.server.js`
Carregamento de dados exclusivamente no servidor, acesso seguro a bancos de dados, variáveis de ambiente privadas e APIs internas sem expor credenciais.

### 14.3 Função `load` em layouts
Carregamento de dados compartilhados em `+layout.js` e `+layout.server.js`, herança de dados do layout para páginas filhas e otimização de requisições repetidas.

### 14.4 Invalidação e recarregamento de dados
Uso de `invalidate()` e `invalidateAll()` para forçar recarregamento de dados, `depends()` para definir dependências customizadas e streaming com promises.

### 14.5 `$page` store e dados da página
Acesso completo ao estado da página atual via `$page`: url, params, data, status, error, form e como usar essas informações em qualquer componente.

### 14.6 Streaming com promises na função `load`
Retorno de promises não resolvidas na `load` para streaming de dados, exibição progressiva de conteúdo com `{#await}` e melhoria de performance percebida.

---

## Módulo 15 — Layouts e Tratamento de Erros

### 15.1 Layouts: `+layout.svelte`
Criação de layouts que envolvem páginas com navegação, sidebar, footer e outros elementos persistentes, uso do `<slot>` e aninhamento de layouts.

### 15.2 Layouts nomeados e reset de layout
Uso de `@` para resetar a hierarquia de layouts em rotas específicas e aplicar um layout diferente do padrão herdado.

### 15.3 `+error.svelte` e tratamento de erros
Páginas de erro customizadas, hierarquia de captura de erros, acesso ao erro via `$page.error` e `$page.status`, e diferença entre erros esperados e inesperados.

### 15.4 `error()` e `redirect()` na função `load`
Lançamento intencional de erros HTTP e redirecionamentos dentro de funções `load` e actions, com controle do status code e mensagem.

### 15.5 Hooks: `handle`, `handleError`, `handleFetch`
Middleware do SvelteKit com `hooks.server.js`: interceptação de todas as requisições com `handle`, tratamento centralizado de erros com `handleError` e controle de fetch com `handleFetch`.

---

## Módulo 16 — API Routes e Form Actions

### 16.1 API Routes com `+server.js`
Criação de endpoints REST com handlers `GET`, `POST`, `PUT`, `PATCH`, `DELETE` em arquivos `+server.js`, retornando JSON, streams ou qualquer Response.

### 16.2 API Routes avançadas
Parâmetros dinâmicos em API routes, validação de entrada, tratamento de erros, CORS, headers customizados e streaming de respostas com ReadableStream.

### 16.3 Form Actions: `+page.server.js` actions
Processamento de formulários no servidor com actions `default` e nomeadas, acesso a `FormData`, validação, retorno de dados e redirecionamento pós-submit.

### 16.4 Progressive Enhancement com `use:enhance`
Aprimoramento progressivo de formulários com a action `use:enhance`, customização do comportamento de submit, feedback visual e atualização otimista da UI.

### 16.5 Validação de formulários
Estratégias de validação server-side e client-side, retorno de erros por campo, uso de bibliotecas como Zod ou Superforms, e feedback visual de validação.

---

## Módulo 17 — ORMs e Banco de Dados com SvelteKit

### 17.1 Panorama de ORMs e query builders para JavaScript/TypeScript
Visão geral das opções disponíveis: Prisma, Drizzle ORM, Kysely, Knex.js e TypeORM. Critérios de escolha — type-safety, performance, migrations, DX e suporte a edge runtimes.

### 17.2 Prisma com SvelteKit
Instalação e configuração do Prisma, definição do schema, geração do client, migrations com `prisma migrate`, seed de dados e integração com `+page.server.js` e `+server.js`.

### 17.3 Drizzle ORM com SvelteKit
Setup do Drizzle ORM com PostgreSQL/SQLite/MySQL, definição de schemas em TypeScript puro, queries type-safe, relações, migrations com `drizzle-kit` e comparação de DX com Prisma.

### 17.4 Conexão com banco de dados: patterns e boas práticas
Singleton de conexão para evitar múltiplas instâncias em dev, connection pooling com PgBouncer ou Prisma Accelerate, variáveis de ambiente e segurança de credenciais.

### 17.5 Migrations e versionamento de schema
Estratégias de migration: automática vs. manual, rollback, squash, seed de dados para desenvolvimento e integração de migrations com CI/CD.

### 17.6 Queries em `load` functions e form actions
Patterns para realizar queries no servidor — carregamento de dados em `load`, mutations em form actions, tratamento de erros de banco, serialização de dados e evitando vazamento de informações sensíveis.

### 17.7 Relacionamentos, paginação e filtros dinâmicos
Queries com joins e relações, implementação de paginação cursor-based e offset-based, filtros dinâmicos a partir de `url.searchParams` e ordenação parametrizada.

### 17.8 Bancos de dados serverless e edge
Uso de bancos compatíveis com edge runtimes: Turso (LibSQL), PlanetScale, Neon, D1 (Cloudflare) e Supabase. Configuração específica para adapters serverless e limitações de conexão.

---

## Módulo 18 — Autenticação e Autorização

### 18.1 Fundamentos de autenticação web
Conceitos essenciais: autenticação vs. autorização, sessões vs. tokens, cookies HttpOnly vs. JWT no localStorage, CSRF, XSS e por que o SvelteKit favorece cookies com sessões server-side.

### 18.2 Autenticação com Lucia Auth
Instalação e configuração do Lucia como biblioteca de auth para SvelteKit, criação de sessões, middleware no hook `handle`, tabelas de usuários e sessões no banco de dados.

### 18.3 Registro e login com email/senha
Fluxo completo de cadastro com hashing seguro (Argon2/bcrypt), login com verificação, criação de sessão, cookies e redirecionamento. Feedback de erros via form actions.

### 18.4 OAuth: Google, GitHub e Discord
Implementação de login social com provedores OAuth 2.0, fluxo de autorização, callback routes, vinculação de contas e tratamento de usuários novos vs. existentes.

### 18.5 Verificação de email e recuperação de senha
Envio de emails de verificação com tokens temporários, fluxo de "esqueci minha senha", reset seguro, expiração de tokens e integração com serviços de email (Resend, SendGrid).

### 18.6 Proteção de rotas e autorização baseada em roles
Middleware de autenticação no hook `handle`, verificação em `load` functions, redirecionamento de usuários não autenticados, sistema de roles/permissions e controle de acesso granular.

### 18.7 Sessões avançadas: refresh, revogação e multi-device
Refresh automático de sessões, invalidação seletiva (logout de um dispositivo) e global (logout de todos), listagem de sessões ativas e detecção de sessão expirada no cliente.

### 18.8 Auth com serviços externos: Auth.js, Clerk e Supabase Auth
Alternativas plug-and-play: configuração do Auth.js (NextAuth para Svelte), Clerk para auth gerenciada e Supabase Auth com Row Level Security. Prós e contras de cada abordagem.

### 18.9 Two-Factor Authentication (2FA) e Passkeys
Implementação de autenticação em dois fatores com TOTP (Google Authenticator), códigos de backup, e introdução a WebAuthn/Passkeys como futuro passwordless.

---

## Módulo 19 — Renderização: SSR, CSR, SSG e Estratégias Híbridas

### 19.1 Como a web renderiza: do servidor ao navegador
Linha do tempo da renderização web: sites estáticos → server-side (PHP/Rails) → SPAs → SSR moderno → renderização híbrida. Entendendo o ciclo request-response e o papel do JavaScript.

### 19.2 Server-Side Rendering (SSR) em profundidade
Como o SSR funciona no SvelteKit passo a passo: request chega ao servidor, `load` executa, componente renderiza para HTML, HTML é enviado, JavaScript hidrata no cliente. Vantagens para SEO, performance percebida e acessibilidade.

### 19.3 Client-Side Rendering (CSR) em profundidade
Como funciona uma SPA pura: HTML mínimo, JavaScript carrega e monta toda a interface. Quando CSR faz sentido (dashboards, apps autenticadas, ferramentas internas) e seus problemas com SEO e TTI.

### 19.4 Static Site Generation (SSG) e Prerendering
Geração de páginas estáticas no momento do build com `export const prerender = true`, quando usar, limitações com conteúdo dinâmico e hybrid rendering.

### 19.5 Hidratação: o que é e por que importa
O processo de hidratação explicado em detalhes: como o Svelte reconecta event listeners ao HTML estático do servidor, mismatches de hidratação, partial hydration e o custo da hidratação.

### 19.6 Streaming SSR e renderização progressiva
Como o SvelteKit transmite HTML progressivamente ao navegador, uso de promises na `load` para streaming, benefícios para TTFB e UX em conexões lentas.

### 19.7 Configuração por rota: `ssr`, `csr`, `prerender`
Controle granular da renderização exportando opções em `+page.js` e `+layout.js`. Exemplos práticos: landing page (SSG), dashboard (CSR), blog post (SSR), app híbrida.

### 19.8 ISR (Incremental Static Regeneration) e cache de rotas
Estratégias de cache no nível da rota, revalidação temporal com CDNs, stale-while-revalidate e como alcançar ISR-like behavior no SvelteKit com adapters Vercel/Netlify.

### 19.9 Edge Rendering e renderização distribuída
Execução de SSR em edge runtimes (Cloudflare Workers, Vercel Edge), benefícios de latência, limitações (sem Node.js APIs, bancos edge-only) e quando usar.

### 19.10 Comparativo prático: mesma página com SSR, CSR e SSG
Implementação da mesma feature (listagem de produtos) nas três estratégias, medindo métricas reais (TTFB, FCP, LCP, TTI) e analisando trade-offs com dados concretos.

---

## Módulo 20 — Adaptadores e Deploy

### 20.1 O que são adapters e como funcionam
Papel dos adapters no build do SvelteKit: transformação do output para o target de deploy, adapters oficiais vs. comunitários e como escolher o adapter certo.

### 20.2 Adapter Node
Deploy em servidores Node.js com `@sveltejs/adapter-node`, configuração de porta, host, variáveis de ambiente e uso com Docker e PM2.

### 20.3 Adapter Static
Geração de site estático completo com `@sveltejs/adapter-static`, configuração de fallback para SPA e deploy em serviços de hospedagem estática (GitHub Pages, S3).

### 20.4 Adapter Vercel
Deploy na Vercel com configuração de serverless functions, edge functions, ISR, variáveis de ambiente e integração com GitHub para deploy automático.

### 20.5 Adapter Netlify e Cloudflare
Deploy no Netlify com Netlify Functions e no Cloudflare com Workers/Pages, configuração específica de cada plataforma e uso de KV/D1 no Cloudflare.

### 20.6 Docker e self-hosting
Criação de Dockerfile otimizado para SvelteKit, multi-stage build, docker-compose com banco de dados, deploy em VPS (DigitalOcean, Railway, Fly.io) e configuração de reverse proxy com Nginx/Caddy.

### 20.7 Criando um adapter customizado
Estrutura interna de um adapter, como criar um adapter para uma plataforma ou servidor específico e entendendo o output do build.

---

## Módulo 21 — Integradores: Svelte com Backends Tradicionais

### 21.1 O conceito de Inertia.js e a arquitetura monolítica moderna
O que é Inertia.js, como ele elimina a necessidade de uma API REST entre frontend e backend, o protocolo Inertia (respostas JSON que viram páginas) e por que é popular com Laravel e Rails.

### 21.2 Inertia.js com Svelte e Ruby on Rails
Setup completo: gem `inertia_rails`, adapter Svelte para Inertia, configuração do Vite no Rails, criação de páginas Svelte servidas pelo Rails, compartilhamento de dados e layout persistente.

### 21.3 Inertia.js com Svelte e Laravel
Configuração do Laravel com Inertia e Svelte: starter kit Breeze/Jetstream, `HandleInertiaRequests` middleware, passagem de props do controller para componentes Svelte e SSR com Inertia.

### 21.4 Inertia.js com Svelte e Django
Integração do Django com Inertia usando `inertia-django`, configuração do Vite, views Django retornando respostas Inertia, compartilhamento de dados globais e autenticação.

### 21.5 Inertia.js: navegação, forms e features avançadas
Navegação client-side com `<Link>`, helper de formulários com progress indicator, validação server-side, scroll management, lazy loading de props e partial reloads.

### 21.6 Svelte como frontend de APIs: REST e GraphQL
Uso do Svelte/SvelteKit como camada de frontend consumindo APIs externas independentes: fetch em `load` functions, gerenciamento de tokens, cache e integração com clientes GraphQL (urql, Apollo).

### 21.7 Svelte com Phoenix LiveView (Elixir)
Integração de componentes Svelte em aplicações Phoenix através de hooks LiveView, comunicação bidirecional entre LiveView e Svelte, e casos de uso para interatividade rica em apps Elixir.

### 21.8 Svelte com WordPress (Headless CMS)
Uso do WordPress como backend headless com WPGraphQL ou REST API, consumo de conteúdo em SvelteKit, prerendering de posts, preview mode e deploy estático de blogs.

### 21.9 Micro-frontends: Svelte como parte de uma arquitetura maior
Uso do Svelte em arquiteturas micro-frontend com Module Federation (Vite), Web Components (`<svelte:options customElement>`), iframe embedding e comunicação entre micro-apps.

### 21.10 Quando usar SvelteKit standalone vs. integrador
Guia de decisão: quando faz sentido usar SvelteKit como framework fullstack, quando usar Inertia com um backend existente, quando consumir APIs externas e como migrar gradualmente.

---

## Módulo 22 — Estado Avançado e Gerenciamento de Dados

### 22.1 Stores do SvelteKit: `$app/stores`
Uso dos stores nativos `page`, `navigating` e `updated` para acessar informações de navegação, estado de carregamento e atualizações da aplicação.

### 22.2 Estado compartilhado entre cliente e servidor
Armadilhas de estado global no servidor (compartilhamento entre requisições), isolamento correto de estado por usuário e uso de `locals` no handle hook.

### 22.3 Gerenciamento de estado com Svelte stores avançados
Patterns avançados: stores compostos, stores assíncronos, máquinas de estado com stores, persistência em localStorage e sincronização entre abas.

---

## Módulo 23 — SvelteKit Avançado

### 23.1 Service Workers com `$service-worker`
Criação de service workers com acesso à lista de assets do build, estratégias de cache (cache-first, network-first), suporte offline e sincronização em background.

### 23.2 Snapshots: preservando estado de UI
Uso de snapshots para preservar e restaurar o estado da interface (posição de scroll, conteúdo de inputs) quando o usuário navega para frente e para trás.

### 23.3 Shallow routing
Navegação que atualiza a URL sem executar uma navegação completa, útil para modais, filtros e estados que devem ser refletidos na URL sem recarregar dados.

### 23.4 Variáveis de ambiente no SvelteKit
Uso dos módulos `$env/static/private`, `$env/static/public`, `$env/dynamic/private` e `$env/dynamic/public` para acesso seguro e tipado a variáveis de ambiente.

### 23.5 Link options e data attributes
Configuração de comportamento de navegação com `data-sveltekit-preload-data`, `data-sveltekit-preload-code`, `data-sveltekit-reload` e `data-sveltekit-noscroll`.

### 23.6 Content Security Policy (CSP) e segurança
Configuração de CSP no SvelteKit, proteção contra XSS, nonces para scripts inline, CSRF protection nativo e headers de segurança.

---

## Módulo 24 — TypeScript com Svelte e SvelteKit

### 24.1 Configurando TypeScript
Setup de TypeScript no projeto, `tsconfig.json`, configuração do `svelte-check`, tipagem automática gerada pelo SvelteKit e integração com o editor.

### 24.2 Tipando componentes Svelte
Tipagem de props, eventos, slots e contexto em componentes `.svelte`, uso de `$$Props`, `$$Events`, `$$Slots` e generics em componentes.

### 24.3 Tipando funções `load`, actions e API routes
Tipagem automática com `PageLoad`, `PageServerLoad`, `Actions`, `RequestHandler` e como o SvelteKit gera tipos a partir da estrutura de rotas.

### 24.4 Tipagem de stores e estado
Tipagem de stores writable, readable, derived e customizados, inference de tipos e criação de stores fortemente tipados.

---

## Módulo 25 — Testes

### 25.1 Testes unitários com Vitest
Configuração do Vitest com Svelte, testes de funções utilitárias, stores e lógica isolada de componentes com exemplos práticos.

### 25.2 Testes de componentes com Testing Library
Setup do `@testing-library/svelte`, renderização de componentes em testes, queries, simulação de eventos e asserções sobre o DOM.

### 25.3 Testes end-to-end com Playwright
Configuração do Playwright com SvelteKit, escrita de testes de fluxo completo, fixtures, seletores e testes em múltiplos navegadores.

### 25.4 Testes de API routes e form actions
Estratégias para testar endpoints e actions do servidor, mocking de dependências externas e testes de integração com banco de dados.

---

## Módulo 26 — Performance e Otimização

### 26.1 Core Web Vitals e métricas de performance
Entendendo LCP, FID/INP, CLS, TTFB, FCP e TTI: o que cada métrica mede, como o Google usa para ranking e como medi-las com Lighthouse, PageSpeed Insights e Web Vitals.

### 26.2 Análise de performance e profiling
Ferramentas para identificar gargalos: Chrome DevTools Performance tab, Network waterfall, bundle analysis com `rollup-plugin-visualizer`, flamegraphs e memory profiling.

### 26.3 Impacto da estratégia de renderização na performance
Análise prática de como SSR, CSR e SSG afetam cada Core Web Vital, quando cada estratégia ganha ou perde e como a renderização híbrida do SvelteKit permite otimizar por rota.

### 26.4 Lazy loading e code splitting
Importação dinâmica de componentes e módulos, code splitting automático por rota no SvelteKit, componentes carregados sob demanda e estratégias para reduzir o JavaScript inicial.

### 26.5 Otimização de imagens
Uso de `@sveltejs/enhanced-img`, formatos modernos (WebP, AVIF), srcset responsivo, lazy loading nativo, CDNs de imagem (Cloudinary, imgix) e placeholder blur-up.

### 26.6 Preloading, prefetching e speculative loading
Estratégias de preload de dados e código, configuração de `preloadData` e `preloadCode`, Speculation Rules API, quando usar cada abordagem e impacto mensurável no UX.

### 26.7 Otimização de fontes e CSS crítico
Subsetting de fontes, `font-display: swap`, preload de fontes críticas, inlining de CSS acima do fold e eliminação de CSS não utilizado.

### 26.8 Caching: CDN, service workers e stale-while-revalidate
Estratégias de cache em múltiplas camadas: cache headers HTTP, CDN edge caching, service worker cache, `Cache-Control`, ETags e invalidação inteligente.

### 26.9 SEO com SvelteKit
Meta tags dinâmicas com `<svelte:head>`, Open Graph, Twitter Cards, sitemap.xml, robots.txt, structured data (JSON-LD), canonical URLs e boas práticas de SEO técnico.

---

## Módulo 27 — Ecossistema e Integrações

### 27.1 Integração com bibliotecas de dados e visualização
Uso de bibliotecas de gráficos e dados com Svelte: Chart.js, D3, Plotly, mapas (Leaflet/Mapbox), editores rich text e outras integrações do ecossistema.

### 27.2 Integração com CMSs headless
Conexão com Strapi, Sanity, Contentful e Directus. Fetch de conteúdo na função `load`, preview mode, webhooks para rebuild e tipagem do conteúdo.

### 27.3 Integração com Supabase e Firebase
Configuração de BaaS com SvelteKit: autenticação, Realtime subscriptions, storage de arquivos, row-level security (Supabase) e Firestore rules (Firebase).

### 27.4 Internacionalização (i18n)
Implementação de múltiplos idiomas com `paraglide`, rotas localizadas, detecção automática de idioma, troca de idioma e tradução de conteúdo dinâmico.

### 27.5 Formulários avançados com Superforms
Setup do Superforms com Zod, validação client e server-side, feedback visual, campos dinâmicos, arrays, formulários aninhados e multi-step forms.

---

## Módulo 28 — Svelte 5: Runes (Novo Paradigma de Reatividade)

### 28.1 Introdução ao Svelte 5 e Runes
O que muda no Svelte 5, por que a equipe optou por Runes, migração do modelo reativo baseado em compilação para signals explícitos e compatibilidade com código legado.

### 28.2 `$state` — estado reativo
Declaração de estado reativo com `$state`, deep reactivity em objetos e arrays, comparação com `let` do Svelte 4 e uso em classes.

### 28.3 `$derived` — valores derivados
Substituição do `$:` por `$derived` e `$derived.by()`, valores computados que reagem automaticamente a mudanças, memoização e otimização.

### 28.4 `$effect` — efeitos colaterais
Substituição de `$:` para side effects por `$effect`, controle de dependências, cleanup automático, `$effect.pre` e `$effect.root`.

### 28.5 `$props` — props com Runes
Nova forma de declarar props com `$props()`, desestruturação com valores padrão, rest props e comparação com `export let`.

### 28.6 `$bindable` — props bindable
Declaração explícita de props que aceitam binding bidirecional com `$bindable`, tornando o contrato do componente mais claro.

### 28.7 `$inspect` — debugging reativo
Uso de `$inspect` para debugar valores reativos durante o desenvolvimento, equivalente a um `console.log` que reage automaticamente a mudanças.

### 28.8 Snippets e a substituição dos Slots
Novo sistema de composição com `{#snippet}` e `{@render}`, substituindo slots, maior flexibilidade e tipagem, e passagem de snippets como props.

### 28.9 Event handlers no Svelte 5
Mudança de `on:click` para `onclick`, props de callback vs. event dispatching, e a simplificação do modelo de eventos.

### 28.10 Migrando do Svelte 4 para Svelte 5
Guia passo a passo de migração, uso do script de migração automática `npx sv migrate`, equivalências de API e patterns de compatibilidade.

---

## Módulo 29 — Projeto Final

### 29.1 Planejamento e arquitetura do projeto
Definição do escopo do projeto final (aplicação fullstack), wireframes, modelagem de dados, definição da stack e estruturação do repositório.

### 29.2 Setup do projeto com SvelteKit + TypeScript + Tailwind
Inicialização do projeto com todas as ferramentas configuradas: TypeScript, ESLint, Prettier, Tailwind CSS com framework de UI escolhido, Vitest, Playwright e banco de dados com Drizzle/Prisma.

### 29.3 Implementação da autenticação
Sistema de login/registro com múltiplas estratégias (email/senha + OAuth), proteção de rotas, middleware de autenticação e gerenciamento de sessão.

### 29.4 CRUD completo com ORM e form actions
Implementação das funcionalidades principais com formulários progressivamente aprimorados, validação com Zod, feedback visual e otimistic updates.

### 29.5 Dashboard com dados em tempo real
Construção de um painel com gráficos, tabelas e filtros, atualização em tempo real com Server-Sent Events ou WebSockets e lazy loading de componentes pesados.

### 29.6 Testes automatizados do projeto
Escrita de testes unitários, de componente e end-to-end para as funcionalidades implementadas, cobertura de código e integração contínua com GitHub Actions.

### 29.7 Otimização de performance
Audit completo de performance com Lighthouse, implementação de lazy loading, otimização de imagens, caching estratégico e alcance de score 90+ em todas as métricas.

### 29.8 Deploy em produção
Build final otimizado, escolha do adapter, configuração de variáveis de ambiente, deploy na plataforma escolhida (Vercel/Netlify/Docker), monitoramento e observabilidade.

---

## Apêndices

### A — Referência rápida: sintaxe do Svelte 4 e Svelte 5
Cheat sheet comparativa com toda a sintaxe do Svelte 4 (stores, `$:`, `export let`) e Svelte 5 (Runes, `$state`, `$derived`) lado a lado.

### B — Referência rápida: convenções de arquivos do SvelteKit
Tabela completa de todos os arquivos especiais do SvelteKit (`+page`, `+layout`, `+server`, `+error`, `hooks`, etc.) com descrição e exemplo de uso.

### C — Svelte vs React: tabela de equivalências
Mapeamento direto de conceitos e APIs entre Svelte/SvelteKit e React/Next.js para desenvolvedores migrando entre frameworks.

### D — Guia de decisão: qual estratégia de renderização usar
Fluxograma prático para escolher entre SSR, CSR, SSG, streaming e edge rendering baseado no tipo de conteúdo, requisitos de SEO e perfil de usuário.

### E — Guia de decisão: SvelteKit standalone vs. integrador
Fluxograma para decidir entre usar SvelteKit como fullstack, Inertia com backend existente ou Svelte como frontend de APIs, baseado no contexto do projeto.

### F — Guia de decisão: qual framework de UI escolher
Fluxograma para escolher entre CSS puro, Tailwind, DaisyUI, Skeleton, shadcn-svelte ou headless, baseado no projeto e nível de customização.

### G — Troubleshooting: erros comuns
Lista dos erros mais frequentes ao trabalhar com Svelte e SvelteKit, suas causas e soluções, incluindo problemas de hidratação, ESM, ORMs e deploy.

### H — Recursos recomendados
Curadoria de documentações oficiais, blogs, canais do YouTube, podcasts, comunidades Discord/Reddit e projetos open source de referência para continuar aprendendo.

---

> **Total: 30 módulos (0–29) · ~175 aulas · 8 apêndices**
> Cobertura completa: Ferramentas → Vite → Svelte (intro + comparação) → Svelte 4 → CSS & Tailwind & UI Frameworks → SvelteKit (setup detalhado) → ORMs → Auth → SSR/CSR/SSG → Integradores (Inertia) → Svelte 5 (Runes) → Deploy → Projeto Final.
