---
title: "Por que usamos pnpm neste curso"
module: 1
order: 4
---

<script>
import Tip from '$lib/components/Tip.svelte';
import Question from '$lib/components/Question.svelte';
</script>

# 1.4 — Por que usamos pnpm neste curso

> Entenda o que e o pnpm, por que ele e melhor que o npm para projetos modernos e como instala-lo.

## Objetivos da Aula

- Entender o que e um gerenciador de pacotes
- Conhecer as diferencas entre npm, pnpm, yarn e bun
- Saber por que escolhemos pnpm para este curso
- Instalar e configurar o pnpm

---

## O que e um gerenciador de pacotes?

Quando voce cria um projeto JavaScript, ele depende de dezenas (as vezes centenas) de bibliotecas externas. Um **gerenciador de pacotes** cuida de:

- **Baixar** essas bibliotecas
- **Organizar** elas no seu projeto (pasta `node_modules`)
- **Controlar versoes** para garantir que todos usem a mesma versao
- **Executar scripts** definidos no `package.json`

O Node.js ja vem com o **npm** (Node Package Manager). Mas existem alternativas que fazem o mesmo trabalho de formas diferentes.

---

## npm vs pnpm: a diferenca na pratica

### O problema do npm

Quando voce roda `npm install`, o npm copia **todas** as dependencias para a pasta `node_modules` do projeto. Se voce tem 10 projetos que usam o React, o npm guarda 10 copias identicas do React no seu disco.

### A solucao do pnpm

O pnpm usa uma abordagem diferente chamada **content-addressable storage**. Em vez de copiar, ele guarda uma unica copia de cada pacote em um armazem central e cria links para os projetos que precisam dele.

<div class="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div class="rounded-xl border border-info/30 bg-base-200 overflow-hidden">
    <div class="bg-info/20 px-4 py-2 text-center font-bold text-info text-sm">npm</div>
    <div class="p-4 text-sm text-base-content space-y-2">
      <div class="font-mono text-xs space-y-1">
        <div>projeto-a/node_modules/svelte/ <span class="text-error">(copia)</span></div>
        <div>projeto-b/node_modules/svelte/ <span class="text-error">(copia)</span></div>
        <div>projeto-c/node_modules/svelte/ <span class="text-error">(copia)</span></div>
      </div>
      <div class="pt-2 border-t border-base-content/10 text-base-content/60">3 copias = 3x espaco em disco</div>
    </div>
  </div>
  <div class="rounded-xl border border-warning/30 bg-base-200 overflow-hidden">
    <div class="bg-warning/20 px-4 py-2 text-center font-bold text-warning text-sm">pnpm</div>
    <div class="p-4 text-sm text-base-content space-y-2">
      <div class="font-mono text-xs space-y-1">
        <div>~/.pnpm-store/svelte/ <span class="text-success">(unica copia)</span></div>
        <div>projeto-a/node_modules/svelte/ <span class="text-success">→ link</span></div>
        <div>projeto-b/node_modules/svelte/ <span class="text-success">→ link</span></div>
      </div>
      <div class="pt-2 border-t border-base-content/10 text-base-content/60">1 copia + links = economia de disco</div>
    </div>
  </div>
</div>

---

## Por que pnpm?

<div class="not-prose my-6 space-y-3">
  <div class="rounded-xl border border-success/30 bg-base-200 p-4 flex flex-col sm:flex-row gap-3 items-start">
    <div class="badge badge-success font-bold shrink-0">RAPIDO</div>
    <div>
      <div class="font-bold text-base-content">Instalacao ate 2x mais rapida</div>
      <div class="text-sm text-base-content/70">Como reutiliza pacotes ja baixados, o <code>pnpm install</code> e significativamente mais rapido que o <code>npm install</code>, especialmente a partir da segunda vez.</div>
    </div>
  </div>

  <div class="rounded-xl border border-success/30 bg-base-200 p-4 flex flex-col sm:flex-row gap-3 items-start">
    <div class="badge badge-success font-bold shrink-0">LEVE</div>
    <div>
      <div class="font-bold text-base-content">Economia de espaco em disco</div>
      <div class="text-sm text-base-content/70">Se voce trabalha em varios projetos, o pnpm pode economizar gigabytes de espaco. Cada pacote e armazenado uma unica vez no seu computador.</div>
    </div>
  </div>

  <div class="rounded-xl border border-success/30 bg-base-200 p-4 flex flex-col sm:flex-row gap-3 items-start">
    <div class="badge badge-success font-bold shrink-0">SEGURO</div>
    <div>
      <div class="font-bold text-base-content">Resolucao estrita de dependencias</div>
      <div class="text-sm text-base-content/70">O npm permite que seu codigo importe pacotes que voce nao declarou como dependencia (phantom dependencies). O pnpm impede isso — se nao esta no seu <code>package.json</code>, voce nao consegue importar. Isso evita bugs sutis em producao.</div>
    </div>
  </div>

  <div class="rounded-xl border border-success/30 bg-base-200 p-4 flex flex-col sm:flex-row gap-3 items-start">
    <div class="badge badge-success font-bold shrink-0">COMPATIVEL</div>
    <div>
      <div class="font-bold text-base-content">Mesmos comandos, mesma experiencia</div>
      <div class="text-sm text-base-content/70">O <code>pnpm</code> aceita os mesmos comandos que o <code>npm</code>. Se voce sabe usar npm, ja sabe usar pnpm. A transicao e praticamente transparente.</div>
    </div>
  </div>
</div>

<Question question="Posso usar npm se preferir?">
Claro. Tudo que funciona com pnpm funciona com npm tambem. A diferenca esta na performance e organizacao das dependencias. Se voce ja tem um fluxo com npm e nao quer mudar agora, pode seguir o curso substituindo <code>pnpm</code> por <code>npm run</code> e <code>pnpm dlx</code> por <code>npx</code>.
</Question>

---

## Instalando o pnpm

A forma mais simples e usar o **corepack**, que ja vem com o Node.js 16.13+:

```bash
# Habilitar o corepack (uma unica vez)
corepack enable

# Verificar a instalacao
pnpm --version
```

Se preferir instalar de outra forma:

```bash
# Via npm (ironicamente)
npm install -g pnpm

# Via curl (macOS/Linux)
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

<Tip>
Recomendamos o metodo com <strong>corepack</strong>. Alem de ser o mais simples, o corepack garante que cada projeto use a versao correta do gerenciador de pacotes automaticamente.
</Tip>

---

## Tabela de equivalencia: npm vs pnpm

| npm | pnpm | O que faz |
|-----|------|-----------|
| `npm install` | `pnpm install` | Instala todas as dependencias |
| `npm install pacote` | `pnpm add pacote` | Adiciona uma dependencia |
| `npm run dev` | `pnpm dev` | Executa um script |
| `npm run build` | `pnpm build` | Executa um script |
| `npx comando` | `pnpm dlx comando` | Executa um pacote sem instalar |
| `npm uninstall pacote` | `pnpm remove pacote` | Remove uma dependencia |

<Tip>
Com pnpm, voce pode omitir o <code>run</code> nos scripts. Em vez de <code>pnpm run dev</code>, basta <code>pnpm dev</code>. Menos digitacao, mesmo resultado.
</Tip>

---

## Resumo

| Conceito | Descricao |
|----------|-----------|
| **pnpm** | Gerenciador de pacotes rapido e eficiente |
| **Content-addressable store** | Armazem central que evita duplicacao de pacotes |
| **Phantom dependencies** | Bug que o pnpm previne e o npm permite |
| **corepack** | Forma recomendada de instalar o pnpm |
| **pnpm dlx** | Equivalente ao npx para executar pacotes avulsos |

---

---

**Proxima aula:** [1.5 — TypeScript ou JavaScript: o que escolher](/lessons/modulo-01-primeiros-passos/1.5-typescript-ou-javascript)
