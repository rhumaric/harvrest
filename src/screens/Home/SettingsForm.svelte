<script>
</script>

<form class="content" on:submit|preventDefault>
  <slot />
  <div class="content__action content-actions">
    <button name="save" class="button--secondary">Save</button>
    <button>Let's go!</button>
  </div>
</form>
