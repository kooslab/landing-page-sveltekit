import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat as sdkZodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { z } from 'zod/v4';

// SDK 0.92.0 ships zodOutputFormat with mismatched types: runtime imports
// from `zod/v4`, but the .d.ts declares the parameter as `zod` v3's ZodType.
// Wrap the cast in one place rather than at every call site.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const zodOutputFormat = sdkZodOutputFormat as unknown as (schema: any) => any;
import { db, blogPosts, adminSettings } from './db';
import { eq, inArray, desc } from 'drizzle-orm';
import { decrypt } from './crypto';

export const SUPPORTED_MODELS = [
	'claude-haiku-4-5',
	'claude-sonnet-4-6',
	'claude-opus-4-7'
] as const;
export type SupportedModel = (typeof SUPPORTED_MODELS)[number];
export const DEFAULT_MODEL: SupportedModel = 'claude-sonnet-4-6';

export const MODEL_LABELS: Record<SupportedModel, string> = {
	'claude-haiku-4-5': 'Haiku 4.5 (fastest, cheapest)',
	'claude-sonnet-4-6': 'Sonnet 4.6 (balanced)',
	'claude-opus-4-7': 'Opus 4.7 (most capable)'
};

export const REVIEW_CATEGORIES = [
	'typo',
	'clarity',
	'markdown',
	'broken_ref',
	'undefined_term',
	'unfinished',
	'narrative',
	'consistency',
	'phrasing'
] as const;
export type ReviewCategory = (typeof REVIEW_CATEGORIES)[number];

const ReviewSuggestionSchema = z.object({
	type: z.enum(REVIEW_CATEGORIES),
	original: z.string(),
	suggestion: z.string(),
	reason: z.string()
});

const ReviewResponseSchema = z.object({
	suggestions: z.array(ReviewSuggestionSchema)
});

const VocabAlternativeSchema = z.object({
	word: z.string(),
	nuance: z.string()
});

const VocabResponseSchema = z.object({
	alternatives: z.array(VocabAlternativeSchema)
});

const ExcerptResponseSchema = z.object({
	excerpt: z.string()
});

export type ExcerptResult = z.infer<typeof ExcerptResponseSchema>;

const ImagePromptSchema = z.object({
	title: z.string(),
	prompt: z.string()
});

const ImagePromptsResponseSchema = z.object({
	prompts: z.array(ImagePromptSchema)
});

export type ReviewSuggestion = z.infer<typeof ReviewSuggestionSchema>;
export type VocabAlternative = z.infer<typeof VocabAlternativeSchema>;
export type ImagePrompt = z.infer<typeof ImagePromptSchema>;

export async function getDecryptedApiKey(userId: string): Promise<string | null> {
	const [row] = await db
		.select()
		.from(adminSettings)
		.where(eq(adminSettings.userId, userId))
		.limit(1);
	if (!row?.anthropicApiKeyEncrypted) return null;
	try {
		return decrypt(row.anthropicApiKeyEncrypted);
	} catch (err) {
		console.error('Failed to decrypt API key', err);
		return null;
	}
}

export async function getVoiceReferenceContent(userId: string): Promise<string> {
	const [settings] = await db
		.select()
		.from(adminSettings)
		.where(eq(adminSettings.userId, userId))
		.limit(1);

	const ids = settings?.voiceReferencePostIds ?? [];

	let posts: Array<{ id: string; title: string; content: string }> = [];

	if (ids.length > 0) {
		const rows = await db
			.select({ id: blogPosts.id, title: blogPosts.title, content: blogPosts.content })
			.from(blogPosts)
			.where(inArray(blogPosts.id, ids));
		const byId = new Map(rows.map((r) => [r.id, r]));
		posts = ids.map((id) => byId.get(id)).filter((p): p is NonNullable<typeof p> => Boolean(p));
	}

	if (posts.length === 0) {
		return '(No voice reference posts selected. The author has not chosen reference posts yet — be especially careful not to impose a style. Pick reference posts in /admin/settings.)';
	}

	return posts
		.map((p, i) => `### Voice reference post ${i + 1}: ${p.title}\n\n${p.content.slice(0, 8000)}`)
		.join('\n\n---\n\n');
}

const CATEGORY_DEFINITIONS: Record<ReviewCategory, string> = {
	typo: '"typo": Clear spelling errors, wrong word from a typo (e.g. "their" vs "there"), obviously misspelled proper nouns, double-typed words, missing letters that are unambiguously typos.',
	clarity:
		'"clarity": Sentences where the meaning is genuinely unclear or wrong (e.g. a verb tense that creates real ambiguity, a misplaced negation that flips the meaning, a missing word that breaks comprehension). NOT just "awkward". The bar is: a careful native-English reader would have to re-read the sentence to figure out what was meant, or would interpret it incorrectly.',
	markdown:
		'"markdown": Mechanical markdown/syntax issues — malformed links like `[text](url` with missing paren, unclosed code fences, broken table rows, mismatched brackets, headings using wrong syntax. PURE mechanical errors only.',
	broken_ref:
		'"broken_ref": Phrases like "as mentioned above" / "I noted earlier" / "as we saw" with no actual prior mention; dangling "this/that/it" with no clear antecedent; "see below" with no follow-up. Also flag broken cross-references to sections that don\'t exist in the draft.',
	undefined_term:
		'"undefined_term": A specific named concept, jargon term, acronym, product name, or framework is used as if known, but was never introduced or defined earlier in the draft. NOT generic words — only proper nouns or technical terms that need an introduction.',
	unfinished:
		'"unfinished": Sentences that trail off mid-thought; phrases like "more on this later" / "I\'ll come back to this" with no follow-through; topics introduced as upcoming but never returned to; placeholder text like "TBD" or "TODO" left in the body.',
	narrative:
		'"narrative": A paragraph or section that does not follow logically from what came before — a missing connective sentence, a non-sequitur jump, or a section break where the reader needs help understanding why we\'re now talking about this. Be conservative: only flag if the jump genuinely confused you on first read, not just because the transition could be smoother.',
	consistency:
		'"consistency": A claim, fact, or assertion in one part of the draft directly contradicts a claim in another part (e.g. paragraph 2 says X is true, paragraph 7 says X is false; or two different numbers given for the same thing). Both fragments must be quoted in the "original" field. Do NOT flag opinion shifts or evolving thinking — only direct factual contradictions.',
	phrasing:
		'"phrasing": An alternative way to say a phrase, sentence, or word — to give the author options. The alternative should stay in the same conversational register (not formal, not native-speaker-polished). It can shift emphasis, reorder for rhythm, swap a word for one with a different connotation, or just offer a different angle on the same idea. The author will decide whether they prefer it — your job is to show what else could work, not to fix a problem. Aim for 3–5 per draft. When in doubt, include it — the author can always dismiss it.'
};

const VOICE_PRESERVATION_PROMPT = `You are a writing assistant for Ilmo Koo, a non-native English speaker (Korean) who writes a personal blog. Your job is to flag ONLY objective errors. You are NOT a copy editor. You are NOT here to "improve" the writing.

ABSOLUTE RULES — read carefully:

1. Imperfect phrasings, ESL constructions, occasionally awkward sentences, conversational tone, and direct/blunt statements are FEATURES of Ilmo's voice, not bugs. They are how readers know they are reading Ilmo and not a generic AI-polished blog. Do NOT flag them.

2. Do NOT suggest changes for stylistic reasons. Do NOT suggest "smoother" phrasings, "more professional" word choices, or "fancier" vocabulary. Do NOT make sentences sound more like polished native-speaker writing.

3. If a sentence is grammatically valid but sounds "awkward" or "could flow better" — LEAVE IT ALONE. Awkward-but-comprehensible is the author's voice. Only flag if comprehension is genuinely broken.

4. Never suggest replacing a simple word with a more sophisticated one. Never suggest replacing a sophisticated word with a simpler one. Vocabulary and phrasing changes are NOT in scope for this review — UNLESS the "phrasing" category is explicitly active. When "phrasing" is active, rules 1–3 above are suspended for phrasing-type suggestions only. Actively look for phrases where a different wording could shift emphasis, add punch, or say the same thing in a more interesting way. The goal is to give the author options to consider, not to fix problems. You MUST produce at least 3–5 phrasing suggestions when that category is active — returning zero is wrong.

5. Only flag issues that fall into the categories the user explicitly enabled for this review (provided in the user message). If a category is not in the active list, do not flag issues of that type, even if you notice them.

For each suggestion, the "original" field MUST be a verbatim substring of the input draft (case and punctuation exactly as they appear). The "suggestion" field is what would replace it. Keep originals as short as possible while remaining unambiguous (ideally a single word for typos; the full clause for clarity/narrative issues). The "reason" field is one short plain-English sentence (≤ 15 words). The "type" field MUST be one of the enabled category names.

Below is a sample of Ilmo's previously published writing. Study it. This is what HIS voice sounds like. Anything in the new draft that falls within this range — even if it has ESL fingerprints — is correct, and you must not flag it.

<voice_reference>
{VOICE_REFERENCE}
</voice_reference>

If the draft has no real issues by the strict bar above, return an empty suggestions array. Returning zero suggestions is a successful and valid outcome — it means Ilmo wrote a clean draft. Do NOT invent suggestions to look useful.`;

const ASK_PROMPT = `You are a writing assistant for Ilmo Koo, a non-native English speaker (Korean) who writes a personal blog. He is asking you a specific question about a draft he is working on.

ABSOLUTE RULES:

1. Answer the specific question he asked. Do NOT volunteer other feedback. If he asks "does paragraph 3 work?", do not also comment on paragraph 5, his vocabulary, or his structure.

2. Imperfect phrasings, ESL constructions, and slightly awkward sentences are FEATURES of his voice. Do NOT suggest "polishing" them, even when answering structural questions. Awkward-but-comprehensible is correct.

3. Do NOT rewrite his draft. If he asks how he could improve something, give a short observation about WHAT'S happening (or not happening) in the prose — not a rewrite of his sentences.

4. Be specific. Reference paragraphs/sentences by quoting short fragments, not by making vague suggestions.

5. Be concise. 2–4 short paragraphs maximum. If the answer is "yes, this works" or "no, here's the specific issue", that's enough.

Below is a sample of his published writing — match his voice baseline when reasoning about what works.

<voice_reference>
{VOICE_REFERENCE}
</voice_reference>`;

const TOPIC_EXPLORER_PROMPT = `You are a topic strategist for Ilmo Koo, who runs a personal blog. Help him decide what to write about next.

ABSOLUTE RULES:

1. Avoid generic content marketing patterns. Do NOT suggest "Top 10" listicles, "Ultimate guides", or anything that sounds like SEO bait. Suggest topics that build on Ilmo's existing surface area and authentic interests.

2. When suggesting a vertical extension of an existing post, name the post by title and explain the angle that wasn't covered. Be specific about what new ground would be broken — e.g. "post X covered the high-level approach; the implementation tradeoffs weren't discussed."

3. When suggesting a brand-new direction, ground it in evidence from his existing posts. Don't suggest topics that don't fit his audience based on what's already published.

4. Do NOT suggest topics that overlap with already-published or in-draft posts. The full list of titles + excerpts is provided below — check before suggesting.

5. Match Ilmo's voice when writing your responses. He is a non-native English speaker who writes directly and conversationally. Don't use marketing-speak, "engaging hooks", or generic blogging language.

6. Be concrete. A topic suggestion should include: a working title, a one-sentence angle, and (optionally) a key argument or example.

7. Be conservative with suggestions. 3-5 well-thought-out ideas are better than 10 generic ones.

Below is Ilmo's full post catalog (published + drafts) and his voice reference posts:

<post_catalog>
{POST_CATALOG}
</post_catalog>

<voice_reference>
{VOICE_REFERENCE}
</voice_reference>`;

export async function getPostCatalog(): Promise<string> {
	const all = await db
		.select({
			id: blogPosts.id,
			title: blogPosts.title,
			excerpt: blogPosts.excerpt,
			published: blogPosts.published,
			createdAt: blogPosts.createdAt
		})
		.from(blogPosts)
		.orderBy(desc(blogPosts.createdAt));

	if (all.length === 0) {
		return '(No posts yet — this is a brand-new blog.)';
	}

	return all
		.map((p) => {
			const status = p.published ? 'PUBLISHED' : 'DRAFT';
			const date = new Date(p.createdAt).toISOString().slice(0, 10);
			const excerpt = p.excerpt?.trim() ?? '(no excerpt)';
			return `- [${status} · ${date}] "${p.title}" — ${excerpt}`;
		})
		.join('\n');
}

export function streamTopicChat({
	apiKey,
	model,
	voiceReference,
	postCatalog,
	messages,
	signal
}: {
	apiKey: string;
	model: SupportedModel;
	voiceReference: string;
	postCatalog: string;
	messages: Array<{ role: 'user' | 'assistant'; content: string }>;
	signal?: AbortSignal;
}) {
	const client = buildClient(apiKey);
	const systemPrompt = TOPIC_EXPLORER_PROMPT.replace('{POST_CATALOG}', postCatalog).replace(
		'{VOICE_REFERENCE}',
		voiceReference
	);
	return client.messages.stream(
		{
			model,
			max_tokens: 4000,
			system: [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }],
			messages: messages.map((m) => ({ role: m.role, content: m.content })),
			...chatModelOptions(model)
		},
		signal ? { signal } : undefined
	);
}

const VOCAB_PROMPT = `You are helping Ilmo Koo, a non-native English speaker, find vocabulary alternatives for a single word he has highlighted in his draft.

Rules:
- Provide exactly 3 alternatives.
- Alternatives must change MEANING or PRECISION — different connotations, different specificity, different register. NOT "fancier synonyms".
- Each "nuance" field is one short sentence (≤ 15 words) explaining what the alternative emphasizes that the original doesn't.
- Do NOT suggest more "sophisticated" words for the sake of sophistication.
- If the original word is already the best fit and alternatives would all be worse, still give 3 — but be honest about it in the nuance line.`;

function buildClient(apiKey: string): Anthropic {
	return new Anthropic({ apiKey });
}

/**
 * Speed-tuned options for chat-style workloads (Topic Explorer, Ask).
 * Without these, Sonnet 4.6 / Opus 4.7 default to adaptive thinking and burn
 * 60+ seconds reasoning before any text streams. Per Anthropic's migration
 * guide, chat workloads should explicitly disable thinking and use low effort.
 * Haiku 4.5 doesn't support either parameter.
 */
function chatModelOptions(model: SupportedModel): {
	thinking?: { type: 'disabled' };
	output_config?: { effort: 'low' };
} {
	if (model === 'claude-haiku-4-5') return {};
	return {
		thinking: { type: 'disabled' },
		output_config: { effort: 'low' }
	};
}

export async function runReview({
	apiKey,
	model,
	voiceReference,
	draft,
	categories,
	signal
}: {
	apiKey: string;
	model: SupportedModel;
	voiceReference: string;
	draft: string;
	categories: ReviewCategory[];
	signal?: AbortSignal;
}) {
	const client = buildClient(apiKey);
	const systemPrompt = VOICE_PRESERVATION_PROMPT.replace('{VOICE_REFERENCE}', voiceReference);

	const activeCategoryDefs = categories.map((c) => `- ${CATEGORY_DEFINITIONS[c]}`).join('\n');

	const userMessage = `Review the draft below. Active categories for this review (only flag issues in these):

${activeCategoryDefs}

<draft>
${draft}
</draft>`;

	// Reuse chat-style options (thinking disabled, low effort) — the strict prompt
	// is doing the heavy lifting; extended reasoning isn't needed and costs latency.
	const speed = chatModelOptions(model);

	const message = await client.messages.parse(
		{
			model,
			max_tokens: 8000,
			system: [
				{
					type: 'text',
					text: systemPrompt,
					cache_control: { type: 'ephemeral' }
				}
			],
			messages: [{ role: 'user', content: userMessage }],
			...(speed.thinking ? { thinking: speed.thinking } : {}),
			output_config: {
				format: zodOutputFormat(ReviewResponseSchema),
				...(speed.output_config ? { effort: speed.output_config.effort } : {})
			}
		},
		signal ? { signal } : undefined
	);

	if (!message.parsed_output) {
		throw new Error('Anthropic returned an unparseable response');
	}

	const parsed = ReviewResponseSchema.parse(message.parsed_output);
	return {
		suggestions: parsed.suggestions,
		usage: message.usage
	};
}

export function streamAsk({
	apiKey,
	model,
	voiceReference,
	draft,
	question,
	signal
}: {
	apiKey: string;
	model: SupportedModel;
	voiceReference: string;
	draft: string;
	question: string;
	signal?: AbortSignal;
}) {
	const client = buildClient(apiKey);
	const systemPrompt = ASK_PROMPT.replace('{VOICE_REFERENCE}', voiceReference);

	return client.messages.stream(
		{
			model,
			max_tokens: 2000,
			system: [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }],
			messages: [
				{
					role: 'user',
					content: `My question: ${question}\n\n<draft>\n${draft}\n</draft>`
				}
			],
			...chatModelOptions(model)
		},
		signal ? { signal } : undefined
	);
}

export async function runVocab({
	apiKey,
	model,
	word,
	context
}: {
	apiKey: string;
	model: SupportedModel;
	word: string;
	context: string;
}) {
	const client = buildClient(apiKey);
	const speed = chatModelOptions(model);

	const message = await client.messages.parse({
		model,
		max_tokens: 1000,
		system: VOCAB_PROMPT,
		messages: [
			{
				role: 'user',
				content: `Word: "${word}"\n\nContext (the sentence it appears in):\n${context}\n\nGive 3 alternatives that change meaning or precision (not fancier synonyms).`
			}
		],
		...(speed.thinking ? { thinking: speed.thinking } : {}),
		output_config: {
			format: zodOutputFormat(VocabResponseSchema),
			...(speed.output_config ? { effort: speed.output_config.effort } : {})
		}
	});

	if (!message.parsed_output) {
		throw new Error('Anthropic returned an unparseable response');
	}

	const parsed = VocabResponseSchema.parse(message.parsed_output);
	return {
		alternatives: parsed.alternatives,
		usage: message.usage
	};
}

const IMAGE_PROMPT_SYSTEM = `You are an image prompt specialist for a personal tech blog. Given a blog article, generate image prompts that work well as section illustrations or header images.

Rules:
- Each prompt must be ready to paste into Midjourney or DALL-E — no further editing needed
- Style: clean, modern, flat or semi-flat illustration. Muted colors. No stock-photo clichés.
- No faces, no people unless the concept absolutely requires a human figure (use silhouettes if so)
- Avoid: "businesspeople shaking hands", "laptop on a desk", "lightbulb idea", "gears"
- Focus on: abstract visual metaphors, diagrams, environments, or objects that represent the concept
- Each prompt should end with a style clause: ", flat illustration, minimal, muted palette, editorial"
- "title" is 3–6 words describing what concept this image covers
- Generate 4–6 prompts covering different sections or key ideas in the article`;

export async function runImagePrompts({
	apiKey,
	model,
	draft,
	signal
}: {
	apiKey: string;
	model: SupportedModel;
	draft: string;
	signal?: AbortSignal;
}) {
	const client = buildClient(apiKey);
	const speed = chatModelOptions(model);

	const message = await client.messages.parse(
		{
			model,
			max_tokens: 2000,
			system: IMAGE_PROMPT_SYSTEM,
			messages: [
				{
					role: 'user',
					content: `Generate image prompts for the following article:\n\n${draft}`
				}
			],
			...(speed.thinking ? { thinking: speed.thinking } : {}),
			output_config: {
				format: zodOutputFormat(ImagePromptsResponseSchema),
				...(speed.output_config ? { effort: speed.output_config.effort } : {})
			}
		},
		signal ? { signal } : undefined
	);

	if (!message.parsed_output) {
		throw new Error('Anthropic returned an unparseable response');
	}

	const parsed = ImagePromptsResponseSchema.parse(message.parsed_output);
	return { prompts: parsed.prompts, usage: message.usage };
}

const EXCERPT_SYSTEM = `You are writing a short excerpt for a personal tech blog post by Ilmo Koo, a Korean developer who writes in a direct, conversational style.

Rules:
- Write 2–3 sentences maximum.
- Match the author's voice: plain, direct, no marketing fluff.
- Lead with the main argument or problem — not "In this article..." or "This post covers...".
- Make it a hook: give the reader enough to know if it's worth their time.
- Do NOT add a title or label — return only the excerpt text.`;

export async function runExcerpt({
	apiKey,
	model,
	draft,
	signal
}: {
	apiKey: string;
	model: SupportedModel;
	draft: string;
	signal?: AbortSignal;
}) {
	const client = buildClient(apiKey);
	const speed = chatModelOptions(model);

	const message = await client.messages.parse(
		{
			model,
			max_tokens: 300,
			system: EXCERPT_SYSTEM,
			messages: [{ role: 'user', content: `Write an excerpt for this article:\n\n${draft}` }],
			...(speed.thinking ? { thinking: speed.thinking } : {}),
			output_config: {
				format: zodOutputFormat(ExcerptResponseSchema),
				...(speed.output_config ? { effort: speed.output_config.effort } : {})
			}
		},
		signal ? { signal } : undefined
	);

	if (!message.parsed_output) throw new Error('Anthropic returned an unparseable response');
	return ExcerptResponseSchema.parse(message.parsed_output);
}
