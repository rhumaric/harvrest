<script>
  import Session from './Session.svelte';
  import Home from './screens/Home.svelte';
  import { title } from './stores/title.js';
  import { onMount } from 'svelte';

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

  onMount(() => {
    document.head.querySelector('title').setAttribute('aria-live', 'assertive');
  });
</script>

<style>
  :global(head) {
    display: block;
  }

  :global(title) {
    display: block;
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
</style>

<svelte:head>
  <title>{$title}</title>
</svelte:head>

<main class="spaced">
  <h1>Harvrest</h1>
  {#if started}
    <Session {settings} {session} on:sessionEnd={() => (started = false)} />
  {:else}
    <Home {settings} bind:started />
  {/if}
</main>
