import { GetCache, StoreCache } from '@data/protocols';
import { FindUserKeyPairRepository } from '@data/protocols/db/FindUserKeyPairRepository';
import { GetPublicKey } from '@domain/use-cases/GetPublicKey';
import { inject, injectable } from '@main/container';
import { NotFoundError } from '@presentation/errors';

@injectable()
export class DbGetPublicKey implements GetPublicKey {
	constructor(
		@inject('GetCache')
		private readonly getCache: GetCache,

		@inject('StoreCache')
		private readonly storeCache: StoreCache,

		@inject('FindUserKeyPairRepository')
		private readonly findUserKeyPairRepository: FindUserKeyPairRepository,
	) {}

	async get(userId: string): Promise<string> {
		const cachedPublicKey = await this.getCache.get(userId);

		if (cachedPublicKey) return cachedPublicKey;

		const keyPair = await this.findUserKeyPairRepository.find(userId);

		if (!keyPair) {
			throw new NotFoundError('user');
		}

		await this.storeCache.store(userId, keyPair.publicKey);

		return keyPair.publicKey;
	}
}
