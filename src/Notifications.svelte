<script>
  import {
    notificationsSettings,
    thresholdNotified,
    endNotified
  } from './stores';
  import Notification from './Notification.svelte';
  import endUrl from './audio/reward-notification__joao-janz.mp3';
  import thresholdUrl from './audio/bonus-points__joao-janz.mp3';
  export let threshold;
  export let end;
</script>

{#if threshold && Number.isFinite(threshold)}
  <Notification
    url={thresholdUrl}
    trigger={threshold}
    notifiedStore={thresholdNotified}
    settings={$notificationsSettings.threshold} />
{/if}
{#if end && Number.isFinite(end)}
  <Notification
    url={endUrl}
    trigger={end}
    notifiedStore={endNotified}
    settings={$notificationsSettings.end} />
{/if}
