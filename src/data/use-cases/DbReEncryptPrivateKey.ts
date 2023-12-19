import { EditKeyPairRepository, FindKeyPairRepository } from '@data/protocols';
import { ReEncryptPrivateKeyDTO } from '@domain/dtos';
import { ReEncryptPrivateKey } from '@domain/use-cases/ReEncryptPrivateKey';
import { PasswordDecrypt, PasswordEncrypt } from '@infra/security';
import { inject, injectable } from '@main/container';
import { UnauthorizedError } from '@presentation/errors';

@injectable()
export class DbReEncryptPrivateKey implements ReEncryptPrivateKey {
	constructor(
		@inject('FindKeyPairRepository')
		private readonly findKeyPairRepository: FindKeyPairRepository,

		@inject('PasswordDecrypt')
		private readonly passwordDecrypt: PasswordDecrypt,

		@inject('PasswordEncrypt')
		private passwordEncrypt: PasswordEncrypt,

		@inject('EditKeyPairRepository')
		private readonly editKeyPairRepository: EditKeyPairRepository,
	) {}

	async reEncrypt(data: ReEncryptPrivateKeyDTO): Promise<void> {
		const { userId, oldPassword, newPassword } = data;

		const keyPair = await this.findKeyPairRepository.find(userId);

		if (!keyPair) {
			throw new UnauthorizedError('Unauthorized');
		}

		let privateKey = '';

		try {
			privateKey = await this.passwordDecrypt.decrypt(keyPair.privateKey, oldPassword);
		} catch (error) {
			throw new UnauthorizedError('Unauthorized');
		}

		const reEncryptedPrivateKey = await this.passwordEncrypt.encrypt(
			privateKey,
			newPassword,
		);

		await this.editKeyPairRepository.edit({
			userId,
			privateKey: reEncryptedPrivateKey,
		});
	}
}
