<script>
  import Stepper from 'components/Stepper.svelte';
  export let settings;

  const fieldProps = {
    inputProps: { size: 2, type: 'number' }
  };
  const unitProps = {
    unit: 'min',
    unitDescription: 'in minutes'
  };
</script>

<div class="column column--medium spaced">
  <Stepper
    bind:value={settings.minActiveTime}
    label="Active time"
    id="minActiveTime"
    {...unitProps}
    {...fieldProps} />
  <Stepper
    bind:value={settings.restForMinActiveTime}
    id="restForMinActiveTime"
    label="Rest time"
    {...unitProps}
    {...fieldProps} />

  <fieldset>
    <legend class="margin-after--small">
      <span class="title-with-side-lines"> <span>Limits</span> </span>
    </legend>
    <Stepper
      bind:value={settings.maxActiveTime}
      id="restForMaxActiveTime"
      label="Max. Active time"
      {...unitProps}
      {...fieldProps} />
  </fieldset>
</div>
