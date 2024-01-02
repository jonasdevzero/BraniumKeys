import { GetPrivateKeyDTO } from '@domain/dtos';
import { KeyPair } from '@domain/types';

export interface GetKeyPair {
	get(data: GetPrivateKeyDTO): Promise<KeyPair>;
}
