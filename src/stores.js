import { readable } from 'svelte/store';

export function time() {
  return readable(0, function start(set) {
    const start = new Date();
    const interval = setInterval(() => {
      set(new Date() - start);
    }, 1000);

    return function stop() {
      clearInterval(interval);
    };
  });
}
