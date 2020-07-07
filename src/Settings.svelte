<script>
  import Field from './Field.svelte';
  export let settings;

  const fieldProps = {
    labelProps: { class: 'sr-only' },
    inputProps: { size: 2, class: 'inline-input' }
  };
</script>

<p class="lead">Pomodoro, with a twist!</p>
<p>
  As usual, after
  <Field
    obj={settings}
    property="minActiveTime"
    label="Active time"
    {...fieldProps} />
  minutes of activity, grab some well deserved
  <Field
    obj={settings}
    property="restForMinActiveTime"
    label="Rest time"
    {...fieldProps} />
  minutes of rest.
</p>
<p>
  If you're in the middle of something when the time is up, you can carry on (up
  to a total of
  <Field
    obj={settings}
    property="maxActiveTime"
    label="Rest time"
    {...fieldProps} />
  minutes of activity)!
  <strong>The rest time will grow accordingly!</strong>
</p>
