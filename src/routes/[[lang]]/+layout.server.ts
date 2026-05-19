import type { LayoutServerLoad } from './$types';
import { updateLocale } from '$lib/i18n';

const supportedLanguages = ['en', 'ko', 'de'];

export const load: LayoutServerLoad = async ({ params, cookies }) => {
	// URL lang takes priority; fall back to cookie preference
	const urlLang = params.lang;
	const cookieLang = cookies.get('preferred-lang');
	const lang =
		urlLang || (cookieLang && supportedLanguages.includes(cookieLang) ? cookieLang : null) || 'en';

	// Persist URL-based lang into cookie so sub-pages inherit it
	if (urlLang && urlLang !== cookieLang) {
		cookies.set('preferred-lang', urlLang, {
			path: '/',
			maxAge: 365 * 24 * 60 * 60,
			sameSite: 'lax'
		});
	}

	// Set locale for SSR rendering
	await updateLocale(lang);

	return { lang };
};
