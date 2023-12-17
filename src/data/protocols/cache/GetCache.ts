export interface GetCache {
	get(key: string): Promise<string | null>;
}
