import { generateKeyPair } from '@data/helpers';
import { PasswordEncrypt, StorageUserKeysRepository } from '@data/protocols';
import { FindUserKeyPairRepository } from '@data/protocols/db/FindUserKeyPairRepository';
import { GenerateKeyPairDTO } from '@domain/dtos';
import { KeyPair } from '@domain/types';
import { GenerateKeyPair } from '@domain/use-cases/GenerateKeyPair';
import { inject, injectable } from '@main/container';
import { BadRequestError } from '@presentation/errors';

@injectable()
export class DbGenerateKeyPair implements GenerateKeyPair {
	constructor(
		@inject('FindUserKeyPairRepository')
		private readonly findUserKeyPairRepository: FindUserKeyPairRepository,

		@inject('PasswordEncrypt')
		private passwordEncrypt: PasswordEncrypt,

		@inject('StorageUserKeysRepository')
		private readonly storageUserKeysRepository: StorageUserKeysRepository,
	) {}

	async generate(data: GenerateKeyPairDTO): Promise<KeyPair> {
		const { userId, password } = data;

		const exists = await this.findUserKeyPairRepository.find(userId);

		if (exists) {
			throw new BadRequestError('This user already has a key pair');
		}

		const keyPair = await generateKeyPair();

		const encryptedPrivateKey = await this.passwordEncrypt.encrypt(
			keyPair.privateKey,
			password,
		);

		await this.storageUserKeysRepository.storage({
			userId,
			publicKey: keyPair.publicKey,
			privateKey: encryptedPrivateKey,
		});

		return keyPair;
	}
}
