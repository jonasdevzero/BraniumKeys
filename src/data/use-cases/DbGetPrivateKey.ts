import { PasswordDecrypt } from '@data/protocols';
import { FindUserKeyPairRepository } from '@data/protocols/db/FindUserKeyPairRepository';
import { GetPrivateKeyDTO } from '@domain/dtos';
import { GetPrivateKey } from '@domain/use-cases/GetPrivateKey';
import { inject, injectable } from '@main/container';
import { UnauthorizedError } from '@presentation/errors';

@injectable()
export class DbGetPrivateKey implements GetPrivateKey {
	constructor(
		@inject('FindUserKeyPairRepository')
		private readonly findUserKeyPairRepository: FindUserKeyPairRepository,

		@inject('PasswordDecrypt')
		private readonly passwordDecrypt: PasswordDecrypt,
	) {}

	async get(data: GetPrivateKeyDTO): Promise<string> {
		const { userId, password } = data;

		const keyPair = await this.findUserKeyPairRepository.find(userId);

		if (!keyPair) {
			throw new UnauthorizedError('Invalid token');
		}

		let privateKey = '';

		try {
			privateKey = await this.passwordDecrypt.decrypt(keyPair.privateKey, password);
		} catch (error) {
			throw new UnauthorizedError('Invalid token');
		}

		return privateKey;
	}
}
