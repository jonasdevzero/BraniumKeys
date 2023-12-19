import { UserKeyPair } from '@domain/models';

export interface FindKeyPairRepository {
	find(userId: string): Promise<UserKeyPair | null>;
}
