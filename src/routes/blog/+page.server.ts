import { db, blogPosts } from '$lib/server/db';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const posts = await db
			.select()
			.from(blogPosts)
			.where(eq(blogPosts.published, true))
			.orderBy(desc(blogPosts.createdAt));

		// Log for debugging
		console.log(`Found ${posts.length} published posts on /blog`);
		posts.forEach((post) => {
			console.log(`- ${post.title}: created=${post.createdAt}`);
		});

		return {
			posts,
			error: null
		};
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return {
			posts: [],
			error: 'Failed to load blog posts. Please ensure the database is properly configured.'
		};
	}
};
