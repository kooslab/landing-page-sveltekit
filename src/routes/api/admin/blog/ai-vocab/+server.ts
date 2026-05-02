import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	SUPPORTED_MODELS,
	getDecryptedApiKey,
	runVocab,
	type SupportedModel
} from '$lib/server/anthropic';
import Anthropic from '@anthropic-ai/sdk';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	let body: { word?: string; context?: string; model?: string };
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	const word = (body.word ?? '').trim();
	const context = (body.context ?? '').trim();
	const model = body.model as SupportedModel | undefined;

	if (!word) return json({ error: 'No word selected' }, { status: 400 });
	if (word.length > 60)
		return json({ error: 'Selection too long for vocab lookup' }, { status: 400 });
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
		const result = await runVocab({ apiKey, model, word, context });
		return json({ alternatives: result.alternatives });
	} catch (err) {
		console.error('AI vocab failed', err);
		if (err instanceof Anthropic.AuthenticationError) {
			return json({ error: 'API key was rejected by Anthropic.' }, { status: 401 });
		}
		if (err instanceof Anthropic.RateLimitError) {
			return json({ error: 'Anthropic rate limit hit.' }, { status: 429 });
		}
		if (err instanceof Anthropic.APIError) {
			return json({ error: `Anthropic error: ${err.message}` }, { status: err.status ?? 500 });
		}
		return json({ error: 'Vocab lookup failed' }, { status: 500 });
	}
};
