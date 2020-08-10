<script>
  import { timer } from './stores/timer.js';
  export let trigger;
  export let notifiedStore;
  export let settings;
  export let url;

  $: if (!$notifiedStore && $timer >= trigger) {
    const audio = new Audio(url);
    audio.loop = false;
    audio.addEventListener('canplaythrough', () => {
      if (settings.audio) {
        unlessEventWithin('play', audio, 100, function() {
          console.log('Could not start playing');
        });
        audio.play();
      }
      // Needs to be here to sync' with the start of the audio
      if (settings.vibration) {
        if (window.navigator.vibrate) {
          window.navigator.vibrate([200, 100, 200]);
        }
      }
    });

    $notifiedStore = true;
  }

  function unlessEventWithin(eventName, target, delay, callback) {
    const timeout = setTimeout(callback, delay);
    target.addEventListener(eventName, () => clearTimeout(timeout), {
      once: true
    });
  }
</script>
