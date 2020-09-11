export function logSubscriptions(
  store,
  { prefix = '', id = window.performance.now(), label = `${prefix}_${id}` } = {}
) {
  return {
    ...store,
    subscribe(fn) {
      console.log(label, 'SUBSCRIBING', fn);
      const unsubscribe = store.subscribe(fn);
      return function() {
        console.log(label, 'UNSUBSCRIBING');
        unsubscribe();
      };
    }
  };
}

export function logDerivation(
  fn,
  { prefix = '', id = window.performance.now(), label = `${prefix}_${id}` } = {}
) {
  return function(...args) {
    console.log(label, 'DERIVATION', args[0]);
    const result = fn(...args);
    console.log(label, 'DERIVATION_RESULT', result);
    return result;
  };
}

export function breakOnSet(writableStore) {
  return {
    ...writableStore,
    set(...args) {
      // eslint-disable-next-line no-debugger
      debugger;
      return writableStore.set(...args);
    }
  };
}
