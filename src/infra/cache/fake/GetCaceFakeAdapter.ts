import { GetCache } from '@data/protocols/cache';
import { fakeCache } from './connection';

export class GetCaceFakeAdapter implements GetCache {
	async get(key: string): Promise<string | null> {
		return fakeCache[key] || null;
	}
}
