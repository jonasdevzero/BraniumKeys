import { GenerateKeyPairDTO } from '@domain/dtos';
import { KeyPair } from '@domain/types';

export interface GenerateKeyPair {
	generate(data: GenerateKeyPairDTO): Promise<KeyPair>;
}
