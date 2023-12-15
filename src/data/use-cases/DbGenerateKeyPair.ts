import { generateKeyPair } from "@data/helpers";
import { StorageUserKeysRepository } from "@data/protocols";
import { KeyPair } from "@domain/types";
import { GenerateKeyPair } from "@domain/use-cases/GenerateKeyPair";
import { inject, injectable } from "@main/container";

@injectable()
export class DbGenerateKeyPair implements GenerateKeyPair {
	constructor(
		@inject("StorageUserKeysRepository")
		private readonly storageUserKeysRepository: StorageUserKeysRepository
	) {}

	async generate(userId: string): Promise<KeyPair> {
		const keyPair = await generateKeyPair();

		await this.storageUserKeysRepository.storage({ userId, ...keyPair });

		return keyPair;
	}
}
