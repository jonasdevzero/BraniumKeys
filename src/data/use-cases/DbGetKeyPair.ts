import { FindKeyPairRepository, PasswordDecrypt } from '@data/protocols';
import { GetPrivateKeyDTO } from '@domain/dtos';
import { KeyPair } from '@domain/types';
import { GetKeyPair } from '@domain/use-cases/GetPrivateKey';
import { inject, injectable } from '@main/container';
import { NotFoundError, UnauthorizedError } from '@presentation/errors';

@injectable()
export class DbGetKeyPair implements GetKeyPair {
	constructor(
		@inject('FindKeyPairRepository')
		private readonly findKeyPairRepository: FindKeyPairRepository,

		@inject('PasswordDecrypt')
		private readonly passwordDecrypt: PasswordDecrypt,
	) {}

	async get(data: GetPrivateKeyDTO): Promise<KeyPair> {
		const { userId, password } = data;

		const keyPair = await this.findKeyPairRepository.find(userId);

		if (!keyPair) {
			throw new NotFoundError('key pair');
		}

		let privateKey = '';

		try {
			privateKey = await this.passwordDecrypt.decrypt(keyPair.privateKey, password);
		} catch (error) {
			throw new UnauthorizedError('Unauthorized');
		}

		return { publicKey: keyPair.publicKey, privateKey };
	}
}
