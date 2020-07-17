<script>
  import Duration from './Duration.svelte';

  export let stopped;
  export let heading;
  export let elapsed;
  export let endSession;
  export let messages;
  export let startSession;
</script>

<div class="stack">
  <div class="stack-content" class:visibility--hidden={stopped}>
    <h2>{heading}</h2>
    <Duration duration={elapsed / 1000} />
    <button class="content__action" on:click={endSession}>Stop</button>
  </div>
  <div class="content stack__overlay" class:visibility--hidden={!stopped}>
    <h2>{messages.heading}</h2>
    {@html messages.content}
    <button class="content__action" on:click={startSession}>
      {messages.button}
    </button>
  </div>
</div>
