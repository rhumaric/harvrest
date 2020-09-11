<script>
  import { tick } from 'svelte';
  import { get, derived } from 'svelte/store';
  import Duration from './Duration.svelte';
  import Notification from './Notification.svelte';
  import { page, pagePrefix } from './stores/title.js';
  import { timer, running, breakdown } from './stores/timer.js';
  import { once } from './stores/once.js';
  import { messages } from './stores';
  import { clock } from './time.js';
  import {
    thresholdNotified as thresholdNotifiedStore,
    endNotified as endNotifiedStore,
    notificationsSettings
  } from './stores';
  import endUrl from './audio/reward-notification__joao-janz.mp3';
  import thresholdUrl from './audio/bonus-points__joao-janz.mp3';

  export let stopped;
  export let heading;
  export let end;
  export let threshold;
  export let endSession;
  export let startSession;

  let focusTarget;

  const thresholdReached = once([timer, threshold], ([timer, threshold]) => {
    if (timer > threshold) {
      return true;
    }
  });

  const endReached = once([timer, end], ([timer, end]) => {
    if (timer > end) {
      return true;
    }
  });

  let settings = get(notificationsSettings);

  let callback;
  const notification = derived(
    [thresholdReached, endReached, thresholdNotifiedStore, endNotifiedStore],
    async (
      [thresholdReached, endReached, thresholdNotified, endNotified],
      set
    ) => {
      callback = () => {
        if (!endNotified && endReached) {
          endNotifiedStore.set(true);
          thresholdNotifiedStore.set(true);
          set({
            settings: settings.end,
            url: endUrl
          });
          return;
        }
        if (!thresholdNotified && thresholdReached) {
          thresholdNotifiedStore.set(true);
          set({
            settings: settings.threshold,
            url: thresholdUrl
          });
        }
      };
      await tick();
      if (callback) {
        callback();
        callback = null;
      }
    }
  );

  let overlay;
  $: overlay = stopped || $endReached;

  $: if (overlay) {
    pagePrefix(messages.heading);
    tick().then(() => {
      timer.stop();
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
      <button on:click={onPauseClick}> {$running ? 'Pause' : 'Resume'} </button>
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
