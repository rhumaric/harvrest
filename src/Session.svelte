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

  const threshold = derived([rest], ([rest]) => {
    if (!rest) {
      return microseconds(settings.minActiveTime);
    }
  });

  const end = derived(
    [rest, restMinutesEarned],
    ([rest, restMinutesEarned]) => {
      if (rest) {
        return microseconds(restMinutesEarned) || Infinity;
      } else {
        return microseconds(settings.maxActiveTime) || Infinity;
      }
    }
  );

  function startSession() {
    if ($rest) {
      $rest = !$rest;
      dispatch('sessionEnd');
    } else {
      console.log('Starting rest');
      $rest = !$rest;
      timer.reset();
      timer.start();
    }
    $thresholdNotified = false;
    $endNotified = false;
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
      class="rest content content--copy-last"
      in:flipHorizontally={{ duration: transitionDuration, delay: transitionDuration, oppositeDirection: true }}>
      <Timer
        heading="Rest"
        threshold={$threshold}
        end={$end}
        elapsed={$timer}
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
        threshold={$threshold}
        end={$end}
        elapsed={$timer}
        stopped={$activeStopped}
        {endSession}
        {startSession} />
    </div>
  {/if}
</div>
