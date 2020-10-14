<script>
  import { humanize, breakdown, microseconds } from '../../time.js';

  export let settings;
  function formatTime(minutes) {
    return humanize(breakdown(microseconds(minutes)));
  }
</script>

<p />
<p>
  As usual, after {formatTime(settings.minActiveTime)} of activity, grab some well
  deserved {formatTime(settings.restForMinActiveTime)} of rest.
</p>
<p>
  If you're in the middle of something when the time is up, you can carry on (up
  to a total of {formatTime(settings.maxActiveTime)} of activity)! <strong>The
    rest time will grow accordingly!</strong>
</p>
