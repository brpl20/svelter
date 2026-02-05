---
title: "Performance e Tamanho do Bundle"
module: 2
order: 6
---

# 2.6 — Performance e Tamanho do Bundle

> Benchmarks reais e o impacto do compilador na performance.

## Objetivos da Aula

- Comparar tamanho de bundle entre Svelte e React
- Entender métricas de performance (LCP, TTI, FCP)
- Ver benchmarks de operações DOM
- Analisar quando cada framework performa melhor

---

## Tamanho do Bundle: A Grande Diferença

### Hello World

<div class="not-prose my-6">
  <div class="card bg-base-200 border border-base-content/10 shadow-sm overflow-hidden">
    <div class="bg-info/20 px-4 py-2 border-b border-base-content/10">
      <span class="font-bold text-base-content text-sm uppercase tracking-wide">Tamanho do Bundle — "Hello World"</span>
    </div>
    <div class="p-4 space-y-3">
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-40 shrink-0">React 18 + ReactDOM</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-info h-full rounded-full" style="width:100%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">42.2 KB (gzip)</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-40 shrink-0">Vue 3</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-success h-full rounded-full" style="width:54%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">22.8 KB (gzip)</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-40 shrink-0">Svelte 4</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-warning h-full rounded-full" style="width:6.6%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">2.8 KB (gzip)</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-40 shrink-0">Svelte 5</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-warning h-full rounded-full" style="width:10.7%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">4.5 KB (gzip)</span>
      </div>
    </div>
  </div>
</div>

### Aplicação Real (TodoMVC)

<div class="not-prose my-6">
  <div class="card bg-base-200 border border-base-content/10 shadow-sm overflow-hidden">
    <div class="bg-info/20 px-4 py-2 border-b border-base-content/10">
      <span class="font-bold text-base-content text-sm uppercase tracking-wide">Tamanho do Bundle — TodoMVC</span>
    </div>
    <div class="p-4 space-y-3">
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-40 shrink-0">React + ReactDOM + hooks</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-info h-full rounded-full" style="width:76.5%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-24 text-right shrink-0">52 KB (gzip)</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-40 shrink-0">React + Redux Toolkit</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-info h-full rounded-full" style="width:100%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-24 text-right shrink-0">68 KB</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-40 shrink-0">Vue 3 + Pinia</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-success h-full rounded-full" style="width:51.5%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-24 text-right shrink-0">35 KB</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-40 shrink-0">Svelte (stores nativos)</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-warning h-full rounded-full" style="width:11%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-24 text-right shrink-0">7.5 KB</span>
      </div>
    </div>
  </div>
</div>

### Por Que Essa Diferença?

```javascript
// React precisa enviar:
// 1. react (~2.5KB gzip)
// 2. react-dom (~40KB gzip)
// 3. scheduler (~5KB)
// 4. Seu código
// = 47.5KB + seu código

// Svelte envia:
// 1. Helpers mínimos (~2KB)
// 2. Seu código (compilado eficientemente)
// = 2KB + seu código
```

---

## Métricas de Performance

### Core Web Vitals

<div class="not-prose my-6">
  <div class="card bg-base-200 border border-base-content/10 shadow-sm overflow-hidden">
    <div class="bg-accent/20 px-4 py-2 border-b border-base-content/10">
      <span class="font-bold text-base-content text-sm uppercase tracking-wide">Core Web Vitals</span>
    </div>
    <div class="p-4 space-y-4">
      <div>
        <p class="font-semibold text-base-content text-sm">LCP (Largest Contentful Paint)</p>
        <p class="text-sm text-base-content/70 ml-3">&rarr; Quando o maior conteudo aparece</p>
        <p class="text-sm text-base-content/70 ml-3">&rarr; Meta: &lt; 2.5s</p>
      </div>
      <div>
        <p class="font-semibold text-base-content text-sm">FID (First Input Delay) / INP (Interaction to Next Paint)</p>
        <p class="text-sm text-base-content/70 ml-3">&rarr; Tempo ate responder a interacao</p>
        <p class="text-sm text-base-content/70 ml-3">&rarr; Meta: &lt; 100ms (FID) / &lt; 200ms (INP)</p>
      </div>
      <div>
        <p class="font-semibold text-base-content text-sm">CLS (Cumulative Layout Shift)</p>
        <p class="text-sm text-base-content/70 ml-3">&rarr; Quanto a pagina "pula" durante carregamento</p>
        <p class="text-sm text-base-content/70 ml-3">&rarr; Meta: &lt; 0.1</p>
      </div>
    </div>
  </div>
</div>

### Outras Métricas Importantes

```text
TTFB (Time to First Byte)
→ Tempo até primeiro byte do servidor
→ Afetado por: servidor, rede, CDN

FCP (First Contentful Paint)
→ Quando primeiro conteúdo aparece
→ Afetado por: tamanho do HTML, CSS crítico

TTI (Time to Interactive)
→ Quando a página fica interativa
→ Afetado por: tamanho do JS, hidratação
```

---

## Benchmark: Operações DOM

### js-framework-benchmark

Este benchmark testa operações comuns de UI:

<div class="not-prose my-6 space-y-4">
  <div class="card bg-base-200 border border-base-content/10 shadow-sm overflow-hidden">
    <div class="bg-warning/20 px-4 py-2 border-b border-base-content/10">
      <span class="font-bold text-base-content text-sm uppercase tracking-wide">Benchmark: Criar 1000 linhas</span>
    </div>
    <div class="p-4 space-y-3">
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-32 shrink-0">Svelte</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-warning h-full rounded-full" style="width:54.3%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">145ms</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-32 shrink-0">Vue 3</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-success h-full rounded-full" style="width:61.8%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">165ms</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-32 shrink-0">React (hooks)</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-info h-full rounded-full" style="width:74.2%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">198ms</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-32 shrink-0">Angular</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-error h-full rounded-full" style="width:100%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">267ms</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-32 shrink-0">Vanilla JS</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-neutral h-full rounded-full" style="width:50.2%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">134ms (baseline)</span>
      </div>
    </div>
  </div>
  <div class="card bg-base-200 border border-base-content/10 shadow-sm overflow-hidden">
    <div class="bg-warning/20 px-4 py-2 border-b border-base-content/10">
      <span class="font-bold text-base-content text-sm uppercase tracking-wide">Benchmark: Atualizar 1000 linhas (cada 10a)</span>
    </div>
    <div class="p-4 space-y-3">
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-32 shrink-0">Svelte</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-warning h-full rounded-full" style="width:59.9%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">85ms</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-32 shrink-0">Vue 3</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-success h-full rounded-full" style="width:73.9%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">105ms</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-32 shrink-0">React (hooks)</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-info h-full rounded-full" style="width:100%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">142ms</span>
      </div>
    </div>
  </div>
  <div class="card bg-base-200 border border-base-content/10 shadow-sm overflow-hidden">
    <div class="bg-warning/20 px-4 py-2 border-b border-base-content/10">
      <span class="font-bold text-base-content text-sm uppercase tracking-wide">Benchmark: Selecionar linha</span>
    </div>
    <div class="p-4 space-y-3">
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-32 shrink-0">Svelte</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-warning h-full rounded-full" style="width:32.8%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">4.2ms</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-32 shrink-0">React (hooks)</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-info h-full rounded-full" style="width:100%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">12.8ms</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-base-content w-32 shrink-0">Vue 3</span>
        <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
          <div class="bg-success h-full rounded-full" style="width:73.4%"></div>
        </div>
        <span class="text-sm font-mono text-base-content/70 w-28 text-right shrink-0">9.4ms</span>
      </div>
    </div>
  </div>
</div>

### Por Que Svelte é Mais Rápido?

```javascript
// React: Cada atualização
// 1. Executa função do componente
// 2. Cria objetos Virtual DOM
// 3. Diff com árvore anterior
// 4. Aplica mudanças

// Svelte: Cada atualização
// 1. Atualiza DOM diretamente (código gerado sabe exatamente o que mudou)

// Exemplo: Atualizar um contador
// React: ~15 operações JavaScript
// Svelte: ~3 operações JavaScript
```

---

## Hidratação: O Custo Oculto

### O Que é Hidratação?

<div class="not-prose my-6">
  <div class="card bg-base-200 border border-base-content/10 shadow-sm overflow-hidden">
    <div class="bg-accent/20 px-4 py-2 border-b border-base-content/10">
      <span class="font-bold text-base-content text-sm uppercase tracking-wide">SSR + Hidratacao</span>
    </div>
    <div class="p-4">
      <ul class="steps steps-vertical text-sm text-base-content">
        <li class="step step-primary">
          <div class="text-left"><span class="font-semibold">Servidor renderiza HTML</span><br/><span class="text-base-content/70">&rarr; HTML estatico chega ao navegador (FCP rapido!)</span></div>
        </li>
        <li class="step step-primary">
          <div class="text-left"><span class="font-semibold">JavaScript carrega</span><br/><span class="text-base-content/70">&rarr; Tamanho do bundle importa aqui</span></div>
        </li>
        <li class="step step-primary">
          <div class="text-left"><span class="font-semibold">Hidratacao acontece</span><br/><span class="text-base-content/70">&rarr; Framework "assume" o HTML estatico</span><br/><span class="text-base-content/70">&rarr; Adiciona event listeners</span><br/><span class="text-base-content/70">&rarr; Reconstroi estado</span></div>
        </li>
        <li class="step step-primary">
          <div class="text-left"><span class="font-semibold">Pagina fica interativa (TTI)</span></div>
        </li>
      </ul>
    </div>
  </div>
</div>

### Custo da Hidratação

<div class="not-prose my-6">
  <div class="card bg-base-200 border border-base-content/10 shadow-sm overflow-hidden">
    <div class="bg-error/20 px-4 py-2 border-b border-base-content/10">
      <span class="font-bold text-base-content text-sm uppercase tracking-wide">Tempo de Hidratacao — App Medio (100 componentes)</span>
    </div>
    <div class="p-4 space-y-3">
      <div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-base-content w-20 shrink-0">React</span>
          <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
            <div class="bg-info h-full rounded-full" style="width:100%"></div>
          </div>
          <span class="text-sm font-mono text-base-content/70 w-20 text-right shrink-0">~320ms</span>
        </div>
        <p class="text-xs text-base-content/50 ml-23 mt-0.5 pl-24">(precisa reconstruir Virtual DOM)</p>
      </div>
      <div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-base-content w-20 shrink-0">Vue</span>
          <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
            <div class="bg-success h-full rounded-full" style="width:68.75%"></div>
          </div>
          <span class="text-sm font-mono text-base-content/70 w-20 text-right shrink-0">~220ms</span>
        </div>
      </div>
      <div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-base-content w-20 shrink-0">Svelte</span>
          <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
            <div class="bg-warning h-full rounded-full" style="width:37.5%"></div>
          </div>
          <span class="text-sm font-mono text-base-content/70 w-20 text-right shrink-0">~120ms</span>
        </div>
        <p class="text-xs text-base-content/50 ml-23 mt-0.5 pl-24">(so adiciona listeners)</p>
      </div>
    </div>
  </div>
</div>

---

## Memória

### Consumo de RAM

<div class="not-prose my-6">
  <div class="card bg-base-200 border border-base-content/10 shadow-sm overflow-hidden">
    <div class="bg-error/20 px-4 py-2 border-b border-base-content/10">
      <span class="font-bold text-base-content text-sm uppercase tracking-wide">Memoria — App com 1000 itens</span>
    </div>
    <div class="p-4 space-y-3">
      <div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-base-content w-20 shrink-0">React</span>
          <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
            <div class="bg-info h-full rounded-full" style="width:100%"></div>
          </div>
          <span class="text-sm font-mono text-base-content/70 w-20 text-right shrink-0">15.2 MB</span>
        </div>
        <p class="text-xs text-base-content/50 mt-0.5 pl-24">(Virtual DOM + Fiber nodes + closures)</p>
      </div>
      <div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-base-content w-20 shrink-0">Vue</span>
          <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
            <div class="bg-success h-full rounded-full" style="width:75.7%"></div>
          </div>
          <span class="text-sm font-mono text-base-content/70 w-20 text-right shrink-0">11.5 MB</span>
        </div>
        <p class="text-xs text-base-content/50 mt-0.5 pl-24">(Proxy objects + dependency tracking)</p>
      </div>
      <div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-base-content w-20 shrink-0">Svelte</span>
          <div class="flex-1 bg-base-300 rounded-full h-5 overflow-hidden">
            <div class="bg-warning h-full rounded-full" style="width:51.3%"></div>
          </div>
          <span class="text-sm font-mono text-base-content/70 w-20 text-right shrink-0">7.8 MB</span>
        </div>
        <p class="text-xs text-base-content/50 mt-0.5 pl-24">(DOM nodes + minimal state)</p>
      </div>
    </div>
  </div>
</div>

---

## Quando React Pode Ser Mais Rápido

### Concurrent Mode e Suspense

```jsx
// React pode pausar renderização para manter UI responsiva
function HeavyList({ items }) {
  return (
    <Suspense fallback={<Skeleton />}>
      {items.map(item => (
        <ExpensiveItem key={item.id} data={item} />
      ))}
    </Suspense>
  )
}

// Transitions para updates de baixa prioridade
function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()

  function handleChange(e) {
    setQuery(e.target.value)
    startTransition(() => {
      setResults(searchItems(e.target.value))
    })
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results items={results} />
    </>
  )
}
```

### Quando Isso Importa

- Apps com interações muito pesadas
- Dashboards com muitos gráficos
- Editores de texto ricos
- Animações complexas durante updates

Svelte 5 está adicionando features similares com `$effect.pre()` e melhor scheduling.

---

## Comparativo Prático

### Cenário: Landing Page

```text
Requisitos:
- Carregar rápido
- SEO importante
- Pouca interatividade

Vencedor: SVELTE
- Bundle muito menor
- TTI mais rápido
- FCP melhor
```

### Cenário: Dashboard Admin

```text
Requisitos:
- Muita interatividade
- Muitos dados
- Usuário já autenticado (menos foco em TTI inicial)

Ambos funcionam bem, mas:
- Svelte: Updates mais rápidos, menor memória
- React: Ecossistema maior de componentes prontos
```

### Cenário: E-commerce

```text
Requisitos:
- Performance crítica (conversão!)
- SEO essencial
- Carrinho interativo

Vencedor: SVELTE (ou qualquer um com SSR bem feito)
- Bundle menor = menos abandono em mobile
- TTI menor = mais conversão
```

---

## Medindo na Prática

### Lighthouse

```bash
# Install
npm install -g lighthouse

# Run
lighthouse https://seu-site.com --view
```

### Web Vitals no Código

```javascript
// Com a biblioteca web-vitals
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals'

getCLS(console.log)   // Cumulative Layout Shift
getFID(console.log)   // First Input Delay
getLCP(console.log)   // Largest Contentful Paint
getFCP(console.log)   // First Contentful Paint
getTTFB(console.log)  // Time to First Byte
```

### Bundle Analyzer

```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default {
  plugins: [
    visualizer({
      open: true,
      gzipSize: true
    })
  ]
}
```

---

## ✅ Desafio da Aula

### Objetivo
Medir e comparar a performance de um componente em desenvolvimento.

### Instruções

1. Crie um componente que renderiza 500 itens
2. Adicione um botão que atualiza todos os itens
3. Meça o tempo de renderização inicial e de atualização
4. Use `performance.now()` para medir

### Componente Base

```svelte
<script>
  let items = Array.from({ length: 500 }, (_, i) => ({
    id: i,
    value: Math.random()
  }))

  function updateAll() {
    const start = performance.now()
    items = items.map(item => ({
      ...item,
      value: Math.random()
    }))
    // Como medir o tempo de renderização?
  }
</script>
```

### Spec de Verificação

- [ ] 500 itens são renderizados
- [ ] Botão atualiza todos os itens
- [ ] Tempo de atualização é exibido na tela
- [ ] Tempo é &lt; 50ms (se não, algo está errado!)

### Solução

<details>
<summary>🔍 Clique para ver a solução</summary>

```svelte
<script>
  import { tick } from 'svelte'

  let items = Array.from({ length: 500 }, (_, i) => ({
    id: i,
    value: Math.random()
  }))

  let renderTime = 0
  let updateCount = 0

  async function updateAll() {
    const start = performance.now()

    items = items.map(item => ({
      ...item,
      value: Math.random()
    }))

    // tick() espera o Svelte completar a atualização do DOM
    await tick()

    renderTime = (performance.now() - start).toFixed(2)
    updateCount++
  }

  // Medir renderização inicial
  import { onMount } from 'svelte'
  let initialRender = 0

  onMount(async () => {
    const start = performance.now()
    await tick()
    initialRender = (performance.now() - start).toFixed(2)
  })
</script>

<div class="stats">
  <p>Renderização inicial: {initialRender}ms</p>
  <p>Última atualização: {renderTime}ms</p>
  <p>Updates: {updateCount}</p>
  <button on:click={updateAll}>Atualizar Todos</button>
</div>

<div class="grid">
  {#each items as item (item.id)}
    <div class="item">
      {item.value.toFixed(4)}
    </div>
  {/each}
</div>

<style>
  .stats {
    position: sticky;
    top: 0;
    background: white;
    padding: 1rem;
    border-bottom: 1px solid #ccc;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 4px;
    padding: 1rem;
  }

  .item {
    padding: 8px;
    background: #f0f0f0;
    text-align: center;
    font-size: 0.75rem;
  }
</style>
```

</details>

---

**Próxima aula:** [2.7 — Ecossistema e Mercado de Trabalho](./2.7-ecossistema-mercado.md)
