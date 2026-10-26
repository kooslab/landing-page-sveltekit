import { json } from '@sveltejs/kit';
import { db, bookingItems } from '$lib/server/db';
import { asc, eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

// Public endpoint - returns active booking items for the reservation modal
// Optional ?segment=agencies to filter by segment
export const GET: RequestHandler = async ({ url }) => {
	const segment = url.searchParams.get('segment');

	const allActive = await db
		.select()
		.from(bookingItems)
		.where(eq(bookingItems.active, true))
		.orderBy(asc(bookingItems.sortOrder));

	// If segment specified, filter to items that include that segment or have empty segments (global)
	const items = segment
		? allActive.filter((item) => item.segments.length === 0 || item.segments.includes(segment))
		: allActive;

	return json({ items });
};
