import { GetPrivateKey } from '@domain/use-cases/GetPrivateKey';
import { inject } from '@main/container';
import { controller, route } from '@presentation/decorators';
import { UnauthorizedError } from '@presentation/errors';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

@controller()
@route.get('key', '/private')
export class GetPrivateKeyController implements Controller {
	constructor(
		@inject.usecase('GetPrivateKey')
		private readonly getPrivateKey: GetPrivateKey,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const { authorization } = httpRequest.headers;

		if (!authorization) throw new UnauthorizedError('Invalid token');

		const [type, token] = authorization.split(' ');

		if (type !== 'Basic') throw new UnauthorizedError('Invalid token');

		const [userId, password] = Buffer.from(token, 'base64').toString('utf-8').split(':');

		const result = await this.getPrivateKey.get({ userId, password });

		return response.ok(result);
	}
}
