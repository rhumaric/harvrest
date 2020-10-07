<script>
  import { page } from '../stores/title.js';

  export let title;
</script>

<form class="content" aria-labelledby="title" on:submit|preventDefault>
  <div>
    <a class="back-link" href="#/">Back</a>
    <h1 id="title">{page(title)}</h1>
  </div>
  <div class="text-align--center column column--medium spaced">
    <a
      class="button button--secondary button--low"
      href="#/settings/timings"
      draggable="false">
      Timings
    </a>
    <a
      class="button button--secondary button--low"
      href="#/settings/notifications"
      draggable="false">
      Notifications
    </a>
    <div class="content__action content-actions">
      <button>Let's go!</button>
    </div>
  </div>
</form>
