import 'dotenv/config';
import { UnauthorizedError } from '@presentation/errors';
import { Decrypter } from '@data/protocols/authentication';
import jwt from 'jsonwebtoken';
import { ENV } from '@main/config/env';

export class DecrypterJwtAdapter implements Decrypter {
	decrypt(token: string): string {
		const payload = jwt.verify(token, ENV.JWT_SECRET);

		if (payload === null || typeof payload === 'string') {
			throw new UnauthorizedError('Invalid token');
		}

		return payload.sub as string;
	}
}
