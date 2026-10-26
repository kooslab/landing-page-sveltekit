import { db, workshopReservations, bookingItems } from '$lib/server/db';
import { desc, asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [reservations, items] = await Promise.all([
		db.select().from(workshopReservations).orderBy(desc(workshopReservations.createdAt)),
		db.select().from(bookingItems).orderBy(asc(bookingItems.sortOrder))
	]);

	// Build label map from DB items
	const itemLabels: Record<string, string> = {};
	for (const item of items) {
		itemLabels[item.key] = item.label;
	}

	return { reservations, itemLabels };
};
