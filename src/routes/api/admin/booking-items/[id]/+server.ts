import { json } from '@sveltejs/kit';
import { db, bookingItems } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

// Admin: update a booking item
export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	if (!locals.user) {
		return json({ success: false, error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const body = await request.json();
		const updates: Record<string, unknown> = { updatedAt: new Date() };

		if (body.key !== undefined) updates.key = body.key.trim();
		if (body.label !== undefined) updates.label = body.label.trim();
		if (body.description !== undefined) updates.description = body.description.trim();
		if (body.priceCents !== undefined) updates.priceCents = body.priceCents;
		if (body.segments !== undefined)
			updates.segments = Array.isArray(body.segments) ? body.segments : [];
		if (body.sortOrder !== undefined) updates.sortOrder = body.sortOrder;
		if (body.active !== undefined) updates.active = body.active;

		const [updated] = await db
			.update(bookingItems)
			.set(updates)
			.where(eq(bookingItems.id, params.id))
			.returning();

		if (!updated) {
			return json({ success: false, error: 'Item not found' }, { status: 404 });
		}

		return json({ success: true, item: updated });
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'Failed to update';
		if (message.includes('unique') || message.includes('duplicate')) {
			return json(
				{ success: false, error: 'A booking item with this key already exists' },
				{ status: 409 }
			);
		}
		console.error('Error updating booking item:', error);
		return json({ success: false, error: 'Failed to update booking item' }, { status: 500 });
	}
};

// Admin: delete a booking item
export const DELETE: RequestHandler = async ({ params, locals }) => {
	if (!locals.user) {
		return json({ success: false, error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const [deleted] = await db
			.delete(bookingItems)
			.where(eq(bookingItems.id, params.id))
			.returning();

		if (!deleted) {
			return json({ success: false, error: 'Item not found' }, { status: 404 });
		}

		return json({ success: true });
	} catch (error) {
		console.error('Error deleting booking item:', error);
		return json({ success: false, error: 'Failed to delete booking item' }, { status: 500 });
	}
};
