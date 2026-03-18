import { json } from '@sveltejs/kit';
import { db, workshopReservations } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	if (!locals.user) {
		return json({ success: false, error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { status } = body;

		if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
			return json({ success: false, error: 'Invalid status' }, { status: 400 });
		}

		const [updated] = await db
			.update(workshopReservations)
			.set({ status, updatedAt: new Date() })
			.where(eq(workshopReservations.id, params.id))
			.returning();

		if (!updated) {
			return json({ success: false, error: 'Reservation not found' }, { status: 404 });
		}

		return json({ success: true, reservation: updated });
	} catch (error) {
		console.error('Error updating reservation:', error);
		return json({ success: false, error: 'Failed to update reservation' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	if (!locals.user) {
		return json({ success: false, error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const [deleted] = await db
			.delete(workshopReservations)
			.where(eq(workshopReservations.id, params.id))
			.returning();

		if (!deleted) {
			return json({ success: false, error: 'Reservation not found' }, { status: 404 });
		}

		return json({ success: true });
	} catch (error) {
		console.error('Error deleting reservation:', error);
		return json({ success: false, error: 'Failed to delete reservation' }, { status: 500 });
	}
};
