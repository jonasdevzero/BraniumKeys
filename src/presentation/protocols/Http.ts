import { IncomingHttpHeaders } from "http";

export interface HttpRequest {
	body?: any;
	query: Record<string, any>;
	params: Record<string, string>;
	headers: IncomingHttpHeaders;
	user: {
		id: string;
	};
}

export interface HttpResponse {
	body?: any;
	statusCode: number;
}

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";
