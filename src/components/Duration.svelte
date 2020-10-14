<script>
  import { breakdown } from 'stores/timer.js';
  import { clock, datetimeAttribute } from 'lib/time.js';
</script>

<time class="timer" datetime={datetimeAttribute($breakdown)}>
  {clock($breakdown)}
</time>
