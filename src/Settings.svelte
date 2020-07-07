<script>
  import Field from './Field.svelte';
  export let settings;
</script>

<Field obj={settings} property="minActiveTime" label="Active time" />
<Field obj={settings} property="maxActiveTime" label="Max active time" />
<Field obj={settings} property="restForMinActiveTime" label="Rest time" />
