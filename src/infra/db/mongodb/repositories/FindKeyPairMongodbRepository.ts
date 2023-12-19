import { FindKeyPairRepository } from '@data/protocols';
import { UserKeyPair } from '@domain/models';
import { getCollection } from '../connection';

export class FindKeyPairMongodbRepository implements FindKeyPairRepository {
	async find(userId: string): Promise<UserKeyPair | null> {
		const data = await getCollection('key-pair').findOne<UserKeyPair>({ id: userId });

		return data;
	}
}
