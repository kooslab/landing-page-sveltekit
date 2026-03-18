import { db, workshopReservations } from '$lib/server/db';
import { desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const reservations = await db
		.select()
		.from(workshopReservations)
		.orderBy(desc(workshopReservations.createdAt));

	return { reservations };
};
