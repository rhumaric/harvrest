<script>
  import Description from './Home/Description';
  import { onMount } from 'svelte';
  import Settings from '../Settings.svelte';
  import { page } from '../stores/title.js';

  export let settings;
  export let action = () => {};

  let hash = window.location.hash;

  function updateHash() {
    hash = window.location.hash;
  }

  function onSubmit() {
    action();
    window.location.hash = '';
  }

  onMount(() => {
    page();
    window.addEventListener('hashchange', updateHash);
    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  });
</script>

<form aria-label="Settings" class="content" on:submit|preventDefault={onSubmit}>
  {#if hash === '#/settings'}
    <Settings {settings} />
  {:else}
    <p class="lead">Pomodoro, with a twist!</p>
    <Description {settings} />
    <p>
      <a href="#/settings">Set your own times</a>
    </p>
  {/if}
  <button class="content__action">Let's go!</button>
</form>
