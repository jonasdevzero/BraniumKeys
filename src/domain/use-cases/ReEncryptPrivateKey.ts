import { ReEncryptPrivateKeyDTO } from '@domain/dtos';

export interface ReEncryptPrivateKey {
	reEncrypt(data: ReEncryptPrivateKeyDTO): Promise<void>;
}
