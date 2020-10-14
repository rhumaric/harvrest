<script>
  import { afterUpdate } from 'svelte';

  let previousTitle;
  export let title;
  export let live;

  let announcer;

  // Run afterUpdate to make sure the announcer element exists
  // Use afterUpdate rather than template so we don't trigger announcements
  // by switching `live` only
  afterUpdate(function() {
    if (live && previousTitle !== title) {
      announcer.textContent = title;
    }
    previousTitle = title;
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div aria-live="assertive" bind:this={announcer} />

<style>
  div {
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
