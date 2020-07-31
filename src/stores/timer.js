import { writable, derived } from 'svelte/store';

export const timer = createStore();
export const elapsed = timer.elapsed;
export const running = timer.running;
export const startTime = timer.startTime;
export const breakdown = timer.breakdown;

export function createStore() {
  const stores = {
    elapsed: writable(0),
    running: writable(false),
    startTime: writable()
  };

  let startTime;
  let interval;

  return {
    init,
    start,
    stop,
    reset,
    breakdown: derived([stores.elapsed], ([elapsed]) => {
      // Use the Date object to help with formatting date
      const date = new Date(0, 0, 0, 0, 0, elapsed / 1000);
      return {
        seconds: date.getSeconds(),
        minutes: date.getMinutes(),
        hours: date.getHours()
      };
    }),
    elapsed: stores.elapsed,
    running: stores.running,
    startTime: stores.startTime,
    subscribe(fn) {
      const unsubscribe = stores.elapsed.subscribe(fn);
      return function() {
        unsubscribe();
        stop();
      };
    }
  };

  function init(options) {
    stores.startTime.set(options.startTime);
    stores.elapsed.set(options.elapsed);
    startTime = options.startTime;
    stores.running.set(options.running);
    if (options.running) {
      start();
    }
  }

  function start() {
    if (!startTime) {
      startTime = Date.now();
      stores.startTime.set(startTime);
    }
    if (!interval) {
      // Update the time a first time, to handle reloads
      updateTime();
      // Tick faster than every second to compensate for
      interval = setInterval(updateTime, 200);
    }
    stores.running.set(true);
  }

  function updateTime() {
    stores.elapsed.set(Date.now() - startTime);
  }

  function reset() {
    startTime = null;
    stores.elapsed.set(0);
    stores.startTime.set();
  }

  function stop() {
    stores.running.set(false);
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }
}