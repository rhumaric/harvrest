<script>
  import { onMount } from 'svelte';
  import Description from './Home/Description.svelte';
  import Timings from './Home/Timings.svelte';
  import Notifications from './Home/Notifications.svelte';
  import SettingsForm from './Home/SettingsForm.svelte';
  import { page } from '../stores/title.js';
  import { notificationsSettings } from '../stores';

  export let settings;
  export let action = () => {};

  let hash = window.location.hash;

  function updateHash() {
    hash = window.location.hash;
  }

  function onSubmit(event) {
    if (event.submitter.name == 'save') {
      window.location.hash = '/settings';
    } else {
      action();
      window.location.hash = '';
    }
  }

  onMount(() => {
    page();
    window.addEventListener('hashchange', updateHash);
    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  });

  let isSettings;
  $: isSettings = /#\/settings/.test(hash);
</script>

{#if hash === '#/settings/timings'}
  <SettingsForm html={{ 'aria-labelledby': 'title' }} on:submit={onSubmit}>
    <div>
      <a class="back-link" href="#/settings">Back</a>
      <h1 id="title">Timings</h1>
    </div>
    <Timings {settings} />
  </SettingsForm>
{:else if hash === '#/settings/notifications'}
  <SettingsForm html={{ 'aria-labelledby': 'title' }} on:submit={onSubmit}>
    <div>
      <a class="back-link" href="#/settings">Back</a>
      <h1 id="title" class="mt-0">Notifications</h1>
    </div>
    <Notifications {$notificationsSettings} />
  </SettingsForm>
{:else if isSettings}
  <form
    class="content"
    aria-labelledby="title"
    on:submit|preventDefault={onSubmit}>
    <div>
      <a class="back-link" href="#/">Back</a>
      <h1 id="title">Settings</h1>
    </div>
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
      <div class="content__action content-actions">
        <button>Let's go!</button>
      </div>
    </div>
  </form>
{:else}
  <form class="content content--copy-last">
    <h1>Pomodoro, with a twist!</h1>
    <Description {settings} />
    <p class="text-align--center"><a href="#/settings">Settings</a></p>
    <div class="content__action content-actions">
      <button>Let's go!</button>
    </div>
  </form>
{/if}
