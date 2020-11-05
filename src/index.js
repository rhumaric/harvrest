import 'focus-visible';
import 'lib/submitterPolyfill.js';
import App from './App.svelte';
import 'style.scss';
import { shouldLoadFonts, loadFonts, supportsFontLoading } from 'lib/fonts';

if (supportsFontLoading() && shouldLoadFonts()) {
  loadFonts();
}

// Code goes here
const app = new App({
  target: document.body
});

if (process.env.NODE_ENV !== 'production') {
  window.app = app;
}

export default app;
