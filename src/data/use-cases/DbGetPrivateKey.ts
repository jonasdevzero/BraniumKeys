import { FindKeyPairRepository, PasswordDecrypt } from '@data/protocols';
import { GetPrivateKeyDTO } from '@domain/dtos';
import { GetPrivateKey } from '@domain/use-cases/GetPrivateKey';
import { inject, injectable } from '@main/container';
import { UnauthorizedError } from '@presentation/errors';

@injectable()
export class DbGetPrivateKey implements GetPrivateKey {
	constructor(
		@inject('FindKeyPairRepository')
		private readonly findKeyPairRepository: FindKeyPairRepository,

		@inject('PasswordDecrypt')
		private readonly passwordDecrypt: PasswordDecrypt,
	) {}

	async get(data: GetPrivateKeyDTO): Promise<string> {
		const { userId, password } = data;

		const keyPair = await this.findKeyPairRepository.find(userId);

		if (!keyPair) {
			throw new UnauthorizedError('Unauthorized');
		}

		let privateKey = '';

		try {
			privateKey = await this.passwordDecrypt.decrypt(keyPair.privateKey, password);
		} catch (error) {
			throw new UnauthorizedError('Unauthorized');
		}

		return privateKey;
	}
}
