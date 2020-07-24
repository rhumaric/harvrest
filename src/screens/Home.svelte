<script>
  import { onMount } from 'svelte';
  import Settings from '../Settings.svelte';
  import { page } from '../stores/title.js';

  export let started;
  export let settings;

  onMount(() => {
    page();
  });
</script>

<form
  aria-label="Settings"
  class="content"
  on:submit|preventDefault={() => (started = true)}>
  <Settings {settings} />
  <button class="content__action">Let's go!</button>
</form>
