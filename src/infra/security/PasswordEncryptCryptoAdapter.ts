import { PasswordEncrypt } from '@data/protocols/security';
import { ENV } from '@main/config/env';
import * as crypto from 'crypto';
import { promisify } from 'util';
import * as zlib from 'zlib';
import { flattenArraySize, shuffleArray } from './helpers';

const deflate = promisify(zlib.deflate);
const pbkdf2 = promisify(crypto.pbkdf2);

export class PasswordEncryptCryptoAdapter implements PasswordEncrypt {
	async encrypt(data: string, password: string): Promise<string> {
		const seed = password + ENV.ENCRYPT_PASSWORD_HASH;

		const salt = crypto.randomBytes(16);
		const key = await pbkdf2(seed, salt, 10000, 32, 'sha512');

		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

		const encrypted = Buffer.concat([cipher.update(data, 'utf-8'), cipher.final()]);

		const tag = cipher.getAuthTag();

		const blobArray = [
			salt.toString('hex'),
			iv.toString('hex'),
			tag.toString('hex'),
			encrypted.toString('hex'),
		];

		const flattenedBlob = flattenArraySize(blobArray);
		const shuffledBlob = shuffleArray(flattenedBlob, seed);
		const blob = Buffer.from(shuffledBlob.join(':'), 'utf-8');

		const cipherBlob = await deflate(blob, { level: zlib.constants.Z_MAX_LEVEL });

		return cipherBlob.toString('binary');
	}
}
