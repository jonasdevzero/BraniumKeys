import { GenerateKeyPair } from '@domain/use-cases/GenerateKeyPair';
import { inject } from '@main/container';
import { controller, middlewares, route } from '@presentation/decorators';
import { response } from '@presentation/helpers';
import type { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

@controller()
@middlewares('EnsureAuthenticated')
@route.post('key', '/generate')
export class GenerateKeyPairController implements Controller {
	constructor(
		@inject.usecase('GenerateKeyPair')
		private readonly generateKeyPair: GenerateKeyPair,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const { id } = httpRequest.user;

		const result = await this.generateKeyPair.generate(id);

		return response.created(result);
	}
}
