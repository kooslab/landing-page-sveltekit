import { init, addMessages, waitLocale } from 'svelte-i18n';

// Load translations synchronously so SSR renders full HTML
import en from './locales/en.json';

addMessages('en', en);

init({
	fallbackLocale: 'en',
	initialLocale: 'en'
});

export { waitLocale };
