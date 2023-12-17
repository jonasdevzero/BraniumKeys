import { StorageUserKeysRepository } from '@data/protocols';
import { StorageUserKeysDTO } from '@domain/dtos';
import { getCollection } from '../connection';

export class StorageUserKeysMongodbRepository implements StorageUserKeysRepository {
	async storage(data: StorageUserKeysDTO): Promise<void> {
		const { userId, ...rest } = data;

		const date = new Date();

		await getCollection('key-pair').insertOne({
			id: userId,
			...rest,
			createdAt: date,
			updatedAt: date,
		});
	}
}
