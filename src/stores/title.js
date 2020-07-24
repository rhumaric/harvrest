import { writable } from 'svelte/store';

const SITE_TITLE = 'Harvrest';
const SEPARATOR = ' | ';

export const title = writable(SITE_TITLE);

export function page(pageTitle) {
  title.set([pageTitle, SITE_TITLE].filter(Boolean).join(SEPARATOR));
  return pageTitle;
}
