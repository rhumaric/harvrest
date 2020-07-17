<script>
  import { scale, fly } from 'svelte/transition';
  import Timer from './Timer.svelte';
  import { time } from './stores.js';

  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  export let settings;
  export let session;

  let stopped;

  let elapsed = 0;
  let rest = false;
  let threshold;
  let earnedRestTime;
  let messages = getMessages();

  // Initialize with a no-op so there's no need
  // to check if it holds an unsubscribe function
  // before calling it
  let stop = function() {};

  function startTimer() {
    // Subscribe to the store ourselves
    // so we can unsubscribe on our own time
    // rather than when Svelte destroys the Duration
    // subscription
    stop = time().subscribe(registerTime);
    stopped = false;
    if (rest) {
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

  function startSession() {
    if (rest) {
      dispatch('sessionEnd');
    } else {
      rest = !rest;
      startTimer();
    }
  }

  function endSession() {
    console.log('Ending session', stop);
    stop();
    stopped = true;
    if (rest) {
      session.restTime = elapsed;
    } else {
      session.activeTime = elapsed;
      earnedRestTime =
        (settings.restForMinActiveTime * session.activeTime) /
        settings.minActiveTime;
    }
    messages = getMessages();
  }

  function getMessages() {
    if (!rest) {
      return {
        heading: `Nice work!`,
        content: `<p>That's ${earnedRestTime || 0}ms of rest well earned.</p>`,
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

  onMount(startTimer);
</script>

<div class="stack">
  {#if rest}
    <div class="content" in:scale out:fly={{ duration: 0 }}>
      <Timer
        heading="Rest"
        {elapsed}
        {stopped}
        {messages}
        {endSession}
        {startSession} />
    </div>
  {:else}
    <div class="content" transition:scale>
      <Timer
        heading="Active"
        {elapsed}
        {stopped}
        {messages}
        {endSession}
        {startSession} />
    </div>
  {/if}
</div>
