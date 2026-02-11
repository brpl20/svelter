You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

## Diagrams in Lessons (.md files)

Do NOT use ASCII art diagrams (box-drawing characters like ┌─┐│└┘) in lesson `.md` files. Instead, use **inline HTML with Tailwind/DaisyUI classes** directly in the markdown.

### Rules:
1. Wrap all diagram HTML in a `not-prose` div to escape mdsvex typography styles
2. Use DaisyUI theme tokens (`bg-base-200`, `border-base-content/10`, `text-base-content`, etc.) for consistent theming
3. Make diagrams responsive with Tailwind breakpoints (`sm:`, `md:`)
4. Do NOT add external dependencies (no Mermaid, no D3, etc.)

### Common patterns:

**Bar charts** (comparing frameworks/metrics):
```html
<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 p-5">
  <div class="mb-4 rounded-lg bg-info/20 px-4 py-2 text-center font-bold">TITLE</div>
  <div class="space-y-3">
    <!-- Each bar row -->
    <div class="flex items-center gap-3">
      <span class="w-20 text-right text-sm">Label</span>
      <div class="h-6 rounded bg-info" style="width: 75%"></div>
      <span class="text-sm font-mono">value</span>
    </div>
  </div>
</div>
```

**Flow diagrams** (vertical steps with arrows):
```html
<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 p-5">
  <div class="flex flex-col items-center gap-2">
    <div class="rounded-lg border bg-base-100 px-4 py-2 text-center">Step 1</div>
    <div class="text-base-content/40">&#9660;</div>
    <div class="rounded-lg border bg-base-100 px-4 py-2 text-center">Step 2</div>
  </div>
</div>
```

**Side-by-side comparisons** (e.g. React vs Svelte):
```html
<div class="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div class="rounded-xl border border-base-content/10 bg-base-200 p-5">
    <div class="mb-3 rounded-lg bg-info/20 px-3 py-1 text-center font-bold">React</div>
    <!-- content -->
  </div>
  <div class="rounded-xl border border-base-content/10 bg-base-200 p-5">
    <div class="mb-3 rounded-lg bg-warning/20 px-3 py-1 text-center font-bold">Svelte</div>
    <!-- content -->
  </div>
</div>
```

**Tree/hierarchy diagrams** (e.g. component tree):
```html
<div class="not-prose my-6 rounded-xl border border-base-content/10 bg-base-200 p-6 font-mono text-sm">
  <div class="ml-0">
    <span class="inline-block rounded bg-error px-3 py-1 font-bold text-white">Root</span>
  </div>
  <div class="ml-8 border-l-2 border-base-content/20 pl-4 pt-2">
    <span class="text-base-content/40">└──</span>
    <span class="inline-block rounded bg-base-300 px-3 py-1">Child</span>
  </div>
</div>
```

### Color conventions for frameworks:
- React: `bg-info`, `border-info`, `text-info`
- Vue: `bg-success`, `border-success`, `text-success`
- Svelte: `bg-warning`, `border-warning`, `text-warning`
- Angular: `bg-error`, `border-error`, `text-error`

## USE SPECIAL ELEMENTS IN MD 
Check the Class 88 to extract element information 

## BLOCK CODE
Do not use long BLOCK CODE inline , this will breake smartphone responsivity 
Use comments line by line 

```
let x = 10 // this commend is bad
let x = 10 
// this comment is good! 
    
