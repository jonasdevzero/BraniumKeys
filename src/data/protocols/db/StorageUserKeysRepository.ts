import { StorageUserKeysDTO } from "@domain/dtos";

export interface StorageUserKeysRepository {
	storage(data: StorageUserKeysDTO): Promise<void>;
}
