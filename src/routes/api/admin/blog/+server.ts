import { json } from '@sveltejs/kit';
import { db, blogPosts } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ success: false, error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { title, slug, excerpt, content, published } = await request.json();

		const authorId = locals.user.id;
		const authorEmail = locals.user.email;

		const [newPost] = await db
			.insert(blogPosts)
			.values({
				title,
				slug,
				excerpt,
				content,
				authorId,
				authorEmail,
				published
			})
			.returning();

		return json({ success: true, post: newPost });
	} catch (error) {
		console.error('Error creating blog post:', error);
		return json({ success: false, error: 'Failed to create blog post' }, { status: 500 });
	}
};
