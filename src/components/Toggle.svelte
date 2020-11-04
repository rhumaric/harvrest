<script>
  export let value;
  export let options = {};
  export let name = 'toggle';

  function toggle(event) {
    // If click was on a label or an input, the toggling is already
    // handled by the browser, so we need to check for that
    if (!event.target.closest('input,label')) {
      for (let optionValue of Object.keys(options)) {
        if (optionValue !== value) {
          value = optionValue;
          break;
        }
      }
    }
  }

  // Simulate an active state
  let active;
  function activate() {
    active = true;
    // Listen on the whole document to ensure the state is reverted
    // if click/touch is not released within the element
    document.addEventListener('mouseup', () => (active = false), {
      once: true
    });
  }
</script>

<div class="radio-toggle" on:click={toggle} on:mousedown={activate}>
  {#each Object.entries(options) as [optionValue, optionLabel]}
    <input
      id={`${name}_${optionValue}`}
      type="radio"
      {name}
      bind:group={value}
      value={optionValue} />
    <label for={`${name}_${optionValue}`}>{optionLabel}</label>
  {/each}
  <span class:active role="presentation" class="toggle" />
</div>
