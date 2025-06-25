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
		if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'ko')) {
			return segments[0];
		}
		// Check browser language as fallback
		const browserLang = window.navigator.language.toLowerCase();
		if (browserLang.startsWith('ko')) {
			return 'ko';
		}
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
