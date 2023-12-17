export interface PasswordDecrypt {
	decrypt(cipher: string, password: string): Promise<string>;
}
