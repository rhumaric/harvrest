<script>
  import Description from './Home/Description';
  import { onMount } from 'svelte';
  import Settings from '../Settings.svelte';
  import { page } from '../stores/title.js';

  export let settings;
  export let action = () => {};

  let configure = false;

  onMount(() => {
    page();
  });
</script>

<form aria-label="Settings" class="content" on:submit|preventDefault={action}>
  {#if configure}
    <Settings {settings} />
  {:else}
    <p class="lead">Pomodoro, with a twist!</p>
    <Description {settings} />
    <a href="#settings" on:click|preventDefault={() => (configure = true)}>
      Configure
    </a>
  {/if}
  <button class="content__action">Let's go!</button>
</form>
