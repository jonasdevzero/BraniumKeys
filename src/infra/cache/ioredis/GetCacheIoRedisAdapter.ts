import { GetCache } from '@data/protocols/cache';
import { ioredis } from './connection';

export class GetCacheIoRedisAdapter implements GetCache {
	async get(key: string): Promise<string | null> {
		try {
			const result = await ioredis.get(key);
			return result;
		} catch (error) {
			return null;
		}
	}
}
