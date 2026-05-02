import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	SUPPORTED_MODELS,
	getDecryptedApiKey,
	getVoiceReferenceContent,
	getPostCatalog,
	streamTopicChat,
	type SupportedModel
} from '$lib/server/anthropic';
import Anthropic from '@anthropic-ai/sdk';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });

	let body: { messages?: ChatMessage[]; model?: string };
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	const messages = Array.isArray(body.messages) ? body.messages : [];
	const model = body.model as SupportedModel | undefined;

	if (messages.length === 0) {
		return json({ error: 'No messages provided' }, { status: 400 });
	}
	if (!model || !SUPPORTED_MODELS.includes(model)) {
		return json({ error: 'Invalid model' }, { status: 400 });
	}

	const cleaned: ChatMessage[] = [];
	for (const m of messages) {
		if (
			(m.role === 'user' || m.role === 'assistant') &&
			typeof m.content === 'string' &&
			m.content.trim().length > 0
		) {
			cleaned.push({ role: m.role, content: m.content });
		}
	}
	if (cleaned.length === 0) {
		return json({ error: 'No valid messages' }, { status: 400 });
	}
	if (cleaned[0].role !== 'user') {
		return json({ error: 'First message must be from user' }, { status: 400 });
	}

	const apiKey = await getDecryptedApiKey(locals.user.id);
	if (!apiKey) {
		return json(
			{ error: 'No Anthropic API key configured. Add one in /admin/settings.' },
			{ status: 400 }
		);
	}

	const [voiceReference, postCatalog] = await Promise.all([
		getVoiceReferenceContent(locals.user.id),
		getPostCatalog()
	]);

	const upstreamAbort = new AbortController();
	request.signal.addEventListener('abort', () => upstreamAbort.abort(), { once: true });

	const stream = streamTopicChat({
		apiKey,
		model,
		voiceReference,
		postCatalog,
		messages: cleaned,
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
					console.error('Topic chat stream failed', err);
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
