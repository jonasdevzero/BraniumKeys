import { KeyPair } from "@domain/types";
import crypto from "node:crypto";

export function generateKeyPair() {
	return new Promise<KeyPair>((resolve, reject) => {
		crypto.generateKeyPair(
			"rsa",
			{
				modulusLength: 2048,
				publicKeyEncoding: {
					type: "spki",
					format: "pem",
				},
				privateKeyEncoding: {
					type: "pkcs8",
					format: "pem",
				},
			},
			(err, publicKey, privateKey) => {
				if (err) return reject(err);

				resolve({ publicKey, privateKey });
			}
		);
	});
}
