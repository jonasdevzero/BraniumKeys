import { PasswordEncrypt } from '@data/protocols/security';
import { ENV } from '@main/config/env';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { promisify } from 'util';
import { flattenArraySize, shuffleArray } from './helpers';

const pbkdf2 = promisify(crypto.pbkdf2);

export class PasswordEncryptCryptoAdapter implements PasswordEncrypt {
	async encrypt(data: string, password: string): Promise<string> {
		const salt = crypto.randomBytes(16);

		const hash = await argon2.hash(password, { salt });
		const key = await pbkdf2(hash, ENV.ENCRYPT_PASSWORD_HASH, 1, 32, 'sha256');

		const iv = crypto.randomBytes(12);
		const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

		const encryptedBuffer = Buffer.concat([cipher.update(data, 'utf-8'), cipher.final()]);

		const tag = cipher.getAuthTag();

		const blob = [
			salt.toString('hex'),
			iv.toString('hex'),
			tag.toString('hex'),
			encryptedBuffer.toString('hex'),
		];

		const flattenedBlob = flattenArraySize(blob);

		const shuffledBlob = shuffleArray(
			flattenedBlob,
			password + ENV.ENCRYPT_PASSWORD_HASH,
		);

		const cipherBlob = shuffledBlob.join(':');

		return cipherBlob;
	}
}
