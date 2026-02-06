import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

type TargetLang = 'EN' | 'KO' | 'DE';

interface TranslateRequest {
	text: string;
	targetLang: TargetLang;
	sourceLang?: string;
	isHtml?: boolean;
}

interface DeepLTranslation {
	detected_source_language: string;
	text: string;
}

interface DeepLResponse {
	translations: DeepLTranslation[];
}

export const POST: RequestHandler = async ({ request }) => {
	const DEEPL_API_KEY = env.DEEPL_API_KEY;

	if (!DEEPL_API_KEY) {
		return json({ error: 'Translation service not configured' }, { status: 503 });
	}

	let body: TranslateRequest;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	const { text, targetLang, sourceLang, isHtml } = body;

	if (!text || typeof text !== 'string') {
		return json({ error: 'Missing or invalid text field' }, { status: 400 });
	}

	if (!targetLang || !['EN', 'KO', 'DE'].includes(targetLang)) {
		return json({ error: 'Invalid target language. Must be EN, KO, or DE' }, { status: 400 });
	}

	try {
		const params = new URLSearchParams({
			text,
			target_lang: targetLang
		});

		if (sourceLang) {
			params.append('source_lang', sourceLang);
		}

		// Preserve HTML tags during translation
		if (isHtml) {
			params.append('tag_handling', 'html');
		}

		const response = await fetch('https://api-free.deepl.com/v2/translate', {
			method: 'POST',
			headers: {
				Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: params.toString()
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('DeepL API error:', response.status, errorText);
			return json(
				{ error: 'Translation service error' },
				{ status: response.status >= 500 ? 502 : response.status }
			);
		}

		const data: DeepLResponse = await response.json();

		if (!data.translations || data.translations.length === 0) {
			return json({ error: 'No translation returned' }, { status: 500 });
		}

		return json({
			translatedText: data.translations[0].text,
			detectedSourceLang: data.translations[0].detected_source_language
		});
	} catch (error) {
		console.error('Translation error:', error);
		return json({ error: 'Failed to translate text' }, { status: 500 });
	}
};
