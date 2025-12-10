/**
 * Qyavix — Readable Version
 * The tiny hook-style state + render engine (155 bytes when minified).
 *
 * This file is the “explain it like I’m reading the source” edition.
 * Same logic as the tiny version — just expanded and commented so people
 * can actually see how everything works internally.
 *
 * If you're curious how a micro-framework is built, this is for you.
 */

// All hook states live here.
// Calling u() (our mini useState) consumes one index.
let h = [];

// Internal pointer telling us which state slot we're at.
// It resets to 0 every time the app re-renders.
let i;

// R will hold the re-render function once r() sets it up.
let R;

/**
 * u(v) — the minimal useState clone.
 *
 * @param {*} v  Initial value for this hook
 * @returns [value, setValue]
 *
 * How it works:
 * - Every render, i starts at 0 again.
 * - Each call to u() reads/writes h[i], then bumps i.
 * - That means hooks run in a fixed order — exactly like React.
 */
export const u = (v) => {
  // Keep track of which hook this u() corresponds to
  let k = i++;

  // Initialize the state slot only on first run
  if (h[k] === undefined) h[k] = v;

  /**
   * setValue — updates the slot and re-renders the app.
   *
   * Supports:
   *   set(x => x + 1)
   *   set(123)
   */
  const setValue = (next) => {
    // Functional updater? Use previous value.
    h[k] = typeof next === "function" ? next(h[k]) : next;

    // And… re-render the app.
    R();
  };

  return [h[k], setValue];
};

/**
 * r(C, root) — the render bootstrapper.
 *
 * @param {Function} C   Component function that returns a DOM tree.
 * @param {HTMLElement} root  Where the DOM should be mounted.
 *
 * What it does:
 * - Defines R(), our re-render function
 * - Each time R() runs:
 *      • reset hook pointer i
 *      • build fresh DOM via C()
 *      • replace everything inside root
 * - Runs one initial render immediately
 */
export const r = (C, root) => {
  R = () => {
    i = 0;                     // hooks restart from index 0
    root.replaceChildren(C()); // drop old DOM, insert new one
  };

  R(); // First render
};
