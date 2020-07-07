<script>
  export let obj;
  export let property;
  export let label;
  export let wrapperProps = {};
  export let labelProps = {};
  export let inputProps = {};
</script>

<span {...wrapperProps}>
  <label for={property} {...labelProps}>{label}</label>
  <input
    id={property}
    value={obj[property]}
    on:input={event => (obj[property] = event.target.value)}
    {...inputProps} />
</span>
