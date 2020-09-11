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

export const AS_BOOLEAN = {
  read(value) {
    return value === 'true';
  }
};

export const AS_INT = {
  read(value) {
    return value ? parseInt(value) : value;
  }
};

export const AS_JSON = {
  read(value) {
    return JSON.parse(value);
  },
  write(value) {
    return JSON.stringify(value);
  }
};
