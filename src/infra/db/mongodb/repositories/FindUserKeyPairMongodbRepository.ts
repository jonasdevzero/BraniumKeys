import { FindUserKeyPairRepository } from '@data/protocols/db/FindUserKeyPairRepository';
import { UserKeyPair } from '@domain/models';
import { getCollection } from '../connection';

export class FindUserKeyPairMongodbRepository implements FindUserKeyPairRepository {
	async find(userId: string): Promise<UserKeyPair | null> {
		const data = await getCollection('key-pair').findOne<UserKeyPair>({ id: userId });

		return data;
	}
}
