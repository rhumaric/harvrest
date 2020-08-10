<script>
  export let id;
  export let label;
  export let value;
</script>

<div class="checkbox">
  <input {id} type="checkbox" bind:checked={value} />
  <label for={id}>{label}</label>
</div>
