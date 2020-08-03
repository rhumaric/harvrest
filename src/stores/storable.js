import { writable } from 'svelte/store';

export function storable(
  key,
  {
    initialValue,
    read = v => v,
    write = v => v,
    shouldStore = v => typeof v !== 'undefined',
    deleteIfShouldNotStore = true
  } = {}
) {
  const { set, subscribe } = writable(
    read(localStorage.getItem(key)) || initialValue
  );
  return {
    set(newValue) {
      set(newValue);
      updateStorage(newValue);
    },
    subscribe(fn) {
      return subscribe(fn);
    }
  };

  function updateStorage(value) {
    if (shouldStore(value)) {
      localStorage.setItem(key, write(value));
    } else {
      if (deleteIfShouldNotStore) {
        localStorage.removeItem(key);
      }
    }
  }
}

export const BOOLEAN = {
  read(value) {
    return value === 'true';
  }
};
