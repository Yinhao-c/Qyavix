export function u<T>(initial: T): [T, (next: T | ((prev: T) => T)) => void];
export function r(C: () => Node, root: Element): void;
