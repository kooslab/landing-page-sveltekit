import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { updateLocale } from '$lib/i18n';

const supportedLanguages = ['en', 'ko'];

export const load: LayoutLoad = async ({ params }) => {
	const lang = params.lang;

	// Validate language parameter
	if (!supportedLanguages.includes(lang)) {
		throw error(404, 'Language not supported');
	}

	// Set the locale
	await updateLocale(lang);

	return {
		lang
	};
};
