import { json } from '@sveltejs/kit';
import { db, bookingItems } from '$lib/server/db';
import { asc } from 'drizzle-orm';
import type { RequestHandler } from './$types';

// Admin: list all booking items (including inactive)
export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		return json({ success: false, error: 'Unauthorized' }, { status: 401 });
	}

	const items = await db.select().from(bookingItems).orderBy(asc(bookingItems.sortOrder));

	return json({ success: true, items });
};

// Admin: create a new booking item
export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ success: false, error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { key, label, description, priceCents, segments, sortOrder, active } = body;

		if (!key || !label || !description) {
			return json(
				{ success: false, error: 'key, label, and description are required' },
				{ status: 400 }
			);
		}

		const [item] = await db
			.insert(bookingItems)
			.values({
				key: key.trim(),
				label: label.trim(),
				description: description.trim(),
				priceCents: priceCents ?? null,
				segments: Array.isArray(segments) ? segments : [],
				sortOrder: sortOrder ?? 0,
				active: active ?? true
			})
			.returning();

		return json({ success: true, item }, { status: 201 });
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'Failed to create booking item';
		if (message.includes('unique') || message.includes('duplicate')) {
			return json(
				{ success: false, error: 'A booking item with this key already exists' },
				{ status: 409 }
			);
		}
		console.error('Error creating booking item:', error);
		return json({ success: false, error: 'Failed to create booking item' }, { status: 500 });
	}
};
