<script>
  export let label;
  export let value;
  export let id;

  // export let wrapperProps = {};
  // export let labelProps = {};
  export let inputProps = {};

  function decrement() {
    value = (value || 0) - 1;
    if (value < 0) {
      value = 0;
    }
  }

  function increment() {
    value = (value || 0) + 1;
  }

  function clear() {
    value = 0;
  }

  let input;
  let announce = true;
</script>

<fieldset>
  <legend on:click={() => input.focus()}>{label}</legend>
  <!-- Wrapped in a div for Chrome -->
  <div class="stepper stepper--contained">
    <button class="stepper__decrement" type="button" on:click={decrement}>
      <span aria-hidden="true">-</span>
      <span class="sr-only">Decrement</span>
    </button>
    <label for={id} class="sr-only">Duration</label>
    <span class="clearable-input">
      <input
        on:focus={() => (announce = false)}
        on:blur={() => (announce = true)}
        bind:this={input}
        {id}
        bind:value
        {...inputProps}
        pattern="[0-9]*"
        inputmode="tel"
        on:change />
      <button type="button" on:click={clear}>
        <span aria-hidden="true">&times;</span>
        <span class="sr-only">Clear</span>
      </button>
    </span>
    <button class="stepper__increment" type="button" on:click={increment}>
      <span aria-hidden="true">+</span>
      <span class="sr-only">Increment</span>
    </button>
  </div>
  <div aria-live="polite" class="sr-only">
    {#if announce}{value}{/if}
  </div>
</fieldset>
