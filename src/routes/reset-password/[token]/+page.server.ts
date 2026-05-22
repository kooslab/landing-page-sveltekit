import { fail } from '@sveltejs/kit';
import { db, users, passwordResetTokens } from '$lib/server/db';
import { eq, and, gt } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { token } = params;

	const [record] = await db
		.select()
		.from(passwordResetTokens)
		.where(and(eq(passwordResetTokens.token, token), gt(passwordResetTokens.expiresAt, new Date())))
		.limit(1);

	return { valid: !!record };
};

export const actions: Actions = {
	default: async ({ params, request }) => {
		const { token } = params;
		const formData = await request.formData();
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (!password || password.length < 8) {
			return fail(400, { error: 'Password must be at least 8 characters' });
		}
		if (password !== confirmPassword) {
			return fail(400, { error: 'Passwords do not match' });
		}

		const [record] = await db
			.select()
			.from(passwordResetTokens)
			.where(
				and(eq(passwordResetTokens.token, token), gt(passwordResetTokens.expiresAt, new Date()))
			)
			.limit(1);

		if (!record) {
			return fail(400, { error: 'Reset link is invalid or has expired.' });
		}

		const hashedPassword = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		await db.update(users).set({ hashedPassword }).where(eq(users.id, record.userId));

		// Delete the token so it can't be reused
		await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, token));

		return { success: true };
	}
};
