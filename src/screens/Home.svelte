<script>
  import { onMount } from 'svelte';
  import Description from './Home/Description';
  import Timings from './Home/Timings.svelte';
  import Notifications from './Home/Notifications.svelte';
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
  {#if hash === '#/settings/timings'}
    <Timings {settings} />
  {:else if hash === '#/settings/notifications'}
    <Notifications {settings} />
  {:else if /#\/settings/.test(hash)}
    <h1>Settings</h1>
    <div class="text-align--center column column--medium spaced">
      <a
        class="button button--secondary button--low"
        href="#/settings/timings"
        draggable="false">
        Timings
      </a>
      <a
        class="button button--secondary button--low"
        href="#/settings/notifications"
        draggable="false">
        Notifications
      </a>
    </div>
  {:else}
    <h1>Pomodoro, with a twist!</h1>
    <Description {settings} />
    <p>
      <a href="#/settings">Set your own times</a>
    </p>
  {/if}
  <button class="content__action">Let's go!</button>
</form>
