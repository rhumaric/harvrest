<script>
  import { afterUpdate } from 'svelte';
  export let settings;
  export let url;

  afterUpdate(() => {
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
  });

  function unlessEventWithin(eventName, target, delay, callback) {
    const timeout = setTimeout(callback, delay);
    target.addEventListener(eventName, () => clearTimeout(timeout), {
      once: true
    });
  }
</script>
