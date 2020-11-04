<script>
  import { tick, onMount } from 'svelte';
  import { get, derived } from 'svelte/store';
  import Duration from 'components/Duration.svelte';
  import Notification from 'components/Notification.svelte';
  import { page, pagePrefix } from 'stores/title.js';
  import { timer, running, breakdown } from 'stores/timer.js';
  import { once } from 'stores/once.js';
  import { afterTick } from 'stores/afterTick.js';
  import { messages } from 'stores';
  import { clock } from 'lib/time.js';
  import {
    thresholdNotified as thresholdNotifiedStore,
    endNotified as endNotifiedStore,
    notificationsSettings
  } from 'stores';
  import Toggle from './Toggle.svelte';
  import { timeDisplayMode, ELAPSED, REMAINING } from 'stores/timeDisplayMode';
  import endUrl from 'audio/reward-notification__joao-janz.mp3';
  import thresholdUrl from 'audio/bonus-points__joao-janz.mp3';

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
      return true;
    }
  });

  const endReached = once([timer], ([timer]) => {
    if (end && timer > end) {
      return true;
    }
  });

  const notification = derived(
    [thresholdReached, endReached, thresholdNotifiedStore, endNotifiedStore],
    afterTick(values => getNotification(...values))
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
      thresholdNotifiedStore.set(true);
      return {
        settings: $notificationsSettings.threshold,
        url: thresholdUrl
      };
    }
  }

  $: if ($endReached) {
    endSession();
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

  onMount(() => {
    page(heading);
  });
</script>

{#if $notification}
  <Notification {...$notification} />
{/if}
<div class="stack">
  <div class="stack-content" class:visibility--hidden={overlay}>
    <h1>{heading}</h1>
    <div class="spaced--small my--auto">
      <Duration />
      <fieldset>
        <legend class="sr-only">Display time</legend>
        <Toggle
          legend="display"
          bind:value={$timeDisplayMode}
          options={{ [ELAPSED]: 'Elapsed', [REMAINING]: 'Remaining' }} />
      </fieldset>
    </div>
    <div class="content__action content-actions">
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
    <h1 id="dialogHeading">{$messages.heading}</h1>
    <div id="dialogDesc">
      {@html $messages.content}
    </div>
    <div class="content__action">
      <button on:click={startSession}> {$messages.button} </button>
    </div>
  </div>
</div>
