<script>
  import {
    notificationsSettings,
    thresholdNotified,
    endNotified
  } from './stores';
  import Notification from './Notification.svelte';

  export let threshold;
  export let end;
</script>

{#if threshold && Number.isFinite(threshold)}
  <Notification
    trigger={threshold}
    notifiedStore={thresholdNotified}
    settings={$notificationsSettings.threshold} />
{/if}
{#if end && Number.isFinite(end)}
  <Notification
    trigger={end}
    notifiedStore={endNotified}
    settings={$notificationsSettings.end} />
{/if}
