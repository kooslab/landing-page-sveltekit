import type { LayoutServerLoad } from './$types';
import { updateLocale } from '$lib/i18n';

export const load: LayoutServerLoad = async ({ params }) => {
	// URL lang prefix is the only source of truth — no cookie fallback
	// /discovery → English, /ko/discovery → Korean
	const lang = params.lang || 'en';

	// Set locale for SSR rendering
	await updateLocale(lang);

	return { lang };
};
