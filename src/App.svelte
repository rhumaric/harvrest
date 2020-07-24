<script>
  import Session from './Session.svelte';
  import Home from './screens/Home.svelte';
  import DocumentTitle from './DocumentTitle.svelte';
  import { title, live } from './stores/title.js';
  import { onMount, tick } from 'svelte';

  let started;
  let rest;
  let elapsed = 0;

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
  <h1>Harvrest</h1>
  {#if started}
    <Session {settings} {session} on:sessionEnd={() => (started = false)} />
  {:else}
    <Home {settings} bind:started />
  {/if}
</main>
<DocumentTitle title={$title} live={$live} />
