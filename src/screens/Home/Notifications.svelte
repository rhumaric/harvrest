<script>
  import Checkbox from '../../components/Checkbox.svelte';

  export let settings = {};
</script>

<div class="column column--medium spaced">
  <fieldset>
    <legend class="margin-after--small">
      <span class="title-with-side-lines"> <span>Threshold</span> </span>
    </legend>
    <div class="spaced--small">
      <Checkbox
        id="threshold_visual"
        label="Visual"
        bind:value={settings.threshold.visual} />
      <Checkbox
        id="threshold_audio"
        label="Audio"
        bind:value={settings.threshold.audio} />
      <Checkbox
        id="threshold_vibration"
        label="Vibration"
        bind:value={settings.threshold.vibration} />
    </div>
  </fieldset>
  <fieldset>
    <legend class="margin-after--small">
      <span class="title-with-side-lines"> <span>End</span> </span>
    </legend>
    <div class="spaced--small">
      <Checkbox id="end_audio" label="Audio" bind:value={settings.end.audio} />
      <Checkbox
        id="end_vibration"
        label="Vibration"
        bind:value={settings.end.vibration} />
    </div>
  </fieldset>
</div>
