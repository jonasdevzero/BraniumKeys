import { StoreCache } from '@data/protocols/cache';
import { ioredis } from './connection';

export class StoreCacheIoRedisAdapter implements StoreCache {
	private readonly cacheTtl = 60 * 10; // 10 minutes

	async store(key: string, data: string | number | Buffer): Promise<void> {
		try {
			await ioredis.set(key, data);
			await ioredis.expire(key, this.cacheTtl);
		} catch (error) {}
	}
}
