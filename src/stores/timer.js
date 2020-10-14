import { storable, AS_BOOLEAN, AS_INT } from './storable';
import { derived, get, writable } from 'svelte/store';
import { breakdown as timeBreakdown } from '../time';

export const timer = createStore();
export const elapsed = timer.elapsed;
export const running = timer.running;
export const startTime = timer.startTime;
export const breakdown = derived([elapsed], ([elapsed]) => {
  return timeBreakdown(elapsed);
});

export function createStore() {
  const stores = {
    elapsed: writable(0),
    running: storable('running', { ...AS_BOOLEAN }),
    startTime: storable('startTime'),
    accumulated: storable('accumulated', { ...AS_INT, initialValue: 0 })
  };

  let interval;
  let startTime = get(stores.startTime);

  if (get(stores.running)) {
    start();
  }

  const time = derived(
    [stores.elapsed, stores.accumulated],
    ([elapsed, accumulated]) => {
      const time = elapsed + accumulated;
      return time;
    }
  );

  return {
    start,
    stop,
    reset,
    pause,
    elapsed: time,
    running: stores.running,
    startTime: stores.startTime,
    subscribe(fn) {
      return time.subscribe(fn);
    }
  };

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
    const elapsed = Date.now() - startTime;
    stores.elapsed.set(elapsed);
  }

  function pause() {
    if (get(stores.running)) {
      startTime = null;
      stores.startTime.set();

      let elapsed = get(stores.elapsed);
      stores.elapsed.set(0);
      stores.accumulated.set(get(stores.accumulated) + elapsed);
      stop();
    }
  }

  function reset() {
    startTime = null;
    stores.elapsed.set(0);
    stores.accumulated.set(0);
    stores.startTime.set();
  }

  function stop() {
    if (get(stores.running)) {
      stores.running.set(false);
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  }
}
