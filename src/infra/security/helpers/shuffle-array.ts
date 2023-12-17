export function shuffleArray<T>(array: T[], seed: string): T[] {
	const random = createRandom(seed);

	const shuffledArray = array.slice();

	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = random(i);
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}

	return shuffledArray;
}

export function unshuffleArray<T>(shuffledArray: T[], seed: string): T[] {
	const random = createRandom(seed);

	const unshuffledArray = shuffledArray.slice();

	for (let i = unshuffledArray.length - 1; i > 0; i--) {
		const j = random(i);
		[unshuffledArray[i], unshuffledArray[j]] = [unshuffledArray[j], unshuffledArray[i]];
	}

	return unshuffledArray;
}

function createRandom(seed: string) {
	return (max: number, min: number = 0) =>
		Math.floor(getSeedHash(seed) * (max - min + 1) + min);
}

function getSeedHash(seed: string): number {
	let hash = 0;
	if (seed.length === 0) return hash;

	for (let i = 0; i < seed.length; i++) {
		const char = seed.charCodeAt(i);
		hash = (hash << 5) - hash + char;
	}

	// Convert to a value between 0 and 1
	return (hash & 0x7fffffff) / 0x7fffffff;
}
