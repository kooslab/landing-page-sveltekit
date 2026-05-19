import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { updateLocale } from '$lib/i18n';

const supportedLanguages = ['en', 'ko', 'de'];

export const load: LayoutLoad = async ({ params, data }) => {
	// URL param takes priority; fall back to server-resolved lang (from cookie)
	const lang = params.lang || data?.lang || 'en';

	if (!supportedLanguages.includes(lang)) {
		throw error(404, 'Language not supported');
	}

	// Update locale on client-side navigation
	await updateLocale(lang);

	// Return lang so the component has a typed data.lang property
	return { lang };
};
