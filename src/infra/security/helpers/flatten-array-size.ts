import * as crypto from 'crypto';

export function flattenArraySize(array: string[]): string[] {
	const length = getMaxElementLength(array);

	return array.map((hexString) => {
		if (hexString.length < length) {
			const remainingLength = length - hexString.length;
			const randomHexData = generateRandomHex(remainingLength);

			return hexString + randomHexData;
		}

		return hexString;
	});
}

function getMaxElementLength(array: string[]): number {
	return Math.max(...array.map((str) => str.length));
}

function generateRandomHex(length: number): string {
	const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
	return randomBytes.toString('hex').slice(0, length);
}
