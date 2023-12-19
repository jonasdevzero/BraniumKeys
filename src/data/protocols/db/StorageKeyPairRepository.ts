import { StorageUserKeysDTO } from '@domain/dtos';

export interface StorageKeyPairRepository {
	storage(data: StorageUserKeysDTO): Promise<void>;
}
