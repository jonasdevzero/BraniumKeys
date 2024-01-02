import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production']).default('development'),

	PORT: z.string().default('5000').transform(Number),

	PRIVATE_KEY: z.string().default('ssl/key.pem'),
	CERTIFICATE: z.string().default('ssl/cert.pem'),
	CA: z.string().default('ssl/ca-cert.pem'),

	DATABASE_URL: z.string(),

	CACHE_DRIVER: z.enum(['fake', 'ioredis']),
	REDIS_URL: z.string(),

	JWT_SECRET: z.string(),

	ENCRYPT_PASSWORD_HASH: z.string(),
});

export const ENV = envSchema.parse(process.env);

export const getEnvIssues = (): z.ZodIssue[] | void => {
	const result = envSchema.safeParse(process.env);
	if (!result.success) return result.error.issues;
};
