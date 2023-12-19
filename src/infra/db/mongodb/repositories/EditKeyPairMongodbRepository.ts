import { EditKeyPairRepository } from '@data/protocols';
import { EditKeyPairDTO } from '@domain/dtos';
import { getCollection } from '../connection';

export class EditKeyPairMongodbRepository implements EditKeyPairRepository {
	async edit(data: EditKeyPairDTO): Promise<void> {
		const { userId, ...rest } = data;

		await getCollection('key-pair').updateOne(
			{ id: userId },
			{ $set: { ...rest, updatedAt: new Date() } },
		);
	}
}
