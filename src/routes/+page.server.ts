import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	// Get the preferred language from Accept-Language header
	const acceptLanguage = request.headers.get('accept-language') || '';
	const preferredLang = acceptLanguage.toLowerCase().includes('ko') ? 'ko' : 'en';

	// Redirect to the appropriate language route
	throw redirect(302, `/${preferredLang}`);
};
