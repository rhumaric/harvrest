<script>
  import Checkbox from '../../components/Checkbox.svelte';
  import { notificationsSettings } from '../../stores';
</script>

<h1>Notifications</h1>
<div class="column column--medium spaced">
  <fieldset>
    <legend class="margin-after">
      <span class="title-with-side-lines">
        <span>Threshold</span>
      </span>
    </legend>
    <div class="spaced--small">
      <Checkbox
        id="threshold_visual"
        label="Visual"
        bind:value={$notificationsSettings.threshold.visual} />
      <Checkbox
        id="threshold_audio"
        label="Audio"
        bind:value={$notificationsSettings.threshold.audio} />
      <Checkbox
        id="threshold_vibration"
        label="Vibration"
        bind:value={$notificationsSettings.threshold.vibration} />
    </div>
  </fieldset>
  <fieldset>
    <legend class="margin-after">
      <span class="title-with-side-lines">
        <span>End</span>
      </span>
    </legend>
    <div class="spaced--small">
      <Checkbox
        id="end_audio"
        label="Audio"
        bind:value={$notificationsSettings.end.audio} />
      <Checkbox
        id="end_vibration"
        label="Vibration"
        bind:value={$notificationsSettings.end.vibration} />
    </div>
  </fieldset>
</div>
