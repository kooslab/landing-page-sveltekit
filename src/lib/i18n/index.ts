import { init, register, locale, waitLocale } from 'svelte-i18n';
import { browser } from '$app/environment';

// Register all translation files
register('en', () => import('./locales/en.json'));
register('ko', () => import('./locales/ko.json'));

// Get initial locale from URL if available
function getInitialLocale() {
	if (browser) {
		const path = window.location.pathname;
		const segments = path.split('/').filter(Boolean);

		// Check if the first segment is a language code
		if (segments.length > 0 && segments[0] === 'ko') {
			return 'ko';
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
	if (newLocale === 'en' || newLocale === 'ko') {
		locale.set(newLocale);
		await waitLocale();
	}
}
