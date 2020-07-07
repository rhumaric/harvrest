<script>
  import Timer from './Timer.svelte';
  import { time } from './stores.js';

  let started;
  let rest;
  let elapsed = 0;
  // Initialize with a no-op so there's no need
  // to check if it holds an unsubscribe function
  // before calling it
  let stop = () => {};

  let activeTime = 0;
  let restTime = 0;

  let threshold = Infinity;

  let minActiveTime = 2 * 1000;
  let maxActiveTime = 10 * 1000;
  let restForMinActiveTime = 1 * 1000;

  function endSession() {
    stop();
    if (!rest) {
      activeTime = elapsed;
    } else {
      restTime = elapsed;
    }
    if (!rest && elapsed > minActiveTime) {
      rest = true;
      startTimer();
    } else {
      started = false;
      rest = false;
    }
  }
  function startSession() {
    started = true;
    startTimer();
  }
  function startTimer() {
    // Subscribe to the store ourselves
    // so we can unsubscribe on our own time
    // rather than when Svelte destroys the Duration
    // subscription
    stop = time().subscribe(registerTime);
    if (rest) {
      const earnedRestTime =
        (restForMinActiveTime * activeTime) / minActiveTime;
      threshold = earnedRestTime || Infinity;
    } else {
      threshold = maxActiveTime || Infinity;
    }
  }
  function registerTime(value) {
    elapsed = value;
    if (elapsed > threshold) {
      endSession();
    }
  }
</script>

<Timer {started} {rest} {elapsed} {startSession} {endSession} />
