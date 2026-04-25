import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, emailConsents } from '$lib/server/db';
import { Resend } from 'resend';
import { RESEND_API_KEY, ADMIN_EMAIL } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

const today = () =>
	new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

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
			html: `<p>Someone viewed the sample report.</p><p><strong>Email:</strong> ${email}</p><p><strong>Date:</strong> ${today()}</p>`
		});

		// Send promotion email to the user
		resend.emails.send({
			from: 'Ilmo Koo — KooStory <no-reply@mail.koostory.net>',
			replyTo: ADMIN_EMAIL,
			to: email,
			subject: "You looked at the report — here's what's next",
			html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
	<p>Hi,</p>

	<p>Thanks for checking out our sample problem discovery report.</p>

	<p>If it made you think about your own business, let's talk. We offer a <strong>free 45-minute automation consulting session</strong> — we'll map your workflows, find the bottlenecks, and show you exactly where automation can save you hours every week.</p>

	<p style="background: #f5f5f5; border-left: 3px solid #1a1a1a; padding: 16px 20px; margin: 24px 0;">
		<strong>What you'll walk away with:</strong>
	</p>

	<ul style="padding-left: 20px;">
		<li>A clear picture of where your team is losing time</li>
		<li>Specific bottlenecks that can be automated today</li>
		<li>A prioritized action plan — what to automate first and why</li>
		<li>Honest advice on what's worth automating and what isn't</li>
	</ul>

	<p style="font-size: 14px; color: #666;">
		Spots are limited — we'll close this once our schedule fills up.
	</p>

	<p>→ <strong>Reply to this email</strong> to book your free consulting session.</p>

	<p style="margin-top: 32px;">
		— Ilmo Koo<br>
		<span style="color: #666;">KooStory | Berlin</span><br>
		<span style="color: #666;">ilmokoo@koostory.net</span>
	</p>
</div>
			`
		});

		return json({ success: true });
	} catch (error) {
		console.error('Error saving consent:', error);
		return json({ success: true }); // Don't block the user
	}
};
