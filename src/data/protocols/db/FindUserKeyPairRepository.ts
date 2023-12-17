import { UserKeyPair } from '@domain/models';

export interface FindUserKeyPairRepository {
	find(userId: string): Promise<UserKeyPair | null>;
}
