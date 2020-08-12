import { derived } from 'svelte/store';
import { tick } from 'svelte';

export function once(stores, derive, initial) {
  const { subscribe } = derived(
    stores,
    function(...args) {
      const result = derive(...args);
      if (typeof result !== 'undefined') {
        tick().then(done);
      }
      return result;
    },
    initial
  );

  let stop;
  return {
    subscribe(fn) {
      stop = subscribe(fn);
      return done;
    }
  };

  function done() {
    if (stop) {
      stop();
      stop = null;
    }
  }
}
