import { generateKeyPair } from '@data/helpers';
import {
	PasswordEncrypt,
	StorageKeyPairRepository,
	FindKeyPairRepository,
} from '@data/protocols';
import { GenerateKeyPairDTO } from '@domain/dtos';
import { KeyPair } from '@domain/types';
import { GenerateKeyPair } from '@domain/use-cases/GenerateKeyPair';
import { inject, injectable } from '@main/container';
import { BadRequestError } from '@presentation/errors';

@injectable()
export class DbGenerateKeyPair implements GenerateKeyPair {
	constructor(
		@inject('FindKeyPairRepository')
		private readonly findUserKeyPairRepository: FindKeyPairRepository,

		@inject('PasswordEncrypt')
		private passwordEncrypt: PasswordEncrypt,

		@inject('StorageKeyPairRepository')
		private readonly storageKeyPairRepository: StorageKeyPairRepository,
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

		await this.storageKeyPairRepository.storage({
			userId,
			publicKey: keyPair.publicKey,
			privateKey: encryptedPrivateKey,
		});

		return keyPair;
	}
}
