export interface StoreCache {
	store(key: string, data: string | number | Buffer): Promise<void>;
}
