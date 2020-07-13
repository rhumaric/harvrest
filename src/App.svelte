<script>
  import Session from './Session.svelte';
  import Settings from './Settings.svelte';
  import { time } from './stores.js';

  let started;
  let rest;
  let elapsed = 0;
  // Initialize with a no-op so there's no need
  // to check if it holds an unsubscribe function
  // before calling it
  let stop = function() {};

  let activeTime = 0;
  let restTime = 0;

  let threshold = Infinity;

  let settings = {
    minActiveTime: 2,
    maxActiveTime: 0,
    restForMinActiveTime: 1
  };

  let session = {
    activeTime: 0,
    restTime: 0
  };

  function endSession() {
    stop();
    if (!rest) {
      activeTime = elapsed;
    } else {
      restTime = elapsed;
    }
    if (!rest && elapsed > settings.minActiveTime * 1000) {
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
    if (rest) {
      const earnedRestTime =
        (settings.restForMinActiveTime * activeTime) / settings.minActiveTime;
      threshold = earnedRestTime || Infinity;
    } else {
      threshold = settings.maxActiveTime * 1000 || Infinity;
    }
  }
  function registerTime(value) {
    elapsed = value;
    if (elapsed > threshold) {
      endSession();
    }
  }
</script>

<main>
  <h1>Harvrest</h1>
  {#if started}
    <div class="content">
      <Session {settings} {session} on:sessionEnd={() => (started = false)} />
    </div>
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
