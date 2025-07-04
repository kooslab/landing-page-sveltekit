import { db, blogPosts } from '$lib/server/db';
import { desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));

	// Log for debugging
	console.log(`Found ${posts.length} total posts in admin view`);
	posts.forEach((post) => {
		console.log(`- ${post.title}: published=${post.published}, created=${post.createdAt}`);
	});

	return {
		posts
	};
};
