import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

// Initialize Resend with the API key from .env
const resend = new Resend(RESEND_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Send email using Resend
		const { data: emailData, error } = await resend.emails.send({
			from: 'Kooslab SW requirements <no-reply@mail.kooslab.net>', // Using your verified domain
			to: data.to,
			subject: data.subject,
			text: data.text,
			html: data.html
		});

		if (error) {
			console.error('Resend API error:', error);
			return json(
				{ success: false, message: 'Failed to send email notification' },
				{ status: 500 }
			);
		}

		console.log('Email sent successfully:', {
			id: emailData?.id,
			to: data.to,
			subject: data.subject,
			timestamp: new Date().toISOString()
		});

		return json({
			success: true,
			message: 'Email notification sent successfully',
			id: emailData?.id || 'unknown'
		});
	} catch (error) {
		console.error('Error sending email:', error);
		return json({ success: false, message: 'Failed to send email notification' }, { status: 500 });
	}
};
