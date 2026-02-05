# Análise: 30-Days-Svelte-Chinese-Course

> Comparação com CURSO-SVELTE-INDICE.md — O que está faltando no índice principal

---

## Estrutura do Curso de 30 Dias

| Dias | Foco |
|------|------|
| 1-11 | Fundamentos do Svelte |
| 12-20 | **Projetos Práticos de UI** ⭐ |
| 21 | **Visualização de Dados com D3** ⭐ |
| 22 | Experiência do Autor & Dicas |
| 23-30 | **Internos do Compilador Svelte** ⭐ |

---

## Conteúdo Único NÃO presente no CURSO-SVELTE-INDICE.md

### 1. Projetos Práticos de UI (Dias 12-20)

| Aula | Tópico | Conceitos Ensinados |
|------|--------|---------------------|
| **12** | API Handling + Interação UI | AbortController, cancelamento de requisições, stores para estado de API, estados loading/error/success |
| **13** | Implementação de Modal | Focus trap, ESC para fechar, click no overlay, bloqueio de scroll do body, ARIA (`role="dialog"`, `aria-labelledby`), `<svelte:component>` |
| **14** | Slider Customizado + Filtragem de Lista | Eventos mouse/touch, `getBoundingClientRect`, navegação por teclado, debounce, animações FLIP, diretiva `use:`, atributos ARIA slider |
| **15** | Implementação de Tabela | Ordenação, filtragem, paginação |
| **16** | ComboBox/Autocomplete | Navegação por teclado, posicionamento de dropdown, filtragem de busca |
| **17** | Player de Áudio | `bind:duration`, `bind:currentTime`, `bind:paused`, `bind:muted`, `bind:volume`, atalhos de teclado customizados com `use:` |
| **18** | Visualizador de Imagens | Lightbox, zoom, navegação |
| **19** | Fila de Notificações (Toast) | Store como fila, auto-dismiss com timeout, animação FLIP, `aria-live="polite"` |
| **20** | Tooltip | Posicionamento, delays de hover, padrão `use:` action |

### 2. Visualização de Dados com D3.js (Dia 21)

- Integração D3 `scaleLinear` com reatividade Svelte
- Construção de gráfico de barras SVG
- Atualizações reativas de dados usando `$:`
- Sistemas de coordenadas e renderização de eixos
- Exemplo com dados reais de COVID-19

### 3. Internos do Compilador Svelte (Dias 23-30)

| Aula | Tópico |
|------|--------|
| **23** | Como o Svelte compila código — Visão geral da AST, estrutura do Parser |
| **24** | Compilação continuada — Rastreamento de variáveis, geração de dependências |
| **25** | Teoria de parsing de sintaxe HTML/Svelte |
| **26** | Construindo um parser HTML do zero |
| **27** | Implementando blocos If/Each em mini-Svelte |
| **28-30** | Geração de código — Construindo um compilador Svelte simplificado |

**Conceitos-chave:**
- Uso do Acorn (parser JS)
- CSS-Tree para parsing de estilos
- Manipulação de AST (Abstract Syntax Tree)
- Internos da função `invalidate()`
- Mecanismo de dirty checking
- Por que `eval()` quebra otimizações compile-time do Svelte

---

## Padrões Específicos Faltando no Índice

### Do Modal (Aula 13):
```
- Implementação de focus trap
- Bloqueio de scroll do body (document.body.classList)
- Manipulação de eventos de teclado (ESC para fechar)
- Detecção de click-outside (e.target === e.currentTarget)
- Gerenciamento de modal baseado em store
- Renderização dinâmica de componentes para conteúdo do modal
- Acessibilidade: role="dialog", aria-labelledby, aria-modal
```

### Do Slider (Aula 14):
```
- Action `use:` customizada para atalhos de teclado
- Coordenação de eventos mouse/touch
- Prevenção de scroll durante drag
- getBoundingClientRect para cálculo de posição
- Debouncing de mudanças de estado
- Atributos ARIA para slider
```

### Do Player de Áudio (Aula 17):
```
- Bindings de elementos de mídia (mágica do bind: do Svelte)
- Sistema customizado de atalhos de teclado com use: actions
- Utilitários de formatação de tempo
```

### Das Notificações (Aula 19):
```
- Padrão de store como fila
- Auto-dismiss com limpeza de setTimeout
- Regiões aria-live para acessibilidade
- Animação FLIP em mudanças de lista
```

---

## Módulos Sugeridos para Adicionar ao CURSO-SVELTE-INDICE.md

```markdown
## Módulo XX — Componentes UI Práticos

### XX.1 API Handling e Estados de Carregamento
Gerenciamento de estados loading/success/error, AbortController para cancelamento
de requisições, stores para estado de API compartilhado.

### XX.2 Modal/Dialog Acessível
Focus trap, bloqueio de scroll do body, fechamento via ESC e click no overlay,
ARIA attributes (role="dialog", aria-labelledby, aria-modal="true"),
componentes dinâmicos com <svelte:component>.

### XX.3 Slider Customizado
Eventos de mouse/touch, cálculo de posição com getBoundingClientRect,
navegação por teclado, debounce, ARIA slider (aria-valuemin/max/now).

### XX.4 Sistema de Notificações (Toast)
Store como fila, auto-dismiss com timeout, animações FLIP,
aria-live para anúncios de screen reader.

### XX.5 Audio/Video Player
Bindings de mídia (bind:duration, bind:currentTime, bind:paused, bind:volume),
controles customizados, sistema de atalhos de teclado com use: actions.

### XX.6 ComboBox/Autocomplete
Navegação por teclado, posicionamento de dropdown, filtragem em tempo real.

### XX.7 Galeria de Imagens
Lightbox, navegação, lazy loading.

---

## Módulo XX — Visualização de Dados com D3.js

### XX.1 Integração Svelte + D3
Uso de D3 scales com reatividade Svelte, SVG declarativo.

### XX.2 Gráfico de Barras Reativo
Eixos, escalas, bindings de dados, transições.

### XX.3 Gráficos de Linha e Área
Path generation, interpolation, responsive charts.

---

## Módulo XX — Internos do Compilador Svelte (Avançado)

### XX.1 Arquitetura do Compilador
Parser HTML customizado, Acorn para JavaScript, CSS-Tree para estilos.

### XX.2 Abstract Syntax Tree (AST)
Estrutura da AST do Svelte, nós HTML, Instance, CSS.

### XX.3 Sistema de Reatividade Interno
Função invalidate(), dirty checking, dependency tracking.

### XX.4 Construindo um Mini-Svelte
Implementação simplificada do compilador para entender os fundamentos.
```

---

## Resumo Comparativo

| Categoria | Seu Índice | Curso 30 Dias |
|-----------|------------|---------------|
| **Componentes UI Práticos** | ❌ Apenas teoria | ✅ 9 implementações completas |
| **Integração D3.js** | ❌ Ausente | ✅ 1 aula |
| **Internos do Compilador** | ❌ Ausente | ✅ 7+ aulas |
| **Padrões de Acessibilidade** | 🟡 Menção breve | ✅ Detalhado por componente |
| **`use:` Actions na Prática** | 🟡 Cobertura básica | ✅ Exemplos reais |
| **Padrões de Store para UI** | 🟡 Básico | ✅ Modal store, fila de notificações |

---

## Também do 7 Projects To Learn Svelte 5

Projetos práticos adicionais que ensinam padrões importantes:

| Projeto | Conceitos |
|---------|-----------|
| **Counter** | `$state` básico |
| **Temperature Converter** | Binding bidirecional com classes (getters/setters) |
| **Flight Booker** | Validação de formulários, constraints condicionais |
| **Timer** | `$effect` cleanup, gerenciamento de `setInterval` |
| **CRUD App** | Filtragem, sincronização de estado, valores derivados |
| **Circle Drawer** | Manipulação SVG, **padrão undo/redo** (snapshots) |
| **Spreadsheet** | Arrays 2D, parsing de fórmulas, reatividade recursiva |

---

## Conclusão

O curso de 30 dias é particularmente valioso pela **abordagem prática de implementação de UI** — não apenas explica conceitos, mas mostra componentes funcionais completos com acessibilidade, navegação por teclado e gerenciamento de estado adequado.

**Prioridade de adição ao índice:**
1. 🔴 Alta: Componentes UI Práticos
2. 🔴 Alta: Padrões de Acessibilidade detalhados
3. 🟡 Média: Visualização de Dados (D3)
4. 🟡 Média: Projetos 7GUI
5. 🟢 Baixa: Internos do Compilador (avançado)
