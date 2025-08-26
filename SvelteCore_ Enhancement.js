let s = { state: {}, renders: new Map() };

export const u = (key, init) => {
  s.state[key] = s.state[key] ?? init;
  const set = val => {
    s.state[key] = typeof val === 'function' ? val(s.state[key]) : val;
    s.renders.forEach(fn => fn());
  };
  return [s.state[key], set];
};

export const r = (Component, Root) => {
  const renderFn = () => {
    Root.innerHTML = '';
    Root.appendChild(Component());
    Root.dataset.framework = 'SvelteCore';
  };
  s.renders.set(Root, renderFn);
  renderFn();
};
