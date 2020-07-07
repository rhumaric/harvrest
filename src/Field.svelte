<script>
  export let obj;
  export let property;
  export let label;
</script>

<div>
  <label for={property}>{label}</label>
  <input
    id={property}
    value={obj[property]}
    on:input={event => (obj[property] = event.target.value)} />
</div>
