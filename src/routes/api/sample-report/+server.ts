import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, emailConsents } from '$lib/server/db';
import { Resend } from 'resend';
import { RESEND_API_KEY, ADMIN_EMAIL } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		const { email, consentText } = await request.json();

		if (!email || !email.includes('@')) {
			return json({ success: false }, { status: 400 });
		}

		// Save consent record
		await db.insert(emailConsents).values({
			email,
			purpose: 'sample_report',
			consentText: consentText || 'Agreed to email storage and contact for services.',
			ip: getClientAddress()
		});

		// Notify admin
		resend.emails.send({
			from: 'KooStory <no-reply@mail.koostory.net>',
			to: ADMIN_EMAIL,
			subject: `Sample Report Viewed: ${email}`,
			html: `<p>Someone viewed the sample report.</p><p><strong>Email:</strong> ${email}</p>`
		});

		return json({ success: true });
	} catch (error) {
		console.error('Error saving consent:', error);
		return json({ success: true }); // Don't block the user
	}
};
