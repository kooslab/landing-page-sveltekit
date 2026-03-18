import { z } from 'zod';

export const reservationSchema = z.object({
	workshopType: z.enum(['requirements', 'vibe', 'free']),
	name: z.string().min(1, 'Name is required').max(100),
	email: z.string().email('Invalid email address'),
	message: z.string().max(1000).optional().default(''),
	preferredDates: z
		.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'))
		.min(1, 'Select at least one preferred date')
		.max(3, 'Maximum 3 preferred dates')
});

export type ReservationSchema = z.infer<typeof reservationSchema>;
