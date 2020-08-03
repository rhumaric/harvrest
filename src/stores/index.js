import { derived } from 'svelte/store';
import { storable, BOOLEAN } from './storable';

export const started = storable('started', { ...BOOLEAN });
export const rest = storable('rest', { ...BOOLEAN });
export const activeStopped = storable('activeStopped', { ...BOOLEAN });
export const restStopped = storable('restStopped', { ...BOOLEAN });
export const notified = storable('notified', { ...BOOLEAN });
export const restMinutesEarned = storable('restMinutesEarned');

export const messages = derived(
  [rest, restMinutesEarned],
  ([rest, restMinutesEarned]) => {
    if (!rest) {
      return {
        heading: `Nice work!`,
        content: `<p>That's ${restMinutesEarned} minute${
          restMinutesEarned !== 1 ? 's' : ''
        } of rest well earned.</p>`,
        button: `Take a break!`
      };
    } else {
      return {
        heading: `Time's up!`,
        content: `<p>It's time to get back at it!</p>`,
        button: `Let's go!`
      };
    }
  }
);
