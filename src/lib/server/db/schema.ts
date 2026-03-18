import { pgTable, text, boolean, timestamp, uuid } from 'drizzle-orm/pg-core';

// Users table for Lucia Auth
export const users = pgTable('users', {
	id: text('id').primaryKey(),
	email: text('email').unique().notNull(),
	hashedPassword: text('hashed_password').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

// Sessions table for Lucia Auth
export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

// Blog posts table
export const blogPosts = pgTable('blog_posts', {
	id: uuid('id').defaultRandom().primaryKey(),
	title: text('title').notNull(),
	slug: text('slug').unique().notNull(),
	content: text('content').notNull(),
	excerpt: text('excerpt'),
	authorId: text('author_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	authorEmail: text('author_email').notNull(),
	published: boolean('published').default(false),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// Workshop reservations table
export const workshopReservations = pgTable('workshop_reservations', {
	id: uuid('id').defaultRandom().primaryKey(),
	workshopType: text('workshop_type').notNull(), // 'requirements' | 'vibe' | 'free'
	name: text('name').notNull(),
	email: text('email').notNull(),
	message: text('message'),
	preferredDates: text('preferred_dates').array().notNull(), // up to 3 ISO date strings
	status: text('status').notNull().default('pending'), // pending | confirmed | completed | cancelled
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type WorkshopReservation = typeof workshopReservations.$inferSelect;
export type NewWorkshopReservation = typeof workshopReservations.$inferInsert;
