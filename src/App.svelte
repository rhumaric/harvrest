<script>
  import Session from 'components/Session.svelte';
  import Home from 'screens/Home.svelte';
  import DocumentTitle from 'components/DocumentTitle.svelte';
  import { title, live } from 'stores/title.js';
  import {
    started,
    activeStopped,
    restStopped,
    rest,
    endNotified,
    thresholdNotified
  } from 'stores';
  import { timer } from 'stores/timer.js';

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
    <Session {session} on:sessionEnd={end} />
  {:else}
    <Home action={start} />
  {/if}
</main>
<DocumentTitle title={$title} live={$live} />
