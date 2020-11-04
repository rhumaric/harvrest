<script>
  export let value;
  export let options = {};
  export let name = 'toggle';
</script>

<div class="toggle">
  {#each Object.entries(options) as [optionValue, optionLabel]}
    <input
      id={`${name}_${optionValue}`}
      type="radio"
      bind:group={value}
      value={optionValue} />
    <label for={`${name}_${optionValue}`}>{optionLabel}</label>
  {/each}
</div>
