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

  function end() {
    $started = false;
  }

  function start() {
    $started = true;
    reset();
  }

  function reset() {
    $activeStopped = false;
    $restStopped = false;
    $rest = false;
    $thresholdNotified = false;
    $endNotified = false;
    timer.reset();
    timer.start();
  }
</script>

<main class="spaced">
  <p class="logo">Harvrest</p>
  {#if $started}
    <Session {settings} {session} on:sessionEnd={end} />
  {:else}
    <Home {settings} action={start} />
  {/if}
</main>
<DocumentTitle title={$title} live={$live} />
