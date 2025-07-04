import { json } from '@sveltejs/kit';
import { db, blogPosts } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ params, request, locals }) => {
	if (!locals.user) {
		return json({ success: false, error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { title, slug, excerpt, content, published } = await request.json();

		const [updatedPost] = await db
			.update(blogPosts)
			.set({
				title,
				slug,
				excerpt,
				content,
				published,
				updatedAt: new Date()
			})
			.where(eq(blogPosts.id, params.id))
			.returning();

		if (!updatedPost) {
			return json({ success: false, error: 'Post not found' }, { status: 404 });
		}

		return json({ success: true, post: updatedPost });
	} catch (error) {
		console.error('Error updating blog post:', error);
		return json({ success: false, error: 'Failed to update blog post' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	if (!locals.user) {
		return json({ success: false, error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const [deletedPost] = await db.delete(blogPosts).where(eq(blogPosts.id, params.id)).returning();

		if (!deletedPost) {
			return json({ success: false, error: 'Post not found' }, { status: 404 });
		}

		return json({ success: true });
	} catch (error) {
		console.error('Error deleting blog post:', error);
		return json({ success: false, error: 'Failed to delete blog post' }, { status: 500 });
	}
};
