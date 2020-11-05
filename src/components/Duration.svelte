<script>
  import { elapsed } from 'stores/timer.js';
  import { REMAINING } from 'stores/timeDisplay.js';
  import {
    clock,
    datetimeAttribute,
    breakdown,
    nearestSecond
  } from 'lib/time.js';

  export let limit;
  export let displayMode;
  // A little ugly, but the fastest way to get not to run `pagePrefix`
  // when not needed by the timer
  export let title = v => v;

  function sign(remaining) {
    // Only start displaying after the 1st second
    if (remaining < 0) {
      return '+';
    }

    return '';
  }

  function remainingSeconds(remaining) {
    return Math.abs(remaining);
  }

  // Floor the elapsed time for display
  // to avoid rounding issues when formatting
  // Must be at display so that timer remains accurate
  // for stopping
  let floored;
  $: floored = Math.floor($elapsed / 1000) * 1000;
</script>

<time class="timer" datetime={datetimeAttribute(breakdown(elapsed))}>
  {#if displayMode == REMAINING}
    {title(
      `${sign(limit - floored)} ${clock(
        breakdown(remainingSeconds(limit - floored))
      )}`,
      { blank: true }
    )}
    <span>{sign(limit - floored)}</span>
    {clock(breakdown(remainingSeconds(limit - floored)))}
  {:else}{title(clock(breakdown(floored)))}{/if}
</time>
