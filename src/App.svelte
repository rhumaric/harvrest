<script>
  import Session from './Session.svelte';
  import Home from './screens/Home.svelte';
  import DocumentTitle from './DocumentTitle.svelte';
  import { title, live } from './stores/title.js';
  import {
    started,
    activeStopped,
    restStopped,
    rest,
    endNotified,
    thresholdNotified
  } from './stores';
  import { timer } from './stores/timer.js';

  let settings = {
    minActiveTime: 5 / 60,
    maxActiveTime: 10 / 60,
    restForMinActiveTime: 5 / 60
  };

  let session = {
    activeTime: 0,
    restTime: 0
  };
</script>

<main class="spaced">
  <p class="lead">Harvrest</p>
  {#if $started}
    <Session {settings} {session} on:sessionEnd={() => ($started = false)} />
  {:else}
    <Home
      {settings}
      action={() => {
        $started = true;
        $activeStopped = false;
        $restStopped = false;
        $rest = false;
        $thresholdNotified = false;
        $endNotified = false;
        timer.reset();
        timer.start();
      }} />
  {/if}
</main>
<DocumentTitle title={$title} live={$live} />
