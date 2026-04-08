import { init, addMessages, locale, waitLocale } from 'svelte-i18n';
import { browser } from '$app/environment';

// Load translations synchronously so SSR renders full HTML
// (lazy register() + {#await waitLocale()} renders nothing during SSR,
// which makes the page invisible to search engine crawlers)
import en from './locales/en.json';
import ko from './locales/ko.json';
import de from './locales/de.json';

addMessages('en', en);
addMessages('ko', ko);
addMessages('de', de);

// Get initial locale from URL if available
function getInitialLocale() {
	if (browser) {
		const path = window.location.pathname;
		const segments = path.split('/').filter(Boolean);

		// Check if the first segment is a language code
		if (segments.length > 0 && segments[0] === 'ko') {
			return 'ko';
		}
		if (segments.length > 0 && segments[0] === 'de') {
			return 'de';
		}

		// If no language segment or root path, default to English
		// since English is now served at root
		return 'en';
	}
	return 'en';
}

const initialLocale = getInitialLocale();

init({
	fallbackLocale: 'en',
	initialLocale: initialLocale
});

// Export function to update locale
export async function updateLocale(newLocale: string) {
	if (newLocale === 'en' || newLocale === 'ko' || newLocale === 'de') {
		locale.set(newLocale);
		await waitLocale();
	}
}
