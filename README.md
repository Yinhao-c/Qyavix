# SvelteCore

🌱 **SvelteCore** — One of the smallest and simplest front-end frameworks in the world.  
Implemented in ~10 lines of JavaScript, it offers state management and automatic rendering similar to React or Svelte.  

Designed for developers who love minimalism, want rapid prototyping, or are learning front-end framework principles.

💡Tip: SvelteCore_Enhancement.js, this file is not as small as the first generation, but it is more practical than the first generation.

I would recommend using SvelteCore.js because it is very small.

---

## 🚀 Features

- 📦 **Ultra-lightweight**: Core logic under 10 lines  
- ⚡ **Instant rendering**: UI updates automatically on state change  
- 🧩 **Minimal API**:
  - `u(initialState)` → useState-like hook  
  - `r(Component, Root)` → render a component to the DOM  
- 🔥 **Zero dependencies**: Works directly in the browser  
- 🌍 **Extensible**: Can add routing, hooks, or multi-component support  
- 🎯 **Unique identity**: All rendered DOM elements include `dataset.framework='SvelteCore'`  
- 💡 **Educational**: Learn how front-end frameworks work under the hood  
- 🧪 **Experimental playground**: Ideal for experimenting with framework ideas  

---

## 🎨 Quick Start

```html
<div id="root"></div>
<script type="module">
  import { u, r } from './SvelteCore.js';

  function App() {
    const [count, setCount] = u(0);
    const btn = document.createElement('button');
    btn.textContent = 'Count: ' + count;
    btn.onclick = () => setCount(c => c + 1);
    return btn;
  }

  r(App, document.getElementById('root'));
</script>
```

---

## 🌟 Optional improvements

You can change the SvelteCore in the code to the character you want to set, because here for the purpose of copyright declaration, the default here is: SvelteCore
