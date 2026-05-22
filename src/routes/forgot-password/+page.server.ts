import { fail } from '@sveltejs/kit';
import { db, users, passwordResetTokens } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import { randomBytes } from 'node:crypto';
import type { Actions } from './$types';

const resend = new Resend(RESEND_API_KEY);

export const actions: Actions = {
	default: async ({ request, url }) => {
		const formData = await request.formData();
		const email = (formData.get('email') as string)?.toLowerCase().trim();

		if (!email) {
			return fail(400, { error: 'Email is required' });
		}

		try {
			const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

			// Always return success to prevent email enumeration
			if (!user) {
				return { success: true };
			}

			// Delete any existing tokens for this user
			await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, user.id));

			// Generate a secure 64-char hex token
			const token = randomBytes(32).toString('hex');
			const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

			await db.insert(passwordResetTokens).values({ userId: user.id, token, expiresAt });

			const resetUrl = `${url.origin}/reset-password/${token}`;

			await resend.emails.send({
				from: 'KooStory <no-reply@mail.koostory.net>',
				to: email,
				subject: 'Reset your KooStory admin password',
				html: `
					<h2>Password Reset</h2>
					<p>Click the link below to reset your password. The link expires in 1 hour.</p>
					<p><a href="${resetUrl}" style="background:#1B1938;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:bold;display:inline-block;">Reset Password</a></p>
					<p>If you didn't request this, you can safely ignore this email.</p>
					<p style="color:#999;font-size:12px;">Link: ${resetUrl}</p>
				`
			});

			return { success: true };
		} catch (error) {
			console.error('Forgot password error:', error);
			return fail(500, { error: 'Something went wrong. Please try again.' });
		}
	}
};
