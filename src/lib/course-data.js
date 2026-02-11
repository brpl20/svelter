export const modules = [
	{
		id: 1,
		title: 'Primeiros Passos',
		slug: 'modulo-01-primeiros-passos',
		lessons: [
			{ order: 1, title: 'O que é o Svelte', slug: '1.1-o-que-e-svelte' },
			{ order: 2, title: 'Criando um Projeto com sv create', slug: '1.2-criando-projeto-sv-create' },
			{ order: 3, title: 'Estrutura de Arquivos', slug: '1.3-estrutura-arquivos' },
			{ order: 4, title: 'Por que usamos pnpm', slug: '1.4-por-que-pnpm' },
			{ order: 5, title: 'TypeScript ou JavaScript', slug: '1.5-typescript-ou-javascript' }
		]
	},
	{
		id: 2,
		title: 'Configurações e Vite',
		slug: 'modulo-02-configuracoes-vite',
		lessons: [
			{ order: 1, title: 'O que é o Vite e por que ele existe', slug: '2.1-o-que-e-vite' },
			{ order: 2, title: 'Arquitetura do Vite', slug: '2.2-arquitetura-vite' },
			{ order: 3, title: 'Criando e Explorando um Projeto Vite', slug: '2.3-criando-projeto-vite' },
			{ order: 4, title: 'Configuração do vite.config.js', slug: '2.4-configuracao-vite' },
			{ order: 5, title: 'Plugins do Vite', slug: '2.5-plugins-vite' },
			{ order: 6, title: 'Variáveis de Ambiente e Modos', slug: '2.6-variaveis-ambiente' },
			{ order: 7, title: 'Build de Produção e Otimização', slug: '2.7-build-producao' },
			{ order: 8, title: 'Vite para Diferentes Frameworks', slug: '2.8-vite-frameworks' }
		]
	},
	{
		id: 3,
		title: 'Frontend: Tailwind e Plugins',
		slug: 'modulo-03-frontend-tailwind',
		lessons: [
			{ order: 1, title: 'Instalando Tailwind CSS', slug: '3.1-instalando-tailwind' },
			{ order: 2, title: 'Configurando DaisyUI', slug: '3.2-configurando-daisyui' },
			{ order: 3, title: 'Utilitários Essenciais do Tailwind', slug: '3.3-utilitarios-essenciais' },
			{ order: 4, title: 'Responsividade com Tailwind', slug: '3.4-responsividade' },
			{ order: 5, title: 'Temas e Dark Mode', slug: '3.5-temas-e-dark-mode' },
			{ order: 6, title: 'Plugins Úteis', slug: '3.6-plugins-uteis' }
		]
	},
	{
		id: 4,
		title: 'Svelte apenas no Frontend',
		slug: 'modulo-04-svelte-frontend',
		lessons: [
			{ order: 1, title: 'Svelte sem SvelteKit', slug: '4.1-svelte-sem-sveltekit' },
			{ order: 2, title: 'Componentes Básicos', slug: '4.2-componentes-basicos' },
			{ order: 3, title: 'Reatividade Simples', slug: '4.3-reatividade-simples' },
			{ order: 4, title: 'Eventos e Bindings', slug: '4.4-eventos-e-bindings' },
			{ order: 5, title: 'Projeto Frontend Puro', slug: '4.5-projeto-frontend-puro' }
		]
	},
	{
		id: 5,
		title: 'Svelte vs React',
		slug: 'modulo-05-svelte-vs-react',
		lessons: [
			{ order: 1, title: 'Filosofia: Compilador vs Runtime', slug: '5.1-filosofia-compilador-vs-runtime' },
			{ order: 2, title: 'Reatividade: Atribuição vs Hooks', slug: '5.2-reatividade-atribuicao-vs-hooks' },
			{ order: 3, title: 'Sintaxe de Templates vs JSX', slug: '5.3-templates-vs-jsx' },
			{ order: 4, title: 'Estado: Stores vs Context/Redux', slug: '5.4-estado-stores-vs-context' },
			{ order: 5, title: 'Estilização: CSS com Escopo vs CSS-in-JS', slug: '5.5-estilizacao-css-escopo' },
			{ order: 6, title: 'Performance e Tamanho do Bundle', slug: '5.6-performance-bundle' },
			{ order: 7, title: 'Ecossistema e Mercado de Trabalho', slug: '5.7-ecossistema-mercado' },
			{ order: 8, title: 'SvelteKit vs Next.js', slug: '5.8-sveltekit-vs-nextjs' }
		]
	},
	{
		id: 6,
		title: 'Testes Estáticos',
		slug: 'modulo-06-testes-estaticos',
		lessons: [
			{ order: 1, title: 'O que são Testes Estáticos', slug: '6.1-o-que-sao-testes-estaticos' },
			{ order: 2, title: 'ESLint: Configuração para Svelte', slug: '6.2-eslint-configuracao-svelte' },
			{ order: 3, title: 'Prettier: Formatação Automática', slug: '6.3-prettier-formatacao' },
			{ order: 4, title: 'svelte-check: Checagem de Tipos', slug: '6.4-svelte-check-tipos' },
			{ order: 5, title: 'TypeScript Strict Mode', slug: '6.5-typescript-strict-mode' },
			{ order: 6, title: 'Pre-commit Hooks (Husky + lint-staged)', slug: '6.6-pre-commit-hooks' }
		]
	},
	{
		id: 7,
		title: 'Aula Prática: Primeiro Projeto',
		slug: 'modulo-07-aula-pratica',
		lessons: [
			{ order: 1, title: 'Visão Geral do Projeto', slug: '7.1-visao-geral-projeto' },
			{ order: 2, title: 'Setup do Projeto do Zero', slug: '7.2-setup-projeto-zero' },
			{ order: 3, title: 'Criando Componentes e Páginas', slug: '7.3-criando-componentes-paginas' },
			{ order: 4, title: 'Estilização com Tailwind/DaisyUI', slug: '7.4-estilizacao-tailwind-daisyui' },
			{ order: 5, title: 'Navegação e Rotas', slug: '7.5-navegacao-rotas' },
			{ order: 6, title: 'Revisão e Próximos Passos', slug: '7.6-revisao-proximos-passos' }
		]
	},
	{
		id: 8,
		title: 'Svelte 5: Runes',
		slug: 'modulo-08-svelte5-runes',
		lessons: [
			{ order: 1, title: 'Introdução ao Svelte 5 e Runes', slug: '8.1-introducao-svelte5-runes' },
			{ order: 2, title: '$state — Estado Reativo', slug: '8.2-state-estado-reativo' },
			{ order: 3, title: '$derived — Valores Derivados', slug: '8.3-derived-valores-derivados' },
			{ order: 4, title: '$effect — Efeitos Colaterais', slug: '8.4-effect-efeitos-colaterais' },
			{ order: 5, title: '$props — Props com Runes', slug: '8.5-props-com-runes' },
			{ order: 6, title: '$bindable — Props Bindable', slug: '8.6-bindable-props' },
			{ order: 7, title: '$inspect — Debug Reativo', slug: '8.7-inspect-debug' },
			{ order: 8, title: 'Snippets — Nova Composição', slug: '8.8-snippets-composicao' },
			{ order: 9, title: 'Event Handlers no Svelte 5', slug: '8.9-event-handlers' },
			{ order: 10, title: 'Migração: Svelte 4 para 5', slug: '8.10-migracao-svelte4-5' }
		]
	},
	{
		id: 9,
		title: 'Templates e Renderização',
		slug: 'modulo-09-templates',
		lessons: [
			{ order: 1, title: 'Lógica no Template', slug: '9.1-logica-no-template' },
			{ order: 2, title: 'Each Blocks', slug: '9.2-each-blocks' },
			{ order: 3, title: 'If/Else Blocks', slug: '9.3-if-else-blocks' },
			{ order: 4, title: 'Await Blocks', slug: '9.4-await-blocks' },
			{ order: 5, title: 'Key Blocks', slug: '9.5-key-blocks' },
			{ order: 6, title: 'Renderização Condicional Avançada', slug: '9.6-renderizacao-condicional-avancada' }
		]
	},
	{
		id: 10,
		title: 'Componentes',
		slug: 'modulo-10-componentes',
		lessons: [
			{ order: 1, title: 'Anatomia de um Componente', slug: '10.1-anatomia-componente' },
			{ order: 2, title: 'Props e Comunicação', slug: '10.2-props-e-comunicacao' },
			{ order: 3, title: 'Slots e Children', slug: '10.3-slots-e-children' },
			{ order: 4, title: 'Ciclo de Vida', slug: '10.4-ciclo-de-vida' },
			{ order: 5, title: 'Composição de Componentes', slug: '10.5-composicao-de-componentes' },
			{ order: 6, title: 'Componentes Recursivos', slug: '10.6-componentes-recursivos' }
		]
	},
	{
		id: 11,
		title: 'Estilização CSS',
		slug: 'modulo-11-estilizacao-css',
		lessons: [
			{ order: 1, title: 'CSS com Escopo', slug: '11.1-css-com-escopo' },
			{ order: 2, title: 'Estilos Globais', slug: '11.2-estilos-globais' },
			{ order: 3, title: 'Variáveis CSS', slug: '11.3-variaveis-css' },
			{ order: 4, title: 'Classes Dinâmicas', slug: '11.4-classes-dinamicas' },
			{ order: 5, title: 'CSS com Tailwind no Svelte', slug: '11.5-css-com-tailwind-svelte' }
		]
	},
	{
		id: 12,
		title: 'Diretivas e Ações',
		slug: 'modulo-12-diretivas-acoes',
		lessons: [
			{ order: 1, title: 'Use Directive', slug: '12.1-use-directive' },
			{ order: 2, title: 'Ações Customizadas', slug: '12.2-acoes-customizadas' },
			{ order: 3, title: 'Bind Avançado', slug: '12.3-bind-avancado' },
			{ order: 4, title: 'Class e Style Directives', slug: '12.4-class-e-style-directives' },
			{ order: 5, title: 'Transition Directive', slug: '12.5-transition-directive' }
		]
	},
	{
		id: 13,
		title: 'Transições e Animações',
		slug: 'modulo-13-transicoes',
		lessons: [
			{ order: 1, title: 'Transições Básicas', slug: '13.1-transicoes-basicas' },
			{ order: 2, title: 'Transições Customizadas', slug: '13.2-transicoes-customizadas' },
			{ order: 3, title: 'Animate Directive', slug: '13.3-animate-directive' },
			{ order: 4, title: 'Motion e Spring', slug: '13.4-motion-e-spring' },
			{ order: 5, title: 'Animações de Lista', slug: '13.5-animacoes-de-lista' }
		]
	},
	{
		id: 14,
		title: 'Elementos Especiais',
		slug: 'modulo-14-elementos-especiais',
		lessons: [
			{ order: 1, title: 'svelte:head', slug: '14.1-svelte-head' },
			{ order: 2, title: 'svelte:window', slug: '14.2-svelte-window' },
			{ order: 3, title: 'svelte:body', slug: '14.3-svelte-body' },
			{ order: 4, title: 'svelte:element', slug: '14.4-svelte-element' },
			{ order: 5, title: 'svelte:component', slug: '14.5-svelte-component' },
			{ order: 6, title: 'svelte:boundary', slug: '14.6-svelte-boundary' }
		]
	},
	{
		id: 15,
		title: 'SvelteKit Fundamentos',
		slug: 'modulo-15-sveltekit-fundamentos',
		lessons: [
			{ order: 1, title: 'O que é SvelteKit', slug: '15.1-o-que-e-sveltekit' },
			{ order: 2, title: 'Criando um Projeto SvelteKit', slug: '15.2-projeto-sveltekit' },
			{ order: 3, title: 'Páginas e Componentes', slug: '15.3-paginas-e-componentes' },
			{ order: 4, title: 'Servidor e Cliente', slug: '15.4-servidor-e-cliente' },
			{ order: 5, title: 'Adapters', slug: '15.5-adapters' }
		]
	},
	{
		id: 16,
		title: 'Roteamento',
		slug: 'modulo-16-roteamento',
		lessons: [
			{ order: 1, title: 'Rotas Baseadas em Arquivos', slug: '16.1-rotas-baseadas-em-arquivos' },
			{ order: 2, title: 'Parâmetros Dinâmicos', slug: '16.2-parametros-dinamicos' },
			{ order: 3, title: 'Rotas Aninhadas', slug: '16.3-rotas-aninhadas' },
			{ order: 4, title: 'Grupos de Rotas', slug: '16.4-grupos-de-rotas' },
			{ order: 5, title: 'Redirecionamentos', slug: '16.5-redirecionamentos' },
			{ order: 6, title: 'Páginas de Erro', slug: '16.6-paginas-de-erro' }
		]
	},
	{
		id: 17,
		title: 'Carregamento de Dados',
		slug: 'modulo-17-carregamento-dados',
		lessons: [
			{ order: 1, title: 'Função Load', slug: '17.1-funcao-load' },
			{ order: 2, title: 'Page Server Load', slug: '17.2-page-server-load' },
			{ order: 3, title: 'Layout Load', slug: '17.3-layout-load' },
			{ order: 4, title: 'Invalidação de Dados', slug: '17.4-invalidacao-dados' },
			{ order: 5, title: 'Streaming', slug: '17.5-streaming' }
		]
	},
	{
		id: 18,
		title: 'Layouts e Erros',
		slug: 'modulo-18-layouts-erros',
		lessons: [
			{ order: 1, title: 'Layouts Aninhados', slug: '18.1-layouts-aninhados' },
			{ order: 2, title: 'Layout Groups', slug: '18.2-layout-groups' },
			{ order: 3, title: 'Páginas de Erro', slug: '18.3-paginas-de-erro' },
			{ order: 4, title: 'Error Boundaries', slug: '18.4-error-boundaries' },
			{ order: 5, title: 'Layout Reset', slug: '18.5-layout-reset' }
		]
	},
	{
		id: 19,
		title: 'API Routes e Form Actions',
		slug: 'modulo-19-api-routes-forms',
		lessons: [
			{ order: 1, title: 'Server Routes', slug: '19.1-server-routes' },
			{ order: 2, title: 'GET, POST, PUT, DELETE', slug: '19.2-get-post-put-delete' },
			{ order: 3, title: 'Form Actions Básico', slug: '19.3-form-actions-basico' },
			{ order: 4, title: 'Progressive Enhancement', slug: '19.4-progressive-enhancement' },
			{ order: 5, title: 'Validação Server-Side', slug: '19.5-validacao-server-side' }
		]
	},
	{
		id: 20,
		title: 'Formulários Avançados',
		slug: 'modulo-20-formularios-avancados',
		lessons: [
			{ order: 1, title: 'Superforms', slug: '20.1-superforms' },
			{ order: 2, title: 'Validação com Zod', slug: '20.2-validacao-com-zod' },
			{ order: 3, title: 'Upload de Arquivos', slug: '20.3-upload-de-arquivos' },
			{ order: 4, title: 'Formulários Multi-Step', slug: '20.4-formularios-multi-step' },
			{ order: 5, title: 'UX de Formulários', slug: '20.5-ux-de-formularios' }
		]
	},
	{
		id: 21,
		title: 'ORMs e Banco de Dados',
		slug: 'modulo-21-orms-banco-dados',
		lessons: [
			{ order: 1, title: 'Prisma Setup', slug: '21.1-prisma-setup' },
			{ order: 2, title: 'Drizzle Setup', slug: '21.2-drizzle-setup' },
			{ order: 3, title: 'Migrations', slug: '21.3-migrations' },
			{ order: 4, title: 'Queries e Mutations', slug: '21.4-queries-e-mutations' },
			{ order: 5, title: 'Relações e Joins', slug: '21.5-relacoes-e-joins' }
		]
	},
	{
		id: 22,
		title: 'Autenticação',
		slug: 'modulo-22-autenticacao',
		lessons: [
			{ order: 1, title: 'Conceitos de Autenticação', slug: '22.1-conceitos-de-auth' },
			{ order: 2, title: 'Lucia Auth', slug: '22.2-lucia-auth' },
			{ order: 3, title: 'OAuth Providers', slug: '22.3-oauth-providers' },
			{ order: 4, title: 'Sessões e Cookies', slug: '22.4-sessoes-e-cookies' },
			{ order: 5, title: 'Protegendo Rotas', slug: '22.5-protegendo-rotas' }
		]
	},
	{
		id: 23,
		title: 'SSR, CSR e SSG',
		slug: 'modulo-23-ssr-csr-ssg',
		lessons: [
			{ order: 1, title: 'Server-Side Rendering', slug: '23.1-server-side-rendering' },
			{ order: 2, title: 'Client-Side Rendering', slug: '23.2-client-side-rendering' },
			{ order: 3, title: 'Static Site Generation', slug: '23.3-static-site-generation' },
			{ order: 4, title: 'Prerendering', slug: '23.4-prerendering' },
			{ order: 5, title: 'Quando Usar Cada Um', slug: '23.5-quando-usar-cada-um' }
		]
	},
	{
		id: 24,
		title: 'Deploy',
		slug: 'modulo-24-deploy',
		lessons: [
			{ order: 1, title: 'Deploy na Vercel', slug: '24.1-vercel' },
			{ order: 2, title: 'Deploy na Netlify', slug: '24.2-netlify' },
			{ order: 3, title: 'Node Adapter', slug: '24.3-node-adapter' },
			{ order: 4, title: 'Static Adapter', slug: '24.4-static-adapter' },
			{ order: 5, title: 'Deploy com Docker', slug: '24.5-docker' }
		]
	},
	{
		id: 25,
		title: 'Integradores',
		slug: 'modulo-25-integradores',
		lessons: [
			{ order: 1, title: 'Stripe: Pagamentos', slug: '25.1-stripe-pagamentos' },
			{ order: 2, title: 'Resend: Emails', slug: '25.2-resend-emails' },
			{ order: 3, title: 'UploadThing', slug: '25.3-uploadthing' },
			{ order: 4, title: 'Sentry: Monitoramento', slug: '25.4-sentry-monitoramento' },
			{ order: 5, title: 'Analytics', slug: '25.5-analytics' }
		]
	},
	{
		id: 26,
		title: 'Estado Avançado',
		slug: 'modulo-26-estado-avancado',
		lessons: [
			{ order: 1, title: 'Stores Globais', slug: '26.1-stores-globais' },
			{ order: 2, title: 'Context API', slug: '26.2-context-api' },
			{ order: 3, title: 'State Machines', slug: '26.3-state-machines' },
			{ order: 4, title: 'Optimistic Updates', slug: '26.4-optimistic-updates' },
			{ order: 5, title: 'Cache Strategies', slug: '26.5-cache-strategies' }
		]
	},
	{
		id: 27,
		title: 'SvelteKit Avançado',
		slug: 'modulo-27-sveltekit-avancado',
		lessons: [
			{ order: 1, title: 'Hooks', slug: '27.1-hooks' },
			{ order: 2, title: 'Middleware', slug: '27.2-middleware' },
			{ order: 3, title: 'Service Workers', slug: '27.3-service-workers' },
			{ order: 4, title: 'Shallow Routing', slug: '27.4-shallow-routing' },
			{ order: 5, title: 'Snapshots', slug: '27.5-snapshots' }
		]
	},
	{
		id: 28,
		title: 'TypeScript Avançado',
		slug: 'modulo-28-typescript-avancado',
		lessons: [
			{ order: 1, title: 'Tipos Genéricos', slug: '28.1-tipos-genericos' },
			{ order: 2, title: 'Inferência no SvelteKit', slug: '28.2-inferencia-sveltekit' },
			{ order: 3, title: 'app.d.ts', slug: '28.3-app-d-ts' },
			{ order: 4, title: 'Type-Safe Forms', slug: '28.4-type-safe-forms' },
			{ order: 5, title: 'Utilitários de Tipo', slug: '28.5-utilitarios-de-tipo' }
		]
	},
	{
		id: 29,
		title: 'Testes Automatizados',
		slug: 'modulo-29-testes-automatizados',
		lessons: [
			{ order: 1, title: 'Teste de Code Blocks e Syntax Highlighting', slug: '29.1-teste-code' }
		]
	},
	{
		id: 30,
		title: 'Performance e SEO',
		slug: 'modulo-30-performance-seo',
		lessons: [
			{ order: 1, title: 'Core Web Vitals', slug: '30.1-core-web-vitals' },
			{ order: 2, title: 'Lazy Loading', slug: '30.2-lazy-loading' },
			{ order: 3, title: 'Image Optimization', slug: '30.3-image-optimization' },
			{ order: 4, title: 'SEO e Meta Tags', slug: '30.4-seo-meta-tags' },
			{ order: 5, title: 'Sitemap e Robots', slug: '30.5-sitemap-e-robots' }
		]
	},
	{
		id: 31,
		title: 'Ecossistema e Integrações',
		slug: 'modulo-31-ecossistema',
		lessons: [
			{ order: 1, title: 'Bibliotecas Svelte', slug: '31.1-bibliotecas-svelte' },
			{ order: 2, title: 'Headless UI', slug: '31.2-headless-ui' },
			{ order: 3, title: 'CMS e Integrações', slug: '31.3-cms-integracoes' },
			{ order: 4, title: 'Monorepos', slug: '31.4-monorepos' },
			{ order: 5, title: 'Contribuindo Open Source', slug: '31.5-contribuindo-open-source' }
		]
	},
	{
		id: 32,
		title: 'Projeto Final',
		slug: 'modulo-32-projeto-final',
		lessons: [
			{ order: 1, title: 'Planejamento do Projeto', slug: '32.1-planejamento' },
			{ order: 2, title: 'Setup e Arquitetura', slug: '32.2-setup-e-arquitetura' },
			{ order: 3, title: 'Implementação Core', slug: '32.3-implementacao-core' },
			{ order: 4, title: 'Estilização e UX', slug: '32.4-estilizacao-e-ux' },
			{ order: 5, title: 'Deploy e Conclusão', slug: '32.5-deploy-e-conclusao' }
		]
	}
];
