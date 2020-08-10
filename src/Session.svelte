<script>
  import { derived } from 'svelte/store';
  import { flipHorizontally } from './transitions.js';
  import { minutes, microseconds } from './time.js';
  import Timer from './Timer.svelte';
  import url from './audio/bells-multiple.mp3';
  import {
    rest,
    activeStopped,
    restStopped,
    restMinutesEarned,
    notified
  } from './stores';
  import { timer } from './stores/timer.js';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let settings;
  export let session;

  const threshold = derived(
    [rest, restMinutesEarned],
    ([rest, restMinutesEarned]) => {
      if (rest) {
        return microseconds(restMinutesEarned) || Infinity;
      } else {
        return microseconds(settings.maxActiveTime) || microseconds(1);
      }
    }
  );
  $: if (!$notified && $timer > $threshold) {
    const audio = new Audio(url);
    audio.loop = false;
    audio.addEventListener('canplaythrough', () => {
      unlessEventWithin('play', audio, 100, function() {
        console.log('Could not start playing');
      });
      audio.play();
      // Needs to be here to sync' with the start of the audio
      if (window.navigator.vibrate) {
        window.navigator.vibrate([200, 100, 200]);
      }
    });

    $notified = true;
  }

  function unlessEventWithin(eventName, target, delay, callback) {
    const timeout = setTimeout(callback, delay);
    target.addEventListener(eventName, () => clearTimeout(timeout), {
      once: true
    });
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
      timer.start();
    }
    $notified = false;
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
        elapsed={$timer}
        stopped={$activeStopped}
        {endSession}
        {startSession} />
    </div>
  {/if}
</div>
