import { GenerateKeyPair } from '@domain/use-cases/GenerateKeyPair';
import { inject } from '@main/container';
import { controller, middlewares, route } from '@presentation/decorators';
import { response } from '@presentation/helpers';
import type { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { GenerateKeyPairValidator } from '@presentation/validators/GenerateKeyPairValidator';

@controller()
@middlewares(GenerateKeyPairValidator)
@route.post('key', '/generate')
export class GenerateKeyPairController implements Controller {
	constructor(
		@inject.usecase('GenerateKeyPair')
		private readonly generateKeyPair: GenerateKeyPair,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const data = httpRequest.body;

		const result = await this.generateKeyPair.generate(data);

		return response.created(result);
	}
}
