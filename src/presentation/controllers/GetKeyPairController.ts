import { GetKeyPair } from '@domain/use-cases/GetPrivateKey';
import { inject } from '@main/container';
import { controller, route } from '@presentation/decorators';
import { UnauthorizedError } from '@presentation/errors';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

@controller()
@route.get('key', '/')
export class GetKeyPairController implements Controller {
	constructor(
		@inject.usecase('GetKeyPair')
		private readonly getKeyPair: GetKeyPair,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const { authorization } = httpRequest.headers;

		if (!authorization) throw new UnauthorizedError('Unauthorized');

		const [type, token] = authorization.split(' ');

		if (type !== 'Basic') throw new UnauthorizedError('Unauthorized');

		const [userId, password] = Buffer.from(token, 'base64').toString('utf-8').split(':');

		const result = await this.getKeyPair.get({ userId, password });

		return response.ok(result);
	}
}
