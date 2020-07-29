<script>
  import Session from './Session.svelte';
  import Home from './screens/Home.svelte';
  import DocumentTitle from './DocumentTitle.svelte';
  import { title, live } from './stores/title.js';
  import { timer, elapsed, startTime, running } from './stores/timer.js';
  import { tick } from 'svelte';

  let started = localStorage.getItem('started') === 'true';
  let rest = localStorage.getItem('rest') === 'true';

  timer.init({
    elapsed: localStorage.getItem('elapsed'),
    startTime: localStorage.getItem('startTime'),
    running: localStorage.getItem('running') === 'true'
  });

  // Skip re-storing the values that were just read
  let loaded;
  tick().then(() => (loaded = true));

  $: store('elapsed', $elapsed);
  $: store('startTime', $startTime);
  $: store('running', $running);
  $: store('rest', rest);
  $: store('started', started);

  function store(key, value) {
    if (loaded) {
      if (typeof value !== 'undefined') {
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }
    }
  }

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
    <Session
      bind:rest
      {settings}
      {session}
      on:sessionEnd={() => (started = false)} />
  {:else}
    <Home {settings} bind:started action={() => (started = true)} />
  {/if}
</main>
<DocumentTitle title={$title} live={$live} />
