import { writable, derived } from 'svelte/store';

const SITE_TITLE = 'Harvrest';
const SEPARATOR = ' | ';
const PREFIX_SEPARATOR = ' - ';

const pageTitleStore = writable();
const pagePrefixStore = writable();
const liveStore = writable(true);

export const live = liveStore;

export const title = derived(
  [pageTitleStore, pagePrefixStore],
  ([pageTitle, pagePrefix]) => {
    const titlePartForPage = [pagePrefix, pageTitle]
      .filter(Boolean)
      .join(PREFIX_SEPARATOR);
    return [titlePartForPage, SITE_TITLE].filter(Boolean).join(SEPARATOR);
  }
);

export function page(pageTitle, { prefix, live = true } = {}) {
  liveStore.set(live);
  pageTitleStore.set(pageTitle);
  pagePrefixStore.set(prefix);
  return pageTitle;
}

export function pagePrefix(prefix, { live = false } = {}) {
  liveStore.set(live);
  pagePrefixStore.set(prefix);
  return prefix;
}
