<script>
  import Field from '../../Field.svelte';
  export let settings;

  const fieldProps = {
    inputProps: { size: 2, type: 'number' }
  };
</script>

<div>
  <a class="back-link" href="#/settings">Back</a>
  <h1>Timings</h1>
</div>
<div class="column column--medium spaced">
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
    <legend class="margin-after">
      <span class="title-with-side-lines"> <span>Limits</span> </span>
    </legend>
    <Field
      bind:value={settings.maxActiveTime}
      id="restForMaxActiveTime"
      label="Max. Active time"
      {...fieldProps} />
  </fieldset>
</div>
