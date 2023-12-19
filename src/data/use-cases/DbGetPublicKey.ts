import { FindKeyPairRepository, GetCache, StoreCache } from '@data/protocols';
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

		@inject('FindKeyPairRepository')
		private readonly findKeyPairRepository: FindKeyPairRepository,
	) {}

	async get(userId: string): Promise<string> {
		const cachedPublicKey = await this.getCache.get(userId);

		if (cachedPublicKey) return cachedPublicKey;

		const keyPair = await this.findKeyPairRepository.find(userId);

		if (!keyPair) {
			throw new NotFoundError('user');
		}

		await this.storeCache.store(userId, keyPair.publicKey);

		return keyPair.publicKey;
	}
}
