import { db, blogPosts } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, params.slug)).limit(1);

	if (!post || !post.published) {
		throw error(404, 'Post not found');
	}

	return {
		post
	};
};
