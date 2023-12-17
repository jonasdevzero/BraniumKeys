import { GetPublicKey } from '@domain/use-cases/GetPublicKey';
import { inject } from '@main/container';
import { controller, route } from '@presentation/decorators';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

@controller()
@route.get('key', '/public/:userId')
export class GetPublicKeyController implements Controller {
	constructor(
		@inject.usecase('GetPublicKey')
		private readonly getPublicKey: GetPublicKey,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const { userId } = httpRequest.params;

		const result = await this.getPublicKey.get(userId);

		return response.ok(result);
	}
}
