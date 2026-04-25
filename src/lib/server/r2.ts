import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { env } from '$env/dynamic/private';

const R2 = new S3Client({
	region: 'auto',
	endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: env.R2_ACCESS_KEY_ID!,
		secretAccessKey: env.R2_SECRET_ACCESS_KEY!
	}
});

export async function uploadToR2(file: File): Promise<string> {
	const ext = file.name.split('.').pop() || 'png';
	const key = `blog/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

	await R2.send(
		new PutObjectCommand({
			Bucket: env.R2_BUCKET_NAME,
			Key: key,
			Body: Buffer.from(await file.arrayBuffer()),
			ContentType: file.type
		})
	);

	return `${env.R2_PUBLIC_URL}/${key}`;
}

export async function deleteFromR2(url: string): Promise<void> {
	const key = url.replace(`${env.R2_PUBLIC_URL}/`, '');

	await R2.send(
		new DeleteObjectCommand({
			Bucket: env.R2_BUCKET_NAME,
			Key: key
		})
	);
}
