import { derived } from 'svelte/store';
import { tick } from 'svelte';

export function once(stores, derive, initial) {
  const { subscribe } = derived(
    stores,
    function(...args) {
      const result = derive(...args);
      if (typeof result !== 'undefined') {
        // Await next tick so every subsriber is correctly notified
        tick().then(done);
      }
      return result;
    },
    initial
  );

  // Keep track of all unsubscribers
  // so we can cleanly handler unsubscriptions
  let unsubscribers = [];

  return {
    subscribe(fn) {
      // First grab the unsubscription function
      let unsubscribe = subscribe(fn);

      // Because unsubscription can also happen outside
      // of our control and calling twice throws an error
      // we need to have our own unsubscribe function
      // that keeps track of whether we've already unsubscribed
      // or not
      unsubscribers.push(doUnsubscribe);

      // If the unsubscription comes from outside
      // we can remote the unsubscriber from the list
      // so there's less calls when stopping
      const index = unsubscribers.length;
      return function() {
        unsubscribers.splice(index);
        doUnsubscribe();
      };

      function doUnsubscribe() {
        if (unsubscribe) {
          unsubscribe();
          unsubscribe = null;
        }
      }
    }
  };

  function done() {
    for (const stop of unsubscribers) {
      stop();
    }
    unsubscribers = [];
  }
}
