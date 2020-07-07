<script>
  import Duration from './Duration.svelte';
  export let started;
  export let rest;
  export let elapsed;
  export let endSession;
  export let startSession;
</script>

{#if started}
  {rest ? 'Rest' : 'Active'}
  <Duration duration={elapsed / 1000} />
  <button on:click={endSession}>End</button>
{:else}
  <button on:click={startSession}>Start</button>
{/if}
