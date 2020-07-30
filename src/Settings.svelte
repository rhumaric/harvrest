<script>
  import Field from './Field.svelte';
  export let settings;

  const fieldProps = {
    labelProps: { class: 'd-block' },
    inputProps: { size: 2, type: 'number' }
  };
</script>

<Field
  bind:value={settings.minActiveTime}
  label="Active time"
  id="minActiveTime"
  {...fieldProps} />
<Field
  bind:value={settings.restForMinActiveTime}
  id="restForMinActiveTime"
  label="Rest time"
  {...fieldProps} />

<fieldset>
  <legend>Limits</legend>
  <Field
    bind:value={settings.maxActiveTime}
    id="restForMaxActiveTime"
    label="Max. Active time"
    {...fieldProps} />
</fieldset>
