import type { PageServerLoad } from './$types';

// EU member states (27 countries)
const EU_COUNTRIES = new Set([
	'AT', // Austria
	'BE', // Belgium
	'BG', // Bulgaria
	'HR', // Croatia
	'CY', // Cyprus
	'CZ', // Czechia
	'DK', // Denmark
	'EE', // Estonia
	'FI', // Finland
	'FR', // France
	'DE', // Germany
	'GR', // Greece
	'HU', // Hungary
	'IE', // Ireland
	'IT', // Italy
	'LV', // Latvia
	'LT', // Lithuania
	'LU', // Luxembourg
	'MT', // Malta
	'NL', // Netherlands
	'PL', // Poland
	'PT', // Portugal
	'RO', // Romania
	'SK', // Slovakia
	'SI', // Slovenia
	'ES', // Spain
	'SE' // Sweden
]);

// Target regions: EU + UK + USA + Canada
const TARGET_COUNTRIES = new Set([
	...EU_COUNTRIES,
	'GB', // United Kingdom
	'US', // United States
	'CA' // Canada
]);

export const load: PageServerLoad = async ({ request }) => {
	// Vercel provides country code via x-vercel-ip-country header
	const country = request.headers.get('x-vercel-ip-country');

	// If geo detection fails (no header), hide the popup (restrictive)
	const showPromo = country ? TARGET_COUNTRIES.has(country) : false;

	return {
		showPromo
	};
};
