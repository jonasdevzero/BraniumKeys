import { ReEncryptPrivateKey } from '@domain/use-cases/ReEncryptPrivateKey';
import { inject } from '@main/container';
import { controller, middlewares, route } from '@presentation/decorators';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ReEncryptPrivateKayValidator } from '@presentation/validators/ReEncryptPrivateKayValidator';

@controller()
@middlewares(ReEncryptPrivateKayValidator)
@route.patch('key', '/re-encrypt')
export class ReEncryptPrivateKeyController implements Controller {
	constructor(
		@inject.usecase('ReEncryptPrivateKey')
		private readonly reEncryptPrivateKey: ReEncryptPrivateKey,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const data = httpRequest.body;

		await this.reEncryptPrivateKey.reEncrypt(data);

		return response.noContent();
	}
}
