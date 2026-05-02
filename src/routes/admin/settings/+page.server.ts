import { db, blogPosts, adminSettings } from '$lib/server/db';
import { eq, desc } from 'drizzle-orm';
import { encrypt, decrypt, maskApiKey } from '$lib/server/crypto';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const userId = locals.user.id;

	const [settings] = await db
		.select()
		.from(adminSettings)
		.where(eq(adminSettings.userId, userId))
		.limit(1);

	const allPosts = await db
		.select({
			id: blogPosts.id,
			title: blogPosts.title,
			published: blogPosts.published,
			createdAt: blogPosts.createdAt
		})
		.from(blogPosts)
		.orderBy(desc(blogPosts.createdAt));

	let apiKeyMask: string | null = null;
	if (settings?.anthropicApiKeyEncrypted) {
		try {
			apiKeyMask = maskApiKey(decrypt(settings.anthropicApiKeyEncrypted));
		} catch {
			apiKeyMask = '(unreadable — re-enter)';
		}
	}

	const selectedIds = settings?.voiceReferencePostIds ?? [];

	return {
		apiKeyConfigured: Boolean(settings?.anthropicApiKeyEncrypted),
		apiKeyMask,
		selectedIds,
		allPosts
	};
};

export const actions: Actions = {
	saveApiKey: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { error: 'Unauthorized' });
		const data = await request.formData();
		const apiKey = String(data.get('apiKey') ?? '').trim();

		if (!apiKey) return fail(400, { error: 'API key is required' });
		if (!apiKey.startsWith('sk-ant-')) {
			return fail(400, { error: 'API key must start with sk-ant-' });
		}

		const encrypted = encrypt(apiKey);

		await db
			.insert(adminSettings)
			.values({
				userId: locals.user.id,
				anthropicApiKeyEncrypted: encrypted,
				voiceReferencePostIds: [],
				updatedAt: new Date()
			})
			.onConflictDoUpdate({
				target: adminSettings.userId,
				set: { anthropicApiKeyEncrypted: encrypted, updatedAt: new Date() }
			});

		return { saved: 'apiKey' };
	},

	removeApiKey: async ({ locals }) => {
		if (!locals.user) return fail(401, { error: 'Unauthorized' });

		await db
			.update(adminSettings)
			.set({ anthropicApiKeyEncrypted: null, updatedAt: new Date() })
			.where(eq(adminSettings.userId, locals.user.id));

		return { saved: 'removed' };
	},

	saveVoicePosts: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { error: 'Unauthorized' });
		const data = await request.formData();
		const ids = data.getAll('postId').map(String).slice(0, 3);

		await db
			.insert(adminSettings)
			.values({
				userId: locals.user.id,
				voiceReferencePostIds: ids,
				updatedAt: new Date()
			})
			.onConflictDoUpdate({
				target: adminSettings.userId,
				set: { voiceReferencePostIds: ids, updatedAt: new Date() }
			});

		return { saved: 'voice' };
	}
};
