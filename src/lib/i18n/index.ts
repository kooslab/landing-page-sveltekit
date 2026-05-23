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

// Locale is determined solely by URL prefix — /ko/* or /de/* use that lang, everything else is English
function getInitialLocale() {
	if (browser) {
		const segments = window.location.pathname.split('/').filter(Boolean);
		if (segments.length > 0 && (segments[0] === 'ko' || segments[0] === 'de')) {
			return segments[0];
		}
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
