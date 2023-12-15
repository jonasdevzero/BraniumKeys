import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production']).default('development'),

	PORT: z.string().default('5000').transform(Number),

	PRIVATE_KEY: z.string().default('ssl/server-key.pem'),
	CERTIFICATE: z.string().default('ssl/server-cert.pem'),

	DATABASE_URL: z.string(),

	JWT_SECRET: z.string(),
});

export const ENV = envSchema.parse(process.env);

export const getEnvIssues = (): z.ZodIssue[] | void => {
	const result = envSchema.safeParse(process.env);
	if (!result.success) return result.error.issues;
};
