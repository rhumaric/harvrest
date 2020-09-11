import { tick } from 'svelte';

export function afterTick(derive) {
  let lastValues;
  let promise;

  return function(values, set) {
    // Store the values for the future call
    lastValues = values;

    // Create a promise to wait for next tick
    // if one is not there already
    if (!promise) {
      promise = tick().then(function() {
        if (typeof lastValues !== 'undefined') {
          // TODO: Ideally handle when derive function
          // wants to use `set`
          const result = derive(lastValues);
          set(result);
          lastValues = undefined;
        }
        promise = null;
      });
    }
  };
}
