<script>
  import Stepper from 'components/Stepper.svelte';
  export let settings;

  const fieldProps = {
    inputProps: { size: 2, type: 'number' }
  };
</script>

<div class="column column--medium spaced">
  <Stepper
    bind:value={settings.minActiveTime}
    label="Active time"
    id="minActiveTime"
    {...fieldProps} />
  <Stepper
    bind:value={settings.restForMinActiveTime}
    id="restForMinActiveTime"
    label="Rest time"
    {...fieldProps} />

  <fieldset>
    <legend class="margin-after">
      <span class="title-with-side-lines"> <span>Limits</span> </span>
    </legend>
    <Stepper
      bind:value={settings.maxActiveTime}
      id="restForMaxActiveTime"
      label="Max. Active time"
      {...fieldProps} />
  </fieldset>
</div>
