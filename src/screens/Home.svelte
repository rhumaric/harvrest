<script>
  import { onMount } from 'svelte';
  import Settings from '../Settings.svelte';
  import { page } from '../stores/title.js';

  export let settings;
  export let action = () => {};

  onMount(() => {
    page();
  });
</script>

<form aria-label="Settings" class="content" on:submit|preventDefault={action}>
  <Settings {settings} />
  <button class="content__action">Let's go!</button>
</form>
