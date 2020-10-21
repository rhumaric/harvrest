<script>
  import { humanize, breakdown, microseconds } from 'lib/time.js';

  export let settings;
  function formatTime(minutes) {
    return humanize(breakdown(microseconds(minutes)));
  }
</script>

<p />
<p>
  Like in a regular pomodorro, break down your work in chunks of active and rest
  time. After {formatTime(settings.minActiveTime)} of activity, grab some well deserved
  {formatTime(settings.restForMinActiveTime)} of rest.
</p>
<p>
  But, if you're in the middle of something when the time is up, feel free to
  can carry on (up to a total of {formatTime(settings.maxActiveTime)} of activity)!
  <strong>The rest time will grow accordingly!</strong>
</p>
