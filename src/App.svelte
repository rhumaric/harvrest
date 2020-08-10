<script>
  import Session from './Session.svelte';
  import Home from './screens/Home.svelte';
  import DocumentTitle from './DocumentTitle.svelte';
  import { title, live } from './stores/title.js';
  import { tick } from 'svelte';
  import {
    started,
    activeStopped,
    restStopped,
    rest,
    notified
  } from './stores';
  import { timer } from './stores/timer.js';

  let settings = {
    minActiveTime: 25,
    maxActiveTime: 0,
    restForMinActiveTime: 5
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
        $notified = false;
        timer.reset();
        timer.start();
      }} />
  {/if}
</main>
<DocumentTitle title={$title} live={$live} />
