import { StoreCache } from '@data/protocols/cache';
import { ioredis } from './connection';

export class StoreCacheIoRedisAdapter implements StoreCache {
	private readonly cacheTtl = 60 * 60 * 6; // 6 hours

	async store(key: string, data: string | number | Buffer): Promise<void> {
		await ioredis.set(key, data);
		await ioredis.expire(key, this.cacheTtl);
	}
}
