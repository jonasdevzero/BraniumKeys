import { ENV } from '@main/config/env';
import { providers } from './provider';

const provider = providers[ENV.CACHE_DRIVER];

export const GetCache = provider.get;
export const StoreCache = provider.store;
