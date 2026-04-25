import { json } from '@sveltejs/kit';
import { uploadToR2 } from '$lib/server/r2';
import type { RequestHandler } from './$types';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const formData = await request.formData();
		const file = formData.get('file') as File | null;

		if (!file) {
			return json({ error: 'No file provided' }, { status: 400 });
		}

		if (!ALLOWED_TYPES.includes(file.type)) {
			return json({ error: 'File type not allowed' }, { status: 400 });
		}

		if (file.size > MAX_SIZE) {
			return json({ error: 'File too large (max 5MB)' }, { status: 400 });
		}

		const url = await uploadToR2(file);
		return json({ url });
	} catch (err) {
		console.error('Upload failed:', err);
		return json({ error: 'Upload failed' }, { status: 500 });
	}
};
