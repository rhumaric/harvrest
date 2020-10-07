<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let title;
  export let html = {};
  export let data = {};

  let editableData;
  // Quick deep cloning
  $: editableData = JSON.parse(JSON.stringify(data));
  // console.log(data, editableData, editableData === data)

  function handleSubmit(event) {
    data = editableData;
    dispatch(event.submitter.name);
  }
</script>

<form class="content" on:submit|preventDefault={handleSubmit} {...html}>
  <div>
    <a class="back-link" href="#/settings">Back</a>
    <h1 id="title" class="mt-0">{title}</h1>
  </div>
  <slot {editableData} />
  <div class="content__action content-actions">
    <button name="save" class="button--secondary">Save</button>
    <button name="go">Let's go!</button>
  </div>
</form>
