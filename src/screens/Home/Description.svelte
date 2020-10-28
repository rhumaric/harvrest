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
  time. After <strong>{formatTime(settings.minActiveTime)} of activity</strong>,
  grab some well deserved <strong>{formatTime(settings.restForMinActiveTime)} of
    rest</strong>.
</p>
<p>
  But, if you're in the middle of something when the time is up, feel free to
  can carry on (up to a <strong>total of {formatTime(settings.maxActiveTime)} of
    activity</strong>).
</p>

<p class="twist mt--small text-align--center">
  The rest time will grow accordingly!
</p>
