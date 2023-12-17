export interface PasswordEncrypt {
	encrypt(data: string, password: string): Promise<string>;
}
