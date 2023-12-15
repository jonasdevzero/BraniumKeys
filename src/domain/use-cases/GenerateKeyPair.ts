import { KeyPair } from "@domain/types";

export interface GenerateKeyPair {
	generate(userId: string): Promise<KeyPair>;
}
