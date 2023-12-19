export function shuffleArray<T>(array: T[], seed: string): T[] {
	const shuffledArray = array.slice();

	for (let i = shuffledArray.length - 1; i >= 0; i--) {
		const j = nextIndex(i, seed, array.length);

		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}

	return shuffledArray;
}

export function unshuffleArray<T>(shuffledArray: T[], seed: string): T[] {
	const unshuffledArray = shuffledArray.slice();

	const indices = generateIndices(shuffledArray.length, seed).reverse();

	for (let i = 0; i <= shuffledArray.length - 1; i++) {
		const j = indices[i];

		[unshuffledArray[i], unshuffledArray[j]] = [unshuffledArray[j], unshuffledArray[i]];
	}

	return unshuffledArray;
}

function nextIndex(currentIndex: number, seed: string, length: number) {
	let hash = 0;

	for (let index = 0; index < seed.length; index++) {
		const char = seed.charCodeAt(index);
		hash += char * (currentIndex + 1);
	}

	let normalized = parseFloat(`0.${hash}`);

	return Math.floor(normalized * length);
}

function generateIndices(length: number, seed: string): number[] {
	let indices = [];

	for (let i = length - 1; i >= 0; i--) {
		const j = nextIndex(i, seed, length);
		indices.push(j);
	}

	return indices;
}
