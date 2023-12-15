import { Controller, HttpRequest } from '@presentation/protocols';
import { IncomingMessage, ServerResponse } from 'node:http';

export const adaptRoute = (controller: Controller) => {
	return async (request: IncomingMessage, response: ServerResponse) => {
		const httpRequest: HttpRequest = {
			body: {},
			query: {},
			params: {},
			headers: request.headers,
			user: { id: '' },
		};

		const httpResponse = await controller.handle(httpRequest);

		response.statusCode = httpResponse.statusCode;
		response.end(JSON.stringify(httpResponse.body));
	};
};
