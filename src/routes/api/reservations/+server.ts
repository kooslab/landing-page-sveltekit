import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, workshopReservations } from '$lib/server/db';
import { reservationSchema } from '$lib/schemas/reservation';
import { Resend } from 'resend';
import { RESEND_API_KEY, ADMIN_EMAIL } from '$env/static/private';
import { sql } from 'drizzle-orm';

const resend = new Resend(RESEND_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const parsed = reservationSchema.safeParse(body);

		if (!parsed.success) {
			return json(
				{ success: false, error: parsed.error.issues[0]?.message || 'Invalid input' },
				{ status: 400 }
			);
		}

		const { workshopType, name, email, message, preferredDates } = parsed.data;

		// Rate limit: max 3 reservations per email in 24h
		const recentCount = await db
			.select({ count: sql<number>`count(*)` })
			.from(workshopReservations)
			.where(
				sql`${workshopReservations.email} = ${email} AND ${workshopReservations.createdAt} > now() - interval '24 hours'`
			);

		if (recentCount[0] && recentCount[0].count >= 3) {
			return json(
				{ success: false, error: 'Too many reservations. Please try again later.' },
				{ status: 429 }
			);
		}

		// Insert reservation
		const [reservation] = await db
			.insert(workshopReservations)
			.values({
				workshopType,
				name,
				email,
				message: message || null,
				preferredDates
			})
			.returning();

		const workshopLabel =
			workshopType === 'requirements'
				? 'Requirements Workshop'
				: workshopType === 'vibe'
					? 'Vibe Coding Workshop'
					: 'Free Requirements Consulting';

		const formattedDates = preferredDates
			.map((d) =>
				new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})
			)
			.join(', ');

		// Send emails in background — don't block the reservation response
		const sendEmails = async () => {
			try {
				// Confirmation to customer
				const { error: customerError } = await resend.emails.send({
					from: 'KooStory Workshops <no-reply@mail.koostory.net>',
					to: email,
					subject: `Workshop Reservation Confirmed — ${workshopLabel}`,
					html: `
						<h2>Thank you for your reservation, ${name}!</h2>
						<p>We received your reservation for <strong>${workshopLabel}</strong>.</p>
						<p><strong>Preferred dates:</strong> ${formattedDates}</p>
						${message ? `<p><strong>Your message:</strong> ${message}</p>` : ''}
						<p>We'll get back to you within 1-2 business days to confirm the date.</p>
						<br>
						<p>Best regards,<br>Ilmo Koo — KooStory</p>
					`
				});
				if (customerError) console.error('Failed to send customer email:', customerError);

				// Notification to admin
				const { error: adminError } = await resend.emails.send({
					from: 'KooStory Workshops <no-reply@mail.koostory.net>',
					to: ADMIN_EMAIL,
					subject: `New Workshop Reservation: ${workshopLabel} — ${name}`,
					html: `
						<h2>New Workshop Reservation</h2>
						<p><strong>Workshop:</strong> ${workshopLabel}</p>
						<p><strong>Name:</strong> ${name}</p>
						<p><strong>Email:</strong> ${email}</p>
						<p><strong>Preferred dates:</strong> ${formattedDates}</p>
						${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
						<p><strong>Reservation ID:</strong> ${reservation.id}</p>
						<br>
						<p><a href="https://koostory.net/admin/reservations">View in Admin Panel</a></p>
					`
				});
				if (adminError) console.error('Failed to send admin email:', adminError);
			} catch (emailError) {
				console.error('Email sending failed:', emailError);
			}
		};

		// Fire and forget — reservation succeeds regardless of email outcome
		sendEmails();

		return json({ success: true, id: reservation.id });
	} catch (error) {
		console.error('Error creating reservation:', error);
		return json({ success: false, error: 'Failed to create reservation' }, { status: 500 });
	}
};
