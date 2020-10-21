<script>
  import { derived } from 'svelte/store';
  import { flipHorizontally } from 'lib/transitions.js';
  import { minutes, microseconds } from 'lib/time.js';
  import Timer from 'components/Timer.svelte';
  import {
    rest,
    activeStopped,
    restStopped,
    restMinutesEarned,
    thresholdNotified,
    endNotified,
    timingsSettings
  } from 'stores';
  import { timer } from 'stores/timer.js';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let session;

  let threshold;
  $: threshold = !$rest ? microseconds($timingsSettings.minActiveTime) : null;

  let end;
  $: if ($rest) {
    end = microseconds($restMinutesEarned) || Infinity;
  } else {
    end = microseconds($timingsSettings.maxActiveTime) || Infinity;
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

      const activeTimeRatio =
        session.activeTime / $timingsSettings.minActiveTime;

      const earnedRestTime =
        $timingsSettings.restForMinActiveTime * activeTimeRatio;

      // Allow at least 1 minute of rest
      $restMinutesEarned = Math.max(Math.ceil(minutes(earnedRestTime)), 1);
    }
    // Time needs to be reset before clearing
    // whether the notifications have been sent
    timer.reset();
    $thresholdNotified = false;
    $endNotified = false;
  }

  let transitionDuration = 100;

  function cancel() {
    // Prevent out transition of active panel
    transitionDuration = 0;
    dispatch('sessionEnd');
  }
</script>

<div class="stack back-link-container">
  <a class="back-link" href="#/" on:click={cancel}> Cancel </a>
  {#if $rest}
    <div
      class="rest content content--copy-last"
      in:flipHorizontally={{ duration: transitionDuration, delay: transitionDuration, oppositeDirection: true }}>
      <Timer
        heading="Rest"
        {threshold}
        {end}
        allowPause={false}
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
