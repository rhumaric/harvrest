<script>
  import Duration from './Duration.svelte';
  import { time } from './stores.js';

  let started;
  let rest;
  let elapsed = 0;
  // Initialize with a no-op so there's no need
  // to check if it holds an unsubscribe function
  // before calling it
  let stop = () => {};
  let threshold = 5 * 1000;
  let restTime = 1 * 1000;

  function endSession() {
    stop();
    if (!rest && elapsed > threshold) {
      rest = true;
      startTimer();
    } else {
      started = false;
      rest = false;
    }
  }
  function startSession() {
    started = true;
    startTimer();
  }
  function startTimer() {
    // Subscribe to the store ourselves
    // so we can unsubscribe on our own time
    // rather than when Svelte destroys the Duration
    // subscription
    stop = time().subscribe(registerTime);
  }
  function registerTime(value) {
    elapsed = value;
  }
</script>

{#if started}
  {rest ? 'Rest' : 'Active'}
  <Duration duration={elapsed / 1000} />
  <button on:click={endSession}>End</button>
{:else}
  <button on:click={startSession}>Start</button>
{/if}
