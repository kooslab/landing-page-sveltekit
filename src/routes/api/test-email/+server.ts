import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export const GET: RequestHandler = async () => {
	try {
		// Test email
		const { data, error } = await resend.emails.send({
			from: 'Koostory SW requirements <no-reply@mail.koostory.net>',
			to: 'johnnykoo@koostory.net', // Test recipient
			subject: 'Test Email from KooStory',
			text: 'This is a test email to verify Resend is working correctly.',
			html: '<h1>Test Email</h1><p>This is a test email to verify Resend is working correctly.</p>'
		});

		if (error) {
			console.error('Resend error:', error);
			return json(
				{
					success: false,
					error: error.message || 'Unknown error',
					details: error
				},
				{ status: 500 }
			);
		}

		return json({
			success: true,
			message: 'Test email sent successfully',
			id: data?.id
		});
	} catch (error) {
		console.error('Unexpected error:', error);
		return json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};
