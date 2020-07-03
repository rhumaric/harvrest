<script>
  import Duration from './Duration.svelte';
  import { time } from './stores.js';
</script>

<Duration duration={$time / 1000} />
