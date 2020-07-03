import App from './App.svelte';

// Code goes here
const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
});

if (process.env.NODE_ENV !== 'production') {
  window.app = app;
}

export default app;
