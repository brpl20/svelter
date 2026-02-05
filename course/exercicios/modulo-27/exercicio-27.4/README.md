# Exercício 27.4 — $props - Sistema de Props

## 🎯 Objetivo

Entender como o sistema de props funciona, incluindo defaults, rest props e bindable.

## 📋 Contexto

O `$props()` do Svelte 5 oferece destructuring com defaults, rest props e bindable. Vamos simular esse sistema para entender sua mecânica.

## 📝 Requisitos

### Função `criarSistemaProps(schema, propsRecebidas)`

Cria um sistema de props com validação e defaults:

```javascript
const schema = {
  name: { required: true },
  count: { default: 0 },
  disabled: { default: false }
}

const props = criarSistemaProps(schema, { name: 'Test', count: 5 })
// { name: 'Test', count: 5, disabled: false }
```

### Função `separarRestProps(props, conhecidas)`

Separa props conhecidas das rest props:

```javascript
const { conhecidas, rest } = separarRestProps(
  { name: 'Ana', age: 25, class: 'card', onclick: fn },
  ['name', 'age']
)
// conhecidas: { name: 'Ana', age: 25 }
// rest: { class: 'card', onclick: fn }
```

### Função `criarPropBindable(valorInicial, onChange)`

Cria uma prop que pode ser "bindada" (two-way binding):

```javascript
const prop = criarPropBindable('inicial', (novo) => console.log('Mudou:', novo))
prop.valor // 'inicial'
prop.valor = 'novo' // Chama onChange
prop.valor // 'novo'
```

## 🧪 Executar Testes

```bash
npm install
npm test
```

## ✅ Critérios de Sucesso

- [ ] Sistema de props aplica defaults corretamente
- [ ] Validação de props required funciona
- [ ] Separação de rest props funciona
- [ ] Props bindable notificam mudanças
