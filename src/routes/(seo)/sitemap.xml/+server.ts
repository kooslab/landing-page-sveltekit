import * as sitemap from 'super-sitemap';
import type { RequestHandler } from '@sveltejs/kit';
import { db, blogPosts } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
	// Fetch published blog posts for sitemap
	const posts = await db
		.select({
			slug: blogPosts.slug,
			updatedAt: blogPosts.updatedAt
		})
		.from(blogPosts)
		.where(eq(blogPosts.published, true));

	return await sitemap.response({
		origin: url.origin,
		excludeRoutePatterns: [
			'.*\\(app\\).*',
			'.*/admin/.*',
			'.*/api/.*',
			'.*/login',
			'.*/register',
			'.*/logout',
			'.*/reqs/.*'
		],
		paramValues: {
			'/[[lang]]': ['', 'en', 'ko', 'de']
		},
		additionalPaths: [
			'/',
			'/blog',
			'/pricing',
			'/product',
			...posts.map((post) => `/blog/${post.slug}`)
		]
	});
};
