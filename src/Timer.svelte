<script>
  import { tick } from 'svelte';
  import { get, derived } from 'svelte/store';
  import Duration from './Duration.svelte';
  import Notification from './Notification.svelte';
  import { page, pagePrefix } from './stores/title.js';
  import { timer, running, breakdown } from './stores/timer.js';
  import { once } from './stores/once.js';
  import { afterTick } from './stores/afterTick.js';
  import { messages } from './stores';
  import { clock } from './time.js';
  import {
    thresholdNotified as thresholdNotifiedStore,
    endNotified as endNotifiedStore,
    notificationsSettings
  } from './stores';
  import endUrl from './audio/reward-notification__joao-janz.mp3';
  import thresholdUrl from './audio/bonus-points__joao-janz.mp3';
  import { logDerivation } from './stores/debug.js';

  export let stopped;
  export let heading;
  export let end;
  export let threshold;
  export let endSession;
  export let startSession;
  export let allowPause = true;

  let focusTarget;

  const thresholdReached = once([timer], ([timer]) => {
    if (threshold && timer > threshold) {
      console.log('Threshold reached', timer, threshold);
      return true;
    }
  });

  const endReached = once([timer], ([timer]) => {
    if (end && timer > end) {
      console.log('End reached', timer, threshold);
      return true;
    }
  });

  const notification = derived(
    [thresholdReached, endReached, thresholdNotifiedStore, endNotifiedStore],
    afterTick(logDerivation(values => getNotification(...values)))
  );

  function getNotification(
    thresholdReached,
    endReached,
    thresholdNotified,
    endNotified
  ) {
    if (!endNotified && endReached) {
      endNotifiedStore.set(true);
      thresholdNotifiedStore.set(true);
      return {
        settings: $notificationsSettings.end,
        url: endUrl
      };
    }
    if (!thresholdNotified && thresholdReached) {
      console.log('Notifying threshold');
      thresholdNotifiedStore.set(true);
      console.log(get(thresholdNotifiedStore));
      return {
        settings: $notificationsSettings.threshold,
        url: thresholdUrl
      };
    }
  }

  $: if ($endReached) {
    timer.stop();
  }

  let overlay;
  $: overlay = stopped || $endReached;

  $: if (overlay) {
    pagePrefix(messages.heading);
    // Leave time for element to be rendered before focusing
    tick().then(() => {
      focusTarget.focus();
    });
  } else {
    pagePrefix(clock($breakdown));
  }

  function onPauseClick() {
    if ($running) {
      timer.pause();
    } else {
      timer.start();
    }
  }
</script>

{#if $notification}
  <Notification {...$notification} />
{/if}
<div class="stack">
  <div class="stack-content" class:visibility--hidden={overlay}>
    <h2>{page(heading)}</h2>
    <Duration />
    <div class="content__action">
      {#if allowPause}
        <button on:click={onPauseClick}>
          {$running ? 'Pause' : 'Resume'}
        </button>
      {/if}
      <button on:click={endSession}>Done</button>
    </div>
  </div>
  <div
    tabindex="-1"
    role="dialog"
    bind:this={focusTarget}
    aria-labelledby="dialogHeading"
    aria-modal="true"
    class="content stack__overlay"
    class:visibility--hidden={!overlay}>
    <h2 id="dialogHeading">{$messages.heading}</h2>
    <div id="dialogDesc">
      {@html $messages.content}
    </div>
    <button class="content__action" on:click={startSession}>
      {$messages.button}
    </button>
  </div>
</div>
