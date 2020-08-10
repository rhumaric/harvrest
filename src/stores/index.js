import { derived } from 'svelte/store';
import { storable, AS_BOOLEAN, AS_JSON } from './storable';

export const started = storable('started', { ...AS_BOOLEAN });
export const rest = storable('rest', { ...AS_BOOLEAN });
export const activeStopped = storable('activeStopped', { ...AS_BOOLEAN });
export const restStopped = storable('restStopped', { ...AS_BOOLEAN });
export const restMinutesEarned = storable('restMinutesEarned');

export const notificationsSettings = storable('notificationsSettings', {
  ...AS_JSON,
  initialValue: {
    threshold: {
      visual: true,
      audio: true,
      vibration: true
    },
    end: {
      audio: true,
      vibration: true
    }
  }
});

export const thresholdNotified = storable('thresholdNotified', {
  ...AS_BOOLEAN
});
export const endNotified = storable('endNotified', { ...AS_BOOLEAN });

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
