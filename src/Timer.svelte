<script>
  import { tick } from 'svelte';
  import Duration from './Duration.svelte';
  import { page, pagePrefix } from './stores/title.js';
  import { breakdown } from './stores/timer.js';
  import { messages } from './stores';
  import { clock } from './time.js';

  export let stopped;
  export let heading;
  export let endSession;
  export let startSession;

  let focusTarget;

  $: if (stopped) {
    pagePrefix(messages.heading);
    tick().then(() => {
      focusTarget.focus();
    });
  } else {
    pagePrefix(clock($breakdown));
  }
</script>

<div class="stack">
  <div class="stack-content" class:visibility--hidden={stopped}>
    <h2>{page(heading)}</h2>
    <Duration />
    <button class="content__action" on:click={endSession}>Stop</button>
  </div>
  <div
    tabindex="-1"
    role="dialog"
    bind:this={focusTarget}
    aria-labelledby="dialogHeading"
    aria-modal="true"
    class="content stack__overlay"
    class:visibility--hidden={!stopped}>
    <h2 id="dialogHeading">{$messages.heading}</h2>
    <div id="dialogDesc">
      {@html $messages.content}
    </div>
    <button class="content__action" on:click={startSession}>
      {$messages.button}
    </button>
  </div>
</div>
