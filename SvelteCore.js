let SvelteCore = [];

export const u = i => (
  SvelteCore[0] = SvelteCore[0] ?? i,
  [SvelteCore[0], v => (SvelteCore[0] = typeof v === 'function' ? v(SvelteCore[0]) : v, SvelteCore[1]())]
);

export const r = (C, R) => (
  (SvelteCore[1] = () => (R.innerHTML = '', R.appendChild(C()), R.dataset.framework='SvelteCore')), SvelteCore[1]()
);
