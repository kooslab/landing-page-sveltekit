import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	SUPPORTED_MODELS,
	getDecryptedApiKey,
	getVoiceReferenceContent,
	streamAsk,
	type SupportedModel
} from '$lib/server/anthropic';
import Anthropic from '@anthropic-ai/sdk';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });

	let body: { content?: string; question?: string; model?: string };
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	const draft = (body.content ?? '').trim();
	const question = (body.question ?? '').trim();
	const model = body.model as SupportedModel | undefined;

	if (!draft) return json({ error: 'Draft content is empty' }, { status: 400 });
	if (!question) return json({ error: 'Question is empty' }, { status: 400 });
	if (question.length > 1000) {
		return json({ error: 'Question is too long (max 1000 chars)' }, { status: 400 });
	}
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

	const voiceReference = await getVoiceReferenceContent(locals.user.id);

	// Local controller so the ReadableStream's cancel() can abort the upstream
	// SDK call. We also forward request.signal as an upstream-of-this-controller
	// abort source.
	const upstreamAbort = new AbortController();
	request.signal.addEventListener('abort', () => upstreamAbort.abort(), { once: true });

	const stream = streamAsk({
		apiKey,
		model,
		voiceReference,
		draft,
		question,
		signal: upstreamAbort.signal
	});

	const encoder = new TextEncoder();
	const readable = new ReadableStream({
		async start(controller) {
			try {
				for await (const event of stream) {
					if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
						controller.enqueue(encoder.encode(event.delta.text));
					}
				}
			} catch (err) {
				if (upstreamAbort.signal.aborted) {
					// Cancelled — silently close
				} else {
					console.error('AI ask stream failed', err);
					const msg =
						err instanceof Anthropic.AuthenticationError
							? '\n\n[Error: API key rejected by Anthropic. Update it in /admin/settings.]'
							: err instanceof Anthropic.RateLimitError
								? '\n\n[Error: Anthropic rate limit hit. Try again in a moment.]'
								: err instanceof Anthropic.APIError
									? `\n\n[Error: ${err.message}]`
									: '\n\n[Error: stream interrupted]';
					controller.enqueue(encoder.encode(msg));
				}
			} finally {
				controller.close();
			}
		},
		cancel() {
			upstreamAbort.abort();
		}
	});

	return new Response(readable, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'no-cache, no-transform',
			'X-Accel-Buffering': 'no'
		}
	});
};
