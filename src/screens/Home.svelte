<script>
  import { onMount } from 'svelte';
  import Description from './Home/Description.svelte';
  import Timings from './Home/Timings.svelte';
  import Notifications from './Home/Notifications.svelte';
  import SettingsForm from './Home/SettingsForm.svelte';
  import { page } from 'stores/title.js';
  import { notificationsSettings, timingsSettings } from 'stores';
  import Settings from './Settings.svelte';

  export let action = () => {};

  let hash = window.location.hash;

  function updateHash() {
    hash = window.location.hash;
  }

  function handleSave() {
    window.location.hash = '/settings';
  }

  function handleGo() {
    action();
    window.location.hash = '';
  }

  onMount(() => {
    window.addEventListener('hashchange', updateHash);
    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  });

  let isSettings;
  $: isSettings = /#\/settings/.test(hash);

  let data;
</script>

{#if hash === '#/settings/timings'}
  <SettingsForm
    bind:data={$timingsSettings}
    let:editableData={data}
    title={page('Timings')}
    on:save={handleSave}
    on:go={handleGo}>
    <Timings settings={data} />
  </SettingsForm>
{:else if hash === '#/settings/notifications'}
  <SettingsForm
    bind:data={$notificationsSettings}
    let:editableData={data}
    title={page('Notifications')}
    on:save={handleSave}
    on:go={handleGo}>
    <Notifications settings={data} />
  </SettingsForm>
{:else if isSettings}
  <Settings title={page('Settings')} on:submit={handleGo} />
{:else}
  <form class="content content--copy-last" on:submit|preventDefault={handleGo}>
    <h1>{page('Pomodoro, with a twist!')}</h1>
    <Description settings={$timingsSettings} />
    <p class="text-align--center"><a href="#/settings">Settings</a></p>
    <div class="content__action content-actions">
      <button>Let's go!</button>
    </div>
  </form>
{/if}
