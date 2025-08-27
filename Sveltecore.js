let Sveltecore = [];

export const u = i => (
  Sveltecore[0] = Sveltecore[0] ?? i,
  [Sveltecore[0], v => (Sveltecore[0] = typeof v === 'function' ? v(Sveltecore[0]) : v, Sveltecore[1]())]
);

export const r = (C, R) => (
  (Sveltecore[1] = () => (R.innerHTML = '', R.appendChild(C()), R.dataset.framework='SvelteCore')), Sveltecore[1]()
);
