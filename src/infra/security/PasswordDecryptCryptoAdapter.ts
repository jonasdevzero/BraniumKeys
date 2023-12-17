import { PasswordDecrypt } from '@data/protocols/security';
import { ENV } from '@main/config/env';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { promisify } from 'util';
import { unshuffleArray } from './helpers';

const pbkdf2 = promisify(crypto.pbkdf2);

export class PasswordDecryptCryptoAdapter implements PasswordDecrypt {
	async decrypt(cipher: string, password: string): Promise<string> {
		const cipherBlob = cipher.split(':');

		const seed = password + ENV.ENCRYPT_PASSWORD_HASH;

		const [saltArray, ivArray, tagArray, encryptedArray] = unshuffleArray(
			cipherBlob,
			seed,
		).map((e) => new Uint8Array(Buffer.from(e, 'hex')));

		const salt = Buffer.from(saltArray.subarray(0, 16));
		const iv = Buffer.from(ivArray.subarray(0, 12));
		const tag = Buffer.from(tagArray.subarray(0, 16));
		const encrypted = Buffer.from(encryptedArray);

		const hash = await argon2.hash(password, { salt });
		const key = await pbkdf2(hash, ENV.ENCRYPT_PASSWORD_HASH, 1, 32, 'sha256');

		const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
		decipher.setAuthTag(tag);

		const decryptedBuffer = Buffer.concat([decipher.update(encrypted), decipher.final()]);

		return decryptedBuffer.toString('utf-8');
	}
}
