<script>
  import Session from './Session.svelte';
  import Settings from './Settings.svelte';
  import { time } from './stores.js';
  import { microseconds } from './time.js';

  let started;
  let rest;
  let elapsed = 0;

  $: {
    if (started) {
      if (rest) {
        console.log('Rest');
      } else {
        console.log('Active');
      }
    } else {
      console.log('Startup');
    }
  }
  // Initialize with a no-op so there's no need
  // to check if it holds an unsubscribe function
  // before calling it
  let stop = function() {};

  let activeTime = 0;
  let restTime = 0;

  let threshold = Infinity;

  let settings = {
    minActiveTime: 25,
    maxActiveTime: 0,
    restForMinActiveTime: 5
  };

  let session = {
    activeTime: 0,
    restTime: 0
  };
</script>

<main class="spaced">
  <h1>Harvrest</h1>
  {#if started}
    <Session {settings} {session} on:sessionEnd={() => (started = false)} />
  {:else}
    <form
      aria-label="Settings"
      class="content"
      on:submit|preventDefault={() => (started = true)}>
      <Settings {settings} />
      <button class="content__action">Let's go!</button>
    </form>
  {/if}
</main>
