import { GetCaceFakeAdapter } from './fake/GetCaceFakeAdapter';
import { StoreCacheFakeAdapter } from './fake/StoreCacheFakeAdapter';
import { GetCacheIoRedisAdapter } from './ioredis/GetCacheIoRedisAdapter';
import { StoreCacheIoRedisAdapter } from './ioredis/StoreCacheIoRedisAdapter';

export const providers = {
	fake: {
		get: GetCaceFakeAdapter,
		store: StoreCacheFakeAdapter,
	},
	ioredis: {
		get: GetCacheIoRedisAdapter,
		store: StoreCacheIoRedisAdapter,
	},
};
