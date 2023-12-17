import { StoreCache } from '@data/protocols/cache';
import { fakeCache } from './connection';

export class StoreCacheFakeAdapter implements StoreCache {
	async store(key: string, data: string | number | Buffer): Promise<void> {
		fakeCache[key] = data;
	}
}
