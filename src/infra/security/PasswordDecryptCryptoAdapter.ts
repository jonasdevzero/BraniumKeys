import { PasswordDecrypt } from '@data/protocols/security';
import { ENV } from '@main/config/env';
import * as crypto from 'crypto';
import { promisify } from 'util';
import * as zlib from 'zlib';
import { unshuffleArray } from './helpers';

const inflate = promisify(zlib.inflate);
const pbkdf2 = promisify(crypto.pbkdf2);

export class PasswordDecryptCryptoAdapter implements PasswordDecrypt {
	async decrypt(cipher: string, password: string): Promise<string> {
		const inflated = await inflate(Buffer.from(cipher, 'binary'), {
			level: zlib.constants.Z_MAX_LEVEL,
		});

		const inflatedBlob = inflated.toString('utf-8').split(':');

		const seed = password + ENV.ENCRYPT_PASSWORD_HASH;

		const {
			0: saltArray,
			1: ivArray,
			2: tagArray,
			3: encryptedArray,
		} = unshuffleArray(inflatedBlob, seed).map(
			(e) => new Uint8Array(Buffer.from(e, 'hex')),
		);

		const salt = Buffer.from(saltArray.subarray(0, 16));
		const iv = Buffer.from(ivArray.subarray(0, 16));
		const tag = Buffer.from(tagArray.subarray(0, 16));
		const encrypted = Buffer.from(encryptedArray);

		const key = await pbkdf2(seed, salt, 10000, 32, 'sha512');

		const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
		decipher.setAuthTag(tag);

		const decryptedBuffer = Buffer.concat([decipher.update(encrypted), decipher.final()]);

		return decryptedBuffer.toString('utf-8');
	}
}
