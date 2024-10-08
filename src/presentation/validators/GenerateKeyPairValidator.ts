import { validator } from '@presentation/decorators/validator';
import { passwordSchema } from '@presentation/helpers/validators';
import { HttpRequest, Middleware } from '@presentation/protocols';
import { z } from 'zod';

@validator
export class GenerateKeyPairValidator implements Middleware {
	private readonly schema = z.object({
		body: z
			.object({
				userId: z.string().uuid(),
				password: passwordSchema,
			})
			.required()
			.strict(),
	});

	async handle(httpRequest: HttpRequest): Promise<void> {
		const parsed = await this.schema.parseAsync(httpRequest);
		Object.assign(httpRequest, parsed);
	}
}
