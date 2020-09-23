<script>
  const MINIMUM = 1;

  export let label;
  export let value;
  export let id;
  export let error;

  // export let wrapperProps = {};
  // export let labelProps = {};
  export let inputProps = {};

  function decrement() {
    value = Math.round((value || MINIMUM) - 1);
    if (value < MINIMUM) {
      value = MINIMUM;
    }
    error = null;
  }

  function increment() {
    value = Math.round((value || MINIMUM) + 1);
    error = null;
  }

  function clear() {
    value = MINIMUM;
  }

  let input;
  let announce = true;
  let el;

  function handleFocusout(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      validateValue();
    }
  }

  function validateValue() {
    if (Number.isNaN(parseInt(input.value, 10))) {
      error = 'Please enter a number';
    } else {
      error = null;
    }
  }
</script>

<fieldset class="spaced--small" on:focusout={handleFocusout}>
  <legend on:click={() => input.focus()}>{label}</legend>
  <!-- Wrapped in a div for Chrome -->
  <div class="stepper stepper--contained" class:stepper--error={error}>
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
        {value}
        on:input={e => (value = parseInt(e.target.value, 10))}
        {...inputProps}
        pattern="[0-9]*"
        inputmode="tel"
        aria-describedby={error ? `${id}_error` : null}
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
  {#if error}
    <p class="error" id={`${id}_error`}>{error}</p>
  {/if}
</fieldset>
