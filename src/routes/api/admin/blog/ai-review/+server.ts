import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	SUPPORTED_MODELS,
	REVIEW_CATEGORIES,
	getDecryptedApiKey,
	getVoiceReferenceContent,
	runReview,
	type SupportedModel,
	type ReviewCategory
} from '$lib/server/anthropic';
import Anthropic from '@anthropic-ai/sdk';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	let body: { content?: string; model?: string; categories?: string[] };
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	const draft = (body.content ?? '').trim();
	const model = body.model as SupportedModel | undefined;
	const requestedCategories = Array.isArray(body.categories) ? body.categories : [];
	const categories = requestedCategories.filter((c): c is ReviewCategory =>
		(REVIEW_CATEGORIES as readonly string[]).includes(c)
	);

	if (!draft) return json({ error: 'Draft content is empty' }, { status: 400 });
	if (!model || !SUPPORTED_MODELS.includes(model)) {
		return json({ error: 'Invalid model' }, { status: 400 });
	}
	if (categories.length === 0) {
		return json({ error: 'At least one review category must be selected.' }, { status: 400 });
	}

	const apiKey = await getDecryptedApiKey(locals.user.id);
	if (!apiKey) {
		return json(
			{ error: 'No Anthropic API key configured. Add one in /admin/settings.' },
			{ status: 400 }
		);
	}

	const voiceReference = await getVoiceReferenceContent(locals.user.id);

	try {
		const result = await runReview({
			apiKey,
			model,
			voiceReference,
			draft,
			categories,
			signal: request.signal
		});
		return json({ suggestions: result.suggestions });
	} catch (err) {
		// Client aborted — no need to log noisily or return JSON; connection is already gone
		if (request.signal.aborted) {
			return new Response(null, { status: 499 });
		}
		console.error('AI review failed', err);
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
		return json({ error: 'AI review failed' }, { status: 500 });
	}
};
