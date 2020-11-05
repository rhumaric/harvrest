if (!window.SubmitEvent) {
  const SELECTOR = 'button:not([type="button"]):not([type="reset"])';

  let submitter;
  document.addEventListener('click', function({ target }) {
    if (target.matches(SELECTOR)) {
      submitter = target;
    }
  });

  document.addEventListener(
    'submit',
    function(event) {
      event.submitter = submitter || event.target.querySelector(SELECTOR);
      submitter = null;
    },
    true
  );
}
