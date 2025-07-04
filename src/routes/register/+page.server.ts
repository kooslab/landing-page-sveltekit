import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';
import { db, users } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';
import { generateId } from 'lucia';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/admin');
	}
	return {};
};

export const actions = {
	register: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (!email || !password || !confirmPassword) {
			return fail(400, {
				email,
				error: 'All fields are required'
			});
		}

		if (password !== confirmPassword) {
			return fail(400, {
				email,
				error: 'Passwords do not match'
			});
		}

		if (password.length < 8) {
			return fail(400, {
				email,
				error: 'Password must be at least 8 characters'
			});
		}

		try {
			// Check if user already exists
			const [existingUser] = await db
				.select()
				.from(users)
				.where(eq(users.email, email.toLowerCase()))
				.limit(1);

			if (existingUser) {
				return fail(400, {
					email,
					error: 'Email already registered'
				});
			}

			// Hash password
			const hashedPassword = await hash(password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			// Create user
			const userId = generateId(15);
			await db.insert(users).values({
				id: userId,
				email: email.toLowerCase(),
				hashedPassword
			});

			// Create session
			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			throw redirect(302, '/admin');
		} catch (error) {
			// Re-throw redirects
			if (error && typeof error === 'object' && 'status' in error && 'location' in error) {
				throw error;
			}
			console.error('Registration error:', error);
			return fail(500, {
				email,
				error: 'An error occurred during registration'
			});
		}
	}
} satisfies Actions;
