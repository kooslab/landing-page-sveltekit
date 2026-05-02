import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { env } from '$env/dynamic/private';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

function getKey(): Buffer {
	const raw = env.MASTER_ENCRYPTION_KEY;
	if (!raw || raw.length !== 64) {
		throw new Error(
			'MASTER_ENCRYPTION_KEY must be set to a 32-byte (64 hex char) value. Generate one with: openssl rand -hex 32'
		);
	}
	return Buffer.from(raw, 'hex');
}

export function encrypt(plaintext: string): string {
	const iv = randomBytes(IV_LENGTH);
	const cipher = createCipheriv(ALGORITHM, getKey(), iv);
	const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
	const authTag = cipher.getAuthTag();
	return `${iv.toString('hex')}:${authTag.toString('hex')}:${ciphertext.toString('hex')}`;
}

export function decrypt(payload: string): string {
	const [ivHex, authTagHex, ciphertextHex] = payload.split(':');
	if (!ivHex || !authTagHex || !ciphertextHex) {
		throw new Error('Malformed ciphertext');
	}
	const iv = Buffer.from(ivHex, 'hex');
	const authTag = Buffer.from(authTagHex, 'hex');
	const ciphertext = Buffer.from(ciphertextHex, 'hex');
	if (authTag.length !== AUTH_TAG_LENGTH) {
		throw new Error('Invalid auth tag length');
	}
	const decipher = createDecipheriv(ALGORITHM, getKey(), iv);
	decipher.setAuthTag(authTag);
	return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
}

export function maskApiKey(key: string): string {
	if (key.length < 12) return '***';
	return `${key.slice(0, 7)}...${key.slice(-4)}`;
}
