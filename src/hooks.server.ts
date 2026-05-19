import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { lucia } from '$lib/server/auth';

// Handle to filter out Chrome DevTools requests
const filterDevToolsRequests: Handle = async ({ event, resolve }) => {
	// Ignore Chrome DevTools requests
	if (event.url.pathname.includes('/.well-known/appspecific/com.chrome.devtools')) {
		return new Response(null, { status: 200 });
	}

	return await resolve(event);
};

// Lucia auth handle
const auth: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
	} else {
		const { session, user } = await lucia.validateSession(sessionId);
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		event.locals.user = user;
		event.locals.session = session;
	}

	// Protect admin routes
	if (event.url.pathname.startsWith('/admin')) {
		if (!event.locals.user) {
			// Redirect to login page
			return new Response(null, {
				status: 302,
				headers: {
					location: '/login?redirect=' + encodeURIComponent(event.url.pathname)
				}
			});
		}
	}

	return resolve(event);
};

// Redirect /ko/subpage and /de/subpage to /subpage, preserving lang in cookie
const redirectLangPrefixedSubpages: Handle = async ({ event, resolve }) => {
	const supportedLangs = ['en', 'ko', 'de'];
	const pathname = event.url.pathname;

	for (const lang of supportedLangs) {
		if (pathname.startsWith(`/${lang}/`)) {
			const newPath = pathname.slice(`/${lang}`.length) + event.url.search;
			event.cookies.set('preferred-lang', lang, {
				path: '/',
				maxAge: 365 * 24 * 60 * 60,
				sameSite: 'lax'
			});
			return new Response(null, {
				status: 302,
				headers: { location: newPath }
			});
		}
	}

	return resolve(event);
};

// Apply the handlers in sequence
export const handle: Handle = sequence(filterDevToolsRequests, redirectLangPrefixedSubpages, auth);
