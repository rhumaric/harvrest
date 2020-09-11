<script>
  import { derived } from 'svelte/store';
  import { flipHorizontally } from './transitions.js';
  import { minutes, microseconds } from './time.js';
  import Timer from './Timer.svelte';
  import {
    rest,
    activeStopped,
    restStopped,
    restMinutesEarned,
    thresholdNotified,
    endNotified
  } from './stores';
  import { timer } from './stores/timer.js';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let settings;
  export let session;

  let threshold;
  $: threshold = !$rest ? microseconds(settings.minActiveTime) : null;

  let end;
  $: if ($rest) {
    end = microseconds($restMinutesEarned) || Infinity;
  } else {
    end = microseconds(settings.maxActiveTime) || Infinity;
  }

  function startSession() {
    if ($rest) {
      $rest = !$rest;
      dispatch('sessionEnd');
    } else {
      $rest = !$rest;
      timer.reset();
      timer.start();
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
    // Time needs to be reset before clearing
    // whether the notifications have been sent
    timer.reset();
    $thresholdNotified = false;
    $endNotified = false;
  }

  const transitionDuration = 100;
</script>

<div class="stack">
  {#if $rest}
    <div
      class="rest content content--copy-last"
      in:flipHorizontally={{ duration: transitionDuration, delay: transitionDuration, oppositeDirection: true }}>
      <Timer
        heading="Rest"
        {threshold}
        {end}
        stopped={$restStopped}
        {endSession}
        {startSession} />
    </div>
  {:else}
    <div
      class="active content content--copy-last"
      out:flipHorizontally={{ duration: transitionDuration }}>
      <Timer
        heading="Active"
        {threshold}
        {end}
        stopped={$activeStopped}
        {endSession}
        {startSession} />
    </div>
  {/if}
</div>
