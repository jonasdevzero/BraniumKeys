import { Controller, HttpRequest } from '@presentation/protocols';
import { IncomingMessage, ServerResponse } from 'node:http';

async function loadRequestBody(req: IncomingMessage): Promise<any> {
	return new Promise((resolve, reject) => {
		let data = '';

		req.on('data', (chunk) => {
			data += chunk;
		});

		req.on('end', () => {
			try {
				const requestBody = JSON.parse(data);
				resolve(requestBody);
			} catch (error) {
				reject(error);
			}
		});
	});
}

export const adaptRoute = (controller: Controller) => {
	return async (request: IncomingMessage, response: ServerResponse, params: any) => {
		const method = request.method as string;

		const httpRequest: HttpRequest = {
			body: {},
			query: {},
			params,
			headers: request.headers,
			user: { id: '' },
		};

		if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
			httpRequest.body = await loadRequestBody(request);
		}

		const httpResponse = await controller.handle(httpRequest);

		response.statusCode = httpResponse.statusCode;
		response.end(JSON.stringify(httpResponse.body));
	};
};
