<script>
  import { tick } from 'svelte';
  import Duration from './Duration.svelte';
  import { page, pagePrefix } from './stores/title.js';

  export let stopped;
  export let heading;
  export let elapsed;
  export let endSession;
  export let messages;
  export let startSession;

  let dialogButton;

  $: if (stopped) {
    pagePrefix(messages.heading);
    tick().then(() => {
      dialogButton.focus();
    });
  }
</script>

<div class="stack">
  <div class="stack-content" class:visibility--hidden={stopped}>
    <h2>{page(heading)}</h2>
    <Duration duration={elapsed / 1000} />
    <button class="content__action" on:click={endSession}>Stop</button>
  </div>
  <div
    role="dialog"
    aria-labelledby="dialogHeading"
    aria-modal="true"
    class="content stack__overlay"
    class:visibility--hidden={!stopped}>
    <h2 id="dialogHeading">{messages.heading}</h2>
    <div id="dialogDesc">
      {@html messages.content}
    </div>
    <button
      bind:this={dialogButton}
      class="content__action"
      on:click={startSession}>
      {messages.button}
    </button>
  </div>
</div>
