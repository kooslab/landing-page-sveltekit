import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	SUPPORTED_MODELS,
	getDecryptedApiKey,
	runExcerpt,
	type SupportedModel
} from '$lib/server/anthropic';
import Anthropic from '@anthropic-ai/sdk';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });

	let body: { content?: string; model?: string };
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	const draft = (body.content ?? '').trim();
	const model = body.model as SupportedModel | undefined;

	if (!draft) return json({ error: 'Draft content is empty' }, { status: 400 });
	if (!model || !SUPPORTED_MODELS.includes(model)) {
		return json({ error: 'Invalid model' }, { status: 400 });
	}

	const apiKey = await getDecryptedApiKey(locals.user.id);
	if (!apiKey) {
		return json(
			{ error: 'No Anthropic API key configured. Add one in /admin/settings.' },
			{ status: 400 }
		);
	}

	try {
		const result = await runExcerpt({ apiKey, model, draft, signal: request.signal });
		return json({ excerpt: result.excerpt });
	} catch (err) {
		if (request.signal.aborted) return new Response(null, { status: 499 });
		console.error('Excerpt generation failed', err);
		if (err instanceof Anthropic.AuthenticationError) {
			return json(
				{ error: 'API key was rejected by Anthropic. Update it in settings.' },
				{ status: 401 }
			);
		}
		if (err instanceof Anthropic.RateLimitError) {
			return json({ error: 'Anthropic rate limit hit. Try again in a moment.' }, { status: 429 });
		}
		if (err instanceof Anthropic.APIError) {
			return json({ error: `Anthropic error: ${err.message}` }, { status: err.status ?? 500 });
		}
		return json({ error: 'Excerpt generation failed' }, { status: 500 });
	}
};
