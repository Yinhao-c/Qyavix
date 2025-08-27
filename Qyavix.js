let Qyavix = [];

export const u = i => (
  Qyavix[0] = Qyavix[0] ?? i,
  [Qyavix[0], v => (Qyavix[0] = typeof v === 'function' ? v(Qyavix[0]) : v, Qyavix[1]())]
);

export const r = (C, R) => (
  (Qyavix[1] = () => (R.replaceChildren(C()), R.dataset.framework = 'Qyavix')), Qyavix[1]()
);
