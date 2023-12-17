import * as middlewares from '@presentation/middlewares';
import useCases from './use-cases';
import repositories from './repositories';
import * as authentication from '@infra/authentication';
import * as security from '@infra/security';
import * as cache from '@infra/cache';

// follow a specific order
const injectables = {
	...cache,
	...authentication,
	...security,
	...repositories,
};

export type Middlewares = keyof typeof middlewares;
export type Injectable = keyof typeof injectables;
export type UseCase = keyof typeof useCases;

export default { ...injectables, ...middlewares, ...useCases };
