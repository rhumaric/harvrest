<script>
  import Duration from './Duration.svelte';
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
  <div class="stack-content" aria-hidden={stopped ? 'true' : null}>
    <h2>{rest ? 'Rest' : 'Active'}</h2>
    <Duration duration={elapsed / 1000} />
    <button
      class="content__action"
      class:visibility--hidden={stopped}
      on:click={endSession}>
      Stop
    </button>
  </div>
  <div class="stack__veil" class:visibility--hidden={!stopped} />
  <div class="content stack__overlay" class:visibility--hidden={!stopped}>
    <h2>{messages.heading}</h2>
    {@html messages.content}
    <button class="content__action" on:click={startSession}>
      {messages.button}
    </button>
  </div>
</div>
