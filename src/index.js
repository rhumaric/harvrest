import 'focus-visible';
import App from './App.svelte';
import { shouldLoadFonts, loadFonts } from './fonts';

if ('fonts' in document) {
  if (shouldLoadFonts()) {
    loadFonts();
  }
}

// Code goes here
const app = new App({
  target: document.body
});

if (process.env.NODE_ENV !== 'production') {
  window.app = app;
}

export default app;
