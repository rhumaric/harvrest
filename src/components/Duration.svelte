<script>
  import { breakdown, elapsed } from 'stores/timer.js';
  import { REMAINING } from 'stores/timeDisplayMode.js';
  import {
    clock,
    datetimeAttribute,
    breakdown as timeBreakdown,
    nearestSecond
  } from 'lib/time.js';
  import { pagePrefix } from 'stores/title.js';

  export let limit;
  export let displayMode;

  function sign(time) {
    // Use 500 to account for the rounding
    if (time > 500) {
      return '+';
    }

    return '';
  }
</script>

<time class="timer" datetime={datetimeAttribute($breakdown)}>
  {#if displayMode == REMAINING}
    {sign($elapsed - limit)}
    {pagePrefix(clock(timeBreakdown(nearestSecond(Math.abs($elapsed - limit)))))}
  {:else}{pagePrefix(clock($breakdown))}{/if}
</time>
