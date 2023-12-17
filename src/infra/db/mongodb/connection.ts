import { ENV } from '@main/config/env';
import { MongoClient } from 'mongodb';

let client: MongoClient;

export async function connectDatabase() {
	client = await new MongoClient(ENV.DATABASE_URL).connect();
	console.log('database connected');
}

export function getDatabase() {
	return client.db('key-exchange');
}

export function getCollection(name: string) {
	return getDatabase().collection(name);
}
