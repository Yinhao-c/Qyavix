# How Qyavix Works — A Deep Dive Into the 155-Byte Runtime

Qyavix is intentionally tiny — just enough logic to support stateful UI rendering, but not a single byte more.
This document walks through how the entire runtime works internally, concept by concept.
If you want to understand *how modern UI frameworks work under the hood*, this is the place.

---

## 1. The Core Idea

Qyavix provides two primitives:

- **`u()` — tiny `useState`**
  - stores values in an array of slots
  - advances an index pointer for each hook call
  - ties each hook to its call order (like React)

- **`r()` — tiny render engine**
  - resets the hook pointer
  - calls the component function to build a fresh DOM node
  - replaces the children of the root element with the new output

Despite its size, this supports state updates (including functional updaters) and immediate re-rendering.

---

## 2. State Storage & Hook Index

The runtime uses two simple primitives:

```js
let h = []; // array holding hook slot values
let i;      // current hook index (resets each render)
```

- `h` is a flat storage for every hook's state, in call order.
- `i` is the pointer used during a render: the first call to `u()` uses `h[0]`, the second uses `h[1]`, and so on.
- On every render `i` is reset to `0`.

This pattern gives stable slot addresses without objects, proxies, or dependency tracking.

---

## 3. The `u()` API (Readable)

A readable implementation of `u`:

```js
export const u = (initial) => {
  let k = i++;            // assign this hook a stable slot index
  if (h[k] === undefined) h[k] = initial; // initialize once

  const set = (next) => {
    // support functional updates: set(x => x + 1)
    h[k] = typeof next === 'function' ? next(h[k]) : next;
    R(); // trigger re-render
  };

  return [h[k], set];
};
```

- Each `u()` call returns the current value stored at `h[k]` and a setter.
- The setter accepts either a value or a function updater.
- The setter always calls `R()` (the global re-render function), causing the app to rebuild.

---

## 4. The `r()` API (Readable)

A readable implementation of `r`:

```js
export const r = (Component, root) => {
  R = () => {
    i = 0;                // reset hook pointer
    root.replaceChildren(Component()); // rebuild DOM and mount
  };
  R(); // initial render
};
```

- `r()` creates `R()` and assigns it to the global variable so `u`'s setters can call it.
- `R()` resets the hook index, calls the root component to build a DOM node, and replaces the root's children.
- There is no diffing; Qyavix does a full replaceChildren on each render.

---

## 5. Render Cycle Walkthrough

1. Initial call: `r(App, root)` defines `R()` and runs it.
2. `R()` sets `i = 0`.
3. `App()` executes and calls `u()` for each hook in a deterministic order.
4. Each `u()` consumes a slot in `h` and returns `[value, set]`.
5. `App()` creates DOM nodes, sets event handlers (which call `set`), and returns the root node.
6. `R()` sets `root.replaceChildren(node)` — initial DOM is mounted.
7. User interaction calls a `set`:
   - setter updates `h[k]` and immediately calls `R()`.
   - new render runs from step 2, reusing `h` slots in the same order.

This is intentionally simple: whole-tree re-render, predictable slot mapping.

---

## 6. Design Trade-offs

**Pros**
- Extremely small runtime (production: 155 bytes)
- Predictable behavior and simple mental model
- No build step required — use as a single file
- Fast in bulk DOM creation scenarios because there's minimal runtime overhead

**Cons**
- Full replaceChildren on each update — not efficient for highly dynamic apps with many small localized updates
- Hooks must be called in the same order every render (no conditional hooks)
- No virtual DOM, no diffing — fine for micro-UIs and benchmarks, less ideal for complex apps
- No lifecycle hooks, context, or advanced APIs

---

## 7. Common Questions

**Q: Can I conditionally call `u()`?**  
A: No — the slot index relies on consistent call order. Conditional hooks will break mapping.

**Q: Why not use an object-based map instead of array + index?**  
A: Array + index is smaller and faster for this minimal runtime. Objects add overhead and complexity.

**Q: Can we add partial diffing later?**  
A: Yes. You can layer a tiny diffing algorithm or patching strategy on top of this core, but that increases size.

---

## 8. Next steps / experiments

If you want to extend Qyavix while keeping it tiny, consider:
- adding a tiny DOM creator helper (`$()`), not reactive, just syntactic sugar
- implementing optional computed values (evaluated per render)
- providing an educational version with verbose comments (this is it!)
- experimenting with a minimal patcher (diff two shallow trees) for targeted updates

---

## 9. Example: Counter

```html
<div id="root"></div>
<script type="module">
import { u, r } from './Qyavix.js';

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

## 10. Credits & License

Qyavix — tiny runtime by Yinhao Chen.  
Licensed under MIT.
