export interface GetPublicKey {
	get(userId: string): Promise<string>;
}
