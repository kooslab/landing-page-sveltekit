import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';
import { db, users } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { verify } from '@node-rs/argon2';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.user) {
		const redirectTo = url.searchParams.get('redirect') || '/admin';
		throw redirect(302, redirectTo);
	}
	return {};
};

export const actions = {
	login: async ({ request, cookies, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, {
				email,
				error: 'Email and password are required'
			});
		}

		try {
			// Find user by email
			const [existingUser] = await db
				.select()
				.from(users)
				.where(eq(users.email, email.toLowerCase()))
				.limit(1);

			if (!existingUser) {
				return fail(400, {
					email,
					error: 'Invalid email or password'
				});
			}

			// Verify password
			const validPassword = await verify(existingUser.hashedPassword, password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			if (!validPassword) {
				return fail(400, {
					email,
					error: 'Invalid email or password'
				});
			}

			// Create session
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			// Redirect to admin or requested page
			const redirectTo = url.searchParams.get('redirect') || '/admin';
			throw redirect(302, redirectTo);
		} catch (error) {
			// Re-throw redirects
			if (error && typeof error === 'object' && 'status' in error && 'location' in error) {
				throw error;
			}
			console.error('Login error:', error);
			return fail(500, {
				email,
				error: 'An error occurred during login'
			});
		}
	}
} satisfies Actions;
