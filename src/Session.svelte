<script>
  import { flipHorizontally } from './transitions.js';
  import { minutes, microseconds } from './time.js';
  import Timer from './Timer.svelte';
  import {
    rest,
    activeStopped,
    restStopped,
    restMinutesEarned
  } from './stores';
  import { timer } from './stores/timer.js';

  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  export let settings;
  export let session;

  let threshold;

  function startTimer() {
    // Subscribe to the store ourselves
    // so we can unsubscribe on our own time
    // rather than when Svelte destroys the Duration
    // subscription
    timer.start();
    if ($rest) {
      threshold = microseconds($restMinutesEarned) || Infinity;
    } else {
      threshold = microseconds(settings.maxActiveTime) || microseconds(1);
    }
  }

  function startSession() {
    if ($rest) {
      console.log('Finishing rest');
      $rest = !$rest;
      dispatch('sessionEnd');
    } else {
      console.log('Starting rest');
      $rest = !$rest;
      timer.reset();
      startTimer();
    }
  }

  function endSession() {
    timer.stop();

    if ($rest) {
      $restStopped = true;
      session.restTime = $timer;
    } else {
      $activeStopped = true;
      session.activeTime = $timer;
      const earnedRestTime =
        (settings.restForMinActiveTime * session.activeTime) /
        settings.minActiveTime;
      $restMinutesEarned = Math.ceil(minutes(earnedRestTime));
    }
  }

  const transitionDuration = 100;
</script>

<div class="stack">
  {#if $rest}
    <div
      class="rest content"
      in:flipHorizontally={{ duration: transitionDuration, delay: transitionDuration, oppositeDirection: true }}>
      <Timer
        heading="Rest"
        elapsed={$timer}
        stopped={$restStopped}
        {endSession}
        {startSession} />
    </div>
  {:else}
    <div
      class="active content"
      out:flipHorizontally={{ duration: transitionDuration }}>
      <Timer
        heading="Active"
        elapsed={$timer}
        stopped={$activeStopped}
        {endSession}
        {startSession} />
    </div>
  {/if}
</div>
