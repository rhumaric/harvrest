<script>
  import Duration from './Duration.svelte';
  export let rest;
  export let elapsed;
</script>

<p class="lead">{rest ? 'Rest' : 'Active'}</p>
<Duration duration={elapsed / 1000} />
