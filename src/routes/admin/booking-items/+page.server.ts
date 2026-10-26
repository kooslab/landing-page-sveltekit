import { db, bookingItems } from '$lib/server/db';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const items = await db.select().from(bookingItems).orderBy(asc(bookingItems.sortOrder));

	return { items };
};
