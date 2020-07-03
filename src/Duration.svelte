<script>
  import formatIsoDuration from 'date-fns/formatISODuration';
  export let duration = 0;

  function format(duration) {
    // Use the Date object to help with formatting date
    const date = new Date(0, 0, 0, 0, 0, duration);
    const seconds = date.getUTCSeconds();
    const minutes = date.getUTCMinutes();
    const hours = date.getUTCHours();

    if (hours) {
      return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
    }

    return `${padTime(minutes)}:${padTime(seconds)}`;
  }

  function padTime(value) {
    if (value < 10) {
      return `0${value}`;
    }
    return value;
  }
</script>

<time datetime={formatIsoDuration({ seconds: duration })}>
  {format(duration)}
</time>
