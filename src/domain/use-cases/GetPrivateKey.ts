import { GetPrivateKeyDTO } from '@domain/dtos';

export interface GetPrivateKey {
	get(data: GetPrivateKeyDTO): Promise<string>;
}
